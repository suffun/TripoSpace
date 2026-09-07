const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const NodeGeocoder = require("node-geocoder");

// Setup free OpenStreetMap Nominatim geocoder
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
  userAgent: "TripoSpace-Travel-App",
  timeout: 5000,
});

module.exports.index = async (req, res) => {
  const { category, search, minPrice, maxPrice, guests, amenities } = req.query;

  let filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  if (search && search.trim() !== "") {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { title: regex },
      { location: regex },
      { country: regex },
      { category: regex },
    ];
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (guests) {
    filter.guests = { $gte: Number(guests) };
  }

  if (amenities) {
    const amenitiesArr = Array.isArray(amenities) ? amenities : [amenities];
    filter.amenities = { $all: amenitiesArr };
  }

  const allListings = await Listing.find(filter).populate("reviews");

  // Fetch wishlist IDs for logged-in user
  let userWishlistIds = [];
  if (req.user && req.user._id) {
    const user = await User.findById(req.user._id);
    if (user && user.wishlist) {
      userWishlistIds = user.wishlist.map((id) => id.toString());
    }
  }

  res.render("listings/index", {
    allListings,
    activeCategory: category || "All",
    searchQuery: search || "",
    filters: {
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      guests: guests || "",
      amenities: Array.isArray(amenities) ? amenities : amenities ? [amenities] : [],
    },
    userWishlistIds,
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // Calculate review score statistics
  let totalScore = 0;
  let avgRating = 0;
  if (listing.reviews && listing.reviews.length > 0) {
    totalScore = listing.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    avgRating = (totalScore / listing.reviews.length).toFixed(2);
  }

  // Find similar listings in same category or country
  const similarListings = await Listing.find({
    _id: { $ne: listing._id },
    $or: [{ category: listing.category }, { country: listing.country }],
  })
    .limit(3)
    .populate("reviews");

  let isSavedInWishlist = false;
  if (req.user && req.user._id) {
    const user = await User.findById(req.user._id);
    if (user && user.wishlist) {
      isSavedInWishlist = user.wishlist.some(
        (wId) => wId.toString() === listing._id.toString()
      );
    }
  }

  res.render("listings/show", {
    listing,
    similarListings,
    avgRating,
    reviewCount: listing.reviews ? listing.reviews.length : 0,
    isSavedInWishlist,
  });
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  } else if (!newListing.image || !newListing.image.url) {
    newListing.image = {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      filename: "defaultlisting",
    };
  }

  // Parse amenities
  if (req.body.listing.amenities && typeof req.body.listing.amenities === "string") {
    newListing.amenities = req.body.listing.amenities
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
  }

  // Convert address → GeoJSON coordinates
  try {
    const address = `${req.body.listing.location}, ${req.body.listing.country}`;
    const geoData = await geocoder.geocode(address);
    if (geoData && geoData.length > 0) {
      newListing.geometry = {
        type: "Point",
        coordinates: [geoData[0].longitude, geoData[0].latitude],
      };
    } else {
      newListing.geometry = { type: "Point", coordinates: [77.209, 28.6139] };
    }
  } catch (err) {
    newListing.geometry = { type: "Point", coordinates: [77.209, 28.6139] };
  }

  await newListing.save();
  req.flash("success", "New listing created successfully!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = (listing.image && listing.image.url) || "";
  if (originalImageUrl.includes("/upload")) {
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  }
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let updateData = { ...req.body.listing };

  if (typeof updateData.amenities === "string") {
    updateData.amenities = updateData.amenities
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);
  }

  if (updateData.location || updateData.country) {
    try {
      const address = `${updateData.location || ""}, ${updateData.country || ""}`;
      const geoData = await geocoder.geocode(address);
      if (geoData && geoData.length > 0) {
        updateData.geometry = {
          type: "Point",
          coordinates: [geoData[0].longitude, geoData[0].latitude],
        };
      }
    } catch (e) {
      // Keep existing geometry on error
    }
  }

  if (req.file) {
    updateData.image = { url: req.file.path, filename: req.file.filename };
  }

  await Listing.findByIdAndUpdate(id, updateData, { runValidators: true });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};


const Listing = require("../models/listing.js");
const NodeGeocoder = require("node-geocoder");

// Setup free OpenStreetMap Nominatim geocoder
const geocoder = NodeGeocoder({
  provider: "openstreetmap",
  userAgent: "Airbnb-Clone-App", // Helps avoid rate limiting
  timeout: 5000,
});

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
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
    req.flash("error", "Listing  you requested for does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res, next) => {
  // if(!req.body.listing){
  //   throw new ExpressError(400,"send valid data for listing")
  // }

  // let {title,description,image,price,country,location} = req.body;

  // let listing = req.body.listing;
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // Convert address → GeoJSON coordinates
  const address = `${req.body.listing.location}, ${req.body.listing.country}`;
  const geoData = await geocoder.geocode(address);

  if (geoData && geoData.length > 0) {
    newListing.geometry = {
      type: "Point",
      coordinates: [geoData[0].longitude, geoData[0].latitude], // longitude first!
    };
  } else {
    // Fallback to Delhi, India
    newListing.geometry = {
      type: "Point",
      coordinates: [77.209, 28.6139],
    };
    req.flash(
      "warning",
      "Could not find exact location. Using default coordinates.",
    );
  }

  await newListing.save();
  req.flash("success", "new listing created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing  you requested for does not exist!");
    return res.redirect("/listings");
  }
  // to decrease the quality of edit image
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  // if (!req.body.listing) {
  //   throw new ExpressError(400, "send valid data for lisying");
  // }
  let { id } = req.params;
  // console.log(req.body);
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

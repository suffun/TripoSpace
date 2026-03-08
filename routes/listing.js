const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");



// INDEX
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);

// NEW ROUTE

router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// SHOW ROUTE
 
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate("reviews")
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing  you requested for does not exist!");
      return res.redirect("/listings");
    }
   
    res.render("listings/show", { listing });
  }),
);

// Create Route

router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing")
    // }

    // let {title,description,image,price,country,location} = req.body;
    // let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "new listing created!");
    res.redirect("/listings");
  }),
);

// EDIT ROUTE

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing  you requested for does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
  }),
);

// UPDATE ROUTE

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "send valid data for lisying");
    // }
    let { id } = req.params;
    // console.log(req.body);
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

// DELETE ROUTE
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;

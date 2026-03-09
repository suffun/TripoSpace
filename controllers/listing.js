const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  };


  module.exports.renderNewForm =  (req, res) => {
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
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
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
      res.render("listings/edit", { listing });
    };


    module.exports.updateListing = async (req, res) => {
        // if (!req.body.listing) {
        //   throw new ExpressError(400, "send valid data for lisying");
        // }
        let { id } = req.params;
        // console.log(req.body);
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
      };


      module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  };
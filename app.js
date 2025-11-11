const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError");
const { listingSchema } = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/TripoSpace";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("HI I am root");
});

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  console.log(error);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// INDEX
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

// NEW ROUTE

app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// SHOW ROUTE

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  })
);

// Create Route

app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing")
    // }

    // let {title,description,image,price,country,location} = req.body;
    // let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

// EDIT ROUTE

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  })
);

// UPDATE ROUTE

app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "send valid data for lisying");
    // }
    let { id } = req.params;
    // console.log(req.body);
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

// DELETE ROUTE
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

//   app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title : "My new villa",
//     description : "near beach",
//     price : 200,
//     location :"Vapi,Gujarat",
//     country : "India",
//   });
//   await sampleListing.save();
//   console.log("Sample was saved");
//   res.send("successful testing");
// });

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Oh no! Something went wrong." } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

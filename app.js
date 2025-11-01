const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

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

app.get("/", async (req, res) => {
   const allListings = await Listing.find({})
   res.render("index.ejs", {allListings});
    
});

app.get("/", (req, res) => {
  res.send("HI I am root");
});

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

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

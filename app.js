const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

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

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
  res.send("HI I am root");
});

// INDEX
app.get("/listings", async (req, res) => {
   const allListings = await Listing.find({})
   res.render("listings/index", {allListings});
    
});


// NEW ROUTE

app.get("/listings/new",(req,res) => {
    res.render("listings/new");
})


// SHOW ROUTE

app.get("/listings/:id", async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show",{listing});

});

// Create Route

app.post("/listings",async (req,res)=>{
    // let {title,description,image,price,country,location} = req.body;
    // let listing = req.body.listing;
   const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");


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

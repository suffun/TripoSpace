const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { string } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url: String,
   filename : String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "Iconic Cities",
      "Mountains",
      "Amazing Pools",
      "Camping",
      "Farms",
      "Castles",
      "Arctic",
      "Beachfront",
      "Luxury",
    ],
    default: "Trending",
  },
  guests: {
    type: Number,
    default: 2,
    min: 1,
  },
  bedrooms: {
    type: Number,
    default: 1,
    min: 1,
  },
  beds: {
    type: Number,
    default: 1,
    min: 1,
  },
  baths: {
    type: Number,
    default: 1,
    min: 1,
  },
  amenities: {
    type: [String],
    default: ["Wifi", "Air conditioning", "Kitchen", "Free parking"],
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [77.209, 28.6139],
    },
  },

});


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

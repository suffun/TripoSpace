require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const Review = require("../models/review.js");

const target = (process.argv[2] || "").toLowerCase();
const isAtlas = target === "atlas" || target === "--atlas";

const MONGO_URL = isAtlas 
  ? (process.env.ATLASDB_URL ? process.env.ATLASDB_URL.trim() : null)
  : (process.env.LOCAL_MONGO_URL || "mongodb://127.0.0.1:27017/TripoSpace");

if (isAtlas && !MONGO_URL) {
  console.error("Error: ATLASDB_URL is not defined in your .env file!");
  process.exit(1);
}

async function main() {
  console.log(`Connecting to ${isAtlas ? "MongoDB Atlas (Cloud)" : "Local MongoDB"}...`);
  await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 8000 });
  console.log(`Connected successfully to ${isAtlas ? "MongoDB Atlas" : "Local MongoDB"}!`);
}

const sampleReviewComments = [
  { comment: "Absolutely breathtaking place! Clean, beautiful, and the host was super communicative.", rating: 5 },
  { comment: "Amazing experience! The views were even better than the pictures. Would definitely stay again.", rating: 5 },
  { comment: "Lovely accommodation in a prime spot. Very peaceful and well equipped.", rating: 4 },
  { comment: "Fantastic stay! High quality amenities and super comfortable beds.", rating: 5 },
  { comment: "Great location and wonderful atmosphere. Recommended for couples or small families.", rating: 4 },
];

const initDB = async () => {
  await main();

  // Find or create a demo host
  let host = await User.findOne({});
  if (!host) {
    const newUser = new User({ email: "host@tripospace.com", username: "tripospace_host" });
    host = await User.register(newUser, "password123");
  }

  // Clear existing data to ensure a clean demo
  console.log("Cleaning up old test listings & reviews...");
  await Listing.deleteMany({});
  await Review.deleteMany({});

  // Create some sample reviews
  const createdReviews = [];
  for (const sample of sampleReviewComments) {
    const rev = new Review({
      comment: sample.comment,
      rating: sample.rating,
      author: host._id,
      createdAt: new Date(),
    });
    await rev.save();
    createdReviews.push(rev._id);
  }

  // Map listings with owner and some reviews
  const listingsToInsert = initData.data.map((obj, index) => {
    // Assign 1-3 reviews to each listing
    const reviewSubset = [
      createdReviews[index % createdReviews.length],
      createdReviews[(index + 1) % createdReviews.length],
    ];

    return {
      ...obj,
      owner: host._id,
      reviews: reviewSubset,
    };
  });

  await Listing.insertMany(listingsToInsert);
  console.log(`Database initialized successfully with ${listingsToInsert.length} listings!`);
  await mongoose.disconnect();
};

initDB().catch((err) => {
  console.error("Failed to initialize database:", err);
  process.exit(1);
});

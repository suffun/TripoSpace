if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

// const flash = require("connect-flash");
const flash = require("express-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

const LOCAL_MONGO_URL = process.env.LOCAL_MONGO_URL || "mongodb://127.0.0.1:27017/TripoSpace";
const dbUrl = (process.env.NODE_ENV === "production" && process.env.ATLASDB_URL)
  ? process.env.ATLASDB_URL
  : (process.env.USE_ATLAS === "true" && process.env.ATLASDB_URL ? process.env.ATLASDB_URL : LOCAL_MONGO_URL);

async function main() {
  try {
    await mongoose.connect(dbUrl, { serverSelectionTimeoutMS: 5000 });
    console.log(`Connected to MongoDB (${dbUrl.includes("127.0.0.1") ? "Local" : "Cloud Atlas"}) successfully!`);
  } catch (err) {
    if (dbUrl !== LOCAL_MONGO_URL) {
      console.warn("MongoDB Atlas connection failed. Falling back to local MongoDB...", err.message);
      await mongoose.connect(LOCAL_MONGO_URL);
      console.log("Connected to local MongoDB successfully!");
    } else {
      console.error("Failed to connect to MongoDB:", err);
    }
  }
}

main();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET || "tripospacesecretcode",
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("error in mongo session store", err);
});

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave :false,
  saveUninitialized :true, 
  cookie : {
    expires : Date.now() + 7*24*60*60*1000,
    maxAge :  7*24*60*60*1000,
    httpOnly : true,
  
  }
};




app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");
  res.locals.currUser = req.user;
  next();
});


// Custom flash messages – no extra packages needed
// app.use((req, res, next) => {
//   res.locals.messages = req.session.messages || [];
//   req.session.messages = []; // clear after use

//   req.flash = (type, message) => {
//     req.session.messages = req.session.messages || [];
//     req.session.messages.push({ type, message });
//   };

//   next();
// });

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.get("/privacy", (req, res) => {
  res.render("info/privacy.ejs");
});

app.get("/terms", (req, res) => {
  res.render("info/terms.ejs");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);



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

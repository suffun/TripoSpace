const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to TripoSpace!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderloginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  let redirectTo = res.locals.redirectUrl || "/listings";
  req.session.redirectUrl = null;
  req.flash("success", "Welcome Back to TripoSpace!");
  res.redirect(redirectTo);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out.");
    res.redirect("/listings");
  });
};

module.exports.toggleWishlist = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "Please log in to save to your wishlist" });
  }
  const { id } = req.params;
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (!user.wishlist) {
    user.wishlist = [];
  }

  const index = user.wishlist.findIndex((item) => item && item.toString() === id.toString());
  let isSaved = false;
  if (index > -1) {
    user.wishlist.splice(index, 1);
    isSaved = false;
  } else {
    user.wishlist.push(id);
    isSaved = true;
  }
  await user.save();
  return res.json({ success: true, isSaved, count: user.wishlist.length });
};

module.exports.renderWishlist = async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to view your wishlist!");
    return res.redirect("/login");
  }
  const user = await User.findById(req.user._id).populate({
    path: "wishlist",
    populate: { path: "reviews" },
  });
  res.render("users/wishlist.ejs", { wishlist: user.wishlist || [] });
};
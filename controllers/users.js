const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};


module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to TripoSpace");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };


  module.exports.renderloginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    // console.log("Login SUCCESS → redirecting to:", res.locals.redirectUrl || "/listings");

    let redirectTo = res.locals.redirectUrl || "/listings";
    req.session.redirectUrl = null;  // cleanup

    req.flash("success", "Welcome Back to TripoSpace!");
    res.redirect(redirectTo);
  };


  module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logout");
    res.redirect("/listings");
  });
};
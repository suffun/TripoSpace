const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
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
  }),
);

// routes/users.js or wherever

router.get("/login",  (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    // console.log("Login SUCCESS → redirecting to:", res.locals.redirectUrl || "/listings");

    let redirectTo = res.locals.redirectUrl || "/listings";
    req.session.redirectUrl = null;  // cleanup

    req.flash("success", "Welcome Back to TripoSpace!");
    res.redirect(redirectTo);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logout");
    res.redirect("/listings");
  });
});

module.exports = router;

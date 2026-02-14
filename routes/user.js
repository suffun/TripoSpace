const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const passport = require("passport"); 

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs")
});

router.post("/signup",wrapAsync(async(req,res) => {
    try {
        let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to TripoSpace");
    res.redirect("/listings"); 
    } catch(e){
         req.flash("danger", e.message);
         res.redirect("/signup");
    }
}));

router.get("/login",(req,res) => {
    res.render("users/login.ejs");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("danger", "Password or username is incorrect");
      return res.redirect("/login");
    }

    req.login(user, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome Back to TripoSpace");
      res.redirect("/listings");
    });

  })(req, res, next);
});

module.exports = router;
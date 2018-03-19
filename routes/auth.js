var express = require("express");
var router = express.Router();
var passport=require("passport");
var User = require("../models/user");
router.get("/",function(req,res){
    res.render("landing");
});
//register form
router.get("/register",function(req,res){
  res.render("register");
});
//post register info
router.post("/register",function(req,res){
  var newUser= new User({username:req.body.username});
  User.register(newUser, req.body.password,function(err,user){
    if(err){
      req.flash("error",err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success","Welcome! "+ user.username);
      res.redirect("/places");
    })
  })
});
//login form
router.get("/login",function(req,res){
  res.render("login");
});
//post login info
router.post("/login",passport.authenticate("local",
  {
    successRedirect:"/places",
    successFlash:"Welcome back!",
    failureFlash : true,
    failureRedirect:"/login"
  }),function(req,res){
    res.send("login");
});
//logout
router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Logged out successfully!")
  res.redirect("/places");
});
//middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
};
module.exports = router;

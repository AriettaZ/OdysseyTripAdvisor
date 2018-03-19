var express = require("express"),
    app =express(),
    bodyParser = require("body-parser"),
    mongoose=require("mongoose"),
    Place = require("./models/place"),
    Comment = require("./models/comment"),
    flash=require('connect-flash'),
    passport=require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    methodOverride = require("method-override"),
    port = process.env.PORT || 3000,
    url = process.env.DATABASEURL || "mongodb://localhost/trip_advisor_odyssey";
var commentRoutes = require("./routes/comments"),
    placeRoutes = require("./routes/places"),
    authRoutes = require("./routes/auth");
// seedDB();

mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
  secret:"meow",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use(authRoutes);
app.use("/places",placeRoutes);
app.use("/places/:id/comments",commentRoutes);

app.listen(port, function(){
  console.log('Our app is running on http://localhost:' + port);
})

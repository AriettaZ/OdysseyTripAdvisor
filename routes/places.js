var express = require("express");
var router = express.Router();
var  Place = require("../models/place");
var Comment = require("../models/comment");
var middleware=require('../middleware/');
router.get("/",function(req,res){
  Place.find({},function(err,allPlaces){
    if(err){
      console.log(err);
    }else{
      res.render("places/index",{places:allPlaces,currentUser:req.user});
    }
  })
    // res.render("places",{place:places});
});
router.post("/",middleware.isLoggedIn,function(req,res){
    var name =req.body.name;
    var image= req.body.image;
    var desc = req.body.description;
    var dangerLevel = req.body.dangerLevel;
    var author = {
      id:req.user._id,
      username:req.user.username
    }
    var newPlace = {name:name,image:image,description:desc,author:author,dangerLevel:dangerLevel}
    // places.push(newPlace);
    Place.create(newPlace,function(err,newCreated){
      if(err){
        console.log(err);
      }else{
        console.log(newCreated);
        res.redirect("/places");
      }
    });
});
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("places/new");
});

router.get("/:id",function(req,res){
  Place.findById(req.params.id).populate("comments").exec(function(err,FoundPlace){
    if(err){
      console.log(err);
    }else{
      res.render("places/show.ejs",{place:FoundPlace});
    }
  });
});

router.get("/:id/edit",middleware.checkPlaceOwnership, function(req,res){
  Place.findById(req.params.id,function(err,foundPlace){
    res.render("places/edit",{place:foundPlace});
  });
});

router.put("/:id",middleware.checkPlaceOwnership,function(req,res){
  Place.findByIdAndUpdate(req.params.id,req.body.place,function(err, updatedPlace){
    if(err){
      res.redirect("/places");
    }else{
      res.redirect("/places/"+ req.params.id);
    }
  })
})

//destory

router.delete("/:id",middleware.checkPlaceOwnership,function(req,res){
  Place.findByIdAndRemove(req.params.id,req.body.place,function(err, updatedPlace){
    if(err){
      res.redirect("/places");
    }else{
      res.redirect("/places/");
    }
  })
})

//middleware

module.exports=router;

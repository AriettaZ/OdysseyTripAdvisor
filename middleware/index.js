var middlewareObject={};
var Place = require("../models/place");
var Comment = require("../models/comment");
middlewareObject.checkCommentOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
      if(err){
        res.redirect("back");
      }else{
          if(foundComment.author.id.equals(req.user._id)){
            next();
          }else{
            res.redirect("back");
          }
          }
    });
  }else{
    req.flash("error","Sorry. You don't have permission to do that")
    res.redirect("back");
  }
}

middlewareObject.checkPlaceOwnership=function(req,res,next){
  if(req.isAuthenticated()){
    Place.findById(req.params.id,function(err,foundPlace){
      if(err){
        req.flash("error","Place not found!")
        res.redirect("back");
      }else{
          if(foundPlace.author.id.equals(req.user._id)){
            next();
          }else{
            req.flash("error","Sorry. You don't have permission to do that!")
            res.redirect("back");
          }
          }
    });
  }else{
    req.flash("error","You need to be logged in to do that!")
    res.redirect("back");
  }
}

middlewareObject.isLoggedIn=function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error","You need to be logged in to do that!")
  res.redirect("/login");
};
module.exports=middlewareObject;

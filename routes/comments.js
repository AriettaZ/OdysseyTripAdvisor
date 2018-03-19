var express = require("express");
var router = express.Router({mergeParams:true});
var  Place = require("../models/place");
var Comment = require("../models/comment");
var middleware=require('../middleware/index.js');
//new comment form
router.get("/new",middleware.isLoggedIn,function(req,res){
  Place.findById(req.params.id, function(err, place){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new",{place:place});
    }
  })
});
//create new comment
router.post("/",middleware.isLoggedIn,function(req,res){
  Place.findById(req.params.id, function(err, place){
    if(err){
      console.log(err);
      res.redirect("/places");
    }else{
      Comment.create(req.body.comment,function(err,comment){
        if(err){
          console.log(err);
        }else{
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          place.comments.push(comment._id);
          place.save();
          console.log(comment);
          console.log(place);
          req.flash("success","You created a comment successfully!")
          res.redirect('/places/'+place._id);
        }
      })
    }
  })
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
  Comment.findById(req.params.comment_id,function(err,foundComment){
    if(err){
      res.redirect("back");
    }else{
      res.render("comments/edit",{place_id:req.params.id,place_name:req.params.name,comment:foundComment})
    }
  })
})
//comments updated
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/places/"+req.params.id);
    }
  })
})
//comment destory router
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
  //findById
  Comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
      res.redirect("back");
    }else{
      res.redirect("/places/"+req.params.id);
    }
  })
})


module.exports = router;

var mongoose = require("mongoose");
var Place = require("./models/place");
var Comment = require("./models/comment");

var data=[{name: "Yellowstone National Park",image:"https://images.unsplash.com/photo-1499240713677-2c7a4f692044?auto=format&fit=crop&w=2850&q=80",description:"It's Yellowstone national park!!"},
                {name: "Yosemite National Park",image:"https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1350&q=80",description:"It's Yosemite National Park!!"},
                {name: "Arches National Park",image:"https://images.unsplash.com/photo-1507054799112-c049ad1ff1b7?auto=format&fit=crop&w=1267&q=80",description:"It's Arches National Park!!"} ];

function seedDB(){
  //remove places
  Place.remove({},function(err){
    if(err){
      console.log(err);
    }
    console.log("removed places!");
  });
  //add a few places
//   data.forEach(function(seed){
//     Place.create(seed,function(err,place){
//       if(err){
//         console.log(err);
//       }else{
//         console.log("added a place");
//         Comment.create({
//           text:"This place is great",
//           author:"Homer"
//         },function(err,comment){
//           if(err){
//             console.log(err);
//           }else{
//             place.comments.push(comment._id);
//             place.save();
//             console.log("created a new comment");
//           }
//         })
//       }
//     })
//   })
}

module.exports = seedDB;

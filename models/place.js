var mongoose=require("mongoose");
//schema setup
var placeSchema = new mongoose.Schema({
  name:String,
  image:String,
  dangerLevel:String,
  description:String,
  wiki:String,
  author:{
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    username:String,
  },
    comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }]
});
module.exports = mongoose.model("Place", placeSchema);
//

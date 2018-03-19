var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
var catSchema= new mongoose.Schema({
  name:String,
  age:Number,
  temperament:String
});
var Cat= mongoose.model("Cat",catSchema);
// var george=new Cat({
//   name:"Mrs. Norris",
//   age:7,
//   temperament:"Evil"
// });

// george.save(function(err,cat){
//   if(err){
//     console.log("Wrong");
//   }else{
//     console.log("We just saved!!")
//     console.log(cat);
//     console.log(george);
//   }
// });
// Cat.find({},function(err,cats){
//   if(err){
//     console.log("ohno");
//     console.log(err);
//   }else{
//     console.log(cats);
//   }
// });
Cat.find({},function(err,cats){
  if(err){
    console.log("ohno");
    console.log(err);
  }else{
    console.log(cats);
  }
});
Cat.create({
  name:"The cat",
  age:15,
  temperament:"Blend"
},function(err,cat){
    if(err){
      console.log("ohno");
      console.log(err);
    }else{
      console.log(cat);
    }
});

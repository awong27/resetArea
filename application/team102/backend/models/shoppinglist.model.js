const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shoppinglistSchema = new Schema(
  {
    itemName:{type:String,required:true},
    itemAmount:{type:String, required:true}
  }
);

const Shoppinglist = mongoose.model("Shoppinglist", shoppinglistSchema);

module.exports = Shoppinglist;

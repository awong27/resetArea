const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mealplanSchema = new Schema(
  {
    date:{type:String, required:true},
    restrictions:[{type:String}],
    mealType:{type: String, required:true},
    planCalories: { type: String},
    planCarbs: {type:String},
    planSugar:{type:String},
    planFat:{type:String},
    planProtein:{type:String},
    creator: {type:String, required:true},
    mealName:{type:String}
  }

);

const Mealplandata = mongoose.model("Mealplandata", mealplanSchema);

module.exports = Mealplandata;

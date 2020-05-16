const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mealplanSchema = new Schema(
  {
    date:{type:String},
    restrictions:[{type:String}],
    planCalories: {type: String},
    planCarbs: {type:String},
    planSugar:{type:String},
    planFat:{type:String},
    planProtein:{type:String},
    mealType: {type:String},
    creator: {type:String}
  }

);

const Mealplandata = mongoose.model("Mealplandata", mealplanSchema);

module.exports = Mealplandata;

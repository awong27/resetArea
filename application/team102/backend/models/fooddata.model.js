const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fooddataSchema = new Schema(
  {
    foodName: { type: String, required: true },
    expirationDate: { type: String, required: true },
    calories: { type: String, required: true },
    numOfItems: { type: String, required: true },
    creator: {type:String, required:true},
    carbs:{type:String, required:true},
    protein:{type:String, required:true},
    fat:{type:String,required:true},
    sugar:{type:String,required:true},
    sodium:{type:String,required:true}
  },
  {
    timestamp: true
  }
);

const Fooddata = mongoose.model("Fooddata", fooddataSchema);

module.exports = Fooddata;

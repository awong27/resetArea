const mongoose = require("mongoose");


const Schema = mongoose.Schema;



const dailynutritionSchema = new Schema(
  {
    date:{type:String,required:true},
    creator:{type:String, require:true},
    dailyCalories: {type:String},
    dailyCarbs: {type:String},
    dailyProtein:{type:String},
    dailyFat:{type:String},
    dailySugar:{type:String},
    dailyCholestrol:{type:String}

  }

);

const Dailynutritiondata = mongoose.model("Dailynutritiondata", dailynutritionSchema);

module.exports = Dailynutritiondata;

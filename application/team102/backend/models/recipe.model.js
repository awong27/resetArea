const mongoose = require("mongoose");


const Schema = mongoose.Schema;

var ingredientsSchema = new Schema({
  ingredientName:{type:String},
  ingredientAmount:{type:String}
}
);



const recipeSchema = new Schema(
  {
    recipeName: {type:String, required:true},
    creator: {type:String, required:true, unique:true},
    recipeImage: {type:String},
    access:{type:String},
    recipeCalories:{type:String},
    recipeCarbs:{type:String},
    recipeProtein:{type:String},
    recipeFat:{type:String},
    ingredients:[String],
    instruction:[String]

  }

);

const Recipedata = mongoose.model("Recipedata", recipeSchema);

module.exports = Recipedata;

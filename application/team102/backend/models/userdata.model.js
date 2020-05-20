const mongoose = require("mongoose");
//const shoppinglist = mongoose.model('ShoppingList');

const Schema = mongoose.Schema;



const userdataSchema = new Schema(
  {
    name: {type:String},
    username: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    //family:[String],
    familyName:{type:String},
    email:{type:String},
    //shoppingList:[ShoppingList: ShoppingList.schema],
    profilePic:{type:String},
    
    //receipts:[Reciepts:Reciepts.schema],
    //dailyNutrition:[DailyNutrition:DailyNutrition.schema],
    //recipes:[Recipes:Recipes.schema]

  }

);

const Userdata = mongoose.model("Userdata", userdataSchema);

module.exports = Userdata;

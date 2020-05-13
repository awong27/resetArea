const router = require("express").Router();
let Recipedata = require("../models/recipe.model");

router.route("/").get((req, res) => {
  Recipedata.find()
    .then(recipedata => res.json(recipedata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  const recipeName = req.body.recipeName;
  const recipeCalories = req.body.recipeCalories;
  const access = req.body.access;
  const recipeImage = req.body.recipeImage;
  const creator = req.body.creator;

  const recipeCarbs = req.body.recipeCarbs;
  const recipeProtein = req.body.recipeProtein;
  const recipeFat = req.body.recipeFat;
  const recipeSugar = req.body.recipeSugar;
  const ingredients =req.body.ingredients;
  const instructions = req.body.instructions;



  const newRecipe = new Recipedata({
    recipeCalories,
    recipeName,
    access,
    creator,
    recipeImage,
    recipeCarbs,
    recipeProtein,
    recipeFat,
    recipeSugar,
    creator,
    ingredients,
    instructions

  });

  newRecipe
    .save()
    .then(() => res.json("Food added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Recipedata.findById(req.params.id)
    .then(recipedata => res.json(recipedata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Recipedata.findByIdAndDelete(req.params.id)
    .then(() => res.json("Meal Plan deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Recipedata.findById(req.params.id)
    .then(recipedata => {

      recipedata.recipeCalories = req.body.recipeCalories;
      recipedata.recipeName = req.body.recipeName;
      recipedata.access = req.body.access;
      recipedata.creator=req.body.creator;
      recipedata.recipeImage= req.body.recipeImage;
      recipedata.recipeCarbs =req.body.recipeCarbs;
      recipedata.recipeProtein= req.body.recipeProtein;
      recipedata.recipeSugar= req.body.recipeSugar;
      recipedata.recipeFat= req.body.recipeFat;
      recipedata.ingredients = req.body.ingredients;
      recipedata.instructions = req.body.instructions;

      recipedata
        .save()
        .then(() => res.json("Food updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

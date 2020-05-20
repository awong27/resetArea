const router = require("express").Router();
let Fooddata = require("../models/fooddata.model");

router.route("/").get((req, res) => {
  Fooddata.find()
    .then(fooddata => res.json(fooddata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const foodName = req.body.foodName;
  const expirationDate = req.body.expirationDate;
  const calories = req.body.calories;
  const numOfItems = req.body.numOfItems;
  const creator = req.body.creator;
  const carbs = req.body.carbs;
  const protein = req.body.protein;
  const fat = req.body.fat;
  const sugar = req.body.sugar;
  const sodium = req.body.sodium;

  const newFood = new Fooddata({
    foodName,
    sodium,
    expirationDate,
    calories,
    numOfItems,
    creator,
    carbs,
    protein,
    fat,
    sugar
  });

  newFood
    .save()
    .then(() => res.json("Food added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Fooddata.findById(req.params.id)
    .then(fooddata => res.json(fooddata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Fooddata.findByIdAndDelete(req.params.id)
    .then(() => res.json("Food deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Fooddata.findById(req.params.id)
    .then(fooddata => {
      fooddata.foodName = req.body.foodName;
      fooddata.expirationDate = req.body.expirationDate;
      fooddata.calories = req.body.calories;
      fooddata.numOfItems = req.body.numOfItems;
      fooddata.creator = req.body.creator;
      fooddata.carbs = req.body.carbs;
      fooddata.protein= req.body.protein;
      fooddata.fat= req.body.fat;
      fooddata.sugar = req.body.sugar;
      fooddata.sodium= req.body.sodium;

      fooddata
        .save()
        .then(() => res.json("Food updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

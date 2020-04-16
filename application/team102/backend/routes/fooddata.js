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
  const date = new Date();

  const newFood = new Fooddata({
    foodName,
    expirationDate,
    calories,
    numOfItems,
    date
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
      fooddata.calories = Number(req.body.calories);
      fooddata.numOfItems = Number(req.body.numOfItems);
      fooddata.date = Date.parse(req.body.date);

      fooddata
        .save()
        .then(() => res.json("Food updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

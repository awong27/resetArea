const router = require("express").Router();
let Dailydata = require("../models/dailyNutrition.model");

router.route("/").get((req, res) => {
  Dailydata.find()
    .then(dailydata => res.json(dailydata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {


  const dailyCalories = req.body.dailyCalories;

  const creator = req.body.creator;
  const date= req.body.date;
  const dailyCarbs = req.body.dailyCarbs;
  const dailyProtein = req.body.dailyProtein;
  const dailyFat = req.body.dailyFat;
  const dailySugar = req.body.dailySugar;



  const newDailyNutrition = new Dailydata({
    dailyCalories,
    date,
    creator,

    dailyCarbs,
    dailyProtein,
    dailyFat,
    dailySugar,
    creator,

  });

  newDailyNutrition
    .save()
    .then(() => res.json("Food added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Dailydata.findById(req.params.id)
    .then(dailydata => res.json(dailydata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Dailydata.findByIdAndDelete(req.params.id)
    .then(() => res.json("Daily Nutirtion deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Dailydata.findById(req.params.id)
    .then(dailydata => {

      dailydata.dailyCalories = req.body.dailyCalories;

      dailydata.date = Date.parse(req.body.date);
      dailydata.creator=req.body.creator;

      dailydata.dailyCarbs =req.body.dailyCarbs;
      dailydata.dailyProtein= req.body.dailyProtein;
      dailydata.dailySugar= req.body.dailySugar;
      dailydata.dailyFat= req.body.dailyFat;

      dailydata
        .save()
        .then(() => res.json("Food updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

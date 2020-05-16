const router = require("express").Router();
let Mealplandata = require("../models/mealplan.model");

router.route("/").get((req, res) => {
  Mealplandata.find()
    .then(mealplandata => res.json(mealplandata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {


  const planCalories = req.body.planCalories;
  const restrictions = req.body.restrictions;
  const mealType = req.body.mealType;
  const creator = req.body.creator;
  const mealName = req.body.mealName;
  const planCarbs = req.body.planCarbs;
  const planProtein = req.body.planProtein;
  const planFat = req.body.planFat;
  const planSugar = req.body.planSugar;
  const date = req.body.date;



  const newMealPlan = new Mealplandata({
    planCalories,
    restrictions,
    creator,
    mealType,
    planCarbs,
    planProtein,
    planFat,
    planSugar,
    creator,
    mealName,
    date

  });

  newMealPlan
    .save()
    .then(() => res.json("Food added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Mealplandata.findById(req.params.id)
    .then(mealplandata => res.json(mealplandata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Mealplandata.findByIdAndDelete(req.params.id)
    .then(() => res.json("Meal Plan deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Mealplandata.findById(req.params.id)
    .then(mealplandata => {

      mealplandata.planCalories = req.body.planCalories;
      mealplandata.mealType = req.body.mealType;
      mealplandata.restrictions = req.body.restrictions;
      mealplandata.creator=req.body.creator;
      mealplandata.mealName = req.body.mealName;
      mealplandata.planCarbs =req.body.planCarbs;
      mealplandata.planProtein= req.body.planProtein;
      mealplandata.planSugar= req.body.planSugar;
      mealplandata.planFat= req.body.planFat;
      mealplandata.date = req.body.date;

      mealplandata
        .save()
        .then(() => res.json("Food updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

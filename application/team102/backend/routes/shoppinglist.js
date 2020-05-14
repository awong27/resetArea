const router = require("express").Router();
let Shoppingdata = require("../models/shoppinglist.model");

router.route("/").get((req, res) => {
  Shoppingdata.find()
    .then(shoppingdata => res.json(shoppingdata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {


  const listItem = req.body.listItem;




  const newShoppingList = new Shoppingdata({
    listItem


  });

  newShoppingList
    .save()
    .then(() => res.json("Shopping List Updated!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Shoppingdata.findById(req.params.id)
    .then(shoppinglistdata => res.json(shoppinglistdata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Shoppingdata.findByIdAndDelete(req.params.id)
    .then(() => res.json("Shopping List Item deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Shoppingdata.findById(req.params.id)
    .then(shoppinglistdata => {

      shoppinglistdata.listItem = req.body.listItem;



      shoppinglistdata
        .save()
        .then(() => res.json("Shopping List updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

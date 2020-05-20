const router = require("express").Router();
let Shoppingdata = require("../models/shoppinglist.model");

router.route("/").get((req, res) => {
  Shoppingdata.find()
    .then(shoppingdata => res.json(shoppingdata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {


  const itemName = req.body.itemName;

  const creator = req.body.creator;
  const status = req.body.status;




  const newShoppingList = new Shoppingdata({
    itemName,

    creator,
    status


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

      shoppinglistdata.itemName = req.body.itemName;

      shoppinglistdata.creator = req.body.creator;
      shoppinglistdata.status = req.body.status;



      shoppinglistdata
        .save()
        .then(() => res.json("Shopping List updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

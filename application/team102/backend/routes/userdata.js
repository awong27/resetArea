const router = require("express").Router();
const mongoose = require("mongoose");
let Userdata = require("../models/userdata.model");


router.route("/").get((req, res) => {
  Userdata.find()
    .then(userdata => res.json(userdata))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const familyName = req.body.familyName;
  const profilePic = req.body.profilePic;
  const email = req.body.email;


  const newUser = new Userdata({
    name,
    username,
    password,
    familyName,
    profilePic,
    email

  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Userdata.findById(req.params.id)
    .then(userdata => res.json(userdata))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/:id").delete((req, res) => {
  Userdata.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});


router.route("/update/:id").post((req, res) => {
  Userdata.findById(req.params.id)
    .then(userdata => {
      userdata.name = req.body.name;
      userdata.username = req.body.username;
      userdata.password = req.body.password;
      userdata.email = req.body.email;
      userdata.familyName = req.body.familyName;
      userdata.profilePic = req.body.profilePic;
      

      userdata
        .save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;

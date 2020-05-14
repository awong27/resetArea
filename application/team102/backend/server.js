const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const fooddataRouter = require("./routes/fooddata");
const userdataRouter = require("./routes/userdata");

const dailyRouter = require("./routes/dailyNutrition");
const mealplanRouter = require("./routes/mealplan");
const recipeRouter = require("./routes/recipedata");
const shoppingRouter = require("./routes/shoppinglist");



app.use("/userdata", userdataRouter);
app.use("/fooddata", fooddataRouter);

app.use("/dailyNutrition", dailyRouter);
app.use("/mealplan", mealplanRouter);
app.use("/recipedata", recipeRouter);
app.use("/shoppinglist", shoppingRouter);

// app.get("/", function(req, res, next) {
//   res.send("Hello world");
// });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

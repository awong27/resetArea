const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

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
const mealplanRouter = require("./routes/mealplan")

app.use("/fooddata", fooddataRouter);
app.use("/userdata", userdataRouter);
app.use("/mealplan", mealplanRouter;)

// app.get("/", function(req, res, next) {
//   res.send("Hello world");
// });
// if (process.env.NODE_ENV === "production") {
//   // Exprees will serve up production assets
//   app.use(express.static("client/build"));

//   // Express serve up index.html file if it doesn't recognize route
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
if (process.env.NODE_ENV === "production") {
  app.use("/build", express.static("../UI/build"));
}
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "UI", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


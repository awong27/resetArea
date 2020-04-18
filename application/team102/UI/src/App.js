import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Inventory from "./components/inventory.component";
import EditFoodData from "./components/edit-fooddata.component";
import CreateFood from "./components/create-food.component.js";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Inventory} />
        <Route path="/edit/:id" component={EditFoodData} />
        <Route path="/create" component={CreateFood} />
      </div>
    </Router>
  );
}

export default App;

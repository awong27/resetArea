import React, {useState} from 'react';
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Navi from "./Component/Navigation.js";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Component/About.js";
import inventory from "./Component/inventory.js";
import Home from "./Component/Home.js";
//import Register from "./Register.js";
import statistics from "./Component/Statistics.js";
import CreateFood from "./Component/create-food.component.js";

function App() {
  
  return (
    <div>
    <BrowserRouter>
    <Navi/>
    <div className="App">
        <Switch>
          <Route path="/Home" exact component={Home} />
          <Route path="/About" exact component={About} />
          <Route path="/inventory" exact component={inventory} />
          <Route path="/mealplan" exact component={mealplan} />
          <Route path="/statistics" exact component={statistics} />
          <Route path="/create" exact component={CreateFood}/>
        </Switch>
      </div>    
      </BrowserRouter>
    </div>
  );
}


const mealplan = () => <h1>Meal Plan<h2>Search for balanced meals</h2></h1>;
export default App;

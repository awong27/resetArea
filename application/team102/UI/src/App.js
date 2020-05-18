import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
//import Navi from "./Component/Navigation.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Component/About.js";
import SList from "./Component/ShoppingList.js";
import Inventory from "./Component/inventory.js";
import mealplan from "./Component/MealPlan.js";
import inRep from "./Component/RecipeInner.js"
import Recipe from "./Component/Recipe.js"
import Home from "./Component/Home.js";
import EditUser from "./Component/EditUser.js"
import SignIn from "./SignIn.js";
import SearchRecipe from "./Component/addRecipe.js";
import CreateFood from "./Component/create-fooddata.component.js";
import Scan from "./Component/Scan.js";
import FoodCard from "./Component/user-inventory.component.js";

function App() {
  /*
  * has all the routes
  */
  return (
    <div align="center">
      <BrowserRouter>
        <div className="Main">
          <Switch>
            
            <Route path="/Home/:id/:password" exact component={Home} />
<Route path="/Home/" exact component={Home} />
            <Route path="/EditUser" exact component={EditUser} />
            <Route path="/About" exact component={About} />

            <Route path="/SList/:id/:password" exact component={SList} />

            <Route path="/inventory/:id/:password" exact component={Inventory} />
            <Route path="/user-item/:id" component={FoodCard} />
            <Route path="/mealplan/:id/:password" exact component={mealplan} />

            <Route path="/Recipe/:id/:password" exact component={Recipe} />
            <Route path="/addRecipe/:id/:password/:search/:sugar/:fat/:carbs/:calories" exact component={SearchRecipe} />
            <Route path="/inRep/:id/:password/:recipeName" exact component={inRep} />

            <Route path="/create/:id/:password" exact component={CreateFood} />
            <Route path="/create" exact component={CreateFood} />
            <Route path="/Scan" exact component={Scan} />
            <Route path="/" exact component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
//<Redirect to="/login" /> force reload
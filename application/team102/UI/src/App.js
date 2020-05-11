import React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Component/About.js";
import SList from "./Component/ShoppingList.js";
import SHist from "./Component/ShoppingHistory.js";
import inventory from "./Component/inventory.js";
import mealplan from "./Component/MealPlan.js";
import inRep from "./Component/RecipeInner.js"
import Recipe from "./Component/Recipe.js"
import Home from "./Component/Home.js";
import EditUser from "./Component/EditUser.js"
import SignIn from "./SignIn.js";
import Statistics from "./Component/Statistics.js";
import StatWeekly from "./Component/StatWeekly.js";
import CreateFood from "./Component/create-fooddata.component.js";

function App() {
  /*
  * has all the routes
  */
    return (
      <div align="center">
      <BrowserRouter>
        <div className="Main">
          <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/Home/:id/:password" exact component={Home} />
            <Route path="/EditUser" exact component={EditUser} />
            <Route path="/About" exact component={About} />

            <Route path="/SList/:id/:password" exact component={SList} />
            <Route path="/SHist/:id/:password" exact component={SHist} />
            <Route path="/inventory/:id/:password" exact component={inventory} />

            <Route path="/mealplan/:id/:password" exact component={mealplan} />
            <Route path="/Recipe/:id/:password" exact component={Recipe} />
            <Route path="/inRep" exact component={inRep} />

            <Route path="/statistics" exact component={Statistics} />
            <Route path="/StatWeekly" exact component={StatWeekly} />
            <Route path="/create" exact component={CreateFood}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
//import Navi from "./Component/Navigation.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Component/About.js";
import SList from "./Component/ShoppingList.js";
import SHist from "./Component/ShoppingHistory.js";
import Inventory from "./Component/inventory.js";
import mealplan from "./Component/MealPlan.js";
import mealDay from "./Component/MealDay.js";
import inRep from "./Component/RecipeInner.js"
import Recipe from "./Component/Recipe.js"
import Home from "./Component/Home.js";
import EditUser from "./Component/EditUser.js"


import Statistics from "./Component/Statistics.js";
import StatWeekly from "./Component/StatWeekly.js";
import SearchRecipe from "./Component/addRecipe.js";
//import Nav2 from "./components/navbar.component";
//import Inventory from "./components/inventory.component";
//import EditFoodData from "./components/edit-fooddata.component";
import CreateFood from "./Component/create-fooddata.component.js";
import FoodCard from "./Component/user-inventory.component.js";

function App() {
  /** */
    //const[visibility,inVis] = useState(false);

    return (
      <div align="center">
      <BrowserRouter>
        <div className="Main">
          <Switch>



            <Route path="/Home/:id/:password" exact component={Home} />
            <Route path="/EditUser" exact component={EditUser} />
            <Route path="/About" exact component={About} />

            <Route path="/SList/:id/:password" exact component={SList} />
            <Route path="/SHist" exact component={SHist} />
            <Route path="/inventory/:id/:password" exact component={Inventory} />
            <Route path="/user-item/:id" component={FoodCard}/>
            <Route path="/mealplan/:id/:password" exact component={mealplan} />
            <Route path="/mealDay" exact component={mealDay} />

            <Route path="/Recipe/:id/:password" exact component={Recipe} />
            <Route path="/addRecipe/:id/:password/:search/:sugar/:fat/:carbs/:calories" exact component={SearchRecipe} />
            <Route path="/inRep/:id/:password/:recipeName" exact component={inRep} />

            <Route path="/Statistics/:id/:password" exact component={Statistics} />
            <Route path="/StatWeekly" exact component={StatWeekly} />
            <Route path="/create/:id/:password" exact component={CreateFood}/>


          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
//<Nav2/>
//<Route path="/" exact component={Inventory}/>
//<Route path="/edit/:id" exact component={EditFoodData}/>
export default App;

import React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
//import Navi from "./Component/Navigation.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./Component/About.js";
import SList from "./Component/ShoppingList.js";
import SHist from "./Component/ShoppingHistory.js";
import inventory from "./Component/inventory.js";
import mealplan from "./Component/MealPlan.js";
import mealDay from "./Component/MealDay.js";
import inRep from "./Component/RecipeInner.js"
import Recipe from "./Component/Recipe.js"
import Home from "./Component/Home.js";
import EditUser from "./Component/EditUser.js"
import Register from "./Register.js";
import Login from "./Login.js";
import Welcome from "./Welcome.js";
import Statistics from "./Component/Statistics.js";
import StatWeekly from "./Component/StatWeekly.js";
//import Nav2 from "./components/navbar.component";
//import Inventory from "./components/inventory.component";
//import EditFoodData from "./components/edit-fooddata.component";
import CreateFood from "./Component/create-fooddata.component.js";

function App() {
  /** */   
    //const[visibility,inVis] = useState(false);
    
    return (
      <div align="center">          
      <BrowserRouter>       
        <div className="Main">
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/Register" exact component={Register} />
            <Route path="/Login" exact component={Login} />

            <Route path="/Home" exact component={Home} />
            <Route path="/EditUser" exact component={EditUser} />
            <Route path="/About" exact component={About} />

            <Route path="/SList" exact component={SList} />
            <Route path="/SHist" exact component={SHist} />
            <Route path="/inventory" exact component={inventory} />

            <Route path="/mealplan" exact component={mealplan} />
            <Route path="/mealDay" exact component={mealDay} />

            <Route path="/Recipe" exact component={Recipe} />
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
//<Nav2/>
//<Route path="/" exact component={Inventory}/>
//<Route path="/edit/:id" exact component={EditFoodData}/>
export default App;

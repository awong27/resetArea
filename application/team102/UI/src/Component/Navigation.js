import React, { useState } from "react";
import {  
  Nav,
  NavItem,
  NavLink,
  Navbar
} from "reactstrap";
import './Nav.css';

//import navHome from './NavHome.png'
import navCart from './NavCart.png'
import navFridge from './NavFridge.png'
import navMeal from './NavMeal.png'
//import navPerson from './NavPerson.png'
import navRecipe from './recipeIcon.png'

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openTab,setTab] = useState(0);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  
  return (
     
    <Nav onScroll='fixed' fill='true'>
      <Navbar  fixed='bottom' color="light" className="navbar-light navbar-expand-sm" > 
         
      <NavItem onClick={()=> setTab(0)}>
        <NavLink href="/Recipe" active={openTab===0}>
          <img alt="Recipe" src ={navRecipe}/>
        </NavLink>
      </NavItem>

      <NavItem onClick={()=> setTab(1)}>
        <NavLink href="/mealplan" active={openTab===1}>
          <img alt="MealPlan" src ={navMeal}/> 
        </NavLink>
      </NavItem>

      <NavItem onClick={()=> setTab(2)}>
        <NavLink href="/SList" active={openTab===2}>
          <img alt="ShoppingList" src ={navCart}/>
        </NavLink>
      </NavItem>
            
      <NavItem onClick={()=> setTab(3)}>
        <NavLink href="/inventory/:id/:password" active={openTab===3}>
          <img alt="inv" src ={navFridge}/>
        </NavLink>
      </NavItem>
      </Navbar> 
    </Nav> 
  );
};

export default Navigation;

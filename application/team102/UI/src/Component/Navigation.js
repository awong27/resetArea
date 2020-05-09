import React, { useState } from "react";
import {  
  Nav,
  NavItem,
  NavLink,
  Navbar
} from "reactstrap";
import './Nav.css';

import navCart from './NavCart.png'
import navFridge from './NavFridge.png'
import navMeal from './NavMeal.png'
import navRecipe from './recipeIcon.png'

const Navigation = () => {
  const [openTab,setTab] = useState(0);
  
  return (
     
    <Nav onScroll='fixed' fill='true'>
      <Navbar  fixed='bottom' color="light" className="navbar-light navbar-expand-sm" > 
         
      <NavItem onClick={()=> setTab(0)}>
        <NavLink href="/Recipe" active={openTab===0}>
          <img alt="Recipe" src ={navRecipe} className="nav-pic"/>
        </NavLink>
      </NavItem>

      <NavItem onClick={()=> setTab(1)}>
        <NavLink href="/mealplan" active={openTab===1}>
          <img alt="MealPlan" src ={navMeal} className="nav-pic"/> 
        </NavLink>
      </NavItem>

      <NavItem onClick={()=> setTab(2)}>
        <NavLink href="/SList" active={openTab===2}>
          <img alt="ShoppingList" src ={navCart} className="nav-pic"/>
        </NavLink>
      </NavItem>
            
      <NavItem onClick={()=> setTab(3)}>
        <NavLink href="/inventory/:id/:password" active={openTab===3}>
          <img alt="inv" src ={navFridge} className="nav-pic"/>
        </NavLink>
      </NavItem>
      </Navbar> 
    </Nav> 
  );
};

export default Navigation;

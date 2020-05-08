import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar
} from "reactstrap";
import './Nav.css';

import navHome from './NavHome.png'
import navCart from './NavCart.png'
import navFridge from './NavFridge.png'
import navMeal from './NavMeal.png'
import navRecipe from './recipeIcon.png'

var Navigation = ({username,password}) => {
  console.log(username);
  console.log(password);
  //const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openTab,setTab] = useState(0);
  //const toggle = () => setDropdownOpen(!dropdownOpen);
  var home = "/Home/"+username+"/"+password
  var recipe = "/Recipe/"+username+"/"+password
  var slist = "/SList/"+username+"/"+password
  var inv = "/inventory/"+username+"/"+password
  var mealplan = "/mealplan/"+username+"/"+password


  return (

    <Nav onScroll='fixed' fill='true'>
      <Navbar  fixed='bottom' color="light" className="navbar-light navbar-expand-sm" >

      <NavItem onClick={()=> setTab(0)} >
        <NavLink href={home} active={openTab===0} >
          <img alt="Home" src ={navHome}/>
        </NavLink>
        </NavItem>

      <NavItem onClick={()=> setTab(2)}>
        <NavLink href={mealplan} active={openTab===1}>
          <img alt="MealPlan" src ={navMeal}/>
        </NavLink>
      </NavItem>

      <NavItem onClick={()=> setTab(2)}>
        <NavLink href={recipe} active={openTab===2}>
          <img alt="Recipe" src ={navRecipe}/>
        </NavLink>
      </NavItem>

      <NavItem onClick={()=> setTab(2)}>
        <NavLink href={slist} active={openTab===3}>
          <img alt="ShoppingList" src ={navCart}/>
        </NavLink>
      </NavItem>

      <NavItem onClick={()=> setTab(3)}>
        <NavLink href={inv} active={openTab===4}>
          <img alt="inv" src ={navFridge}/>
        </NavLink>
      </NavItem>
      </Navbar>
    </Nav>
  );
};

export default Navigation;

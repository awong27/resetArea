import React, { useState } from "react";
import {  
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Navbar
} from "reactstrap";
import './Nav.css';

import navHome from './NavHome.png'
import navCart from './NavCart.png'
import navFridge from './NavFridge.png'
import navMeal from './NavMeal.png'
import navPerson from './NavPerson.png'

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openTab,setTab] = useState(0);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  
  return (
     
    <Nav onScroll='fixed' fill='true'>
      <Navbar  fixed='bottom' color="light" className="navbar-light navbar-expand-sm" > 
         
      <NavItem onClick={()=> setTab(0)} >       
        <NavLink href="/Home" active={openTab===0} >  
          <img alt="Home" src ={navHome}/>           
        </NavLink>
        </NavItem>  
      
      <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle nav  active={openTab===1}>
          <img alt="MealPlan" src ={navMeal}/>            
        </DropdownToggle>
        <DropdownMenu>            
          <DropdownItem><NavLink href="/mealplan">Meal Plan</NavLink></DropdownItem>
          
          <DropdownItem><NavLink href="/mealplan">Recipes</NavLink></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
      <NavItem onClick={()=> setTab(2)}>
        <NavLink href="/SList" active={openTab===2}>
          <img alt="ShoppingList" src ={navCart}/>
        </NavLink>
      </NavItem>
            
      <NavItem onClick={()=> setTab(3)}>
        <NavLink href="/inventory" active={openTab===3}>
          <img alt="inv" src ={navFridge}/>
        </NavLink>
      </NavItem>
      
      <NavItem onClick={()=> setTab(4)}> 
        <NavLink  href="/statistics" active={openTab===4}>
          <img alt="Stats" src ={navPerson}/>
        </NavLink>
      </NavItem>   
      
      </Navbar> 
    </Nav> 
  );
};

export default Navigation;

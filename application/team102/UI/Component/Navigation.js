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
//import './Nav.css';

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <Nav >
      <Navbar fixed='bottom'> 
      
        <NavItem>
          <NavLink href="/Home"  active>
            <button>Home</button>
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            <button>Meal Plan</button>
          </DropdownToggle>
          <DropdownMenu>            
            <DropdownItem>Meal Plan</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Recipes</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink href="/create" ><button>Create</button></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/About" ><button>About</button></NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/inventory" ><button>Inventory</button></NavLink>
        </NavItem>
        <NavItem>
          <NavLink  href="/statistics" >
          <button>Statistics</button>
          </NavLink>
        </NavItem>
     
      </Navbar> </Nav>
    
  );
};

export default Navigation;

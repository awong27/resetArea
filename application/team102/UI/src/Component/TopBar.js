import React from "react";
import {  
  Nav,
  NavItem,
  NavLink,
  Navbar
} from "reactstrap";
import './Nav.css';

import Tphoto from "./thanos.png";

const TopBar = () => {
    
  return (
     
    <Nav onScroll='fixed' fill='true' className='d-block'>
      <Navbar  fixed='top' color="light"  > 
               
      <NavItem className="logo"><h1>DIRT</h1></NavItem>
      <NavItem/><NavItem/>
      <NavItem> 
        <NavLink href="/EditUser"><img alt="UserPic" src={Tphoto} className="userPic"/></NavLink>
      </NavItem>   
      
      </Navbar> 
    </Nav> 
  );
};

export default TopBar;

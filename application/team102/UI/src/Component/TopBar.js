import React from "react";
import {  
  Nav,
  NavItem,
  NavLink,
  Navbar
} from "reactstrap";
import './Nav.css';
import NavHome from "./Home.svg";
import Tphoto from "./thanos.png";

const TopBar = ({username,password}) => {
  console.log(username);
  console.log(password);
  /*
      * spaces items evenly
      * home button
      * 
      * user photo
      */
  var home = "/Home/"+username+"/"+password
  return (
     
    <Nav onScroll='fixed' fill='true' className='d-block'>
      <Navbar  fixed='top' color="light" href="Home/:id/:password" > 
      <NavItem>
        <NavLink href={home} >
          <img alt="Home" src ={NavHome} className="nav-pic"/> 
        </NavLink>
      </NavItem> 
      <NavItem/><NavItem/> 
      <NavItem ><h1>DIRT</h1></NavItem>
      <NavItem/><NavItem/>
      <NavItem> 
        <NavLink href="/EditUser"><img alt="UserPic" src={Tphoto} className="userPic"/></NavLink>
      </NavItem>   
      
      </Navbar> 
    </Nav> 
  );
};

export default TopBar;

import React, {Component} from 'react';
import Tphoto from "./thanos.png";
import { Container, Row, Col, NavLink} from "reactstrap";
import Navi from "./Navigation";
import Fphoto from "./fridgeIcomn.png";
import Mphoto from "./mealplanicon.png";
import Dphoto from "./plate.png";
import "./Home.css"

export default class Home extends Component{
    
  render() { 
    return (
      <div align = "center" > 
      <Container className="HomePage">       
        <Row><Col> 
          <NavLink href="/About"><img alt="UserPic" src={Tphoto} className="userPic"/></NavLink>
        </Col></Row>  
              
        <Row>
          <Col><NavLink href="/mealplan"><img alt="MealPlan" src={Mphoto} className="icons"/> </NavLink> </Col>
          <Col><NavLink href="/Statistics"><img alt="Stats" src={Dphoto} className="icons"/></NavLink> </Col>
          <Col><NavLink href="/inventory"><img alt="Inv" src={Fphoto} className="icons"/></NavLink></Col>
        </Row>  
        <Row>
          <Navi/> 
        </Row>            
      </Container>      
      
      </div>
    );
  }
}

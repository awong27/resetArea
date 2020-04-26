import React, {Component} from 'react';
import Tphoto from "./thanos.png";
import { Container, Row, Col, NavLink} from "reactstrap";
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import Fphoto from "./fridgeIcomn.png";
import Mphoto from "./mealplanicon.png";
import Dphoto from "./plate.png";
import "./Home.css"

export default class Home extends Component{
    
  render() { 
    return (
      <div align = "center" > <TopBar/> 
      <Container className="HomePage">  <br/>
        <Row><Col> 
          <NavLink href="/EditUser"><img alt="UserPic" src={Tphoto} className="userPic"/></NavLink>
        </Col></Row>  
              
        <Row>
          <Col><NavLink href="/mealplan"><img alt="MealPlan" src={Mphoto} className="icons"/> </NavLink> </Col>
          <Col><NavLink href="/Statistics"><img alt="Stats" src={Dphoto} className="icons"/></NavLink> </Col>
          <Col><NavLink href="/inventory"><img alt="Inv" src={Fphoto} className="icons"/></NavLink></Col>
        </Row>  
        <Row>
          <Col><p>Meal Plan</p> </Col>
          <Col><p>Statistics</p> </Col>
          <Col><p>Inventory</p> </Col>
        </Row>          
      </Container>      
      <Navi/> 
      </div>
    );
  }
}
/*<Row><Col xs='4'></Col><Col xs='4'></Col><Col>
          <Badge className="notiv" color="danger">4</Badge>
        </Col></Row> */
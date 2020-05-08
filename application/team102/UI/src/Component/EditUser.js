import React, {Component} from 'react';
import Tphoto from "./thanos.png";
import { Container, Row, Col, NavLink, Button} from "reactstrap";
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./Home.css"

export default class EditUser extends Component{

  render() {
    return (
      <div> <TopBar/>
      <Container className="HomePage">
        <Row><Col>
          <NavLink href="/About"><img alt="UserEdit" src={Tphoto} className="userEdit"/></NavLink>
        </Col><Col>
            <br/><br/><br/>
            <NavLink><p>Edit Photo</p></NavLink>
            <NavLink><p>Edit Name</p></NavLink>
            <NavLink><p>Settings</p></NavLink>
        </Col>
        </Row>

        <Row>
          <Col><NavLink href="/mealplan"><img alt="MealPlan" src={Tphoto} className="iconsUser"/> </NavLink> </Col>
          <Col><NavLink><p>Spouse</p></NavLink></Col>
          <Col><NavLink><p>Edit</p></NavLink></Col>
        </Row>
        <Row>
          <Col><NavLink href="/Statistics"><img alt="Stats" src={Tphoto} className="iconsUser"/></NavLink> </Col>
          <Col><NavLink><p>Child 1</p></NavLink></Col>
          <Col><NavLink><p>Edit</p></NavLink></Col>
        </Row>
        <Row>
          <Col><NavLink href="/inventory"><img alt="Inv" src={Tphoto} className="iconsUser"/></NavLink></Col>
          <Col><NavLink><p>Child 2</p></NavLink></Col>
          <Col><NavLink><p>Edit</p></NavLink></Col>
        </Row>
        <Row>
        <Col>
          <Button href="/" color="danger" >Sign Out</Button>
        </Col>
        </Row>
      </Container>
      <Navi/>
      </div>
    );
  }
}

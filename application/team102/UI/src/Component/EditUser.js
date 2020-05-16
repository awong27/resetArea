import React, { Component } from 'react';
import Tphoto from "./thanos.png";
import { Container, Row, Col, NavLink, Button, ListGroup, ListGroupItem } from "reactstrap";
import "./Home.css"

export default class EditUser extends Component {
  //pulls everything from user data  
  render() {
    return (
      <Container >
        <ListGroup className="profile">
          <ListGroupItem >
            <Row>
              <Col><NavLink href="/Home/:id/:password"> + </NavLink> </Col>
              <Col><h3>Profile</h3></Col><Col /><Col /><Col />
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <h4> Guest Name </h4>
              <Col />
              <Col><img alt="UserEdit" src={Tphoto} className="userEdit" /></Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <h5> Family </h5>
              <Col />
              <Col />
              <Col />
              <Col xs='1'> + </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col><img alt="UserEdit" src={Tphoto} className="userEdit" /></Col>
              <Col> Spouse </Col>
              <Col />
              <Col />
              <Col> Edit</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col><img alt="UserEdit" src={Tphoto} className="userEdit" /></Col>
              <Col> Child </Col>
              <Col />
              <Col />
              <Col> Edit</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <p> Add more people to your shared fridge, shopping list and recipies</p>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <h5> Diet Preferences </h5>
              <Col />
              <Col />
              <Col />
              <Col xs='1'> + </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <p>Lactose Intolerant</p>
            </Row>
          </ListGroupItem>

          <ListGroupItem >
            <Row>
              <h5> Notifications </h5>
              <Col />
              <Col />
              <Col />
              <Col xs='1'> > </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem><NavLink href="/about">
            <Row>
              <h5> About Us </h5>
              <Col />
              <Col />
              <Col />
              <Col xs='1'> > </Col>
            </Row> </NavLink>
          </ListGroupItem>
          <ListGroupItem >
            <Row>
              <h5> Settings </h5>
              <Col />
              <Col />
              <Col />
              <Col xs='1'> > </Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>
                <Button href="/" size="lg">Log Out</Button>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Container>
    );
  }
}

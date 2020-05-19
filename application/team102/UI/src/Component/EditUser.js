import React, {Component, useState } from 'react';
import Tphoto from "./thanos.png";

import { Container, Row, Col, NavLink, Button, ListGroup, ListGroupItem,
        Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input, FormText} from "reactstrap";

import "./Home.css"

const family = [ {name: "spouse"}, {name: "child"}];

const dietpreference = [{ pref: "Lactose Intolerant"}, {pref: "Vegan"}];

const familyCard = (fMember) => {
  return(
  <ListGroupItem>
    <Row>
      <Col><img alt="UserEdit" src={Tphoto} className="userEdit"/></Col>
      <Col> {fMember.name} </Col>
      <Col/>
      <Col/>
      <Col> Edit</Col>
    </Row>
  </ListGroupItem>
);
}

const dietCard = (pMember) => {
  return(
    <ListGroupItem>
      <Row>
        <p>{pMember.pref}</p>
      </Row>
    </ListGroupItem>
);
}

const familyRender = family.map((fMember) => familyCard(fMember));

const dietRender = dietpreference.map((pMember) => dietCard(pMember));



export default class EditUser extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      prefModal: false,
    };
    this.prefToggle = this.prefToggle.bind(this);
  }

  prefToggle() {
    const crntState = this.state.prefModal;
    this.setState({prefModal: !crntState}); }

  logout() {
    //set usrname to null
    //set token to null
  }

  //pulls everything from user data

  render() {
    return (
      <Container >

      <Modal isOpen={this.state.prefModal}>
        <ModalHeader>Add Preference</ModalHeader>
        <ModalBody>
          <Label for="newPreference">Preference:</Label>
          <Input type="preference" name="preference" id="newPreference" placeholder="Vegan, Lactose Intollerant, Immune to Fish, etc"/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.prefToggle}> Add </Button> {' '}
          <Button color="secondary" onClick={this.prefToggle}> Cancel </Button>
        </ModalFooter>
      </Modal>

        <ListGroup className="profile">
              <ListGroupItem >
                <Row>
                  <Col><NavLink href="/Home/:id/:password"> + </NavLink> </Col>
                  <Col><h3>Profile</h3></Col><Col/><Col/><Col/>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <h4> Guest Name </h4>
                  <Col></Col>
                  <Col><img alt="UserEdit" src={Tphoto} className="userEdit"/>
                  <br /><Button size="sm"> Edit Picture </Button></Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <h5> Family </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                  <Col xs='1'> + </Col>
                </Row>
              </ListGroupItem>

              {familyRender}


              <ListGroupItem>
                <Row>
                  <p> Add more people to your shared fridge, shopping list and recipies</p>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <h5> Diet Preferences </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                  <Button size='sm' onClick={this.prefToggle}> + </Button>
                </Row>
              </ListGroupItem>

              {dietRender}

              <ListGroupItem >
                <Row>
                  <h5> Notifications </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                  <Col xs='1'> > </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem><NavLink href="/about">
                <Row>
                  <h5> About Us </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                  <Col xs='1'> > </Col>
                </Row> </NavLink>
              </ListGroupItem>
              <ListGroupItem >
                <Row>
                  <h5> Settings </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                  <Col xs='1'> > </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>
                    <Button href="/" onClick={this.logout} size="lg">Log Out</Button>
                  </Col>
                </Row>
              </ListGroupItem>
        </ListGroup>


      </Container>

    );
  }
}

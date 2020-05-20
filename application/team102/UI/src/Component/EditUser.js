
import React, {Component, useState } from 'react';
import Tphoto from "./blankProfile.png";
import TopBar from "./TopBar";
import Bphoto from "./blankProfile.png"

import { Container, Row, Col, NavLink, Button, ListGroup, ListGroupItem,
        Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input, FormText} from "reactstrap";

import "./Home.css"

export default class EditUser extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      prefModal: false,
      userModal: false,
      tempName: "",
      family: [ {name: "spouse", id: 1}, {name: "child", id:2}],
      preferences: [{ pref: "Lactose Intolerant" , id: 1}, {pref: "Vegan", id: 2}],
    };
    this.prefToggle = this.prefToggle.bind(this);
    this.userToggle = this.userToggle.bind(this);
    this.onChangename = this.onChangename.bind(this);
    this.addFamily = this.addFamily.bind(this);
    //this.remFam = this.remFamily.bind(this);
    this.addPreference = this.addPreference.bind(this);
    this.remPref = this.remPref.bind(this);
  }

  onChangename(e) {
    this.setState({
      tempName: e.target.value
    });
  }

  addFamily(fMember) {
    let key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.setState({ tempName: "", family: [...this.state.family, {name: fMember, id: key}]});
  }

  addPreference(fMember) {
    let key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.setState({ tempName: "", preferences: [...this.state.preferences, {pref: fMember, id: key}]});
  }

   familyCard(fMember){
    return(
    <ListGroupItem style={{background: 'skyblue'}}>
      <Row>
        <Col><img alt="UserEdit" src={Bphoto} className="userEdit"/></Col>
        <Col> {fMember.name} </Col>
        <Col/>
        <Col/>
        <Button size="sm" onClick={() => this.remFamily(fMember.id)}>Remove</Button>
      </Row>
    </ListGroupItem>
  );
  }

   dietCard(pMember) {
    return(
      <ListGroupItem style={{background: 'skyblue'}}>
        <Row>
          <Col><p>{pMember.pref}</p></Col>
          <Col/>
          <Button size="sm" onClick={() => this.remPref(pMember.id)}>Remove</Button>
        </Row>
      </ListGroupItem>
  );
  }

  prefToggle() {
    const crntState = this.state.prefModal;
    this.setState({prefModal: !crntState}); }

  userToggle() {
    const crntState = this.state.userModal;
    this.setState({userModal: !crntState}); }

  remPref(key) {
    let tempArr = this.state.preferences.filter(pref => pref.id !== key);
    this.setState({preferences: tempArr});
  }

  remFamily(key) {
    let tempArr = this.state.family.filter(pref => pref.id !== key);
    this.setState({family: tempArr});
  }

  logout() {
    //set usrname to null
    //set token to null
  }

  //pulls everything from user data

  render() {
    return (
      <div>
      <Container style={{background: 'lightblue'}}>
      <TopBar/>

      <Modal isOpen={this.state.prefModal}>
        <ModalHeader>Add Preference</ModalHeader>
        <ModalBody>
          <Label for="newPreference">Preference:</Label>
          <Input type="preference" name="preference" id="newPreference" placeholder="Vegan, Lactose Intollerant, Immune to Fish, etc"
          value={this.state.tempName}
          onChange={this.onChangename}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {this.prefToggle(); this.addPreference(this.state.tempName);}}> Add </Button> {' '}
          <Button color="secondary" onClick={this.prefToggle}> Cancel </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.userModal}>
        <ModalHeader>Add Family</ModalHeader>
        <ModalBody>
          <Label for="newPreference">Family Member Name: </Label>
          <Input type="user" name="user" id="newUser" placeholder="Mary Jane, Peter Parker, etc"
          value={this.state.tempName}
          onChange={this.onChangename}/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {this.userToggle(); this.addFamily(this.state.tempName);}}> Add </Button> {' '}
          <Button color="secondary" onClick={this.userToggle}> Cancel </Button>
        </ModalFooter>
      </Modal>

        <ListGroup className="profile" >
              
              <ListGroupItem style={{background: 'lightblue'}}>
                <Row>
                  <h4> Guest Name </h4>
                  <Col></Col>
                  <Col><img alt="UserEdit" src={Tphoto} className="userEdit"/> </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem style={{background: 'lightblue'}}>
                <Row>
                  <h5> Family </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                  <Button size="sm" onClick={this.userToggle}> + </Button>
                </Row>
              </ListGroupItem>

              {this.state.family.map((pMember) => this.familyCard(pMember))}

              <ListGroupItem style={{background: 'lightblue'}}>
                <Row>
                  <p> Add more people to your shared fridge, shopping list and recipies</p>
                </Row>
              </ListGroupItem>

              <ListGroupItem style={{background: 'lightblue'}}>
                <Row>
                  <h5> Diet Preferences </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                  <Button size='sm' onClick={this.prefToggle}> + </Button>
                </Row>
              </ListGroupItem>

              {this.state.preferences.map((pMember) => this.dietCard(pMember))}

              <ListGroupItem style={{background: 'lightblue'}}>
                <Row>
                  <h5> Notifications </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                </Row>
              </ListGroupItem>
              <ListGroupItem style={{background: 'lightblue'}}><NavLink style={{color: "#4d4d4d"}} href="/about">
                <Row>
                  <h5> About Us </h5>
                  <Col/>
                  <Col/>
                  <Col/>
                </Row> </NavLink>
              </ListGroupItem>
              <ListGroupItem style={{background: 'lightblue'}}>
                <Row>
                  <Col>
                    <Button href="/" onClick={this.logout} size="lg">Log Out</Button>
                  </Col>
                </Row>
              </ListGroupItem>
        </ListGroup>


      </Container>
      </div>

    );
  }
}

import React, { Component } from 'react';
import { Button, Row, Col, ButtonGroup } from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";

export default class ShoppingHistory extends Component {

  //shopping history needs dates of prev shopping list and list
  // should be able to scroll search backwards
  // should be able to add any item to current shopping list

  render() {
    return (
      <div><TopBar username={this.state.username} password={this.state.password} /><br /><br /><br />
        <div><h1>Shopping History</h1></div>
        <div className="listItem">
          <Row><Col xs='1' /><h3>Feb 28, 2020</h3></Row>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Banana</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Beef Shank</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Kiwi</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Row><Col xs='1' /><h3>Mar 3, 2020</h3></Row>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Bread</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Tomato</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Row><Col xs='1' /><h3>Apr 13, 2020</h3></Row>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Banana</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Beef Shank</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Kiwi</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Row><Col xs='1' /><h3>May 23, 2020</h3></Row>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Bread</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
          <Button className="invBar"><Row>
            <Col xs='5' className="itemName">Tomato</Col><Col xs='4' /><Col>+</Col>
          </Row></Button>
        </div>
        <ButtonGroup size='lg'>
          <Button href="/SList">Add to Shopping List</Button>
        </ButtonGroup>
        <Navi username={this.state.username} password={this.state.password} />
      </div>
    )
  }
}

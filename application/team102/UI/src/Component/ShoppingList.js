import React, {Component} from 'react';
import {Button, Row, Col, Input} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 

export default class ShoppingList extends Component {
      
  render() {      
    return (
      /*
      * Shopping List Pulls info and displays as buttons
      *
      * 
      * 
      */
      <div><TopBar/><br/><br/><br/> <div className="midCon">
      <div><h1>Shopping List</h1></div>  
      <Row><Col xs='1'/><Col  align="centered"><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col><Col xs='1'/></Row>
      <div className="listItem">   
      <Button className="invBar"><Row>
        <Col className="itemName">Banana</Col><Col className="expire">3/15</Col><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Beef Shank</Col><Col className="expire">4/8</Col><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Kiwi</Col><Col className="expire">9/1</Col><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Bread</Col><Col className="expire">2/10</Col><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Tomato</Col><Col className="expire">6/24</Col><Col/><Col/>
      </Row></Button></div>
      
      </div>

      <Navi/>
      </div>
    )
  }
}
/*<ButtonGroup size='lg' >
        <Button href="/SHist">History</Button>
        <Button href="/create">New Item</Button>
        <Button href="/inventory">+ Inventory</Button>
      </ButtonGroup>
      */
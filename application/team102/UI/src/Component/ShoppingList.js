import React, {Component} from 'react';
import {Button, Row, Col, Input} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import "./inv.css";
import plusbtn from "./plus.svg"

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
        <p>Banana</p>
      </Row></Button>
      <Button className="invBar"><Row>
        <p>Beef Shank</p>
      </Row></Button>
      <Button className="invBar"><Row>
        <p>Kiwi</p>
      </Row></Button>
      <Button className="invBar"><Row>
        <p>Bread</p>
      </Row></Button>
      <Button className="invBar"><Row>
        <p>Tomato</p>
      </Row></Button></div>
      
      </div>
      <Button className="addbtn"><img alt="add" src={plusbtn} /></Button>
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
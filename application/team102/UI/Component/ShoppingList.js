import React, {useState, Component} from 'react';
import {Table, Button, Row, Col, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";

export default class ShoppingList extends Component {
    
  
  render() {      
    return (
      <div>
      <div><h1>Shopping List</h1></div>      
      <Button className="invBar"><Row>
        <Col/><Col className="itemName">Banana</Col><Col className="expire">3/15</Col><Col/><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col/><Col className="itemName">Beef Shank</Col><Col className="expire">4/8</Col><Col/><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col/><Col className="itemName">Kiwi</Col><Col className="expire">9/1</Col><Col/><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col/><Col className="itemName">Bread</Col><Col className="expire">2/10</Col><Col/><Col/><Col/>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col/> <Col className="itemName">Tomato</Col><Col className="expire">6/24</Col><Col/><Col/><Col/>
      </Row></Button>
      <ButtonGroup size='lg'>
        <Button href="/create">History</Button>
        <Button href="/create">Scan</Button>
        <Button href="/inventory">Add to Inventory</Button>
      </ButtonGroup>
      <Navi/>
      </div>
    )
  }
}

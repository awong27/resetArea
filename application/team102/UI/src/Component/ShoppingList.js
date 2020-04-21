import React, {Component} from 'react';
import {Button, Row, Col, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 

export default class ShoppingList extends Component {
      
  render() {      
    return (
      <div><TopBar/><br/><br/><br/>
      <div><h1>Shopping List</h1></div>   
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
      <ButtonGroup size='lg'>
        <Button href="/SHist">History</Button>
        <Button href="/create">New Item</Button>
        <Button href="/inventory">Move to Inventory</Button>
      </ButtonGroup>
      <Navi/>
      </div>
    )
  }
}

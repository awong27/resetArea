import React, {Component} from 'react';
import {Row, Col, Button, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import "./boxTabs.css";

export default class MealDay extends Component {
  render() {
    return (             
      <div className="full"> 
        <TopBar/> <br/><br/><br/>
        <div className="idk">
        <Row><Col><h1>Meal Plan</h1></Col></Row>
            
        <div className="tabBox">
            <Row>
                <Col><h1>Sunday</h1></Col><Col><Col></Col></Col>
            </Row>
            <Row>
            <Col></Col><Col></Col><Col><p>Calories</p></Col>      
            </Row>
            <Row>
            <Col><h3>Breakfast</h3></Col><Col><Col></Col></Col>      
            </Row>
            <Row>
            <Col><p>Cereal</p></Col><Col></Col><Col>235</Col>      
            </Row>
            <Row>
            <Col><p>Milk</p></Col><Col></Col><Col>54</Col>      
            </Row>
            <Row>
            <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>      
            </Row>
            <Row>
            <Col><p>Chicken Pot Pie</p></Col><Col></Col><Col>900</Col>      
            </Row>
            <Row>
            <Col><p>Soda</p></Col><Col></Col><Col>120</Col>      
            </Row>
            <Row>
            <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>      
            </Row>
            <Row>
            <Col><p>Corn Hen</p></Col><Col></Col><Col>608</Col>      
            </Row>
            <Row>
            <Col><p>Mashed Potatoes</p></Col><Col></Col><Col>348</Col>      
            </Row>
        </div> </div>
        <ButtonGroup size='lg'>
            <Button href="/mealplan">Edit</Button>    
            <Button href="/mealplan">Consume</Button>
        </ButtonGroup>
        
        <Navi/>          
      </div>  
    );
  }
}
  

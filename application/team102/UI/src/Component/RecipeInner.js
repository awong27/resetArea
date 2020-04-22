import React, {Component} from 'react';
import {Row, Col, Button, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import "./boxTabs.css";

export default class RecipeInner extends Component {
  render() {
    return (             
      <div className="full"> <TopBar/> <br/><br/><br/>
      <div className="idk">
      <Row><Col><h1>Recipes</h1></Col></Row>
           
      <div className="tabBox">
        <Row>
            <Col><h2>Recipe Type</h2></Col><Col><Col></Col></Col>
        </Row>
        <Row>
          <Col></Col><Col><Col></Col><p>Total Calories</p></Col>      
        </Row>
        <Row>
          <Col><p>Ingredients</p></Col><Col><Col></Col></Col>      
        </Row>
        <Row>
          <Col><p>Item 1</p></Col><Col><Col></Col></Col>      
        </Row>
        <Row>
          <Col><p>Item 2</p></Col><Col><Col></Col></Col>      
        </Row>
        <Row>
          <Col><p>Instructions</p></Col><Col><Col></Col></Col>      
        </Row>
        <Row>
          <Col><p>Step 1</p></Col><Col><Col></Col></Col>      
        </Row>
        <Row>
          <Col><p>Step 2</p></Col><Col><Col></Col></Col>      
        </Row>
      </div> </div>
      <Button href="/SList">Add to Shop List</Button>
      <ButtonGroup size='lg'>
        <Button href="/Recipe">Make Now</Button>    
        <Button href="/mealplan">Add to Meal Plan</Button>
      </ButtonGroup>      
      <Navi/>          
      </div>  
    );
  }
}
  
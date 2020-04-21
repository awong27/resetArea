import React, {Component} from 'react';
import {Container, Row, Col, Table,Input, Button, NavLink} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 

export default class MealPlan extends Component {
  render() {
    return (     
      <div><TopBar/>        
      <Container>  <br/><br/><br/>
      <Row><Col><h1>Meal Plan</h1></Col></Row>
      <Row><Col><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col></Row>
      <Row><Col><h2>Weekly Menu</h2></Col></Row>
      <Row><Table striped>
    <thead>
      <tr>
         <th>S</th> <th>M</th> <th>T</th> <th>W</th>
        <th>Th</th> <th>F</th> <th>S</th>
      </tr>
    </thead>
    <tbody>
      <tr>        
        <td>+</td> <td>+</td> <td>+</td>
        <td>+</td> <td>+</td> <td>+</td> <td>+</td>
      </tr>
      <tr>        
        <td>+</td> <td>+</td> <td>+</td>
        <td>+</td> <td>+</td> <td>+</td><td>+</td>
      </tr>
      <tr>
        <td>+</td> <td>+</td> <td>+</td>
        <td>+</td> <td>+</td> <td>+</td><td>+</td>
      </tr>      
      </tbody>
      </Table></Row> 
      <Row>
          <Col><h3> + Cheese Ravioli</h3></Col>
          <Col xs="2"></Col>
          <Col><h3> Total 4,183 cal</h3></Col>
        </Row>  
        <NavLink href="/mealDay"><Button size="lg">Daily Menu</Button></NavLink>                   
      </Container>
      <Navi/> 
      </div>       
    );
  }
}
  

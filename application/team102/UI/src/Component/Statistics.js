import React, { Component} from 'react';
import {Progress,Container, Row, Col, Table, Button, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 

export default class Statistics extends Component {
  render() {
    return (       
      <div>   <TopBar/><br/><br/><br/>
      <Container>
        <Row><Col><h1>Statistics</h1></Col></Row>
        <Row><Col>        </Col></Row>
        <Row> <Col xs="1"></Col>
        <Col> <Progress multi>
            <Progress bar value="15" />
            <Progress bar color="success" value="30" />
            <Progress bar color="info" value="25" />
            <Progress bar color="warning" value="20" />
            <Progress bar color="danger" value="5" />
            </Progress> 
        </Col> <Col xs="1"></Col>
        </Row>        
          
        <Row><Col xs="1"></Col>
        <Col><Table striped>      
      <tbody>
        <tr>
          <th scope="row">Calories</th>
          <td></td> <td>57,352</td>          
        </tr>
        <tr>
          <th scope="row">Fats</th>
          <td></td> <td>768 g</td>
        </tr>
        <tr>
          <th scope="row">Sodium</th>
          <td></td> <td>179 g</td>          
        </tr>
        <tr>
          <th scope="row">Protien</th>
          <td></td> <td>1,423 g</td>          
        </tr>
        <tr>
          <th scope="row">Fluids</th>
          <td></td> <td>15 gal</td>          
        </tr>
        </tbody>
        </Table></Col>
        </Row>   
        <ButtonGroup size='lg'>
          <Button href="/StatWeekly">Monthly</Button>
          <Button href="/Statistics">Daily</Button>
          <Button href="/StatWeekly">Weekly</Button>
        </ButtonGroup>                  
      </Container>    
      <Navi/>     
      </div>   
    );
  }
}
  
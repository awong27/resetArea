import React, {Component} from 'react';
import {Container, Row, Col, Input, Button} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 

export default class Recipe extends Component {
  render() {
    return (        
      <div><TopBar/> <br/><br/><br/>
      <Container> 
        <Row><Col><h1>Recipes</h1></Col></Row>
        <Row><Col><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col></Row>
        <Row><Button href='/inRep' className='bigdes'>Recipe 1</Button></Row>
        <Row><Button href='/inRep' className='bigdes'>Recipe 2</Button></Row>
        <Row><Button href='/inRep' className='bigdes'>Recipe 3</Button></Row>
        <Row><Button href='/inRep' className='bigdes'>Recipe 4</Button></Row>                  
      </Container>    
      <Navi/>  
      </div>        
    );
  }
}
  

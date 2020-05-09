import React, {Component} from 'react';
import {Container, Row, Col, Input, Card, CardImg} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import Tphoto from "./thanos.png";

export default class Recipe extends Component {
  render() {
    return (        
      <div><TopBar/> <br/><br/><br/>
      <Container className="fit-content"> 
        <Row><Col><h1>Recipes</h1></Col></Row>
        <Row><Col xs='1'/><Col><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col><Col xs='1'/></Row>
        <Row>
          <Card className="bigdes ">
            <CardImg alt="recipeItem" src={Tphoto}/>            
          </Card>  
        </Row>
        <Row>
          <Card className="bigdes ">
            <CardImg alt="recipeItem" src={Tphoto}/>            
          </Card>  
        </Row>
        <Row>
          <Card className="bigdes ">
            <CardImg alt="recipeItem" src={Tphoto}/>            
          </Card>  
        </Row>
        <Row>
          <Card className="bigdes ">
            <CardImg alt="recipeItem" src={Tphoto}/>            
          </Card>  
        </Row>
        <Row>
          <Card className="bigdes ">
            <CardImg alt="recipeItem" src={Tphoto}/>            
          </Card>  
        </Row>
        <Row>
          <Card className="bigdes ">
            <CardImg alt="recipeItem" src={Tphoto}/>            
          </Card>  
        </Row>                 
      </Container>    
      <Navi/>  
      </div>        
    );
  }
}
  
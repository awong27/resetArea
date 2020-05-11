import React, {Component} from 'react';
import {Container, Row, Col, Input, Card, CardImg} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import Tphoto from "./thanos.png";

export default class Recipe extends Component {
  constructor(props) {
    super(props);
  
    const {match:{params}} = this.props;
   
    this.state = {
      userdata: [],
      password:params.password,
      username:params.id
  
     };
  }
  render() {
    return (        
      <div><TopBar username={this.state.username} password={this.state.password}/> <br/><br/><br/>
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
      <Navi username={this.state.username} password={this.state.password}/>  
      </div>        
    );
  }
}
  
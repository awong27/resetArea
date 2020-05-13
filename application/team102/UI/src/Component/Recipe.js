import React, {Component} from 'react';
import {Container, Row, Col, Input, Card, CardImg, Form, FormGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import Tphoto from "./thanos.png";

//grabs recipe photo and name
const RecipeData = (props) => (
  <Row>
    <Card className="bigdes ">
      <CardImg alt="recipeItem" src={Tphoto}/>            
    </Card>  
  </Row>
);
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

  result() {
    return (
      <RecipeData/>
    );
  }
  restrictions() {
    return (
      <Form inline justified>
        <FormGroup>
          <Input type="select">
            <option>Calories</option>
            <option>250  Cal</option>
            <option>500  Cal</option>
            <option>750  Cal</option>
            <option>1000  Cal</option>
            <option>1500  Cal</option>
          </Input>
        </FormGroup> 
        <FormGroup>
          <Input type="select">
            <option>Fat</option>
            <option>Fat</option>
            <option>Fat</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select">
            <option>Carbs</option>
            <option>Carbs</option>
            <option>Carbs</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select">
            <option>Sodium</option>
            <option>Sodium</option>
            <option>Sodium</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select">
            <option>Sugar</option>
            <option>Sugar</option>
            <option>Sugar</option>
          </Input>
        </FormGroup>
      </Form>
    );
  }
  render() {
    return (        
      <div><TopBar username={this.state.username} password={this.state.password}/> <br/><br/><br/>
      <Container className="fit-content"> 
        <Row><Col><h1>Recipes</h1></Col></Row>
        <Row><Col xs='1'/><Col><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col><Col xs='1'/></Row>
        {this.restrictions()}
        {this.result()}
                
      </Container>    
      <Navi username={this.state.username} password={this.state.password}/>  
      </div>        
    );
  }
}
  
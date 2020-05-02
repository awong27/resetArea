import React, { Component} from 'react';
import {Button, Row, Col, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import axios from "axios";

const Fooddata = props => (  
  <Button className="invBar" ><Row>
    <Col className="itemName">{props.food.foodName}</Col>
    <Col className="expire">{props.food.expirationDate}</Col>
    
    <Col className="actions">{props.food.numOfItems}</Col>
    <Col><Button onClick={() => "/create" + props.food._id}>Edit</Button><Button onClick={() => {props.deleteItems(props.food._id);}}>Delete</Button></Col>
  </Row></Button>
);

export default class inventory extends Component {

  constructor(props) {
    super(props);

    this.deleteItems = this.deleteItems.bind(this);

    this.state = { fooddata: [] };
  }

  componentDidMount() {
    axios
      .get("/fooddata/")
      .then(response => {
        this.setState({ fooddata: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItems(id) {
    axios
      .delete("/fooddata/" + id)
      .then(res => console.log(res.data));
    this.setState({
      fooddata: this.state.fooddata.filter(el => el._id !== id)
    });
  }

  inventory() {
    const {match:{params}} = this.props;
    return this.state.fooddata.map(currentfood => {
      if(currentfood.creator===params.id){
        return (
          <Fooddata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
            />
          );}
    });
  }

  render() {      
    return (
      <div><TopBar/>
      <br/><br/><br/>
      <div><h1>Inventory</h1></div>     
      <Row>
        <Col>Item</Col>  
        <Col>Exp. Date</Col>  
        <Col>Qty</Col>  
        <Col>Actions</Col>        
      </Row> 
      {this.inventory()}
            
      <ButtonGroup size='lg'>
        <Button href="/create">Delete</Button>
        <Button href="/create">Scan</Button>
        <Button href="/create">Eat</Button>
      </ButtonGroup>
      <Navi/>
      </div>
    )
  }
}

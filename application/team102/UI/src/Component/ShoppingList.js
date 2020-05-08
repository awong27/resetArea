import React, {Component} from 'react';
import {Button, Row, Col, Input, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 

export default class ShoppingList extends Component {
      
  render() {      
    return (
      /*
      * Shopping List Pulls info and displays as buttons
      *
      * 
      * 
      */
      <div><TopBar/><br/><br/><br/> <div className="midCon">
      <div><h1>Shopping List</h1></div>  
      <Row><Col xs='1'/><Col  align="centered"><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col><Col xs='1'/></Row>
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
      <Buttoimport React, { Component} from 'react';
import {Table, Button, Row, Col, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import axios from "axios";

const Fooddata = props => (
  <div>
  <Button className="invBar"><Row>
<Col className="itemName">{props.food.itemName}</Col><Col className="expire">3/15</Col><Col className="quantity">{props.food.itemAmount}</Col><Col className="actions"></Col>
</Row></Button>
  <tr>
    <td>{props.food.itemName}</td>
    <td>{props.food.itemAmount}</td>

    <td>
      <Link to={"/edit/" + props.food._id}>edit</Link> |{" "}
      <a
        href="/create"
        onClick={() => {
          props.deleteItems(props.food._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
  </div>
);

export default class ShoppingList extends Component {

  constructor(props) {
    super(props);
    const {match:{params}} = this.props;
    this.deleteItems = this.deleteItems.bind(this);

    this.state = {
      userdata: [],
      shoppingList: [],
      username: params.id,
      password: params.password

     };
  }

  componentDidMount() {
    const {match:{params}}= this.props;

    axios
      .get("http://localhost:8080/userdata/")
      .then(response => {
        this.setState({ userdata: response.data });
        this.state.userdata.map(currentfood=>{
          if(currentfood.username==params.id){
            console.log(currentfood.username);
            this.setState({shoppingList:currentfood.shoppingList});
            console.log(currentfood.shoppingList);
          }
        })

      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItems(id) {
    axios
      .delete("http://localhost:8080/userdata/" + id)
      .then(res => console.log(res.data));
    this.setState({
      userdata: this.state.userdata.filter(el => el._id !== id)
    });
  }

  shoppinglist() {


    const {match:{params}} = this.props;
    return this.state.shoppingList.map(currentfood => {

        return (

          <Fooddata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
            />
          );
    });
  }

  render() {
    return (
      <div><TopBar/>
      <br/><br/><br/>
      <div><h1>Shopping List</h1></div>
      <Table hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Exp. Date</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.shoppinglist()}
        </tbody>
      </Table>

      <ButtonGroup size='lg'>
        <Button href="/create">Delete</Button>
        <Button href="/create">Scan</Button>
        <Button href="/create">Eat</Button>
      </ButtonGroup>
      <Navi username={this.state.username} password={this.state.password} />
      </div>
    )
  }
}
nGroup size='lg' >
        <Button href="/SHist">History</Button>
        <Button href="/create">New Item</Button>
        <Button href="/inventory">+ Inventory</Button>
      </ButtonGroup>
      </div>

      <Navi/>
      </div>
    )
  }
}

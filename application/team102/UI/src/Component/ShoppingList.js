import React, {Component} from 'react';
import {Button, Row, Col, Input, NavLink} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import "./inv.css";
import plusbtn from "./plus.svg"
import axios from "axios";
const Fooddata = props => (
/*  <tr>
  <td>
    <Link to = {"/user-item/"+ props.food._id}>{props.food.foodName}</Link>
    </td>
    <td>{props.food.expirationDate}</td>
    <td>{props.food.calories}</td>
    <td>{props.food.numOfItems}</td>
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
  </tr>*/  
  <Button className="invBar"><Row>
    <NavLink to = {"/user-item/"+ props.food._id}>{props.food.foodName}</NavLink>
  </Row></Button>

);

export default class inventory extends Component {

  constructor(props) {
    super(props);

    this.deleteItems = this.deleteItems.bind(this);
    const {match:{params}} = this.props;
    this.state = {
      fooddata: [],
      username: params.id,
      password: params.password
      };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/fooddata/")
      .then(response => {
        this.setState({ fooddata: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItems(id) {
    axios
      .delete("http://localhost:8080/fooddata/" + id)
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
        );
      }
      return (null);
    });
  }

  render() {
    return (
      /*
      * Shopping List Pulls info and displays as buttons
      * 
      * 
      * 
      */
      <div><TopBar username={this.state.username} password={this.state.password}/><br/><br/><br/> <div className="midCon">
      <div><h1>Shopping List</h1></div>  
      <Row><Col xs='1'/><Col  align="centered"><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col><Col xs='1'/></Row>
      <div className="listItem">   
        {this.inventory()}      
      </div>
      
      </div>
      <Button className="addbtn"><img alt="add" src={plusbtn} /></Button>
      <Navi username={this.state.username} password={this.state.password}/>
      </div>
    )
  }
}
/*<ButtonGroup size='lg' >
        <Button href="/SHist">History</Button>
        <Button href="/create">New Item</Button>
        <Button href="/inventory">+ Inventory</Button>
      </ButtonGroup>
      */
import React, {Component} from 'react';
import {Container, Row, Col, Table,Input, Button, NavLink} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import axios from "axios";

const Fooddata = props => (
  <tr>
  <td>{props.food.mealName}</td>
    <td>{props.food.date}</td>
    <td>{props.food.planCalories}</td>
    <td>{props.food.planCarbs}</td>
    <td>{props.food.planProtein}</td>
    <td>{props.food.planFat}</td>
    <td>{props.food.planSugar}</td>
    <td>{props.food.creator}</td>
    <td>{props.food.restrictions}</td>
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
);

export default class mealplan extends Component {

  constructor(props) {
    super(props);
    const {match:{params}} = this.props;
    this.deleteItems = this.deleteItems.bind(this);

    this.state = {
      fooddata: [],
      username: params.id,
      password: params.password
     };
  }

  componentDidMount() {
    const {match:{params}} = this.props;

    axios
      .get(`http://localhost:8080/mealplan/${params.id}`)
      .then(response => {
        this.setState({ fooddata: response.data });
        console.log(this.state.fooddata);
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItems(id) {
    axios
      .delete("http://localhost:8080/mealplan/" + id)
      .then(res => console.log(res.data));
    this.setState({
      fooddata: this.state.fooddata.filter(el => el._id !== id)
    });
  }

  inventory() {
    const {match:{params}} = this.props;
    return this.state.fooddata.map(currentfood => {
      if(currentfood.creator==params.id){
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
    //var meal = this.state.fooddata[0];
    return (

      <div><TopBar/>
      <h1>{}</h1>
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
      <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

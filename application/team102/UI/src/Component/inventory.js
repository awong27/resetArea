import React, { Component} from 'react';
import {Table, Button, Row, Col, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import axios from "axios";

const Fooddata = props => (
  <tr>
    <td scope="row">{props.food.foodName}</td>
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
  </tr>
);

export default class inventory extends Component {

  constructor(props) {
    super(props);

    this.deleteItems = this.deleteItems.bind(this);

    this.state = { fooddata: [] };
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
    return (
      <div><TopBar/>
      <br/><br/><br/>
      <div><h1>Inventory</h1></div>
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
          {this.inventory()}
        </tbody>
      </Table>
      <div className="listItem">
      <Button className="invBar"><Row>
        <Col className="itemName">Banana</Col><Col className="expire">3/15</Col><Col className="quantity">4</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Beef Shank</Col><Col className="expire">4/8</Col><Col className="quantity">1</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Kiwi</Col><Col className="expire">9/1</Col><Col className="quantity">6</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Bread</Col><Col className="expire">2/10</Col><Col className="quantity">12</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Tomato</Col><Col className="expire">6/24</Col><Col className="quantity">3</Col><Col className="actions"></Col>
      </Row></Button></div>
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

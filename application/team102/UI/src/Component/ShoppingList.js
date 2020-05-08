import React, { Component} from 'react';
import {Table, Button, Row, Col, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
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
    <Col className="itemName"><Link to = {"/user-item/"+ props.food._id}>{props.food.foodName}</Link></Col><Col className="expire">3/15</Col><Col className="quantity">4</Col><Col className="actions"></Col>
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

      </Table>
      <div className="listItem">

      {this.inventory()}

</div>
      <ButtonGroup size='lg'>
        <Button href="/create">Delete</Button>
        <Button href="/create">Scan</Button>
        <Button href="/create">Eat</Button>
      </ButtonGroup>



      <Navi username={this.state.username} password={this.state.password}/>
      </div>
    )
  }
}

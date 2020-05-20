import React, { Component } from 'react';
import { Button, Row, Col, Input, NavLink, Form, FormGroup } from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./inv.css";
import plusbtn from "./plus.svg"
import axios from "axios";
const Shoppingdata = props => (
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
  <Row className='invBar histlist' >
    <Col xs='1' /><Col ><h4>{props.food.itemName}</h4> </Col>
    <Button className="S-btn" onClick={() => { props.toggleItems(props.food._id, props.food.itemAmount, props.food.itemName, props.food.status); }}>X</Button><Col xs='1' />
  </Row>

);

const ShoppingHist = props => (
  <Row className='invBar histlist' >
    <Col xs='1' /><Col ><h4>{props.food.itemName}</h4> </Col>
    <Button className="S-btn" onClick={() => { props.toggleItems(props.food._id, props.food.itemAmount, props.food.itemName, props.food.status); }}>+</Button><Col xs='1' />
  </Row>

);

export default class ShoppingList extends Component {

  constructor(props) {
    super(props);

    this.onChangeItemName = this.onChangeItemName.bind(this);
    this.onChangeItemAmount = this.onChangeItemAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.toggleItems = this.toggleItems.bind(this);
    const { match: { params } } = this.props;
    this.state = {
      shopdata: [],
      check: 1,
      username: params.id,
      password: params.password,
      newItemName: "",
      newItemAmount: "",
      removedItem: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/shoppinglist/")
      .then(response => {
        this.setState({ shopdata: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  toggleItems(id, itemAmount, itemName, status) {
    var stat;
    if (status == "past") {
      stat = "current"
    } else {
      stat = "past"
    }
    const removed = {
      itemName: itemName,

      status: stat,
      creator: this.state.username
    }
    axios
      .post("http://localhost:8080/shoppinglist/update/" + id, removed)
      .then(res => {
        console.log(res.data)
        window.location.reload()
      })
      .catch(error => {
        console.log(error);
      });
  }
  onChangeItemName(e) {
    this.setState({
      newItemName: e.target.value
    })
  }
  onChangeItemAmount(e) {
    this.setState({
      newItemAmount: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const item = {
      itemName: this.state.newItemName,
      creator: this.state.username,
      status: "current"
    };
    var flag = false;
    console.log(item)
    this.state.shopdata.map(curr => {
      if (item.itemName === curr.itemName && item.creator === curr.creator) { return flag = true; }
    })
    if (flag === false) {
      axios
        .post("http://localhost:8080/shoppinglist/add", item)
        .then(res => console.log(res.data));
      var list = this.state.shopdata;
      list.push(item);
      this.setState({ shopdata: list });
      window.location.reload();
    }
  }

  shopList() {
    const { match: { params } } = this.props;
    return this.state.shopdata.map(currentfood => {
      if (currentfood.creator === params.id && currentfood.status == "current") {
        return (
          <Shoppingdata
            food={currentfood}
            toggleItems={this.toggleItems}
            key={currentfood._id}
          />
        );
      }
      return (null);
    });
  }

  shopHist() {
    const { match: { params } } = this.props;
    return this.state.shopdata.map(currentfood => {
      if (currentfood.creator === params.id && currentfood.status == "past") {
        return (
          <ShoppingHist
            food={currentfood}
            toggleItems={this.toggleItems}
            key={currentfood._id}
          />
        );
      }
      return (null);
    });
  }
  /*
    inventory() {
      const { match: { params } } = this.props;
      return this.state.fooddata.map(currentfood => {
        if (currentfood.creator === params.id) {
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
  */
  render() {
    return (
      /*
      * Shopping List Pulls info and displays as buttons
      * should be able to see main list and sublist at the bottom
      * need main user and sub users id
      *
      * needs to grab date when list is clear and send to shopping history
      *
      * scan to match list with what was bought and populate with values
      * bring up things not grabbed by scan but on shopping list
      */
      <div><TopBar username={this.state.username} password={this.state.password} /> <div className="midCon">
        <div><h1>Shopping List</h1></div>

        <Form justified onSubmit={this.onSubmit}>
          <FormGroup >
            <Row>
              <Input
                type="text"
                required
                style={{ width: '70vw' }}
                placeholder="New Item Name"
                value={this.state.newItemName}
                onChange={this.onChangeItemName} />

              <Input
                type="submit"
                style={{ width: '30vw' }}
                value="Add"
                className="btn btn-secondary"
              /></Row></FormGroup></Form>

        <h3>Current Items</h3>
        <div className="listItem">
          {this.shopList()}
        </div>
        < h3>Past Shopping Items</h3>
        <div className="listItem">
          {this.shopHist()}
        </div>
      </div>
        <Navi username={this.state.username} password={this.state.password} />
      </div>
    )
  }
}

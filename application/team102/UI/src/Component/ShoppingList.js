import React, { Component } from 'react';
import { Button, Row, Col, Input, Form, FormGroup,
  Modal, ModalHeader, ModalBody,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./inv.css";
import plusbtn from "./plus.svg"
import axios from "axios";
import classnames from 'classnames';
const Fooddata = props => (
  <Row className="invBar" >
    <Col xs='1' /><h4>{props.food.foodName}</h4> <Col></Col>
    <Button className="S-btn" onClick={() => { props.deleteItems(props.food._id); props.onSubmit(props.food._id); }}>X</Button><Col xs='1' />
  </Row>
);
const HList = props => (
  <Row className='histlist' >
    <h4>{props.food.foodName}</h4> <Col></Col>
    <Button className="S-btn" onClick={() => { props.onSubmit(props.food._id); }}>+</Button>
  </Row>
);
export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAddHist = this.onAddHist.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.toggle = this.toggle.bind(this);
    this.pop = this.pop.bind(this);
    const { match: { params } } = this.props;
    this.state = {
      fooddata: [],
      histData: [],
      username: params.id,
      password: params.password,
      modal: false,
      dropdown: false,
      searches: "",
    };
  }
  toggle() { this.setState({ modal: !this.state.modal }) }
  pop() { this.setState({ dropdown: !this.state.dropdown }) }
  onChangeSearch(e) { this.setState({ searches: e.target.value }); }
  // addHist should add current Shopping List to history and empty fooddata list
  onAddHist() {
    this.setState({
      histData: [this.state.fooddata, this.state.histData],
      fooddata: []
    });
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
      histData: [id, this.state.histData],
      fooddata: this.state.fooddata.filter(el => el._id !== id)
    });
  }
  /** adds items to the list */
  onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/fooddata/add", e.target.value)
      .then(res => console.log(res.data));
    this.setState({
      fooddata: [e.target.value, this.state.fooddata]
    });
  }
  /** display current shopping list */
  inventory() {
    const { match: { params } } = this.props;
    return this.state.fooddata.map(currentfood => {
      if (currentfood.creator === params.id) {
        return (
          <Fooddata
            food={currentfood}
            deleteItems={this.deleteItems}
            onSubmit={this.onSubmit}
            key={currentfood._id}
          />
        );
      }
      return (null);
    });
  }
  /** displays history list add-able items to current shopping list*/
  History() {
    const { match: { params } } = this.props;
    return this.state.fooddata.map(currentfood => {
      if (currentfood.creator === params.id) {
        return (
          <HList
            food={currentfood}
            onSubmit={this.onSubmit}
            key={currentfood._id}
          />
        );
      }
      return (null);
    });
  }
  /** submit form for search bar */
  Add() {
    return (
      <Form justified onSubmit={this.onSubmit}>
        <FormGroup>
          <Row>
            <Input
              type="text"
              placeholder="Search"
              style={{ width: '70vw' }}
              required
              className="form-control"
              value={this.state.searches}
              onChange={this.onChangeSearch}
            /> <Input
              type="submit"
              style={{ width: '30vw' }}
              value="Add Item"
              className="btn btn-secondary"
            /></Row>
        </FormGroup>
      </Form>
    )
  }
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
      <div><TopBar username={this.state.username} password={this.state.password} /><div className="midCon">
        <h1>Shopping List</h1></div>
        {this.Add()}
        <div className="listItem">
          {this.inventory()}
        </div>
        <ButtonDropdown direction="up" isOpen={this.state.dropdown} toggle={() => this.pop()}>
          <DropdownToggle className="addbtn">
            <img alt="add" src={plusbtn} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.toggle()}>History</DropdownItem>
            <DropdownItem onClick={() => this.onAddHist()}>New List</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>

        <Modal isOpen={this.state.modal} toggle={() => this.toggle()} className={classnames}>
          <ModalHeader toggle={() => this.toggle()}><h3>History</h3></ModalHeader>
          <ModalBody>
            {this.History()}
          </ModalBody>
        </Modal>
        <Navi username={this.state.username} password={this.state.password} />
      </div>
    )
  }

}
/*<ButtonGroup size='lg' > onClick={() => { props.deleteItems(props.food._id); }}
        <Button href="/SHist">History</Button>
        <Button href="/create">New Item</Button>
        <Button href="/inventory">+ Inventory</Button>
      </ButtonGroup>


      {this.subInventory()}
      subInventory() {
    return (<>
      <h3>Hatchet</h3>
      <Row className="subBar">
        <Col xs='1'/><h3>Candy</h3><Col/><Button className="S-btn" >X</Button><Col xs='1'/>
      </Row>
    </>
    );
  }
      */

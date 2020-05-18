import React, { Component } from 'react';
import { Button, Row, Col, Input, NavLink } from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./inv.css";
import plusbtn from "./plus.svg"
import axios from "axios";
const Fooddata = props => (
  <Button className="invBar" ><Row>
    <NavLink to={"/user-item/" + props.food._id}>{props.food.foodName}</NavLink>
    <Button onClick={() => { props.deleteItems(props.food._id); }}>X</Button>
  </Row></Button>
);
const HList = props => (
  <Button className="invBar" ><Row>
    <NavLink to={"/user-item/" + props.food._id}>{props.food.foodName}</NavLink>
    <Button onClick={() => { props.deleteItems(props.food._id); }}>+</Button>
  </Row></Button>
);
export default class ShoppingList extends Component {

  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.onAddHist = this.onAddHist.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    const { match: { params } } = this.props;
    this.state = {
      fooddata: [],
      histData: [],
      username: params.id,
      password: params.password,
      modal: false,
    };
  }
  onToggle() { this.setState({ modal: !modal }) }
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
      fooddata: this.state.fooddata.filter(el => el._id !== id)
    });
  }

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
  History() {
    const { match: { params } } = this.props;
    return this.state.fooddata.map(currentfood => {
      if (currentfood.creator === params.id) {
        return (
          <HList
            food={currentfood}
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
      * should be able to see main list and sublist at the bottom
      * need main user and sub users id
      * 
      * needs to grab date when list is clear and send to shopping history
      * 
      * scan to match list with what was bought and populate with values
      * bring up things not grabbed by scan but on shopping list
      */
      <div><TopBar username={this.state.username} password={this.state.password} /><br /><br /><br /> <div className="midCon">
        <h1>Shopping List</h1></div> <Button onClick={this.onAddHist()}>New List</Button>
        <Row><Col xs='1' /><Col align="centered"><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col><Col xs='1' /></Row>
        <h3>Main</h3>
        <div className="listItem">
          {this.inventory()}
          {this.subInventory()}
        </div>
        <Button className="addbtn" onClick={this.onToggle()}><img alt="add" src={plusbtn} /></Button>
        <Modal isOpen={modal} toggle={this.onToggle()} className={className}>
          <ModalHeader toggle={this.onToggle()}><h3>History</h3></ModalHeader>
          <ModalBody>
            {this.History()}
          </ModalBody>
        </Modal>
        <Navi username={this.state.username} password={this.state.password} />
      </div>
    )
  }
  subInventory() {
    return (<>
      <h3>Hatchet</h3>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
      <Button className="subBar" ><Row>
        <NavLink>Ducks</NavLink>
        <Button>X</Button>
        <Button>+</Button>
      </Row></Button>
    </>
    );
  }
}
/*<ButtonGroup size='lg' >
        <Button href="/SHist">History</Button>
        <Button href="/create">New Item</Button>
        <Button href="/inventory">+ Inventory</Button>
      </ButtonGroup>
      */

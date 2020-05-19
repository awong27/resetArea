import React, { useState, Component } from 'react';
import {
  Container, Row, Col, NavLink, Table, TabPane,
  Nav, NavItem, TabContent, UncontrolledAlert, Button,
  ButtonGroup, Card, CardImg, CardText, CardBody,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./Home.css";
import classnames from 'classnames';
import axios from "axios";

import BarChart from "./BarChart.js"
import DoughnutChart from "./DoughnutChart.js"
const Recipedata = props => {
  const { className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <Card className="homeRep">
      <CardImg alt="recipeItem" onClick={toggle} src={props.food.recipeImage} />
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}><h3>{props.food.recipeName}</h3></ModalHeader>
        <ModalBody>
          <h4>Calories:{props.food.recipeCalories}</h4>
          <h4>Carbs:{props.food.recipeCarbs}</h4>
          <h4>Sugar:{props.food.recipeSugar}</h4>
          <h4>Protein:{props.food.recipeProtein}</h4>
          <h4>Fat:{props.food.recipeFat}</h4>
          <img alt={props.food.recipeName} src={props.food.recipeImage} height="50%" width="100%" />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup className="itemOptions">
            <Button onClick={() => { props.deleteItems(props.food.recipe_id); }}>
              <img alt="delete" />
            </Button>
            <Button>
              <CardText></CardText>
            </Button>
            <Button onClick={() => "/create" + props.food.recipe_id}>
              <img alt="eat" />
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
      <CardBody position='center'>
        <CardText>{props.food.recipeName}</CardText>
      </CardBody>
    </Card>
  );
}
const Fooddata = props => (
  <Row>
    <Col><p>{props.food.recipeName}</p></Col><Col></Col><Col>Calories: {props.food.recipeCalories}</Col><Col xs='1' />
  </Row>
);

export default class Home extends Component {

  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.deleteItems = this.deleteItems.bind(this);
    this.state = {
      userdata: [],
      password: params.password,
      username: params.id,
      fooddata: [],
      recipedata: [],
      today: new Date(Date.now()),
      date: "",
      activeTab: '1',
    };
    var date = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.today.getDate()).toString() + "/" + (this.state.today.getFullYear()).toString();
    this.state.date = date
    console.log(this.state.date)
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    axios
      .get(`http://localhost:8080/userdata/${params.id}`)
      .then(response => {
        this.setState({ userdata: response.data });
        console.log(this.state.userdata)
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
  notifications() {//need to query for expiring food in inv
    return (<>
      <UncontrolledAlert color="info">
        Expiring Soon
      </UncontrolledAlert>
    </>
    );
  }
  todaysMeals() {
    const { match: { params } } = this.props;
    axios
      .get("http://localhost:8080/mealplan/")
      .then(response => {
        this.setState({
          fooddata: response.data,
        });
      })
    return this.state.fooddata.map(currentfood => {
      if (currentfood.creator === params.id && currentfood.date === this.state.date) {
        return (
          <Fooddata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
          />
        );
      }
    });
  }
  myRecipes() {
    var count = 4;
    const { match: { params } } = this.props;
    axios
      .get("http://localhost:8080/recipedata/")
      .then(response => {
        this.setState({
          recipedata: response.data,
        });
      })
    return this.state.recipedata.map(currentfood => {
      if (currentfood.creator === params.id) {
        count = count - 1;
        console.log(count);
        if (count < 0) {
          return (null);
        }
        return (
          <Recipedata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
          />
        );
      }
    });
  }
  render() {
    const { match: { params } } = this.props;

    var inv = "/inventory/" + params.id + "/" + params.password;
    var stat = "/Statistics/" + params.id + "/" + params.password;
    var meal = "/mealplan/" + params.id + "/" + params.password;

    //console.log(user);
    /*
    * homepage should load with user data
    * there should be two tabs
    *   one for current statistics of user
    *   the other should have notifications of expiring items from inv
    *     current meal plan and recent recipes
    *     current meal plan should know the day and content
    * stats chart and table should be grabbing user data and populating
    */
    return (
      <div className="container"> <TopBar username={this.state.username} password={this.state.password} />
        <Container className="HomePage">
          <h2>Welcome, {this.state.username}</h2>
          {this.notifications()}
          <Nav tabs justified className="plan">
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }} >
                Today
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }} >
                Me
              </NavLink>
            </NavItem>

            <NavItem style={{ flex: 'auto' }}>
              <NavLink>{this.state.date}</NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <h3>Meal Plan For Today</h3>
              <Row className="homeRow">
                <Col>{this.todaysMeals()}</Col>

              </Row>
              <Row className="homeRow" >

                  {this.myRecipes()}

              </Row>
            </TabPane>
            <TabPane tabId="2">
              Statistics
              <Row>
                <DoughnutChart />
              </Row> <br />
              <Row>
                <BarChart />
              </Row><br /><br /><br />
            </TabPane>
          </TabContent>
        </Container>
        <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

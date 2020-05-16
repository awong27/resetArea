import React, {Component} from 'react';
import { Container, Row, Col, NavLink, Table, TabPane, Nav, NavItem, TabContent, UncontrolledAlert,Button} from "reactstrap";
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./Home.css";
import classnames from 'classnames';
import axios from "axios";
import {Pie, Doughnut} from 'react-chartjs-2';

const Fooddata = props => (

  <Row>
    <Col><p>{props.food.mealName}</p></Col><Col></Col><Col>Calories: {props.food.planCalories}</Col><Col xs='1'/>
  </Row>

);

const Recipedata = props => (

  <Row>
    <Col><p>{props.food.recipeName}</p></Col><Col></Col><Col>Calories: {props.food.recipeCalories}</Col><Col xs='1'/>
  </Row>

);


export default class Home extends Component{

  constructor(props) {
  super(props);

  const {match:{params}} = this.props;

  this.deleteItems = this.deleteItems.bind(this);

  this.state = {
    userdata: [],
    password:params.password,
    username:params.id,
    fooddata:[],
    recipedata:[],
    today: new Date(Date.now()),
    date:"",
    activeTab: '1',
    labels: ['Fats', 'Protein', 'Sugar',
           'Carbs', 'Sodium'],
    datasets: [
      {
        label: 'Nutrition',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: [65, 59, 80, 81, 56]
      }
    ]
   };
   var date = (this.state.today.getMonth()+1).toString()+"/"+(this.state.today.getDate()).toString()+"/"+(this.state.today.getFullYear()).toString();
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
    const {match:{params}} = this.props;

    //console.log({itemid});
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
  notifications() {
    return(<>
      <UncontrolledAlert color="info">
        Expiring Soon
      </UncontrolledAlert>
      <UncontrolledAlert color="info">
        Expiring Soon
      </UncontrolledAlert>
      <UncontrolledAlert color="info">
        Expiring Soon
      </UncontrolledAlert>
      </>
    );
  }
  todaysMeals(){
    const {match:{params}} = this.props;
    axios
      .get("http://localhost:8080/mealplan/")
      .then(response => {

        this.setState({
          fooddata: response.data,

         });



        })
        return this.state.fooddata.map(currentfood => {
          if(currentfood.creator===params.id && currentfood.date === this.state.date ){

            return (
              <Fooddata
                food={currentfood}
                deleteItems={this.deleteItems}
                key={currentfood._id}
                />
              );}

        });

  }
myRecipes(){
  var count = 4;
    const {match:{params}} = this.props;
    axios
      .get("http://localhost:8080/recipedata/")
      .then(response => {

        this.setState({
          recipedata: response.data,

         });



        })
        return this.state.recipedata.map(currentfood => {
          if(currentfood.creator===params.id ){
            count=count-1;
            console.log(count);
            if(count<0){
              return(null);
            }
            return (
              <Recipedata
                food={currentfood}
                deleteItems={this.deleteItems}
                key={currentfood._id}
                />
              );}


        });

  }

  render() {

    const {match:{params}} = this.props;

    var inv= "/inventory/"+params.id+"/"+params.password;
    var stat= "/Statistics/"+params.id+"/"+params.password;
    var meal="/mealplan/"+params.id+"/"+params.password;

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
      <div className="container"> <TopBar username={this.state.username} password={this.state.password}/>
      <Container className="HomePage">  <br/>
      <h2>Welcome, Person</h2>
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
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <h3>Meal Plan For Today</h3>
          <Row className="homeRow">
            <Col>{this.todaysMeals()}</Col>

          </Row>
          <Row className="homeRow">
            <Col className="homeSquare">
              <NavLink href="/Recipes/:id/:password">
              {this.myRecipes()}
              </NavLink>
            </Col>
        </Row>
        </TabPane>
        <TabPane tabId="2">
          Statistics
          <Row>
              <Pie
              data={this.state}
              options={{
                title:{
                  display:true,
                  text:'Daily Nutrition',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
          </Row><Row>
            <Doughnut
              data={this.state}
              options={{
                title:{
                  display:true,
                  text:'Daily Nutrition',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
          </Row>
          <Row><Col xs="1"></Col>
            <Col><Table striped>
            <tbody>
              <tr>
                <th scope="row">Calories</th>
                <td></td> <td>57,352</td>
              </tr>
              <tr>
                <th scope="row">Fats</th>
                <td></td> <td>768 g</td>
              </tr>
              <tr>
                <th scope="row">Sodium</th>
                <td></td> <td>179 g</td>
              </tr>
              <tr>
                <th scope="row">Protien</th>
                <td></td> <td>1,423 g</td>
              </tr>
              <tr>
                <th scope="row">Fluids</th>
                <td></td> <td>15 gal</td>
              </tr>
            </tbody>
            </Table></Col>
          </Row>
        </TabPane>
      </TabContent>
      </Container>
      <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

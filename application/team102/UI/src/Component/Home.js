import React, {Component} from 'react';
import { Container, Row, Col, NavLink, ListGroup, ListGroupItem, Badge, Table, TabPane, Nav, NavItem, TabContent} from "reactstrap";
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./Home.css";
import classnames from 'classnames';
import axios from "axios";
import {Pie, Doughnut} from 'react-chartjs-2';

export default class Home extends Component{

  constructor(props) {
  super(props);

  const {match:{params}} = this.props;

  this.deleteItems = this.deleteItems.bind(this);

  this.state = {
    userdata: [],
    password:params.password,
    username:params.id,
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
  console.log(params.id);
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

  render() {
    const {match:{params}} = this.props;
    console.log(this.state.username);
    console.log(this.state.password);


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
      <div align = "center" className="container"> <TopBar username={this.state.username} password={this.state.password}/>
      <Container className="HomePage">  <br/>
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
          <Row className="homeRow">
            <Col className="homeSquare">
            <h3>Notifications</h3>
            <ListGroup overflow="hidden">
              <ListGroupItem className="justify-content-between">2 Weeks <Badge pill>14</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expires Soon <Badge pill>2</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expired <Badge pill>1</Badge></ListGroupItem>
            </ListGroup>
            </Col>
            <Col className="homeSquare">
              <NavLink href="/mealplan">
                <h3>MealPlan</h3>
                <h3>Chicken Quesadilla</h3>
                <h3>Duck</h3>
                <h3>Rice and Beans</h3>
              </NavLink>            
            </Col>          
          </Row>   
          <Row className="homeRow">  
            <Col className="homeSquare">        
              <NavLink href="/Recipes">
                <h3>Recent Recipes</h3>
                <h3>Tiramisu</h3>
                <h3>PotPies</h3>
                <h3>Omelete</h3>
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

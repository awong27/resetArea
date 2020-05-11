import React, {Component} from 'react';
import { Container, Row, Col, NavLink, ListGroup, ListGroupItem, Badge} from "reactstrap";
import Navi from "./Navigation";
import TopBar from "./TopBar";
import "./Home.css";
import axios from "axios";

export default class Home extends Component{

  constructor(props) {
  super(props);

  const {match:{params}} = this.props;

  this.deleteItems = this.deleteItems.bind(this);

  this.state = {
    userdata: [],
    password:params.password,
    username:params.id


   };

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
    */
    return (
      <div align = "center" className="container"> <TopBar username={this.state.username} password={this.state.password}/>
      <Container className="HomePage">  <br/>

        <Row className="homeRow">
            <Col className="homeSquare">
            <h3>Notifications</h3>
            <ListGroup overflow="hidden">
              <ListGroupItem className="justify-content-between">2 Weeks <Badge pill>14</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expires Soon <Badge pill>2</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expired <Badge pill>1</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">2 Weeks <Badge pill>14</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expires Soon <Badge pill>2</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expired <Badge pill>1</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">2 Weeks <Badge pill>14</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expires Soon <Badge pill>2</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expired <Badge pill>1</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">2 Weeks <Badge pill>14</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expires Soon <Badge pill>2</Badge></ListGroupItem>
              <ListGroupItem className="justify-content-between">Expired <Badge pill>1</Badge></ListGroupItem>
            </ListGroup>
            </Col>
            <Col className="homeSquare">
              
            
            </Col>          
        </Row>

        <Row className="homeRow">
          <Col className="homeSquare">
            <NavLink href="/mealplan">
              <h3>MealPlan</h3>
              <h3>Chicken Quesadilla</h3>
              <h3>Duck</h3>
              <h3>Rice and Beans</h3>
            </NavLink>
          </Col>
          <Col className="homeSquare">
            <NavLink href="/Recipes">
              <h3>Recent Recipes</h3>
              <h3>Tiramisu</h3>
              <h3>PotPies</h3>
              <h3>Omelete</h3>
            </NavLink>
          </Col>          
        </Row>
      </Container>
      <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Container, Row, Col, NavLink, TabPane, Nav, NavItem, TabContent, Button } from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import classnames from 'classnames';
import "./mealplan.css";
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
      <NavLink to={"/edit/" + props.food._id}>edit</NavLink> |{" "}
      <NavLink href="/create" onClick={() => {props.deleteItems(props.food._id);}}>
        delete
      </NavLink>
    </td>
  </tr>
);
export default class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    const { match: { params } } = this.props;
    this.deleteItems = this.deleteItems.bind(this);

    this.state = {
      fooddata: [],
      username: params.id,
      password: params.password,
      activeTab: '1'
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
    const { match: { params } } = this.props;
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
  render() {
    /*
    * grabs mealplan data
    * populates tabs of the week with breakfast lunch dinner
    * grabs recipe data and inv data for calories
    * summates total calories at the top
    * should keep track of each day and time
    * data should be sent to userdata for stats
    * 
    * need to find a way to add recipies to it either by id or tag
    * need to store days by calendar id to pull by day
    * refactor by week to show prev week's meals
    * should also load which day it is and load that as active
    */
    return (
      <div className="container"><TopBar username={this.state.username} password={this.state.password} />
        <Container>  <br /><br /><br />
          <Row><Col><h1>Meal Plan</h1></Col></Row>
          <Nav tabs justified className="plan">
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }} >
                Sun
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }} >
                Mon
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }} >
                Tue
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '4' })}
                onClick={() => { this.toggle('4'); }} >
                Wed
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '5' })}
                onClick={() => { this.toggle('5'); }} >
                Thu
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '6' })}
                onClick={() => { this.toggle('6'); }} >
                Fri
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '7' })}
                onClick={() => { this.toggle('7'); }} >
                Sat
          </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col></Col><Col><p>Calories</p></Col><Col></Col>
              </Row>
              <Row>
                <Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <Row>
                <Col><p>Cereal</p></Col><Col></Col><Col>235</Col><Button>X</Button><Col xs='1' />
              </Row>
              <Row>
                <Col><p>Milk</p></Col><Col></Col><Col>54</Col><Button>X</Button><Col xs='1' />
              </Row>
              <Row>
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <Row>
                <Col><p>Chicken Pot Pie</p></Col><Col>900</Col><Col></Col><Button>X</Button>
              </Row>
              <Row>
                <Col><p>Soda</p></Col><Col>120</Col><Col></Col><Button>X</Button>
              </Row>
              <Row>
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <Row>
                <Col><p>Corn Hen</p></Col><Col>608</Col><Col><Button>X</Button></Col>
              </Row>
              <Row>
                <Col><p>Mashed Potatoes</p></Col><Col>348</Col><Col><Button>X</Button></Col>
              </Row>
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="2">
              <h3>Total Calories: 3,431</h3>
              <Row />
              <Row><h3>Breakfast</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Lunch</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Dinner</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="3">
              <h3>Total Calories: 0</h3>
              <Row />
              <Row><h3>Breakfast</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Lunch</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Dinner</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="4">
              <h3>Total Calories: 0</h3>
              <Row />
              <Row><h3>Breakfast</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Lunch</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Dinner</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="5">
              <h3>Total Calories: 0</h3>
              <Row />
              <Row><h3>Breakfast</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Lunch</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Dinner</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="6">
              <h3>Total Calories: 0</h3>
              <Row />
              <Row><h3>Breakfast</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Lunch</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Dinner</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="7">
              <h3>Total Calories: 0</h3>
              <Row />
              <Row><h3>Breakfast</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Lunch</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row><h3>Dinner</h3></Row>
              <Row><Col>- - -</Col><Col /><Button>Add Item</Button></Row>
              <Row />
              <Row className="bottom"></Row>
            </TabPane>
          </TabContent>
        </Container>
        <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

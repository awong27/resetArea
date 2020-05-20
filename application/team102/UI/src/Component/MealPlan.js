import React, { Component } from 'react';
import { Container, Row, Col, NavLink, TabPane, Nav, NavItem, TabContent, Button } from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import classnames from 'classnames';
import "./mealplan.css";
import axios from "axios";

const Fooddata = props => (
  /*<tr>
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
  </tr>*/
  <Row>

    <Col><h5>{props.food.mealName}</h5></Col>
    <Col xs='1' />
    <Col xs='2'><h5>{props.food.planCalories}</h5></Col>
    <Col xs='1' />
    <Button className="del" onClick={() => { props.deleteItems(props.food._id); }}>X</Button>
  </Row>
);
export default class MealPlan extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    const { match: { params } } = this.props;
    this.deleteItems = this.deleteItems.bind(this);
    this.onChangeSundaysCalories = this.onChangeSundaysCalories.bind(this);
    this.onChangeMondaysCalories = this.onChangeMondaysCalories.bind(this);
    this.onChangeTuesdaysCalories = this.onChangeTuesdaysCalories.bind(this);
    this.onChangeWednesdaysCalories = this.onChangeWednesdaysCalories.bind(this);
    this.onChangeThursdaysCalories = this.onChangeThursdaysCalories.bind(this);
    this.onChangeFridaysCalories = this.onChangeFridaysCalories.bind(this);
    this.onChangeSaturdaysCalories = this.onChangeSaturdaysCalories.bind(this);
    this.onChangeSunday = this.onChangeSunday.bind(this);
    this.onChangeMonday = this.onChangeMonday.bind(this);
    this.onChangeTuesday = this.onChangeTuesday.bind(this);
    this.onChangeWednesday = this.onChangeWednesday.bind(this);
    this.onChangeThursday = this.onChangeThursday.bind(this);
    this.onChangeFriday = this.onChangeFriday.bind(this);
    this.onChangeSaturday = this.onChangeSaturday.bind(this);
    this.setDays = this.setDays.bind(this);
    var today = new Date(Date.now())
    var daysLastMonth;
    if (today.getMonth === 0 || today.getMonth === 1 || today.getMonth === 3 ||
      today.getMonth === 5 || today.getMonth === 7 || today.getMonth === 8
      || today.getMonth === 10) {
      daysLastMonth = 31;
    }
    else if (today.getMonth === 2) {
      daysLastMonth = 28;
    } else {
      daysLastMonth = 30;
    }
    this.state = {
      fooddata: [],
      username: params.id,
      creator: params.id,
      password: params.password,
      activeTab: 'sunday',
      sundaysCalories: 0,
      mondaysCalories: 0,
      tuesdaysCalories: 0,
      wednesdaysCalories: 0,
      thursdaysCalories: 0,
      fridaysCalories: 0,
      saturdaysCalories: 0,
      today: new Date(Date.now()),
      mon: 1 - new Date(Date.now()).getDay() + new Date(Date.now()).getDate() % daysLastMonth,
      tue: 2 - new Date(Date.now()).getDay() + new Date(Date.now()).getDate() % daysLastMonth,
      wed: 3 - new Date(Date.now()).getDay() + new Date(Date.now()).getDate() % daysLastMonth,
      thu: 4 - new Date(Date.now()).getDay() + new Date(Date.now()).getDate() % daysLastMonth,
      fri: 5 - new Date(Date.now()).getDay() + new Date(Date.now()).getDate() % daysLastMonth,
      sat: 6 - new Date(Date.now()).getDay() + new Date(Date.now()).getDate() % daysLastMonth,
      sun: 7 - new Date(Date.now()).getDay() + new Date(Date.now()).getDate() % daysLastMonth,
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: ""
    };
  }
  onChangeSundaysCalories(e) { this.setState({ sundaysCalories: e }); }
  onChangeMondaysCalories(e) { this.setState({ mondaysCalories: e }); }
  onChangeTuesdaysCalories(e) { this.setState({ tuesdaysCalories: e }); }
  onChangeWednesdaysCalories(e) { this.setState({ wednesdaysCalories: e }); }
  onChangeThursdaysCalories(e) { this.setState({ thursdaysCalories: e }); }
  onChangeFridaysCalories(e) { this.setState({ fridaysCalories: e }); }
  onChangeSaturdaysCalories(e) { this.setState({ saturdaysCalories: e }); }

  onChangeSunday(e) { this.setState({ sunday: e }); }
  onChangeMonday(e) { this.setState({ monday: e }); }
  onChangeTuesday(e) { this.setState({ tuesday: e }); }
  onChangeWednesday(e) { this.setState({ wednesday: e }); }
  onChangeThursday(e) { this.setState({ thursday: e }); }
  onChangeFriday(e) { this.setState({ friday: e }); }
  onChangeSaturday(e) { this.setState({ saturday: e }); }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidMount() {
    //const { match: { params } } = this.props;
    axios
      .get("http://localhost:8080/mealplan/")
      .then(response => {
        this.setState({ fooddata: response.data });
        this.setDays();
        this.weeksCalories();
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
  addItems(newR, day) {
    newR.setState({date:day});
    axios
      .post("http://localhost:8080/mealplan/", newR)
      .then(res => console.log(res.data));
    this.setState({
      fooddata: [this.state.fooddata, newR]
    });
  }
  inventory(date, mealType, day) {
    const { match: { params } } = this.props;
    return this.state.fooddata.map(currentfood => {
      if (currentfood.creator === params.id && currentfood.date === date && currentfood.mealType === mealType) {
        return (<>
          <Fooddata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
          />

        </>
        ); //need to add button for addrecipe
      } return (null);
    });
  }
  weeksCalories() {
    this.onChangeSundaysCalories(0);
    this.onChangeMondaysCalories(0);
    this.onChangeTuesdaysCalories(0);
    this.onChangeWednesdaysCalories(0);
    this.onChangeThursdaysCalories(0);
    this.onChangeFridaysCalories(0);
    this.onChangeSaturdaysCalories(0);
    this.state.fooddata.map(currentfood => {
      if (currentfood.date === this.state.sunday) {
        this.onChangeSundaysCalories(this.state.sundaysCalories + parseInt(currentfood.planCalories))
        console.log(this.state.sundaysCalories)
      } else if (currentfood.date === this.state.monday) {
        this.onChangeMondaysCalories(this.state.mondaysCalories + parseInt(currentfood.planCalories))
        console.log(this.state.mondaysCalories)
      } else if (currentfood.date === this.state.tuesday) {
        this.onChangeTuesdaysCalories(this.state.tuesdaysCalories + parseInt(currentfood.planCalories))
        console.log(this.state.tuesdaysCalories)
      } else if (currentfood.date === this.state.wednesday) {
        this.onChangeWednesdaysCalories(this.state.wednesdaysCalories + parseInt(currentfood.planCalories))
        console.log(this.state.wednesdaysCalories)
      } else if (currentfood.date === this.state.thursday) {
        this.onChangeThursdaysCalories(this.state.thursdaysCalories + parseInt(currentfood.planCalories))
        console.log(this.state.thursdaysCalories)
      } else if (currentfood.date === this.state.friday) {
        this.onChangeFridaysCalories(this.state.fridaysCalories + parseInt(currentfood.planCalories))
        console.log(this.state.fridaysCalories)
      } else if (currentfood.date === this.state.saturday) {
        this.onChangeSaturdaysCalories(this.state.saturdaysCalories + parseInt(currentfood.planCalories))
        console.log(this.state.saturdaysCalories)
      }
      return (null);
    })
  }
  setDays() {
    //var month = "";
    //var day = "";
    //var year = "";
    var monday = "";
    var tuesday = "";
    var wednesday = "";
    var thursday = "";
    var friday = "";
    var saturday = "";
    var sunday = "";
    var today = new Date(Date.now())
    if (this.state.mon > today + 1) {
      monday = (this.state.today.getMonth()).toString() + "/" + (this.state.mon).toString() + "/" + (this.state.today.getFullYear()).toString()
    } else {
      monday = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.mon).toString() + "/" + (this.state.today.getFullYear()).toString()
    }
    if (this.state.tue > today + 1) {
      tuesday = (this.state.today.getMonth()).toString() + "/" + (this.state.tue).toString() + "/" + (this.state.today.getFullYear()).toString()
    } else {
      tuesday = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.tue).toString() + "/" + (this.state.today.getFullYear()).toString()
    }
    if (this.state.wed > today + 1) {
      wednesday = (this.state.today.getMonth()).toString() + "/" + (this.state.wed).toString() + "/" + (this.state.today.getFullYear()).toString()
    } else {
      wednesday = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.wed).toString() + "/" + (this.state.today.getFullYear()).toString()
    }
    if (this.state.thu > today + 1) {
      thursday = (this.state.today.getMonth()).toString() + "/" + (this.state.thu).toString() + "/" + (this.state.today.getFullYear()).toString()
    } else {
      thursday = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.thu).toString() + "/" + (this.state.today.getFullYear()).toString()
    }
    if (this.state.fri > today + 1) {
      friday = (this.state.today.getMonth()).toString() + "/" + (this.state.fri).toString() + "/" + (this.state.today.getFullYear()).toString()
    } else {
      friday = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.fri).toString() + "/" + (this.state.today.getFullYear()).toString()
    }
    if (this.state.sat > today + 1) {
      saturday = (this.state.today.getMonth()).toString() + "/" + (this.state.sat).toString() + "/" + (this.state.today.getFullYear()).toString()
    } else {
      saturday = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.sat).toString() + "/" + (this.state.today.getFullYear()).toString()
    }
    if (this.state.sun > today + 1) {
      sunday = (this.state.today.getMonth()).toString() + "/" + (this.state.sun).toString() + "/" + (this.state.today.getFullYear()).toString()
    } else {
      sunday = (this.state.today.getMonth() + 1).toString() + "/" + (this.state.sun).toString() + "/" + (this.state.today.getFullYear()).toString()
    }
    this.onChangeMonday(monday);
    this.onChangeTuesday(tuesday);
    this.onChangeWednesday(wednesday);
    this.onChangeThursday(thursday);
    this.onChangeFriday(friday);
    this.onChangeSaturday(saturday);
    this.onChangeSunday(sunday);
  }
  breakfast(date, mealType) {
    const { match: { params } } = this.props;
    return this.state.fooddata.map(currentfood => {
      if (currentfood.creator === params.id && currentfood.date === date && currentfood.mealType === mealType) {
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
    * this.setDays();
    * this.weeksCalories();
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
        <Container>
          <Row><Col><h1>Meal Plan</h1></Col></Row>

          <Nav tabs justified className="plan">
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'sunday' })}
                onClick={() => { this.toggle('sunday'); }} >
                Sun
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'monday' })}
                onClick={() => { this.toggle('monday'); }} >
                Mon
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'tuesday' })}
                onClick={() => { this.toggle('tuesday'); }} >
                Tue
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'wednesday' })}
                onClick={() => { this.toggle('wednesday'); }} >
                Wed
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'thursday' })}
                onClick={() => { this.toggle('thursday'); }} >
                Thu
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'friday' })}
                onClick={() => { this.toggle('friday'); }} >
                Fri
          </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === 'saturday' })}
                onClick={() => { this.toggle('saturday'); }} >
                Sat
          </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="sunday">
              <Row>
                <Col></Col><Col><h5>Calories:{this.state.sundaysCalories}</h5></Col><Col></Col>
              </Row>
              <Row className="barline">
                <Col xs='1' /><Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <p>{this.inventory(this.state.sunday, "breakfast", "sunday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button >Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.sunday, "lunch", "sunday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.sunday, "dinner", "sunday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="monday">
              <Col></Col><Col><h5>Calories:{this.state.mondaysCalories}</h5></Col><Col></Col>
              <Row />
              <Row className="barline">
                <Col xs='1' /><Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <p>{this.inventory(this.state.monday, "breakfast", "monday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.monday, "lunch", "monday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.monday, "dinner", "monday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="tuesday">
              <Col></Col><Col><h5>Calories:{this.state.tuesdaysCalories}</h5></Col><Col></Col>
              <Row />
              <Row className="barline">
                <Col xs='1' /><Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <p>{this.inventory(this.state.tuesday, "breakfast", "tuesday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.tuesday, "lunch", "tuesday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.tuesday, "dinner", "tuesday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="wednesday">
              <Col></Col><Col><h5>Calories:{this.state.wednesdaysCalories}</h5></Col><Col></Col>
              <Row />
              <Row className="barline">
                <Col xs='1' /><Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <p>{this.inventory(this.state.wednesday, "breakfast", "wednesday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.wednesday, "lunch", "wednesday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.wednesday, "dinner", "wednesday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="thursday">
              <Col></Col><Col><h5>Calories:{this.state.thursdaysCalories}</h5></Col><Col></Col>
              <Row />
              <Row className="barline">
                <Col xs='1' /><Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <p>{this.inventory(this.state.thursday, "breakfast", "thursday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.thursday, "lunch", "thursday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.thursday, "dinner", "thursday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="friday">
              <Col></Col><Col><h5>Calories:{this.state.fridaysCalories}</h5></Col><Col></Col>
              <Row />
              <Row className="barline">
                <Col xs='1' /><Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <p>{this.inventory(this.state.friday, "breakfast", "friday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.friday, "lunch", "friday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.friday, "dinner", "friday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="bottom"></Row>
            </TabPane>
            <TabPane tabId="saturday">
              <Col></Col><Col><h5>Calories:{this.state.saturdaysCalories}</h5></Col><Col></Col>
              <Row />
              <Row className="barline">
                <Col xs='1' /><Col><h3>Breakfast</h3></Col><Col></Col><Col></Col>
              </Row>
              <p>{this.inventory(this.state.saturday, "breakfast", "saturday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.saturday, "lunch", "saturday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="barline">
                <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>
              </Row>
              <p>{this.inventory(this.state.saturday, "dinner", "saturday")}</p>
              <Row><Col xs='2' />- - -<Col /><Button>Add Item</Button></Row>
              <Row className="bottom"></Row>
            </TabPane>
          </TabContent>
        </Container>
        <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}
//onClick={()=> this.addItems(this.params.food, this.state.sunday)}
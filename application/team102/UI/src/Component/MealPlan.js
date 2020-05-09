import React, {Component} from 'react';
import {Container, Row, Col, Input, NavLink, TabPane, Nav, NavItem, TabContent} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 
import classnames from 'classnames';
import "./mealplan.css";
export default class MealPlan extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
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
  render() {
    
    return (     
      <div style={{height: "100%"}}><TopBar/>        
      <Container>  <br/><br/><br/>
      <Row><Col><h1>Meal Plan</h1></Col></Row>
      <Row><Col><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col></Row>
      <br/>
      <h3>Weekly Total Calories: 23,431</h3>
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
            <Col></Col><Col></Col><Col><p>Calories</p></Col>      
          </Row>
          <Row>
            <Col><h3>Breakfast</h3></Col><Col><Col></Col></Col>      
          </Row>
          <Row>
            <Col><p>Cereal</p></Col><Col></Col><Col>235</Col>      
          </Row>
          <Row>
            <Col><p>Milk</p></Col><Col></Col><Col>54</Col>      
          </Row>
          <Row>
            <Col><h3>Lunch</h3></Col><Col><Col></Col></Col>      
          </Row>
          <Row>
            <Col><p>Chicken Pot Pie</p></Col><Col></Col><Col>900</Col>      
          </Row>
          <Row>
            <Col><p>Soda</p></Col><Col></Col><Col>120</Col>      
          </Row>
          <Row>
            <Col><h3>Dinner</h3></Col><Col><Col></Col></Col>      
          </Row>
          <Row>
            <Col><p>Corn Hen</p></Col><Col></Col><Col>608</Col>      
          </Row>
          <Row>
            <Col><p>Mashed Potatoes</p></Col><Col></Col><Col>348</Col>      
          </Row>
        </TabPane>
        <TabPane tabId="2">
          this is monday
        </TabPane>
        <TabPane tabId="3">
          this is tuesday
        </TabPane>
        <TabPane tabId="4">
          this is Wednesday
        </TabPane>
        <TabPane tabId="5">
          this is Thursday
        </TabPane>
        <TabPane tabId="6">
          this is Friday
        </TabPane>
        <TabPane tabId="7">
          this is Saturday
        </TabPane>
      </TabContent>  
            
      </Container>
      <Navi/> 
      </div>       
    );
  }
}
  
import React, { Component} from 'react';
import {Button, Badge, Row, Col, ButtonGroup, Card, CardImg, CardText, CardFooter, CardHeader, NavLink} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import axios from "axios";
import "./inv.css";
import Tphoto from "./thanos.png";
import consume from "./pizzaIcon.png";
import trash from "./trashIcon.png";
import plusbtn from "./plus.svg"
const Fooddata = props => (
  <Card className="invItem">
    <CardImg alt="FridgeItem" src={Tphoto}/>
    <CardHeader>
      <ButtonGroup className="itemHead">
        <Button>
          <Badge color="danger">!</Badge>
        </Button>
        <Button>
          <CardText>{props.food.foodName}</CardText>
        </Button>
        <Button>
          <CardText>{props.food.expirationDate}</CardText>
        </Button>
      </ButtonGroup>
    </CardHeader>
    <CardFooter>
      <ButtonGroup className="itemOptions">
        <Button onClick={() => {props.deleteItems(props.food._id);}}>
          <img alt="delete" src ={trash} />
        </Button>
        <Button>
          <CardText>{props.food.numOfItems}</CardText>
        </Button>
        <Button onClick={() => "/create" + props.food._id}>
          <img alt="eat" src ={consume} />
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>  
);

export default class inventory extends Component {

  constructor(props) {
    super(props);
    const {match:{params}} = this.props;
    this.deleteItems = this.deleteItems.bind(this);

    this.state = {
      fooddata: [],
      username: params.id,
      password: params.password
      };
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
    const {match:{params}} = this.props;
    return this.state.fooddata.map(currentfood => {
      if(currentfood.creator===params.id){
        return (
          <Fooddata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
            />
          );} else return (null);
    });
  }
    
  render() {
    return (
      <div><TopBar username={this.state.username} password={this.state.password}/>
      <br/><br/><br/>
      <div><h1>Inventory</h1></div>
      <div className="FridgeList">
        {this.inventory()}
      </div>
      <br/><br/>
      <NavLink href="/create"><Button className="addbtn"><img alt="add" src={plusbtn} /></Button></NavLink>
      <Navi username={this.state.username} password={this.state.password}/>
      </div>
    )
  }
}

/* <Row className="FridgeList">{this.fake()}
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button><h2>
                  <Badge color="danger">!</Badge></h2>
                </Button>
                <Button>
                  <h1>Apple</h1>
                </Button>
                <Button>
                  <h5>Exp Date</h5>
                </Button>
              </ButtonGroup>
            </CardHeader>
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Quantity</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Col>

      </Row>
      */

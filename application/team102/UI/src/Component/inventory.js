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
  <Button className="invBar" ><Row>
    <Col className="itemName">{props.food.foodName}</Col>
    <Col className="expire">{props.food.expirationDate}</Col>
    
    <Col className="actions">{props.food.numOfItems}</Col>
    <Col><Button onClick={() => "/create" + props.food._id}>Edit</Button><Button onClick={() => {props.deleteItems(props.food._id);}}>Delete</Button></Col>
  </Row></Button>
);

export default class inventory extends Component {

  constructor(props) {
    super(props);

    this.deleteItems = this.deleteItems.bind(this);

    this.state = { 
      fooddata: []      
    };
    
  }

  componentDidMount() {
    axios
      .get("/fooddata/")
      .then(response => {
        this.setState({ fooddata: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItems(id) {
    axios
      .delete("/fooddata/" + id)
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
  fake() {
    return (<div>
      <Row className="FridgeList">
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col> 
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col>         
      </Row> 
      <Row className="FridgeList">
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col> 
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col>         
      </Row><Row className="FridgeList">
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col> 
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col>         
      </Row><Row className="FridgeList">
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col> 
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col>         
      </Row><Row className="FridgeList">
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col> 
        <Col>
          <Card className="invItem">
            <CardImg alt="FridgeItem" src={Tphoto}/>
            <CardHeader>
              <ButtonGroup className="itemHead">
                <Button>
                  <Badge color="danger">!</Badge>
                </Button>
                <Button>
                  <CardText>Apple</CardText>
                </Button>
                <Button>
                  <CardText>3/15</CardText>
                </Button>
              </ButtonGroup>
            </CardHeader>  
            <CardFooter>
              <ButtonGroup className="itemOptions">
                <Button>
                  <img alt="delete" src ={trash} />
                </Button>
                <Button>
                  <CardText>Qty</CardText>
                </Button>
                <Button>
                  <img alt="eat" src ={consume} />
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>  
        </Col>         
      </Row>
</div>
    );
  }
  render() {     
    return (
      <div><TopBar/>
      <br/><br/><br/>
      <div><h1>Inventory</h1></div>  
      {this.inventory()}
              
      {this.fake()}
      
      <br/><br/>
      <NavLink href="/create"><Button className="addbtn"><img alt="add" src={plusbtn} /></Button></NavLink>
      <Navi/>
      </div>
    )
  }
}

/* <Row className="FridgeList">
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
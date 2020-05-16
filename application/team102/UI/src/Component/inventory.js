import React, {useState, Component} from 'react';
import {Button, Badge, ButtonGroup, Card, CardImg, CardText, CardFooter, CardHeader, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, CardBody} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import axios from "axios";
import "./inv.css";
import consume from "./pizzaIcon.png";
import trash from "./trashIcon.png";
import plusbtn from "./plus.svg";


const Fooddata = props => {
  const {className} = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return(
    <Card className="invItem">
      <CardImg alt="FridgeItem" onClick={toggle} src={props.food.foodPic}/>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}><h3>{props.food.foodName}</h3>{props.food.numOfItems}</ModalHeader>
        <ModalBody>
          <td>Expires:{props.food.expirationDate}</td>
          <h4>Calories:{props.food.calories}</h4>
          <h4>Carbs:{props.food.carbs}</h4>
          <h4>Sugar:{props.food.sugar}</h4>
          <h4>Protein:{props.food.protein}</h4>
          <h4>Fat:{props.food.fat}</h4>
          <img alt={props.food.foodName} src={props.food.foodPic} height="50%" width="100%"/>
        </ModalBody>
        <ModalFooter>
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
        </ModalFooter>
      </Modal>

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
      <CardBody position='center'>
          
      </CardBody>
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
}

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
  //${params.id}
  componentDidMount() {
    const {match:{params}} = this.props;
    axios
      .get('http://localhost:8080/fooddata/')
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
  /*foodcard() {

    return (
      <FoodStuff
        food={this.state.fooddata}
        deleteItems={this.deleteItems}
        key={this.state.fooddata._id}
      />
    );
  }  */
  render() {
    return (
      <div><TopBar username={this.state.username} password={this.state.password}/>
      <br/><br/><br/>
      <div><h1>Inventory</h1></div>
      <div className="FridgeList">
        {this.inventory()}
      </div>
      <br/><br/>
      <NavLink href="/Scan"><Button className="addbtn"><img alt="add" src={plusbtn} /></Button></NavLink>
      <Navi username={this.state.username} password={this.state.password}/>
      </div>
    )
  }
}
/* from food inner part -- need to add pop up card to it
  var name= this.state.fooddata.foodName;
    var expire= this.state.fooddata.expirationDate;
    var creat=this.state.fooddata.creator;
    var calories = this.state.fooddata.calories;
    var carbs = this.state.fooddata.carbs;
    var protein = this.state.fooddata.protein;
    var sugar=this.state.fooddata.sugar;
    var fat = this.state.fooddata.fat;
    var id = this.state.fooddata._id;


    const foodpic = <img src={this.state.fooddata.foodPic} height="200" width="200"></img>;
    <div>
        <h3>{name}</h3>
        <h4>{foodpic}</h4>
        <h4>Calories:{calories}</h4>
        <h4>Carbs:{carbs}</h4>
        <h4>Sugar:{sugar}</h4>
        <h4>Protein:{protein}</h4>
        <h4>Fat:{fat}</h4>

      </div>
*/
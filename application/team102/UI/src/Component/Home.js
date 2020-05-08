import React, {Link, Component} from 'react';
import Tphoto from "./thanos.png";
import { Container, Row, Col, NavLink} from "reactstrap";
import Navi from "./Navigation";
import TopBar from "./TopBar";
import Fphoto from "./fridgeIcomn.png";
import Mphoto from "./mealplanicon.png";
import Dphoto from "./plate.png";
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
    userdata: this.state.userdata.filter(el => el._id != id)
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

    return (
      <div align = "center" > <TopBar/>
      <Container className="HomePage">  <br/>

        <Row><Col>
          <NavLink href="/EditUser"><img alt="UserPic" src={Tphoto} className="userPic"/></NavLink>
        </Col></Row>

        <Row>
          <Col><NavLink href={meal}><img alt="MealPlan" src={Mphoto} className="icons"/> </NavLink> </Col>
          <Col><NavLink href={stat}><img alt="Stats" src={Dphoto} className="icons"/></NavLink> </Col>
          <Col><NavLink href={inv}><img alt="Inv" src={Fphoto} className="icons"/></NavLink></Col>
        </Row>
        <Row>
          <Col><p>Meal Plan</p> </Col>
          <Col><p>Statistics</p> </Col>
          <Col><p>Inventory</p> </Col>
        </Row>
      </Container>
      <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

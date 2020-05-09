import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import queryString from "querystring"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";



const Fooddata = props => (
  <tr>
    <td>
      <Link to = {"/user-item/"+ props.food._id}>{props.food.foodName}</Link>
      </td>
    <td>{props.food.expirationDate}</td>
    <td>{props.food.calories}</td>
    <td>{props.food.numOfItems}</td>
    <td>
      <Link to={"/edit/" + props.food._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteItems(props.food._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this);
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangefamilyName = this.onChangefamilyName.bind(this);
    this.onChangeprofilePic = this.onChangeprofilePic.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      Name: "",
      Username: "",
      Password: "",
      FamilyName: "",
      ProfilePic: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/userdata/")
      .then(response => {
        this.setState({ logindata: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItems(id) {
    axios
      .delete("http://localhost:3001/fooddata/" + id)
      .then(res => console.log(res.data));
    this.setState({
      fooddata: this.state.fooddata.filter(el => el._id != id)
    });
  }


  onChangename(e) {
    this.setState({
      Name: e.target.value
    });
  }

  onChangeusername(e) {
    this.setState({
      Username: e.target.value
    });
  }
  onChangepassword(e) {
    this.setState({
      Password: e.target.value
    });
  }
  onChangefamilyName(e) {
    this.setState({
      FamilyName: e.target.value
    });
  }
  onChangeprofilePic(e) {
    this.setState({
      ProfilePic: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.Name,
      username: this.state.Username,
      password: this.state.Password,
      familyName: this.state.FamilyName,
      profilePic: this.state.ProfilePic
    };

    this.state.logindata.map(currentuser=>{
      if(currentuser.password==user.password && currentuser.username==user.username){
        window.location = "/"+user.username;
      }
    })




  }


/*
  login() {
    return this.state.logindata.map(currentuser => {
      if(currentuser.creator=="danny"){
        return (
          <Fooddata
            food={currentuser}
            deleteItems={this.deleteItems}
            key={currentuser._id}
            />
          );}
    });
  }*/



  render() {
    return (
      <div>
        <h3>User Login</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeusername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangepassword}
            />
          </div>


          <div className="form-group">
            <input
              type="submit"
              value="Login"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

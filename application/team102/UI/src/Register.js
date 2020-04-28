import React,  { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class Register extends Component {

  constructor(props) {
  super(props);

  this.onChangename = this.onChangename.bind(this);
  this.onChangeusername = this.onChangeusername.bind(this);
  this.onChangepassword = this.onChangepassword.bind(this);
  this.onChangefamilyName = this.onChangefamilyName.bind(this);
  this.onChangeprofilePic = this.onChangeprofilePic.bind(this);
  this.onChangeemail = this.onChangeemail.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

  this.state = {
    Name: "",
    Username: "",
    Password: "",
    FamilyName: "",
    Email:"",
    ProfilePic: ""

  };
}
getNutrients(){

}

onChangename(e) {
  this.setState({
    Name: e.target.value
  });
}
onChangeemail(e){
  this.setState({
    Email: e.target.value
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

  console.log(user);
  axios
    .post("http://localhost:8080/userdata/add", user)
    .then(res => console.log(res.data));

  window.location = "/";
}


  render() {
    return (
      <Form align="centered" >
        <div className="upperbox">
          <FormGroup>
            <Label for="exampleEmail">Email/Phone</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email or Phone"
              value={this.state.Email}
              onChange={this.onChangeemail}
              />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="At least one uppercase letter, lowercase letter and a number"
              value={this.state.Password}
              onChange={this.onChangepassword}
              />
          </FormGroup>
          <FormGroup>
            <Label for="exampleUsername">Username</Label>
            <Input
              type="Username"
              name="Username"
              id="exampleUsername"
              placeholder="Username"
              value={this.state.Username}
              onChange={this.onChangeusername}
              />
          </FormGroup>
          <FormGroup >
            <Label for="exampleFile">Profile Picture</Label>
            <Input  type="file" name="file" id="exampleFile" />
          </FormGroup>
        </div>
        <div className="lowerbox">
          <Button href="/Home">Create Account</Button>
          <Button href="/">Go Back</Button>
        </div>
      </Form>
    );
  }
}


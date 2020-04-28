import React,  { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from "axios";

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
    .get("http://localhost:8080/userdata/")
    .then(response => {
      this.setState({ logindata: response.data });
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
      window.location = "/Home/"+user.username+"/"+user.password;
    }else{
      return(
        <div>
        <h3>Wrong Password</h3>
        </div>
      )
    }
  })




}

  render() {

    return (
      <Form align="centered" onSubmit={this.onSubmit}>
        <div className="upperbox">
          <FormGroup>
            <Label for="exampleUsername">Username</Label>
            <Input
              type="username"
              name="username"
              id="exampleUsername"
              placeholder="Username"
              value={this.state.Username}
              onChange={this.onChangeusername} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              value={this.state.Password}
              onChange={this.onChangepassword} />
          </FormGroup>
        </div>
        <FormGroup>
        <div className="lowerbox">
          <Input
            type="submit"
            value="Login"
            className="btn btn-primary"
          />

        </div>
        </FormGroup>


      </Form>
    );
  }
}

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, ButtonGroup } from 'reactstrap';
import axios from "axios";

export default class SignIn extends Component {
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
      ProfilePic: "",
      Email: "",
      count: 0
    };
  }
  /* Handles login check by pulling list of users
   */
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
      fooddata: this.state.fooddata.filter(el => el._id !== id)
    });
  }
  /*
   * Handles setting input values of form data into local 
   */
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
  onChangeemail(e) {
    this.setState({
      Email: e.target.value
    });
  }
  /* Saves form data into local user variable
   * sends a check against user list -> logins in valid user
   * else checks if registering if email is filled -> creates new user
   */
  onSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.Name,
      username: this.state.Username,
      password: this.state.Password,
      familyName: this.state.FamilyName,
      profilePic: this.state.ProfilePic,
      email: this.state.Email
    };
    this.state.logindata.map(currentuser => {
      if (currentuser.password === user.password && currentuser.username === user.username) {
        var home = "/Home/" + user.username + "/" + user.password;
        window.location = home;
      } else {
        return (
          <div>
            <h3>Wrong Password</h3>
          </div>
        );
      }
      return (null);
    });
    if (user.email !== null) {
      console.log(user);
      axios
        .post("http://localhost:8080/userdata/add", user)
        .then(res => console.log(res.data));
    }
    var home = "/Home/" + user.username + "/" + user.password;
    window.location = home;
  }
  render() {
    /* Form fields
     * Show login and password -> switch to add email  
     * submit enters data into local variables to be checked
     */
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
          {this.state.count === 1 ?
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Email"
                value={this.state.Email}
                onChange={this.onChangeemail} />
            </FormGroup>
            : <></>}
        </div>
        <div className="lowerbox">
          <Button size='lg' className="SignSpace form-control input" type="submit" value="submit">
            Submit
          </Button>
          <ButtonGroup size='lg' className="SignSpace">
            {this.state.count === 0 ? <>
              <Button className="lightState" onClick={() => this.setState({ count: 0 })} >Login</Button>
              <Button onClick={() => this.setState({ count: 1 })} >Register</Button>
            </> : <>
                <Button onClick={() => this.setState({ count: 0 })} >Login</Button>
                <Button className="lightState" onClick={() => this.setState({ count: 1 })} >Register</Button>
              </>}
          </ButtonGroup>
        </div>
      </Form>
    );
  }
}
/*
<Button size='lg' className="SignSpace">Submit<Input
            type="submit"
            value="Submit"
            className="btn"
            style={{visibility:'hidden'}}
          /></Button>
*/
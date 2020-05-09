import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class Create extends Component {
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
  getNutrients(){

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

    console.log(user);
    axios
      .post("http://localhost:3001/userdata/add", user)
      .then(res => console.log(res.data));

    window.location = "/";
  }



  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangename}
            />
          </div>
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
            <label>Family Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.familyName}
              onChange={this.onChangefamilyName}
            />
          </div>
          <div className="form-group">
            <label>ProfilePic: </label>
            <input
              type = "text"
              className="form-control"
              value={this.state.profilePic}
              onChange={this.onChangeprofilePic}
            />

          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create food"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.onChangeFoodname = this.onChangeFoodname.bind(this);
    this.onChangeExpirationdate = this.onChangeExpirationdate.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeNumberOfItems = this.onChangeNumberOfItems.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      foodname: "",
      expirationdate: "",
      calories: "",
      numberOfItems: "",
      date: new Date()
    };
  }

  onChangeFoodname(e) {
    this.setState({
      foodname: e.target.value
    });
  }

  onChangeExpirationdate(e) {
    this.setState({
      expirationdate: e.target.value
    });
  }
  onChangeCalories(e) {
    this.setState({
      calories: e.target.value
    });
  }
  onChangeNumberOfItems(e) {
    this.setState({
      numberOfItems: e.target.value
    });
  }
  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const food = {
      foodName: this.state.foodname,
      expirationDate: this.state.expirationdate,
      calories: this.state.calories,
      numOfItems: this.state.numberOfItems,
      date: this.state.date
    };

    console.log(food);
    axios
      .post("http://localhost:8080/fooddata/add", food)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Food Items</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Food Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.foodname}
              onChange={this.onChangeFoodname}
            />
          </div>
          <div className="form-group">
            <label>Expiration Date: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.expirationdate}
              onChange={this.onChangeExpirationdate}
            />
          </div>
          <div className="form-group">
            <label>Calories: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.calories}
              onChange={this.onChangeCalories}
            />
          </div>
          <div className="form-group">
            <label>Number of Items: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.numberOfItems}
              onChange={this.onChangeNumberOfItems}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
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

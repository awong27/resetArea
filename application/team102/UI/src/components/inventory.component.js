import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Fooddata = props => (
  <tr>
    <td>{props.food.foodName}</td>
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

export default class Inventory extends Component {
  constructor(props) {
    super(props);

    this.deleteItems = this.deleteItems.bind(this);

    this.state = { fooddata: [] };
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
      fooddata: this.state.fooddata.filter(el => el._id != id)
    });
  }

  inventory() {
    return this.state.fooddata.map(currentfood => {
      return (
        <Fooddata
          food={currentfood}
          deleteItems={this.deleteItems}
          key={currentfood._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Inventory</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Food Name</th>
              <th>Expiration Date</th>
              <th>Calories</th>
              <th>Number of Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.inventory()}</tbody>
        </table>
      </div>
    );
  }
}

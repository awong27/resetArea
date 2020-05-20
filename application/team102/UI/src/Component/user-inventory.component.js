import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const FoodStuff = props => (
  <tr>
    <td>{props.food.foodName}</td>
    <td>{props.food.expirationDate}</td>
    <td>{props.food.calories}</td>
    <td>{props.food.numOfItems}</td>
    <td>{props.food.creator}</td>
    <td>{props.food.foodPic}</td>
    <td>{props.food._id}</td>
    <td>
      <Link to={"/edit/" + props.food._id}>edit</Link> |{" "}
      <a
        //href="#"
        onClick={() => {
          props.deleteItems(props.food._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class FoodCard extends Component {
  constructor(props) {
    super(props);



    this.deleteItems = this.deleteItems.bind(this);

    this.state = {
      fooddata: [],


    };

  }

  componentDidMount() {
    const { match: { params } } = this.props;
    //console.log({itemid});
    axios
      .get(`http://localhost:8080/fooddata/${params.id}`)
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


  foodcard() {
    return (
      <FoodStuff
        food={this.state.fooddata}
        deleteItems={this.deleteItems}
        key={this.state.fooddata._id}
      />
    );
  }

  render() {
    var name = this.state.fooddata.foodName;
    var expire = this.state.fooddata.expirationDate;
    var creat = this.state.fooddata.creator;
    var calories = this.state.fooddata.calories;
    var carbs = this.state.fooddata.carbs;
    var protein = this.state.fooddata.protein;
    var sugar = this.state.fooddata.sugar;
    var fat = this.state.fooddata.fat;
    var id = this.state.fooddata._id;

    const foodpic = <img src={this.state.fooddata.foodPic} height="200" width="200"></img>;
    return (
      <div>
        <h3>{name}</h3>
        <h4>{foodpic}</h4>
        <h4>Calories:{calories}</h4>
        <h4>Carbs:{carbs}</h4>
        <h4>Sugar:{sugar}</h4>
        <h4>Protein:{protein}</h4>
        <h4>Fat:{fat}</h4>

      </div>
      /*<div>
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
          <tbody>{this.foodcard()}</tbody>
        </table>
      </div>*/



    );
  }
}
//export withRouter(FoodCard);

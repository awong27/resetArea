import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
//import Navi from "./Navigation";
//import TopBar from "./TopBar";
import { NavLink } from "reactstrap";

export default class Create extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.onChangeFoodname = this.onChangeFoodname.bind(this);
    this.onChangeExpirationdate = this.onChangeExpirationdate.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeCarbs = this.onChangeCarbs.bind(this);
    this.onChangeNumberOfItems = this.onChangeNumberOfItems.bind(this);
    this.onChangeSugar = this.onChangeSugar.bind(this);
    this.onChangeFat = this.onChangeFat.bind(this);
    this.onChangeProtein = this.onChangeProtein.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      foodname: "",
      expirationdate: "",
      calories: "",
      numberOfItems: "",
      carbs: "",
      sugar: "",
      fat: "",
      protein: "",
      sodium: "",
      foods: [],
      userdata: [],
      password: params.password,
      username: params.id
    };
  }
  // change activations for prop states
  onChangeFoodname(e) {this.setState({foodname: e.target.value});}
  onChangeExpirationdate(e) {this.setState({expirationdate: e.target.value});}
  onChangeCalories(e) {this.setState({calories: e.target.value});}
  onChangeNumberOfItems(e) {this.setState({numberOfItems: e.target.value});}
  onChangeCarbs(e) {this.setState({carbs: e.target.value});}
  onChangeSugar(e) {this.setState({sugar: e.target.value});}
  onChangeFat(e) {this.setState({fat: e.target.value});}  
  onChangeProtein(e) {this.setState({protein: e.target.value});}  
  onChangeSodium(e) {this.setState({sodium: e.target.value});}
  
  onSubmit(e) {
    e.preventDefault();
    axios
      /* Searches food name param in Api returns all types matching
       * foods -> array going to be loaded with first result info
       * has all nutrition facts
       */
      .get("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=ldLF1ky8NkwmcLnTDvqDoSjul1eanGZ1o6vZ2Q9u&query=" + this.state.foodname)
      .then(response => {
        console.log(response.data.foods[0].foodNutrients[0]);
        this.setState({
          foods: response.data.foods[0].foodNutrients
        });
        /* Searches array for matching nutrient name, only exact 
         * calls funct to change value once found
         */
        this.state.foods.map(currentfood => {
          console.log(currentfood.nutrientName, currentfood.value);
          if(currentfood.nutrientName === 'Energy'){
            this.onChangeCalories(currentfood.value);
          }else if(currentfood.nutrientName === 'Carbohydrate, by difference'){
            this.onChangeCarbs(currentfood.value);
          }else if(currentfood.nutrientName === 'Total lipid (fat)'){
            this.onChangeFat(currentfood.value);
          }else if(currentfood.nutrientName === 'Protein'){
            this.onChangeProtein(currentfood.value);
          }else if(currentfood.nutrientName === 'Sugars, total including NLEA'){
            this.onChangeSugar(currentfood.value);
          }else if(currentfood.nutrientName === 'Sodium, Na'){
            this.onChangeSodium(currentfood.value);
          }      
        })
        /* adds all values into a temp list
         * sends to backend to be added to personal id food list
         */
        const food = {
          foodName: this.state.foodname,
          expirationDate: this.state.expirationdate,
          calories: this.state.calories,
          numOfItems: this.state.numberOfItems,
          carbs: this.state.carbs,
          protein: this.state.protein,
          fat: this.state.fat,
          sugar: this.state.sugar,
          sodium: this.state.sodium
        };
        console.log(food);
        axios
          .post("/fooddata/add", food)
          .then(res => console.log(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  render() {
    var inv = "/inventory/" + this.state.username + "/" + this.state.password
    return (
      <div>
        <h3>Create New Food Items</h3>
        <NavLink href={inv}>Back</NavLink>
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
            <label>Expiration: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.expirationdate}
              onChange={this.onChangeExpirationdate}
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

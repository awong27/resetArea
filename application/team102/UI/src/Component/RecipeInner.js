import React, {Component} from 'react';
import {Row, Col, Button, ButtonGroup} from 'reactstrap';
import { Link } from "react-router-dom";
import Navi from "./Navigation";
import TopBar from "./TopBar";
import axios from "axios";
import "./boxTabs.css";


const Ingredientdata = props =>(
  <h8> {props.food}</h8>
);

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
        href="/create"
        onClick={() => {
          props.deleteItems(props.food._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);




export default class RecipeInner extends Component {

  constructor(props) {
    super(props);
    const {match:{params}} = this.props;
    this.deleteItems = this.deleteItems.bind(this);

    this.state = {
      recipedata: [],
      recipeName:"",
      recipeCalories:"",
      ingredients:[],
      username:params.id,
      password:params.password,
      addingMeal:false,
      mealType:""


     };
  }

  componentDidMount() {
    const {match:{params}} = this.props;
    axios
      .get("http://localhost:8080/recipedata/")
      .then(response => {
        this.setState({
          recipedata: response.data });
          return this.state.recipedata.map(currentfood => {
            if(currentfood.creator==params.id && currentfood.recipeName == params.recipeName){
              console.log(currentfood);
              this.setState({
                recipeCalories: currentfood.recipeCalories,
                recipeName: currentfood.recipeName,
                ingredients: currentfood.ingredients,
                recipeImage: currentfood.recipeImage

              })
              console.log(this.state.ingredients);
                }

      })

  })
  .catch(error => {
    console.log(error);
  });
}
  deleteItems(id) {
    axios
      .delete("http://localhost:8080/recipedata/" + id)
      .then(res => console.log(res.data));
    this.setState({
      recipedata: this.state.recipedata.filter(el => el._id !== id)
    });
  }

  inventory() {
    const {match:{params}} = this.props;
    return this.state.recipedata.map(currentfood => {
      if(currentfood.creator==params.id && currentfood.recipeName == params.recipeName){
        this.setState({
          recipeCalories: currentfood.recipeCalories,
          recipeName: currentfood.recipeName,
          ingredients: currentfood.ingredients


        })
        return (
          <Fooddata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
            />
          );}
    });
  }

  onChangeMealType(e){
    this.setState({
      addingMeal:true,
      mealType:e

    })

  }
  onSubmit(e){
    e.preventDefault();

  }

addMeal(){
  if(!this.state.addingMeal){
    return null;
  }
  return(
    <div>
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <label>Meal Type: </label>
        <input
          type="text"
          required
          className="form-control"

          onChange={this.onChangeMealType}
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
            )

}

  ingredients(){
    const {match:{params}} = this.props;
    return this.state.ingredients.map(currentfood => {


          return(  <Ingredientdata
              food={currentfood}
              key={currentfood._id}
              />)



    })


  }



  render() {
    return (
      <div className="full"> <TopBar/> <br/><br/><br/>
      <div className="idk">
      <Row><Col><h1>Recipes</h1></Col></Row>

      <div className="tabBox">
        <Row>
            <Col><h2>Recipe Type</h2></Col><Col><Col></Col></Col>
        </Row>
        <Row>
          <Col></Col><Col><Col></Col><p>Total Calories</p></Col>
        </Row>
        <Row>
          <Col><p>Ingredients</p></Col><Col><Col></Col></Col>
        </Row>
        <Row>
          <Col><p>Item 1</p></Col><Col><Col></Col></Col>
        </Row>
        <Row>
          <Col><p>Item 2</p></Col><Col><Col></Col></Col>
        </Row>
        <Row>
          <Col><p>Instructions</p></Col><Col><Col></Col></Col>
        </Row>
        <Row>
          <Col><p>Step 1</p></Col><Col><Col></Col></Col>
        </Row>
        <Row>
          <Col><p>Step 2</p></Col><Col><Col></Col></Col>
        </Row>
      </div> </div>
      <Button href="/SList">Add to Shop List</Button>
      <ButtonGroup size='lg'>
        <Button href="/Recipe">Make Now</Button>
        <Button href="/mealplan">Add to Meal Plan</Button>
      </ButtonGroup>
      <Navi username={this.state.username} password={this.state.password} />
      </div>
    );
  }
}

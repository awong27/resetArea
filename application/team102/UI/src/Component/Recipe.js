import React, { Component } from 'react';
import { Container, Row, Col, Input, Form, FormGroup } from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import axios from "axios";
import RecipeData from "./RecipeData.js"


export default class Recipe extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeCarbs = this.onChangeCarbs.bind(this);
    this.onChangeFat = this.onChangeFat.bind(this);
    this.onChangeSugar = this.onChangeSugar.bind(this);
    this.onChangeSodium = this.onChangeSodium.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.searchRepClean = this.searchRepClean.bind(this);
    this.sort = this.sort.bind(this);
    const { match: { params } } = this.props;
    this.state = {
      creator: params.id,
      password: params.password,
      searches: "",
      recipedata: [],
      newrecipedata: [],
      newRecipes: [],
      recipename: "",
      recipeCalories: "",
      recipeCarbs: "",
      recipeFat: "",
      recipeProtein: "",
      recipeSugar: "",
      recipeSodium: "",
      addedRecipe: "",
      ingredients: [],
      recipeImage: "",
      fat: params.fat,
      calories: params.calories,
      carbs: params.carbs,
      sugar: params.sugar,
      date: "",
    };
  }
  searchRepClean() { this.setState({ newrecipedata: [] }); }
  onChangeSearch(e) { this.setState({ searches: e.target.value }); }
  onChangeCalories(e) { this.setState({ recipeCalories: e.target.value.replace(/\D/g, '') }); }
  onChangeCarbs(e) { this.setState({ recipeCarbs: e.target.value.replace(/\D/g, '') }); }
  onChangeSugar(e) { this.setState({ recipeSugar: e.target.value.replace(/\D/g, '') }); }
  onChangeSodium(e) { this.setState({ recipeSodium: e.target.value.replace(/\D/g, '') }); }
  onChangeProtein(e) { this.setState({ protein: e.target.value }); }
  onChangeFat(e) { this.setState({ recipeFat: e.target.value.replace(/\D/g, '') }); }
  /**onSubmit sends a search request to edamam api with current params */
  onSubmit(e) {
    e.preventDefault();
    axios
      .get(`https://api.edamam.com/search?q=${this.state.searches}&app_id=b53160ee&app_key=5d9984e95c5c6968d5edfb7d02c83b46&from=0&to=10&calories=0-${this.state.recipeCalories}${this.state.recipeFat}${this.state.recipeCarbs}${this.state.recipeSugar}${this.state.recipeSodium}`)
      .then(response => {
        this.setState({ newrecipedata: response.data.hits });
        this.sort();
      })
      .catch(error => {
        console.log(error);
      });
  }
  /** sort will take the new recipe data and only grab what is needed
   * and creates a new list of recipes for search results
   * cleans up results data
   */
  sort() {
    let newList = [];
    this.state.newrecipedata.map(currentfood => {
      let newR = {
        ingredients: [],
        recipeName: "",
        recipeImage: "",
        recipeCalories: "",
        recipeProtein: "",
        recipeFat: "",
        recipeCarbs: "",
        recipeSugar: "",
        recipeSodium: "",
        creator: this.state.creator,
        date: "",
      };
      newR.ingredients = currentfood.recipe.ingredientLines;
      newR.recipeName = currentfood.recipe.label;
      newR.recipeImage = currentfood.recipe.image;
      newR.recipeCalories = currentfood.recipe.calories;
      newR.recipeProtein = currentfood.recipe.totalNutrients.PROCNT.quantity;
      newR.recipeFat = currentfood.recipe.totalNutrients.FAT.quantity;
      newR.recipeCarbs = currentfood.recipe.totalNutrients.CHOCDF.quantity;
      newR.recipeSugar = currentfood.recipe.totalNutrients.SUGAR.quantity;
      newR.recipeSodium = currentfood.recipe.totalNutrients.NA.quantity;
      console.log(newR);
      newList.push(newR);
      return (null);
    })
    this.setState({
      newRecipes: newList
    })
    console.log(this.state.newRecipes);
    this.searchRepClean();
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/recipedata/")
      .then(response => {
        this.setState({ recipedata: response.data });
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
  addRecipe(newR) {
    axios
      .post("http://localhost:8080/recipedata/add", newR)
      .then(res => console.log(res.data));
    this.onChangeSearch("");
  };

  inventory() {
    const { match: { params } } = this.props;
    return this.state.recipedata.map(currentfood => {
      if (currentfood.creator === params.id) {
        return (
          <RecipeData
            food={currentfood}
            username={params.id}
            addRecipe={this.addRecipe}
            password={params.password}
            key={currentfood._id}
          />
        );
      } return (null);
    });
  }

  searchedRecipes() {
    const { match: { params } } = this.props;
    return this.state.newRecipes.map(currentfood => {
      return (
        <RecipeData
          food={currentfood}
          username={params.id}
          addRecipe={this.addRecipe}
          password={params.password}
          key={currentfood._id}
        />
      );
    });
  }
  restrictions() {
    return (
      <Form justified onSubmit={this.onSubmit}>
        <FormGroup>
          <Row>
            <Input
              type="text"
              placeholder="Search"
              style={{ width: '70vw' }}
              required
              className="form-control"
              value={this.state.searches}
              onChange={this.onChangeSearch}
            /> <Input
              type="submit"
              style={{ width: '30vw' }}
              value="Find"
              className="btn btn-secondary"
            /></Row>
        </FormGroup>
        <FormGroup style={{ display: "flex" }}>
          <Input
            type="select"
            style={{ width: '24vw', padding: '0' }}
            onChange={this.onChangeCalories}
            value={this.state.recipeCalories}>
            <option>Calories</option>
            <option>250  Cal</option>
            <option>500  Cal</option>
            <option>750  Cal</option>
            <option>1000  Cal</option>
            <option>1500  Cal</option>
          </Input>
          <Input
            type="select"
            style={{ width: '15vw', padding: '0' }}
            onChange={this.onChangeFat}
            value={this.state.recipeFat}>
            <option>Fat</option>
            <option>5 g</option>
            <option>10 g</option>
            <option>15 g</option>
            <option>20 g</option>
            <option>25 g</option>
            <option>30 g</option>
            <option>35 g</option>
            <option>40 g</option>
            <option>45 g</option>
            <option>50 g</option>
            <option>55 g</option>
            <option>60 g</option>
          </Input>
          <Input
            type="select"
            style={{ width: '19vw', padding: '0' }}
            value={this.state.recipeCarbs}
            onChange={this.onChangeCarbs}>
            <option>Carbs</option>
            <option>5 g</option>
            <option>10 g</option>
            <option>15 g</option>
            <option>20 g</option>
            <option>25 g</option>
            <option>30 g</option>
            <option>35 g</option>
            <option>40 g</option>
            <option>45 g</option>
            <option>50 g</option>
            <option>55 g</option>
            <option>60 g</option>
          </Input>
          <Input
            type="select"
            style={{ width: '23vw', padding: '0' }}
            value={this.state.recipeSodium}
            onChange={this.onChangeSodium}>
            <option>Sodium</option>
            <option>5 g</option>
            <option>10 g</option>
            <option>15 g</option>
            <option>20 g</option>
            <option>25 g</option>
            <option>30 g</option>
            <option>35 g</option>
            <option>40 g</option>
            <option>45 g</option>
            <option>50 g</option>
            <option>55 g</option>
            <option>60 g</option>
          </Input>
          <Input
            type="select"
            style={{ width: '19vw', padding: '0' }}
            value={this.state.recipeSugar}
            onChange={this.onChangeSugar}>
            <option>Sugar</option>
            <option>5 g</option>
            <option>10 g</option>
            <option>15 g</option>
            <option>20 g</option>
            <option>25 g</option>
            <option>30 g</option>
            <option>35 g</option>
            <option>40 g</option>
            <option>45 g</option>
            <option>50 g</option>
            <option>55 g</option>
            <option>60 g</option>
          </Input>
        </FormGroup>
      </Form>
    );
  }
  render() {
    return (
      <div><TopBar username={this.state.creator} password={this.state.password} />
        <Container className="fit-content">
          <Row><Col><h1>Recipes</h1></Col></Row>
          {this.restrictions()}
          {this.state.searches !== "" ? this.searchedRecipes() : this.inventory()}
          <br />
        </Container>
        <Navi username={this.state.creator} password={this.state.password} />
      </div>
    )
  }
}

/**var search = encodeURI(params.search);
    var calories = "";
    if (params.calories !== "NA") {
      calories = encodeURI(`${params.calories}`);
    }
    var fat = "";
    if (params.fat !== "NA") {
      fat = encodeURI(`&nutrients[FAT]=${params.fat}`);
    }
    var sugar = "";
    if (params.sugar !== "NA") {
      sugar = encodeURI(`&nutrients[SUGAR]=${params.sugar}`);
    }
    var carbs = "";
    if (params.carbs !== "NA") {
      carbs = encodeURI(`&nutrients[CHOCDF]=${params.carbs}`);
    }



    let ingredients = [];
          currentfood.recipe.ingredients.map(currentingredient => {
            console.log(currentingredient.text);
            ingredients.push(currentingredient.text);
            return (null);
          })


          recipedata.recipe.ingredients.map(currentingredient => {
      ingred = currentingredient.text;
      newR.ingredients.push(ingred);
      console.log(newR.ingredients);
      return (null);
    })
     */
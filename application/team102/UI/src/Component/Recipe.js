import React, { useState, Component } from 'react';
import {
  Container, Row, Col, Input, Button, ButtonGroup,
  Card, CardImg, Form, CardText, CardTitle, CardImgOverlay,
  FormGroup, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import axios from "axios";

//grabs recipe information
//displays as a rectangular picture with overlay text
//when clicked with have a pop up with more info
const Fooddata = props => {
  const { className } = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <Card className="bigdes" body inverse='true'>
      <CardImg alt="recipeItem" src={props.food.recipeImage} />
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}><h3>{props.food.recipeName}</h3></ModalHeader>
        <ModalBody>
          <h4>Calories:{props.food.recipeCalories}</h4>
          <h4>Carbs:{props.food.recipeCarbs}</h4>
          <h4>Sugar:{props.food.recipeSugar}</h4>
          <h4>Protein:{props.food.recipeProtein}</h4>
          <h4>Fat:{props.food.recipeFat}</h4>
          <img alt={props.food.recipeName} src={props.food.recipeImage} height="50%" width="100%" />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup className="itemOptbtn">
            <Button onClick={() => { props.deleteItems(props.food._id); }}>

            </Button>
            <Button>
              <CardText>Add to Meal Plan</CardText>
            </Button>
            <Button onClick={() => "/create" + props.food._id}>

            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>
      <CardImgOverlay onClick={toggle} style={{ backgroundColor: "rgba(0, 0, 0, 0.375)" }}>
        <CardTitle position='fixed'><h4>{props.food.recipeName}</h4></CardTitle>
        <CardText>Calories: {props.food.recipeCalories > 0 ? Math.round(props.food.recipeCalories) : 0}</CardText>
      </CardImgOverlay>
    </Card>
  );
}
//grabs search results
const Recipedata = props => (
  <tr>{props.food.recipe.label}</tr>
);

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
    const { match: { params } } = this.props;

    this.state = {
      creator: params.id,
      password: params.password,
      searches: "",
      recipedata: [],
      newrecipedata: [],
      newRecipes: [],
      recipename: "",
      recipeCalories: "NA",
      recipeCarbs: "NA",
      recipeFat: "NA",
      recipeProtein: "NA",
      recipeSugar: "NA",
      recipeSodium: "NA",
      addedRecipe: "",
      ingredients: [],
      recipeImage: "",
      fat: params.fat,
      calories: params.calories,
      carbs: params.carbs,
      sugar: params.sugar
    };
  }
  onChangeSearch(e) {
    this.setState({
      searches: e.target.value
    });
  }
  onChangeCalories(e) {
    this.setState({
      recipeCalories: e.target.value.replace(/\D/g, '')
    });
    console.log(this.state.recipeCalories)
  }
  onChangeCarbs(e) {
    this.setState({
      recipeCarbs: e.target.value.replace(/\D/g, '')
    });
  }
  onChangeSugar(e) {
    this.setState({
      recipeSugar: e.target.value.replace(/\D/g, '')
    });
  }
  onChangeSodium(e) {
    this.setState({
      recipeSodium: e.target.value.replace(/\D/g, '')
    });
  }
  onChangeProtein(e) {
    this.setState({
      protein: e.target.value
    });
  }
  onChangeFat(e) {
    this.setState({
      recipeFat: e.target.value.replace(/\D/g, '')
    });
  }
  onSubmit(e) {
    e.preventDefault();
    axios
      .get("https://api.edamam.com/search?q=chicken&app_id=b53160ee&app_key=5d9984e95c5c6968d5edfb7d02c83b46&from=0&to=3&calories=591-722&health=alcohol-free")
      .then(response => {
        let newrec = [];
        var label;
        //console.log(response.data);
        this.setState({
          newrecipedata: response.data.hits
        });
        this.state.newrecipedata.map(currentfood => {
          console.log(currentfood.recipe.label);
          label = currentfood.recipe.label;
          console.log(label);
          newrec.push(label);
          console.log(newrec);
          currentfood.recipe.ingredients.map(currentingredient => {
            console.log(currentingredient.text);
            return (null);
          })
          return (null);

        })
        console.log(newrec);
        this.setState({
          newRecipes: newrec
        })
        console.log(this.state.newRecipes);
      })
    var addRec = "/addRecipe/" + this.state.creator + "/" + this.state.password + "/" + this.state.searches + "/" + this.state.recipeSugar + "/" + this.state.recipeFat + "/" + this.state.recipeCarbs + "/" + this.state.recipeCalories
    window.location = addRec
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
  componentDidUpdate(props) {
    const { match: { params } } = this.props;
    //console.log({itemid});
    var search = encodeURI(params.search);
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
    axios
      .get(`https://api.edamam.com/search?q=${search}&app_id=b53160ee&app_key=5d9984e95c5c6968d5edfb7d02c83b46&from=0&to=10&calories=0-${calories}${fat}${carbs}${sugar}`)
      .then(response => {
        //let newrec = [];
        this.setState({ recipedata: response.data.hits });
        console.log(this.state.recipedata);
        this.state.recipedata.map(currentfood => {
          console.log(currentfood.recipe.label);
          return(null);
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
  addRecipe(name, recipedata, user) {
    console.log(recipedata);
    var ingred = "";
    const newR = {
      ingredients: [],
      recipeName: "",
      recipeImage: "",
      recipeCalories: "",
      recipeProtein: "",
      recipeFat: "",
      recipeCarbs: "",
      recipeSugar: "",
      creator: user,
    };
    //const {match:{params}} = this.props;

    newR.recipeName = recipedata.recipe.label;
    newR.recipeProtein = recipedata.recipe.totalNutrients.PROCNT.quantity;
    newR.recipeImage = recipedata.recipe.image;
    newR.recipeCalories = recipedata.recipe.calories;
    newR.recipeFat = recipedata.recipe.totalNutrients.FAT.quantity;
    newR.recipeCarbs = recipedata.recipe.totalNutrients.CHOCDF.quantity;
    newR.recipeSugar = recipedata.recipe.totalNutrients.SUGAR.quantity;

    recipedata.recipe.ingredients.map(currentingredient => {
      ingred = currentingredient.text;
      newR.ingredients.push(ingred);
      console.log(newR.ingredients);
      return(null);
    })
    /*    
                  const newR = {
                recipeName : this.state.recipename,
                ingredients : this.state.newrec,
              }  
               console.log(newR);
    */
    console.log(newR);
    axios
      .post("http://localhost:8080/recipedata/add", newR)
      .then(res => console.log(res.data));
  };

  inventory() {
    const { match: { params } } = this.props;
    return this.state.recipedata.map(currentfood => {
      if (currentfood.creator === params.id) {
        return (
          <Fooddata
            food={currentfood}
            username={params.id}
            password={params.password}
            deleteItems={this.deleteItems}
            key={currentfood._id}
          />
        );
      } return (null);
    });
  }

  searchedRecipes() {
    //const { match: { params } } = this.props;
    return this.state.newrecipedata.map(currentfood => {
      return (
        <Recipedata
          recipedata={this.state.recipedata}
          food={currentfood}
          deleteItems={this.deleteItems}
          addRecipe={this.addRecipe}
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
          {this.inventory()}
          <br />
        </Container>
        <Navi username={this.state.creator} password={this.state.password} />
      </div>
    )
  }
}

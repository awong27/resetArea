import React, {useState, Component} from 'react';
import {Container, Row, Col, Input, Button, ButtonGroup, Card, CardImg, Form, CardText, CardFooter, CardHeader, FormGroup, NavLink,  Modal, ModalHeader, ModalBody, ModalFooter, CardBody} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import axios from "axios";


const Fooddata = props => {
/*  <tr>
    <td></td>
    <td>{props.food.recipeImage}</td>
    <td>{props.food.recipeCarbs}</td>
    <td>{props.food.recipeProtein}</td>
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
    </td><NavLink to = {"/inRep/"+props.username+"/"+props.password+"/"+props.food.recipeName}></NavLink>
  </tr>*/
  const {className} = props;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
  <Card className="bigdes ">
    <CardImg alt="recipeItem" onClick={toggle} src={props.food.recipeImage}/>
    <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}><h3>{props.food.recipeName}</h3></ModalHeader>
        <ModalBody>
          <h4>Calories:{props.food.recipeCalories}</h4>
          <h4>Carbs:{props.food.recipeCarbs}</h4>
          <h4>Sugar:{props.food.recipeSugar}</h4>
          <h4>Protein:{props.food.recipeProtein}</h4>
          <h4>Fat:{props.food.recipeFat}</h4>
          <img src={props.food.recipeImage} height="50%" width="100%"/>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup className="itemOptions">
            <Button onClick={() => {props.deleteItems(props.food.recipe_id);}}>
              <img alt="delete"  />
            </Button>
            <Button>
              <CardText></CardText>
            </Button>
            <Button onClick={() => "/create" + props.food.recipe_id}>
              <img alt="eat"  />
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </Modal>

      <CardHeader>
        <ButtonGroup className="itemHead">
          <Button>

          </Button>
          <Button>
            <CardText>{props.food.recipeName}</CardText>
          </Button>
          <Button>
            <CardText>{props.food.recipeCalories}</CardText>
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody position='center'>
          
      </CardBody>
      <CardFooter>
        <ButtonGroup className="itemOptions">
          <Button onClick={() => {props.deleteItems(props.food.recipe_id);}}>
            <img alt="delete"  />
          </Button>
          <Button>
            <CardText></CardText>
          </Button>
          <Button onClick={() => "/create" + props.food.recipe_id}>
            <img alt="eat"  />
          </Button>
        </ButtonGroup>
      </CardFooter>
  </Card>
  );
}
//grabs search results
const Recipedata = props =>(
  <tr>{props.food.recipe.label}</tr>
);

//grabs recipe photo and name
/*const RecipeData = (props) => (
  <Row>
    <Card className="bigdes ">
      <CardImg alt="recipeItem" src={Tphoto}/>            
    </Card>  
  </Row>*/
export default class Recipe extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeCarbs = this.onChangeCarbs.bind(this);
    this.onChangeFat = this.onChangeFat.bind(this);
    this.onChangeSugar = this.onChangeSugar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.deleteItems = this.deleteItems.bind(this);
    const {match:{params}} = this.props;

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


    };
  }

  onChangeSearch(e) {
    this.setState({
      searches: e.target.value
    });
  }

  onChangeCalories(e){
    this.setState({
      recipeCalories:e.target.value
    });
  }

  onChangeCarbs(e){
    this.setState({
      recipeCarbs:e.target.value
    });
  }
  onChangeSugar(e){
    this.setState({
      recipeSugar:e.target.value
    });
  }
  onChangeProtein(e){
    this.setState({
      protein:e.target.value
    });
  }
  onChangeFat(e){
    this.setState({
      recipeFat:e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
        axios
          .get("https://api.edamam.com/search?q=chicken&app_id=b53160ee&app_key=5d9984e95c5c6968d5edfb7d02c83b46&from=0&to=3&calories=591-722&health=alcohol-free")
          .then(response => {
            let newrec = [];
            var label;
            //console.log(response.data);
              this.setState({
              newrecipedata:response.data.hits});
              this.state.newrecipedata.map(currentfood=>{
              console.log(currentfood.recipe.label);
              label = currentfood.recipe.label;
              console.log(label);
              newrec.push(label);
              console.log(newrec);
              currentfood.recipe.ingredients.map(currentingredient=>{
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
    var addRec="/addRecipe/"+this.state.creator+"/"+this.state.password+"/"+this.state.searches+"/"+this.state.recipeSugar+"/"+this.state.recipeFat+"/"+this.state.recipeCarbs+"/"+this.state.recipeCalories
    window.location=addRec



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
/*  addRecipe(id){
    const ingredient = {
      ingredientName : this.state.ingredients
    }
    const recipes = {
      recipeName: this.state.recipename,
      creator: this.state.creator,
      recipeCalories: this.state.recipeCalories,
      recipeCarbs: this.state.recipeCarbs,
      recipeProtein: this.state.recipeProtein,
      recipeFat: this.state.recipeFat,
      ingredients: ingredient
    }

    this.state.newrecipedata.map(currentfood=>{
    console.log(currentfood.recipe.label);
    label = currentfood.recipe.label;
    console.log(label);
    newrec.push(label);
    console.log(newrec);
    currentfood.recipe.ingredients.map(currentingredient=>{
      console.log(currentingredient.text);

    })


  })



    console.log(recipe);
    axios
      .post("http://localhost:8080/recipedata/add", recipe)
      .then(res => console.log(res.data));


  }*/

  inventory() {
    const {match:{params}} = this.props;
    return this.state.recipedata.map(currentfood => {
      if(currentfood.creator===params.id){
        return (
          <Fooddata
            food={currentfood}
            username={params.id}
            password={params.password}

            deleteItems={this.deleteItems}
            key={currentfood._id}
            />
          );} return (null);
    });
  }

  searchedRecipes() {

    return this.state.newrecipedata.map(currentfood => {

        return (
          <Recipedata
            food={currentfood}
            deleteItems={this.deleteItems}
            key={currentfood._id}
            />
          );
    });
  }

/*  onSubmit(e){
    e.preventDefault();

        axios
          .get("https://api.edamam.com/search?q=chicken&app_id=b53160ee&app_key=5d9984e95c5c6968d5edfb7d02c83b46&from=0&to=3&calories=591-722&health=alcohol-free")
          .then(response => {
          console.log(response.data);
          //  this.setState({
        //    foods:response.data.foods[0].foodNutrients});
          /*  this.state.foods.map(currentfood=>{
              console.log(currentfood);
              if(currentfood.nutrientName=="Protein"){
                this.state.protein = currentfood.value.toString(10);
              }
              if(currentfood.nutrientName=="Total lipid (fat)"){
                this.state.fat= currentfood.value.toString(10);
              }
              if(currentfood.nutrientName=="Carbohydrate, by difference"){
                this.state.carbs= currentfood.value.toString(10);
              }
              if(currentfood.nutrientName=="Energy"){
                this.state.calories=currentfood.value.toString(10);
              }
              if(currentfood.nutrientName=="Sugars, total including NLEA"){
                this.state.sugar=currentfood.value.toString(10);
              }

            })

          }*/

  
  restrictions() {
    return (
      <Form inline justified>
        <FormGroup>
          <Input type="select">
            <option>Calories</option>
            <option>250  Cal</option>
            <option>500  Cal</option>
            <option>750  Cal</option>
            <option>1000  Cal</option>
            <option>1500  Cal</option>
          </Input>
        </FormGroup> 
        <FormGroup>
          <Input type="select">
            <option>Fat</option>
            <option>Fat</option>
            <option>Fat</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select">
            <option>Carbs</option>
            <option>Carbs</option>
            <option>Carbs</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select">
            <option>Sodium</option>
            <option>Sodium</option>
            <option>Sodium</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select">
            <option>Sugar</option>
            <option>Sugar</option>
            <option>Sugar</option>
          </Input>
        </FormGroup>
      </Form>
    );
  }
  render() {
    return (        
      <div><TopBar username={this.state.username} password={this.state.password}/> <br/><br/><br/>
      <Container className="fit-content"> 
        <Row><Col><h1>Recipes</h1></Col></Row>
        <Row><Col xs='1'/><Col><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col><Col xs='1'/></Row>
        {this.restrictions()}

        {this.inventory()}        
      </Container>    
        <Navi username={this.state.password} password={this.state.password}/>
      </div>  
    )
  }
}
//<Navi username={this.state.username} password={this.state.password}/>
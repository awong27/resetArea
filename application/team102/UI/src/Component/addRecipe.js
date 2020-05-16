import React, { Component} from 'react';
import {Table, Button, Row, Col, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import axios from "axios";

const Recipedata = props => (
  <tr>

  <td>
  <a href={"/Recipe/"+ props.username+"/"+props.password} onClick={()=>{props.addRecipe(props.recipedata.label,props.food,props.username)
  }}
  >{props.food.recipe.label}</a></td>
    <td><img src={props.food.recipe.image} height="200" width="200"></img></td>
    <td>{props.food.recipe.source}</td>
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

export default class Recipe extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
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
      addedRecipe: "",
      ingredients: [],
      recipeImage:"",
      recipeSugar:""


    };
  }

  componentDidMount() {
    const {match:{params}} = this.props;

    //console.log({itemid});
    var search = encodeURI(params.search);
    var fat = encodeURI(`nutrients[FAT]=${params.fat}`);
    var sugar = encodeURI(`nutrients[SUGAR]=${params.sugar}`);
    var carbs = encodeURI(`nutrients[CHOCDF]=${params.carbs}`);
    axios
      .get(`https://api.edamam.com/search?q=${search}&app_id=b53160ee&app_key=5d9984e95c5c6968d5edfb7d02c83b46&from=0&to=10&calories=0-${params.calories}&${fat}&${carbs}&${sugar}`)
      .then(response => {
        let newrec = [];
        this.setState({ recipedata: response.data.hits });
        console.log(this.state.recipedata);
        this.state.recipedata.map(currentfood=>{
          console.log(currentfood.recipe.label);
        })

      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeSearch(e) {
    this.setState({
      searches: e.target.value
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
              recipedata:response.data.hits});
              console.log(this.state.recipedata);

          /*    this.state.newrecipedata.map(currentfood=>{
              console.log(currentfood.recipe.label);
              label = currentfood.recipe.label;
              console.log(label);

              currentfood.recipe.ingredients.map(currentingredient=>{
                console.log(currentingredient.text);
                newrec.push(currentingredient.text);
                console.log(newrec);

              })


            })
            console.log(newrec);
            this.setState({
              newRecipes: newrec
            })*/
            //console.log(this.state.newRecipes);
            this.searchedRecipes();
          })

          /*console.log(recipe);
          axios
            .post("http://localhost:8080/recipedata/add", recipe)
            .then(res => console.log(res.data));
*/
}

addRecipe(name, recipedata,user){
  console.log(recipedata);
  var ingred="";
  const newR={
           ingredients:[],
           recipeName:"",
           recipeImage:"",
           recipeCalories: "",
           recipeProtein: "",
           recipeFat:"",
           recipeCarbs:"",
           recipeSugar:"",
           creator:user,

};
          //const {match:{params}} = this.props;

          newR.recipeName= recipedata.recipe.label;
          newR.recipeProtein = recipedata.recipe.totalNutrients.PROCNT.quantity;
          newR.recipeImage=recipedata.recipe.image;
          newR.recipeCalories = recipedata.recipe.calories;
          newR.recipeFat = recipedata.recipe.totalNutrients.FAT.quantity;
          newR.recipeCarbs = recipedata.recipe.totalNutrients.CHOCDF.quantity;
          newR.recipeSugar = recipedata.recipe.totalNutrients.SUGAR.quantity;

          recipedata.recipe.ingredients.map(currentingredient=>{
                ingred = currentingredient.text;
                newR.ingredients.push(ingred);
                console.log(newR.ingredients);


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


deleteItems(id) {
  axios
    .delete("http://localhost:8080/recipedata/" + id)
    .then(res => console.log(res.data));
  this.setState({
    recipedata: this.state.recipedata.filter(el => el._id !== id)
  });
}

searchedRecipes() {
  const {match:{params}} = this.props;

  return this.state.recipedata.map(currentfood => {

      return (
        <Recipedata
          recipedata={this.state.recipedata}
          password={this.state.password}

          username={params.id}
          food={currentfood}
          deleteItems={this.deleteItems}
          addRecipe = {this.addRecipe}
          key={currentfood._id}
          />
        );
  });
}




  render(){


    return (
      <div><TopBar/>
      <br/><br/><br/>
      <div><h1>Recipes</h1></div>
      <Table hover>
        <thead>
          <tr>
            <th>Recipe</th>
            <th>Image</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.searchedRecipes()}
        </tbody>
      </Table>
      <div className="listItem">
      <Button className="invBar"><Row>
        <Col className="itemName">Banana</Col><Col className="expire">3/15</Col><Col className="quantity">4</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Beef Shank</Col><Col className="expire">4/8</Col><Col className="quantity">1</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Kiwi</Col><Col className="expire">9/1</Col><Col className="quantity">6</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Bread</Col><Col className="expire">2/10</Col><Col className="quantity">12</Col><Col className="actions"></Col>
      </Row></Button>
      <Button className="invBar"><Row>
        <Col className="itemName">Tomato</Col><Col className="expire">6/24</Col><Col className="quantity">3</Col><Col className="actions"></Col>
      </Row></Button></div>
      <ButtonGroup size='lg'>
        <Button href="/create">Delete</Button>
        <Button href="/create">Scan</Button>
        <Button href="/create">Eat</Button>
      </ButtonGroup>
      <Navi username={this.state.creator} password={this.state.password} />
      </div>
    );
  }
}

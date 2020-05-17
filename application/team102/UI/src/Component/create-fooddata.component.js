import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
//import Navi from "./Navigation";
//import TopBar from "./TopBar";
import { NavLink, FormGroup, Label, Form, Input, Button, ButtonGroup, Row, Col } from "reactstrap";

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
    this.onAddList = this.onAddList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      foodname: "",
      expirationdate: new Date(),
      calories: "",
      numberOfItems: "",
      carbs: "",
      sugar: "",
      fat: "",
      protein: "",
      sodium: "",
      foods: [],
      userdata: [],
      addList: [],
      password: params.password,
      username: params.id,
      count: 0
    };
  }
  // change activations for prop states
  onChangeFoodname(e) { this.setState({ foodname: e.target.value }); }
  onChangeExpirationdate(date) { this.setState({ expirationdate: date }); }
  onChangeCalories(e) { this.setState({ calories: e.target.value }); }
  onChangeNumberOfItems(e) { this.setState({ numberOfItems: e.target.value }); }
  onChangeCarbs(e) { this.setState({ carbs: e.target.value }); }
  onChangeSugar(e) { this.setState({ sugar: e.target.value }); }
  onChangeFat(e) { this.setState({ fat: e.target.value }); }
  onChangeProtein(e) { this.setState({ protein: e.target.value }); }
  onChangeSodium(e) { this.setState({ sodium: e.target.value }); }
  onAddList(n,e,q){this.setState({addList: [this.state.addList, {n,e,q}]});}
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
          console.log(currentfood.value);
          if (currentfood.nutrientName === 'Energy') {
            this.onChangeCalories(Math.round(currentfood.value));
          } else if (currentfood.nutrientName === 'Carbohydrate, by difference') {
            this.onChangeCarbs(Math.round(currentfood.value));
          } else if (currentfood.nutrientName === 'Total lipid (fat)') {
            this.onChangeFat(Math.round(currentfood.value));
          } else if (currentfood.nutrientName === 'Protein') {
            this.onChangeProtein(Math.round(currentfood.value));
          } else if (currentfood.nutrientName === 'Sugars, total including NLEA') {
            this.onChangeSugar(Math.round(currentfood.value));
          } else if (currentfood.nutrientName === 'Sodium, Na') {
            this.onChangeSodium(Math.round(currentfood.value));
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
        this.onAddList(this.state.foodname,this.state.expirationdate,this.state.numberOfItems);
        axios
          .post("/fooddata/add", food)
          .then(res => console.log(res.data));
      })
      .catch(error => {
        console.log(error);
      });
  }
  AddList() {
    return(<>
      {this.state.addList.map((n,e,q) => (
        <Row>
          <Col key={n}>{n}</Col><Col key={e}>{e}</Col><Col key={q}>{q}</Col>
        </Row>
      ))}</>
    );
  }
  render() {
    var inv = "/inventory/" + this.state.username + "/" + this.state.password
    return (<div style={{padding: '5%'}}><h3>Create New Food Items</h3> 
      {this.AddList()}
      <Form onSubmit={this.onSubmit}>        
        <FormGroup >
          <Label for="foodName">Food Name:</Label>
          <Input
            type="text"
            required
            placeholder="What Food Are You Looking For?"
            value={this.state.foodname}
            onChange={this.onChangeFoodname} />
        </FormGroup>
        <Row> 
          <Col >
            <FormGroup>
              <Label for="ExpDate">Exp. Date:</Label>
              <DatePicker
                required
                selected={this.state.expirationdate}
                onChange={this.onChangeExpirationdate} />
            </FormGroup>
          </Col> 
          <Col >
            <FormGroup>
              <Label for="qty">Quantity:</Label>
              <Input
                type="select"
                style={{height: 'auto', width: 'auto'}}
                value={this.state.numberOfItems}
                onChange={this.onChangeNumberOfItems}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>3</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </Input>
            </FormGroup>
          </Col>
        </Row><Button size='lg' className="SignSpace form-control input" type="submit" value="Create food"> Submit </Button>
      </Form>
      
      <ButtonGroup size='lg' className="SignSpace" style={{boxSizing: 'content-box'}}>
        <Button href={inv}>Go Back</Button>
        <Button className="lightState" >Create</Button>
        <Button href="/scan" >Scan</Button>
      </ButtonGroup>
    </div>
    );
  }
}
/**
 *
 *
 */
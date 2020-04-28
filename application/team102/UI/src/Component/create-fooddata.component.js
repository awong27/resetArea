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
    this.onChangeCarbs = this.onChangeCarbs.bind(this);
    this.onChangeNumberOfItems = this.onChangeNumberOfItems.bind(this);
    this.onChangeSugar=this.onChangeSugar.bind(this);
    this.onChangeFat=this.onChangeFat.bind(this);
    this.onChangeProtein=this.onChangeProtein.bind(this);

    this.onSubmit = this.onSubmit.bind(this);





    this.state = {
      foodname: "",
      expirationdate: "",
      calories: "",
      numberOfItems: "",
      carbs:"",
      sugar:"",
      fat:"",
      protein:0,
      foods:[],



    };
  }



  onChangeFoodname(e) {
    this.setState({
      foodname: e.target.value
    });
  }
  onChangeFat(e){
    this.setState({
      fat:e.target.value
    });
  }
  onChangeSugar(e){
    this.setState({
      sugar:e.target.value
    });
  }
  onChangeProtein(e){
    this.setState({
      protein:e.target.value
    });
  }
  onChangeCarbs(e){
    this.setState({
      carbs:e.target.value
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



  onSubmit(e) {
    e.preventDefault();
    var proteins;


    axios
      .get("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=ldLF1ky8NkwmcLnTDvqDoSjul1eanGZ1o6vZ2Q9u&query="+this.state.foodname)
      .then(response => {
        console.log(response.data.foods[0].foodNutrients[0]);
        this.setState({
        foods:response.data.foods[0].foodNutrients});
        this.state.foods.map(currentfood=>{
          //if(currentfood.nutrientName=="Protein"){
            //this.state.protein=currentfood.value
            console.log(currentfood.value);
            proteins=currentfood.value;

          //}
        })

      })
      .catch(error => {
        console.log(error);
      });

    const food = {
      foodName: this.state.foodname,
      expirationDate: this.state.expirationdate,
      calories: this.state.calories,
      numOfItems: this.state.numberOfItems,
      carbs:this.state.carbs,
      protein:proteins,
      fat:this.state.fat,
      sugar:this.state.sugar,

    };

    console.log(food);
    axios
      .post("/fooddata/add", food)
      .then(res => console.log(res.data));

    //window.location = "/";
  }




  render(){


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

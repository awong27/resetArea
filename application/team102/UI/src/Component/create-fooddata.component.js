import React, { Component } from "react";
import DatePicker from "react-datepicker";
import MediaHandler from './MediaHandler';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import cam from "./cameraIcon.svg"
import { FormGroup, Label, Form, Input, Button, ButtonGroup, Row, Col } from "reactstrap";
const gatewayUrl = process.env.gatewayUrl || 'http://localhost:3004';

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
    this.mediaHandler = new MediaHandler();
    this.state = {
      foodname: "",
      expirationdate: new Date(),
      calories: "",
      numberOfItems: "1",
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
      count: 0,
      hasMedia: false,
      imageString: "",
      rawData: [],
      pop: false,
      show: false,
    };
  }
  // change activations for prop states
  onChangeFoodname(e) { this.setState({ foodname: e.target.value }); }
  onChangeExpirationdate(date) { this.setState({ expirationdate: date }); }
  onChangeCalories(e) { this.setState({ calories: e }); }
  onChangeNumberOfItems(e) { this.setState({ numberOfItems: e.target.value }); }
  onChangeCarbs(e) { this.setState({ carbs: e }); }
  onChangeSugar(e) { this.setState({ sugar: e }); }
  onChangeFat(e) { this.setState({ fat: e }); }
  onChangeProtein(e) { this.setState({ protein: e }); }
  onChangeSodium(e) { this.setState({ sodium: e }); }

  toInv() { // only things passed to the final list is allowed
    this.state.addList.map(item => {
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
            } return (null);
          })
          /* adds all values into a temp list
           * sends to backend to be added to personal id food list
           */
          const food = {
            foodName: item.foodname,
            expirationDate: item.expdate,
            calories: this.state.calories,
            numOfItems: item.qty,
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
    })
    this.setState({ addList: [] });
  }
  onSubmit(e) {
    e.preventDefault();
    //const date = (this.state.expirationdate.getMonth() + 1).toString() + "/" + (this.state.expirationdate.getDate()).toString() + "/" + (this.state.expirationdate.getFullYear()).toString();
    //var list = this.state.addList.concat(this.state.foodname + " " + date+" "+ this.state.numberOfItems);
    //console.log(this.state.expirationdate);
    var list = { foodname: "", expdate: new Date(), qty: "1" };
    list.foodname = this.state.foodname;
    list.expdate = this.state.expirationdate;
    list.qty = this.state.numberOfItems;
    console.log(list);
    this.setState({ addList: [list, this.state.addList] });
  }
  AddList() {//{(item.expdate.getMonth() + 1).toString() + "/" + (item.expdate.getDate()).toString() + "/" + (item.expdate.getFullYear()).toString()}
    this.state.addList.map((item) => {
        return (<Row>
          <Col >{item.foodname}</Col> 
          <Col></Col>
          <Col>{item.qty}</Col>
        </Row>
      )}
    )
  }
  componentDidMount() {
    this.mediaHandler.getPermissions()
      .then((stream) => {
        this.setState({ hasMedia: true });
        try {
          this.myVideo.srcObject = stream;
        } catch (e) {
          this.myVideo.src = URL.createObjectURL(stream);
        }
        this.myVideo.play();
      })
  }
  captureImage = () => { // takes picture
    console.log('inside captureImage function')
    const context = this.canvas.getContext('2d');
    context.drawImage(this.myVideo, 0, 0, 400, 350);
    const image = this.canvas.toDataURL('image/jpeg', 0.5);
    this.setState({ imageString: image });
    this.processImage();
  }
  processImage = () => { // sends and grabs data
    console.log('inside processImage function')
    const url = 'http://localhost:3010/api/image/save';
    const img = this.state.imageString;
    if (img !== "") {
      let formData = new FormData();
      formData.set('file', img);
      axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        console.log(res.data);
        this.setState({ rawData: res.data });
        this.processData();
      }).catch((e) => {
        console.log(e)
      });
    }
  }
  processData = () => {// returns a array with description and qty
    const processedData = [];
    let hashKey = {};
    this.state.rawData.forEach((item) => {
      if (hashKey.hasOwnProperty(item)) {
        hashKey[item] += 1;
      } else {
        hashKey[item] = 1;
      }
    });
    Object.keys(hashKey).forEach((k) => {
      let newItem = { description: "", quantity: 0 };
      newItem.description = k;
      newItem.quantity = hashKey[k];
      processedData.push({ newItem });
      /*processedData.push({
        description: k,
        quantity: hashKey[k]
      })*/
    })
    console.log(hashKey);
    console.log(processedData);
    this.setState({ foods: processedData });
  }
  scan() { // shows scanner pop up
    return (
      <div className="container">
        <div className="video-container">
          <video className="video" width="400" height="350" ref={(ref) => { this.myVideo = ref; }}></video>
        </div>
        <Button id="capture" onClick={this.captureImage}>Scan</Button>
        <Button onClick={() => this.setState({show: !this.state.show})} >Back</Button>
        <div className="image-container">
          <canvas ref={(canvas) => { this.canvas = canvas }} width='400' height='350' ></canvas>
        </div>
      </div>
    );
  }
  onScan() { // scanned submit form, name and qty should be filled in, expdate required
    return this.state.foods.map(newI => {
      return (
        <Form onSubmit={this.onSubmit}>
          <FormGroup >
            <Input
              value={this.state.foodname}
              selected={newI.description}
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
                  style={{ height: 'auto', width: 'auto' }}
                  value={this.state.numberOfItems}
                  selected={newI.quantity}
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
          </Row>
          <Button className="form-control input" type="submit" value="Create food"> Add Item </Button>
        </Form>
      );
    })
  }
  manualSubmit() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup >
          <Label for="foodName">Food Name:</Label>
          <Input
            type="text"
            required
            placeholder="What Food Are You Looking For?"
            className="form-control"
            value={this.state.foodname}
            onChange={this.onChangeFoodname} />
        </FormGroup>
        <FormGroup><Row>
          <Col >
            <Label for="ExpDate">Exp. Date:</Label>
            <DatePicker
              required
              selected={this.state.expirationdate}
              onChange={this.onChangeExpirationdate} />
          </Col>
          <Col >
            <Label for="qty">Quantity:</Label>
            <Input
              type="select"
              style={{ height: 'auto', width: 'auto' }}
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
          </Col>
        </Row>
        </FormGroup><Button size='lg' className="SignSpace form-control input" type="submit" value="Create food"> Submit </Button>
      </Form>
    );
  }
  render() {
    var inv = "/inventory/" + this.state.username + "/" + this.state.password
    return (<div style={{ height: "100%", width: "100%" }}>
      {this.manualSubmit()} {this.AddList()}
      {this.state.pop === true ? this.onScan() : ""}
      {this.state.show === true ? this.scan() : ""}
      <ButtonGroup size='lg' className="SignSpace" style={{ boxSizing: 'content-box', position: "fixed", right: "-10vw", bottom: "0px", display: "flex", minWidth: "100vw" }} >
        <Button href={inv}>Back</Button>
        <Button onClick={() => this.toInv()}> Add List To Inventory</Button>
        <Button onClick={() => this.setState({show: !this.state.show})} >Scan</Button>
      </ButtonGroup>
      <div style={{ top: "300px", height: "100%", width: "100%" }}></div>
    </div>
    );
  }
}
/**
 *{this.AddList()}
 *
 */
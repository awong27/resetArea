import React, {useState} from 'react';
import Rounded from "react-rounded-image";
import Tphoto from "./thanos.png";
import { Container, Row, Col} from "reactstrap";
import Navi from "./Navigation";
import Fphoto from "./fridgeIcomn.png";
import Mphoto from "./mealplanicon.png";
import Dphoto from "./plate.png";
//<h1>Homepage!<h2>Get your fridge in order</h2></h1>   
const Home = () => (
    <div align = "center" >    
       
      <Container >
        <Row><Col>     <br/>    </Col></Row>
        <Row><Col>     <br/>    </Col></Row>
        <Row>
        <Col><Rounded image={Tphoto} roundedSize="1" imageWidth = "300" imageHeight = "300"/> </Col>
        </Row>
        <Row><Col>     <br/>    </Col></Row>
        <Row><Col>     <br/>    </Col></Row>
        <Row>
          <Col><Rounded image={Mphoto} roundedSize="1" imageWidth = "100" imageHeight = "100"/> </Col>
          <Col><Rounded image={Dphoto} roundedSize="1" imageWidth = "100" imageHeight = "100"/> </Col>
          <Col><Rounded image={Fphoto} roundedSize="1" imageWidth = "100" imageHeight = "100"/> </Col>
        </Row>
        <Row><Col>     <br/>    </Col></Row>
        <Row><Col>     <br/>     </Col></Row>
      </Container>
      <Navi />
    </div>);
export default Home;

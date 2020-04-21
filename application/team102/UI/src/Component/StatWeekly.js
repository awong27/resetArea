import React, { Component} from 'react';
import {Progress,Container, Row, Col, Table, Button, ButtonGroup} from 'reactstrap';
import Navi from "./Navigation";
import TopBar from "./TopBar"; 

export default class StatWeekly extends Component {
  render() {
    return (             
      <Container><TopBar/><br/><br/>
      <Row><Col><h1>Statistics</h1></Col></Row>
      <Row><Col>        </Col></Row>
      <Row> <Col xs="1"></Col>
      <Col> <Progress multi>
          <Progress bar value="15" />
          <Progress bar color="success" value="30" />
          <Progress bar color="info" value="25" />
          <Progress bar color="warning" value="20" />
          <Progress bar color="danger" value="5" />
          </Progress> 
      </Col> <Col xs="1"></Col>
      </Row>               
      <Row><Col xs="1"></Col>
      <Col><Table responsive striped>
    <thead>
      <tr>
        <th></th> <th>S</th> <th>M</th> <th>T</th> <th>W</th>
        <th>Th</th> <th>F</th> <th>S</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Calories</th>
        <td>2121</td> <td>1930</td> <td>1820</td>
        <td>2206</td> <td>1878</td> <td>2002</td> <td>1945</td>
      </tr>
      <tr>
        <th scope="row">Fats</th>
        <td>80</td> <td>71</td> <td>67</td>
        <td>78</td> <td>62</td> <td>53</td><td>40</td>
      </tr>
      <tr>
        <th scope="row">Sodium</th>
        <td>21</td> <td>18</td> <td>21</td>
        <td>17</td> <td>25</td> <td>16</td><td>26</td>
      </tr>
      <tr>
        <th scope="row">Protien</th>
        <td>87</td> <td>49</td> <td>63</td>
        <td>56</td> <td>75</td> <td>54</td><td>31</td>
      </tr>
      <tr>
        <th scope="row">Fluids</th>
        <td>2</td> <td>2</td> <td>3</td>
        <td>1</td> <td>3</td> <td>2</td><td>2</td>
      </tr>
      </tbody>
      </Table></Col><Col xs="1"></Col>
      </Row>    
      <ButtonGroup size='lg'>
          <Button href="/StatWeekly">Monthly</Button>
          <Button href="/Statistics">Daily</Button>
          <Button href="/StatWeekly">Weekly</Button>
        </ButtonGroup>
      <Navi/>              
      </Container>       
    );
  }
}
  

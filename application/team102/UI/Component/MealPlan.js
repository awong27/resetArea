import React, {Component} from 'react';
import {Container, Row, Col, Table,Input} from 'reactstrap';
import Navi from "./Navigation";


export default class MealPlan extends Component {
  render() {
    return (             
      <Container>
      <Row><Col><h1>Meal Plan</h1></Col></Row>
      <Row><Col><Input type="search" name="search" id="exampleSearch" placeholder="Search" /></Col></Row>
      <Row><Col><h2>Weekly Menu</h2></Col></Row>
      <Row><Table striped>
    <thead>
      <tr>
         <th>S</th> <th>M</th> <th>T</th> <th>W</th>
        <th>Th</th> <th>F</th> <th>S</th>
      </tr>
    </thead>
    <tbody>
      <tr>        
        <td>21</td> <td>19</td> <td>18</td>
        <td>22</td> <td>18</td> <td>20</td> <td>19</td>
      </tr>
      <tr>        
        <td>80</td> <td>71</td> <td>67</td>
        <td>78</td> <td>62</td> <td>53</td><td>40</td>
      </tr>
      <tr>
        <td>21</td> <td>18</td> <td>21</td>
        <td>17</td> <td>25</td> <td>16</td><td>26</td>
      </tr>
      <tr>
        <td>87</td> <td>49</td> <td>63</td>
        <td>56</td> <td>75</td> <td>54</td><td>31</td>
      </tr>
      <tr>
        <td>2</td> <td>2</td> <td>3</td>
        <td>1</td> <td>3</td> <td>2</td><td>2</td>
      </tr>
      </tbody>
      </Table></Row> 
      <Row>
          <Col><h3> + Cheese Ravioli</h3></Col>
          <Col xs="2"></Col>
          <Col><h3> Total 4,183 cal</h3></Col>
        </Row>  
      <Navi/>              
      </Container>       
    );
  }
}
  

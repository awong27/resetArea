import React, {useState} from 'react';
import {Progress,Container, Row, Col, Table} from 'reactstrap';
import Navi from "./Navigation";

const Statistics = () => (
    <div>
        <h1>Statistics</h1>
        <Container >
        <Row><Col>     <br/>    </Col></Row>
        <Row><Col>     <br/>    </Col></Row>
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
        </Container> <br/>
        <Table>      
      <tbody>
        <tr>
          <th scope="row">Calories</th>
          <td></td> <td>57,352</td>          
        </tr>
        <tr>
          <th scope="row">Fats</th>
          <td></td> <td>768 g</td>
        </tr>
        <tr>
          <th scope="row">Sodium</th>
          <td></td> <td>179 g</td>          
        </tr>
        <tr>
          <th scope="row">Protien</th>
          <td></td> <td>1,423 g</td>          
        </tr>
        <tr>
          <th scope="row">Fluids</th>
          <td></td> <td>15 gal</td>          
        </tr>
        </tbody>
        </Table>
        <Table>
      <thead>
        <tr>
          <th></th> <th>S</th> <th>M</th> <th>T</th> <th>W</th>
          <th>Th</th> <th>F</th> <th>S</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Calories</th>
          <td>2100</td> <td>1913</td> <td>1865</td>
          <td>2257</td> <td>1805</td> <td>2003</td> <td>1982</td>
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
        </Table>        
    <Navi/>
    </div>
        
);

export default Statistics;

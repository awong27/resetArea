import React, {useState} from 'react';
import {Table} from 'reactstrap';
import Navi from "./Navigation";

const inventory = (props) => {
    //const[counter,setCounter] = useState(0)
    //const addClick = () => setCounter(counter+1)
    //const subClick = () => setCounter(counter-1)
    
  
    return (
      <div>
      <div><h1>Inventory</h1></div>
      <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Exp. Date</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Apples</th>
          <td>June 13</td>
          <td>5</td>
          <td><button>+</button><button>-</button></td>
        </tr>
        <tr>
          <th scope="row">Bread</th>
          <td>March 31</td>
          <td>12</td>
          <td><button>+</button><button>-</button></td>
        </tr>
        <tr>
          <th scope="row">Duck</th>
          <td>April 6</td>
          <td>1</td>
          <td><button>+</button><button>-</button></td>
        </tr>
        <tr>
          <th scope="row">Cake</th>
          <td>May 18</td>
          <td>3</td>
          <td><button>+</button><button>-</button></td>
        </tr>
        <tr>
          <th scope="row">Eggs</th>
          <td>April 13</td>
          <td>14</td>
          <td><button>+</button><button>-</button></td>
        </tr>
        <tr>
          <th scope="row">Lettuce</th>
          <td>February 23</td>
          <td>2</td>
          <td><button>+</button><button>-</button></td>
        </tr>
        <tr>
          <th scope="row">Steak</th>
          <td>December 20</td>
          <td>5</td>
          <td><button>+</button><button>-</button></td>
        </tr>
        <tr>
          <th scope="row">Seaweed</th>
          <td>July 4</td>
          <td>50</td>
          <td><button>+</button><button>-</button></td>
        </tr>
      </tbody>
    </Table>
      <Navi/>
      </div>
    )
    
};
export default inventory;

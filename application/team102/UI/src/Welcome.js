import React,  { Component } from 'react';
import { Button} from 'reactstrap';

export default class Welcome extends Component {
  
  render() {
    
    return (
        <div>
            <div className="upperbox">
                <h1>D</h1>     
                <h1>I</h1>      
                <h1>R</h1>
                <h1>T</h1>
            </div>  
            <div className="lowerbox">
                <Button href="/Login">Login</Button> 
                <Button href="/Register">Register</Button>
            </div>  
        </div>  
    );
  }
}

import React,  { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class Login extends Component {
  
  render() {
    
    return (
      <Form align="centered" >
        <div className="upperbox">
          <FormGroup>
            <Label for="exampleEmail">Email/Phone</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email or Phone" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
          </FormGroup>              
        </div>
        <div className="lowerbox">
          <Button href="/Home">Login</Button>
          <Button href="/">Go Back</Button>
        </div>
      </Form>
    );
  }
}


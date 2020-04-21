import React,  { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class Register extends Component {
  
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
            <Input type="password" name="password" id="examplePassword" placeholder="At least one uppercase letter, lowercase letter and a number" />
          </FormGroup>      
          <FormGroup>
            <Label for="exampleUsername">Username</Label>
            <Input type="Username" name="Username" id="exampleUsername" placeholder="Username" />
          </FormGroup> 
          <FormGroup >
            <Label for="exampleFile">Profile Picture</Label>
            <Input  type="file" name="file" id="exampleFile" />            
          </FormGroup>
        </div>
        <div className="lowerbox">          
          <Button href="/Home">Create Account</Button>
          <Button href="/">Go Back</Button>
        </div>
      </Form>
    );
  }
}


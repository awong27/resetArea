import React,  { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, ButtonGroup} from 'reactstrap';

function SignIn () {  
  
  const [count,setCount] = useState(true);
  const toggle = () => setCount(!count);

  return (
    <div>              
      <Form align="centered">       
      {count===true?<>      
      <FormGroup>
        <Label for="exampleEmail">Email/Phone</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Email or Phone" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Password" />
      </FormGroup>  
      </> : <>
      <FormGroup>
        <Label for="exampleEmail">Email/Phone</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Email or Phone" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Password" />
      </FormGroup>  
      <FormGroup>
        <Label for="exampleEmail">UserName</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="Email or Phone" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Picture</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="Password" />
      </FormGroup> 
      </>}
    </Form>

    <Button size='lg' href="/Home">Submit</Button>
    <ButtonGroup size='lg'>
      <Button active={count} onClick={() => toggle()} >Login</Button>
      <Button active={count} onClick={() => toggle()} >Register</Button>
    </ButtonGroup>    
    
    </div>
  );  
}

export default SignIn;
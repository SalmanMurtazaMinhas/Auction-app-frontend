import React, { useState } from 'react';
import {Container, Form, Button} from "react-bootstrap"

export default function Signin(props) {
    console.log(props)

    

    const [newUser, setNewUser] = useState({});
    
    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }
    
    const loginHandler = () => {
        props.login(newUser)
        props.parentCallback(newUser.username);
    }

  return (
    <div>
        <h1>Signin</h1>

        <Container>
            <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control name="username" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Button onClick={loginHandler} variant='primary'>Login</Button>
        </Container>
    </div>
  )
}
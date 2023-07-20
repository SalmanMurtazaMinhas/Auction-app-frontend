import React, { useState } from 'react';
import {Container, Form, Button} from "react-bootstrap"

export default function Signup(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = {...newUser};
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const registerHandler = () => {
        props.register(newUser)
    }

  return (
    <div>
        <h1>Signup</h1>

        <Container>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control name="username" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password1" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control name="password2" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Button onClick={registerHandler} variant='primary'>Register</Button>
        </Container>
    </div>
  )
}
import React, { useState } from 'react';
import {Container, Form, Button} from "react-bootstrap"
import Keys from '../../images/Keys.png'

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
    <div className='signupdiv'>
        <div className='sub-signupdiv'>
            <Container className='signup-container'>
                <img src={Keys} className="signup-key" />
                <h1 className='signup-title'>CREATE AN ACCOUNT</h1>
                <Form.Group>
                    <Form.Label className='signup-label'>Username</Form.Label>
                    <Form.Control className='signup-input'name="username" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>Password</Form.Label>
                    <Form.Control className='signup-input'name="password1" type="password" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>Confirm Password</Form.Label>
                    <Form.Control className='signup-input'name="password2" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>
            <Button onClick={registerHandler} variant='primary' className="signup-button">Register</Button>
            </Container>
        </div>

        {/* <Container>
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
        </Container> */}
    </div>
  )
}
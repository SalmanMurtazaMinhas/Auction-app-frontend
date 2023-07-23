import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Container, Form, Button} from "react-bootstrap"
import Keys from '../../images/Keys.png';

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
    }

  return (
    <div className='signupdiv'>
        
        <div className='sub-signupdiv'>
        <Container className='signup-container'>
            <img src={Keys} className="signup-key" />
            <h1 className='signup-title'>LOGIN TO YOUR ACCOUNT</h1>
            <Form.Group>
                <Form.Label className='signup-label'>Username</Form.Label>
                <Form.Control className='signup-input' name="username" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label className='signup-label'>Password</Form.Label>
                <Form.Control className='signup-input' name="password" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Button onClick={loginHandler} variant='primary' className="signup-button">Login</Button>
            <p className="link-to-signup">Don't have an account? <Link to="/signup">Signup here.</Link></p>
        </Container>
        </div>
    </div>
  )
}
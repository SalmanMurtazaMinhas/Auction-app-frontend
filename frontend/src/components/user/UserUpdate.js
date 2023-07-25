import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Container, Form, Button} from "react-bootstrap"
export default function UserUpdate(props) {

  return (
    <div className='signupdiv'>
        {/* <h1>{props.userId.pk}</h1> */}
        <div className='sub-signupdiv'>
            <Container className='signup-container'>
                {/* <img src={Keys} className="signup-key" /> */}
                <h1 className='signup-title'>UPDATE INFO</h1>
                <Form.Group>
                    <Form.Label className='signup-label'>FIRST NAME</Form.Label>
                    <Form.Control className='signup-input'name="first_name" onChange={props.func}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>LAST NAME</Form.Label>
                    <Form.Control className='signup-input'name="last_name" onChange={props.func}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>EMAIL ADDRESS</Form.Label>
                    <Form.Control className='signup-input'name="email_address" onChange={props.func}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>PHONE NUMBER</Form.Label>
                    <Form.Control className='signup-input'name="phone_number" onChange={props.func}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>CITY</Form.Label>
                    <Form.Control className='signup-input'name="city" onChange={props.func}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>BLOCK</Form.Label>
                    <Form.Control className='signup-input'name="block_number" onChange={props.func}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>ROAD</Form.Label>
                    <Form.Control className='signup-input'name="road_number" onChange={props.func}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>HOUSE</Form.Label>
                    <Form.Control className='signup-input'name="house_number" onChange={props.func}></Form.Control>
                </Form.Group>

            <Button onClick={props.updateFunc} variant='primary' className="signup-button">Update</Button>
            </Container>
        </div>
    </div>
  )
}

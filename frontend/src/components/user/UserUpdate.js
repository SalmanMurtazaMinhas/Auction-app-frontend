import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Container, Form, Button} from "react-bootstrap"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import UploadWidget from '../product/UploadWidget'

export default function UserUpdate(props) {

    console.log(props)
    // const [userId, setUserId] = useState('')
    useEffect(() => {
        props.idFunc()
        // setUserId(props.userId)
        // props.detailsFunc()
    }, [])
    const [imageUrl, setImageUrl] = useState();

    const handleCallBack = (childData) => {
        console.log('okayy')
        // Update the name in the component's state
        // setImageUrl(prev =>{return [...prev,childData]})
        setImageUrl(childData)
        }

    
    // useEffect(() => {
    //     if(!userId){
    //         props.detailsFunc()
    //     }
    //     // props.detailsFunc()
    // },[userId])

    const [formData, setFormData] = useState({});

    const changeHandler = (e) => {
        const user = {...formData, profile_image_url: imageUrl};
        user[e.target.name] = e.target.value;
        console.log(user);
        setFormData(user);
    }

    const updateHandler = () => {
        props.detailsFunc(formData)
    }

  return (
    // <div>
    //     <Link to="/userUpdate" className="nav-li">Update Profile</Link>
    //     <Routes>
    //     <Route
    //       path="/userUpdate"
    //       element={<UserUpdate func = {changeHandler} data = {formData} setData = {setFormData} updateFunc = {updateHandler}/>}
    //     />
    //     </Routes>
        
    // </div>
    <div className='signupdiv'>
        {/* <h1>{props.userId.pk}</h1> */}
        <UploadWidget parentCallBack={handleCallBack}/>
        <div className='sub-signupdiv'>
            <Container className='signup-container'>
                {/* <img src={Keys} className="signup-key" /> */}
                <h1 className='signup-title'>UPDATE INFO</h1>
                <Form.Group>
                    <Form.Label className='signup-label'>FIRST NAME</Form.Label>
                    <Form.Control className='signup-input'name="first_name" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>LAST NAME</Form.Label>
                    <Form.Control className='signup-input'name="last_name" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>EMAIL ADDRESS</Form.Label>
                    <Form.Control className='signup-input'name="email_address" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>PHONE NUMBER</Form.Label>
                    <Form.Control className='signup-input'name="phone_number" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>CITY</Form.Label>
                    <Form.Control className='signup-input'name="city" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>BLOCK</Form.Label>
                    <Form.Control className='signup-input'name="block_number" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>ROAD</Form.Label>
                    <Form.Control className='signup-input'name="road_number" onChange={changeHandler}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='signup-label'>HOUSE</Form.Label>
                    <Form.Control className='signup-input'name="house_number" onChange={changeHandler}></Form.Control>
                </Form.Group>

            <Button onClick={updateHandler} variant='primary' className="signup-button">Update</Button>
            </Container>
        </div>
    </div>
  )
}

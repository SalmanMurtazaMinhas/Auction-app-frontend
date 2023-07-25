import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Container, Form, Button} from "react-bootstrap"
import UserUpdate from './UserUpdate'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'


export default function UserProfile(props) {
    console.log(props)

  return (
    <div>
      <div>
        <Link to="/userUpdate" className="nav-li">Update Profile</Link>
      </div>
        
        <img src={props.userDetails.profile_image_url} alt="" style={{"width":"150px"}}/>
        <h1>Username: {props.userDetails.username}</h1>
        <h1>First Name: {props.userDetails.first_name}</h1>
        <h1>Last Name: {props.userDetails.last_name}</h1>
        <h1>Email Address: {props.userDetails.email_address}</h1>
    </div>
  )
}

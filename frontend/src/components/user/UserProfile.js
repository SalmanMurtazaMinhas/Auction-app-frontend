import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Container, Form, Button} from "react-bootstrap"
import UserUpdate from './UserUpdate'


export default function UserProfile(props) {
    console.log(props)
    // const [userId, setUserId] = useState('')
    useEffect(() => {
        props.idFunc()
        // setUserId(props.userId)
        // props.detailsFunc()
    }, [])
    
    // useEffect(() => {
    //     if(!userId){
    //         props.detailsFunc()
    //     }
    //     // props.detailsFunc()
    // },[userId])

    const [formData, setFormData] = useState({});

    const changeHandler = (e) => {
        const user = {...formData};
        user[e.target.name] = e.target.value;
        console.log(user);
        setFormData(user);
    }

    const updateHandler = () => {
        props.detailsFunc(formData)
    }

  return (
    <div>
        <UserUpdate func = {changeHandler} data = {formData} setData = {setFormData} updateFunc = {updateHandler}/>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'


export default function ProductDetail(props) {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        getProductDetail()
    },[])

    const getProductDetail = async() => {
        const response = await axios.get(`/api/items/detail/${props.itemId}`)

        console.log(response.data)

        setItem(response.data)
        setLoading(false)



    }


    const handleBid = async (e) => {
        console.log('bid placed')
        e.preventDefault()


        const response = await axios.post('/api/item/bid', item , 
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }
        )
        console.log(response)

        if (response.status === 201){
            setUserMessage('Your Bid has been placed')
            // navigate('/')
        }
        else setNewJournal('Something Went Wrong')

    }



  return (
    <>
         <div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>${item.starting_bid}</p>
      </div>
    <input type='text'> 
    
    </input>
      <button onClick={handleBid}>Place Bid</button>
    </>
  )
}

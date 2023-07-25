import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'


export default function ProductDetail(props) {
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)
    const [userMessage, setUserMessage] = useState('')
    const [newBid, setNewBid] = useState('')
    const [lastBid, setLastBid] = useState('')

    useEffect(() => {
        getProductDetail()
        getLastBid()
    },[])

    const getProductDetail = async() => {
        const response = await axios.get(`/api/items/detail/${props.itemId}/`)

        console.log(response.data)

        setItem(response.data)

        setLoading(false)
    }

    const getLastBid = async() => {
      const response = await axios.post(`/api/items/lastbid/`, {item_id: props.itemId})
      console.log(response.data)

      setLastBid(response.data)
    }


    const handleChange = (event) => {
      const attribute = event.target.name
      const value = event.target.value

      setNewBid(value)
      console.log(newBid)
  }

    const handleBid = async (e) => {
        // console.log('bid placed')
        // console.log(localStorage.getItem("token"))
        e.preventDefault()
        // console.log(item.id)
        const response = await axios.post('api/items/detail/<pk>/bid/', {newBid: newBid, item: item},
        {
          headers: {
              "Authorization": "Token "+localStorage.getItem("token")
          }
      }
        )
        console.log(response.data)
      setNewBid(response.data.bid_amount)
      getLastBid()

  
        if (response.status === 200){
          if (response.data === "Bid amount is too low!"){
            setUserMessage("Bid amount is too low!")
          }
          else{
            setUserMessage('Your Bid Has Been Added')
          }
        } else {
            setUserMessage('Something Went Wrong')
        }
      }


  return (
    <>
         <div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>${item.starting_bid}</p>
        <p> Current bid: {lastBid}</p>
      </div>
        <form onSubmit={handleBid}>
          <input onChange={handleChange} type="text" name="amount" placeholder="Enter amount" />
          <input type="submit" value="Submit" />
        </form>

        {userMessage}
    </>
  )
}

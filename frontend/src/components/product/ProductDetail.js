import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'


export default function ProductDetail(props) {

  console.log(props)
    const [item, setItem] = useState({})
    const [loading, setLoading] = useState(true)
    const [userMessage, setUserMessage] = useState('')
    const [newBid, setNewBid] = useState(0)
    const [lastBid, setLastBid] = useState('')
    const [balance, setBalance] = useState('0')

    // let userDeatils = localStorage.getItem("user")


    const {itemId} = useParams()
    // console.log({itemId})
    // const money = props.userDetails.money
    // console.log(money)

    useEffect(() => {
        getProductDetail()
        getLastBid()

    },[])

    
    const getProductDetail = async() => {
        const response = await axios.get(`/api/items/detail/${itemId}/`)

        console.log(response.data)

        setItem(response.data)
        let userDetails = localStorage.getItem("userDetails")

        let usercreds = JSON.parse(userDetails)
        setBalance(usercreds.money)

        setLoading(false)
    }

    const getLastBid = async() => {
      const response = await axios.post(`/api/items/lastbid/`, {item_id: itemId})
      // console.log(response.data)

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
        const response = await axios.post('/api/items/placebid/', {newBid: newBid, item: item},
        {
          headers: {
              "Authorization": "Token "+localStorage.getItem("token")
          }
      }
        )
        console.log(response.data)
        console.log(response.data.bid_amount)
      if (response.data.bid_amount) {
        setNewBid(response.data.bid_amount)
      }
      getLastBid()

  
        if (response.status === 200){
          if (response.data === "Bid amount is too low!"){
            setUserMessage("Bid amount is too low!")
          }
          else if (response.data === "Not enough money ):"){
            setUserMessage("Not enough money ):")
          }
          else {
            setUserMessage('Your Bid Has Been Added')
          }
        } else {
            setUserMessage('Something Went Wrong')
        }
      }


  return (
    <>

         <div className="product-info">
          <div className="subdiv">
          <img className="product-detailimg" src={item.image_url}></img>
          </div>
          <div className="subdiv">
            <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>{item.starting_bid}BHD</p>
        <p> Current bid: {lastBid}</p>
<form onSubmit={handleBid}>
          <input onChange={handleChange} type="text" name="amount" placeholder="Enter amount" />
          <input type="submit" value="Submit" />
        </form>
{userMessage}
         <div>


          Current balance: {balance}


        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p>{item.starting_bid}BHD</p>
        <p> Current bid: {lastBid}</p>
      
        <form onSubmit={handleBid}>
          <input onChange={handleChange} type="text" name="amount" placeholder="Enter amount" />
          <input type="submit" value="Submit" />
        </form>
        </div>
        {userMessage}
        </div>
    </>
  )
}

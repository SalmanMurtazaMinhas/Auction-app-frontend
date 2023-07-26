import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'


export default function HomePage(props) {
  console.log(props)

  if(props.loader){
    props.userDetails()
    props.setLoader(false)
  }

  useEffect(() => {
    getCategories()
    // getCategoryFilter()
}, [])

  const [categories, setCategories] = useState([])
 
  console.log(categories)

  const getCategories = async (e) => {
    const response = await axios.get('api/category/list/')
    console.log(response.data)

    setCategories(response.data)

    return response 
   }



  // const buttonHandler = () => {
  //   console.log('okayyyyy')
  // }

  const allCategories = categories.map((category, index) => {
    return (
      <div>
        <ul>
          {/* <button onClick={buttonHandler} value={category.id}></button> */}
          <Link to={`/categoryIndex/${category.id}/`} className="nav-li" defaultValue={category.id} value={category.id}>{category.name} </Link>
        </ul>
      </div>
    )
  })

  return (
    <div>
      
        <div className="main-homepage">
            <div className="homepage-div1">
              
              <p className="typed">The Vintage Auction is the place to find rare and unique vintage items. We offer a wide variety of collectibles,
                antiques, jewelry, and historical items, all of which are carefully curated by our team of experts. 
                Whether you're looking for a piece of jewelry from the early 1900s, a vintage toy from your childhood,
                 or a rare coin from the Civil War, we're sure to have something for you. We hold auctions almost weekly, 
                 so there's always something new to discover. 
                And with our convenient online bidding system, you can participate in the auction from anywhere in the world. 
                So what are you waiting for? Start browsing our auctions today and see what you can find!</p>
            </div>
            <div className="homepage-div2">
            {allCategories}
            </div>
        </div>
    </div>
  )
}

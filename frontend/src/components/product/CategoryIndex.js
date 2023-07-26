import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams} from 'react-router-dom'

export default function CategoryIndex() {

  const [filteredCat, setFilteredCat] = useState([])
  const [loader, setLoader] = useState(false)
  const {cat} = useParams()

  console.log(cat)

  const getCategoryFilter = async() => {
    const response = await axios.post(`/api/category/filter/`, {cat})
    console.log(JSON.parse(response.data))

    setFilteredCat(JSON.parse(response.data))
  }

  if(cat && !loader){
    getCategoryFilter()
    setLoader(true)
    
  }


  const filteredCats = filteredCat.map((filteredCat, index) => {
    return (
        
        <div className='parentdiv'>
            <div className="product-maindiv" key={index}>
                <div className="img-div">
                    <img className="product-image" src={filteredCat.fields.image_url} alt="You're here!"/>
                </div>
                <div className="info-div">

                    <Link to={`/api/items/detail/${filteredCat.pk}/`}><h2>{filteredCat.fields.name}</h2></Link>
                    <p className="info-element">Condition: {filteredCat.fields.condition}</p>
                    <p className="info-element">Description: {filteredCat.fields.description}</p>
                    <p className="info-element">Starting bid: BHD {filteredCat.fields.starting_bid}</p>
    
                </div>
                
            {/* {allImages(product.image_url)} */}
        {/* {product.image_url.map((image_url, index) => {
            <img key={index} src={image_url}></img>
        })} */}
        
            
            </div>
        </div>
    )
})

return (
  <div className="product-masterdiv">
      {filteredCats}
  </div>

)
}

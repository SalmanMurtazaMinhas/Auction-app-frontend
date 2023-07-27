import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function ProductIndex() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        const response = await axios.get('api/items/', 
            {
                headers: {
                    "Authorization": "Token "+localStorage.getItem("token")
                }
            }
        )
        console.log(response)
        setProducts(response.data)
    }

    // const allImages =(urls)=>{
    //     return urls.map((image_url, index) => {
    //         <img key={index} src={image_url}></img>
    //     })
    // } 
    const allProducts = products.map((product, index) => {
        return (
            
            <div className='parentdiv'>
                <div className="product-maindiv" key={index}>
                    <div className="img-div">
                        <img className="product-image" src={product.image_url} alt="You're here!"/>
                    </div>
                    <div className="info-div">
                        <Link className="title-product" to={`/api/items/detail/${product.id}/`}><h2>{product.name}</h2></Link>
                        <p className="info-element">Condition: {product.condition}</p>
                        <p className="info-element">Description: {product.description}</p>
                        <p className="info-element">Starting bid: BHD {product.starting_bid}</p>
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
            {allProducts}
        </div>

    )
}
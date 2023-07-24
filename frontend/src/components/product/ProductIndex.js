import React, { useEffect, useState } from 'react'
import axios from 'axios'

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
            <div key={index}>
                <img className="product-image" src={product.image_url} alt="You're here!"/>
                <h2>{product.name}</h2>
                <h4>{product.condition}</h4>
                <p>{product.description}</p>
                <h4>{product.starting_bid}BD</h4>
                {/* {allImages(product.image_url)} */}
            {/* {product.image_url.map((image_url, index) => {
                <img key={index} src={image_url}></img>
            })} */}
                
            </div>
        )
    })

    return (
        <>
            {allProducts}
        </>

    )
}
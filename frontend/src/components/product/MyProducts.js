import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MyProducts() {

    const [myProducts, setMyProducts] = useState([])

    useEffect(() => {
        getMyProducts()
    }, [])

    const getMyProducts = async () => {
        console.log('hi')
        const response = await axios.get('api/items/personal', 
            {
                headers: {
                    "Authorization": "Token "+localStorage.getItem("token")
                }
            }
        )
        console.log(response)
        setMyProducts(response.data)
    }


    const allMyProducts = myProducts.map((product, index) => {
        return (
            <div key={index}>
                <img className="product-image" src={product.image_url} alt="You're here!"/>
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
            {allMyProducts}
        </>

    )
}

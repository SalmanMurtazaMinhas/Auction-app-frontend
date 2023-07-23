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

    const allProducts = products.map((product, index) => {
        return (
            <div key={index}>
                <h2>{product.name}</h2>
                <h4>{product.condition}</h4>
                <p>{product.description}</p>
                <h4>{product.starting_bid}BD</h4>
                <img src={product.image_url}></img>
            </div>
        )
    })

    return (
        <>
            {allProducts}
        </>

    )
}
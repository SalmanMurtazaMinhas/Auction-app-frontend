import React, { useState } from 'react'
import axios from 'axios'

export default function ProductForm() {

  const [newProduct, setNewProduct] = useState({})
  const [userMessage, setUserMessage] = useState('')
  

  const handleChange = (event) => {
      const attribute = event.target.name
      const value = event.target.value
      console.log(attribute, value)

      const currentNewProduct = {...newProduct}
      
      currentNewProduct[attribute] = value
      
      setNewProduct(currentNewProduct)
      console.log(newProduct)
  }

  const handleSubmit = async (event) => {
      event.preventDefault()

      const response = await axios.post('api/items/create/', newProduct,
      {
        headers: {
            "Authorization": "Token "+localStorage.getItem("token")
        }
    }
      )
      console.log(response)

      if (response.status === 200){
          setUserMessage('Your Product Has Been Added')
      } else {
          setUserMessage('Something Went Wrong')
      }
  }
    
   const uploadImage = (files) => {
    const data = new FormData()
    data.append("file", files[0])
    console.log(files[0])
   }

  return (
    <div>

        <h2>Register your product here.</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Condition</label>
                <input
                    type="text"
                    name="condition"
                    onChange={handleChange}
                />
            </div>
            <div>
              <label>Description</label>
              <textarea cols="30" rows="10"
                    type="text"
                    name="description"
                    onChange={handleChange}
              />
            </div>
            {/* <div>
                <label>Image</label>
                <input type="file" onChange={(event) => {uploadImage(event.target.files)}} name="image"/>
            </div> */}
            <div>
                <label>Starting bid</label>
                <input
                    type="text"
                    name="starting_bid"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="submit"
                    value="Add Product!"
                />
            </div>
        </form>
        <p>{userMessage}</p>

    </div>
  )
}

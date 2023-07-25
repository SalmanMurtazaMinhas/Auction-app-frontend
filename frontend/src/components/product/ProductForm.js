import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import UploadWidget from './UploadWidget'




export default function ProductForm() {
    useEffect(() => {
        getCategories()
    }, [])

  const [newProduct, setNewProduct] = useState({})
  const [userMessage, setUserMessage] = useState('')
  const [imageUrl, setImageUrl] = useState();
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [categoryId, setCategoryId] = useState(null)
  console.log(imageUrl)

  const handleCallBack = (childData) => {
    console.log('okayy')
    // Update the name in the component's state
    // setImageUrl(prev =>{return [...prev,childData]})
    setImageUrl(childData)
    }

  const handleChange = (event) => {
      const attribute = event.target.name
      const value = event.target.value
      console.log(attribute, value)
      const currentNewProduct = {...newProduct, image_url: imageUrl }
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
    

   const getCategories = async (e) => {
    const response = await axios.get('api/category/list/')
    console.log(response.data)

    setCategories(response.data)

    return response 
   }

   

   const categoriesList = categories.map(function(category, index){
    return <option key={index}>{category.id}</option>
   })

  return (
    <div>
        <Link to="/productIndex" className="nav-li">products</Link>
        <h2>Register your product here.</h2>

        <UploadWidget parentCallBack={handleCallBack}/>

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
                <select
                type="number"
                name="category"
                onChange={handleChange}>
                {categoriesList}
                </select>
                {/* <input
                    type="text"
                    name="category"
                    onChange={handleChange}
                /> */}
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

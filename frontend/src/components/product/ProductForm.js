import React from 'react'
import Axios from 'axios'

export default function ProductForm() {
    
   const uploadImage = (files) => {
    const data = new FormData()
    data.append("file", files[0])
    console.log(files[0])
   }

  return (
    <div>
        <form>
            <h2>Register your product here.</h2>
            <input type="file" onChange={(event) => {uploadImage(event.target.files)}}/>
        </form>
    </div>
  )
}

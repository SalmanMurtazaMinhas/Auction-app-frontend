import LogoImg from '../src/images/Diamond.png'
import HomePage from './components/home/HomePage'
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import ProductForm from './components/product/ProductForm';
import ProductIndex from './components/product/ProductIndex'
import Signin from './components/user/signin';
import Signup from './components/user/Signup'
import UserProfile from './components/user/UserProfile'

import UploadWidget from './components/product/UploadWidget';

import ProductDetail from './components/product/ProductDetail'



export default function App() {
  const [isAuth, setIsAuth] = useState(false); // user is logged in or not
  const [user, setUser] = useState({}); // Contain User, if any.
  const [userName, setuserName] = useState();
  const [userId, setUserId] = useState([])
  const [userDetails, setUserDetails] = useState([])
  
  console.log(userName)

  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token != null){
        let user = token
        if(user)
        {
          setIsAuth(true)
          setUser(user)
        }
        else if (!user){
          localStorage.remove("token")
          setIsAuth(false)
        }
    }
   
  }, [])

  const getUserDetail = async (formData) => {
    const response = await axios.patch(`auth/user/update/${userId.pk}/`, formData, 
        {
            headers: {
                "Authorization": "Token "+localStorage.getItem("token")
            }
        }
    )
    console.log(response)
    setUserDetails(response.data)
}

  const getUserId = async () => {
    const response = await axios.get('auth/user/details/', 
        {
            headers: {
                "Authorization": "Token "+localStorage.getItem("token")
            }
        }
    )
    console.log(response)
    setUserId(response.data)
    // getUserDetail()
}

  const handleCallBack = (childData) => {
      // Update the name in the component's state
      setuserName(childData)
  }

  const registerHandler = (user) => {
    axios.post("auth/register/", user)
    .then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  

  const loginHandler = (cred) => {
    console.log('here is login handler')
    axios.post("auth/login/", cred)
      .then(res => {
        console.log(res.data)
        console.log(res.data.key)
        let token = res.data.key
        if (token != null) {
          localStorage.setItem("token", token)
          
          let user = token
          setIsAuth(true)
          setUser(user)
        }
      })
      .catch(err => {
        console.log("Error!!!",err)
      })
  }

    const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false)
    setUser(null)
  }


  return (
    <div>

      {/* <div className="logo-nav">
        <img className="logo-img" src={LogoImg} />
        <h1 className="logo-title">The Vintage Auction</h1>
        <div className="nav">
          <ul id="nav-bar">
            <li className="nav-li">Home</li>
            <li className="nav-li">Shop</li>
            <li className="nav-li">Profile</li>
            <li className="nav-li">Login</li>
            <li className="nav-li">Logout</li>
          </ul>
        </div>
      </div>
      <HomePage/> */}


    <Router>
      <div className="logo-nav">
        <img className="logo-img" src={LogoImg} alt="A diamond"/>
        <h1 className="logo-title">The Vintage Auction</h1>
        <nav className="nav">

        <ul id="nav-bar">
            <Link to="/" className="nav-li">Home</Link>
            {/* <li className="nav-li">Shop</li> */}
            <Link to="/productIndex" className="nav-li">Shop</Link>
            <Link to="/productCreate" className="nav-li">Profile</Link>
            <Link to="/signup" className="nav-li">Signup</Link>
            <Link to="/signin" className="nav-li">Signin</Link>
            <Link to="/UserProfile" className="nav-li">user</Link>
            <Link to="/logout" onClick={logoutHandler} className="nav-li">Logout</Link>
        </ul>

        </nav>
      </div>
      
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
          />
        <Route
          path="/signup"
          element={<Signup register={registerHandler} />}
        />
        <Route
          path="/signin"
          element={<Signin login = {loginHandler} parentCallBack={handleCallBack}/>}
        />
        <Route
          path="/UserProfile"
          element={<UserProfile idFunc = {getUserId} userId = {userId} detailsFunc = {getUserDetail} userDetails = {userDetails} />}
        />
        <Route
          path="/productCreate"
          element={isAuth ? <ProductForm /> : <Signin login = {loginHandler} parentCallBack={handleCallBack}/>}
        />
        <Route
          path="/productIndex"
          element={isAuth ? <ProductIndex /> : <Signin login = {loginHandler} parentCallBack={handleCallBack}/>}
        />
        <Route
          path="/productDetail"
          element={<ProductDetail itemId={1}/>}
        />
        {/* <Route 
          path="/product-form"
          element={<ProductForm />}
        /> */}
        <Route 
          path="/upload"
          element={<UploadWidget />}
        />
      </Routes>
    </Router>
      {/* <HomePage/> */}

      {/* <h1>The Vintage Auction</h1>
      <ProductForm /> */}
    </div>
  )
}

import LogoImg from '../src/images/Diamond.png'
import HomePage from './components/home/HomePage'
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ProductForm from './components/product/ProductForm';
import ProductIndex from './components/product/ProductIndex'
import Signin from './components/user/signin';
import Signup from './components/user/Signup'
import UserProfile from './components/user/UserProfile'
import UserUpdate from './components/user/UserUpdate'

import UploadWidget from './components/product/UploadWidget';

import ProductDetail from './components/product/ProductDetail'
import MyProducts from './components/product/MyProducts'



export default function App() {
  const [isAuth, setIsAuth] = useState(false); // user is logged in or not
  const [user, setUser] = useState({}); // Contain User, if any.
  const [userName, setuserName] = useState();
  const [userId, setUserId] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  
  console.log(userDetails)

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
    setLoader(true)
    
    console.log(loader)

    // if(isAuth){
    //   getUserDetail()
    // }
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

      if(res.status === 204){
        navigate('/signin')
    }

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

      //   if(res.status === 200){
      //     navigate('/')
      // }

        let token = res.data.key
        if (token != null) {
          localStorage.setItem("token", token)
          
          let user = token
          setIsAuth(true)
          setUser(user)

          if(user){
            getUserId()
            // setLoader(true)
            navigate('/')
          }

          
        }
      })
      // .finally(
        
      //   {if(loader){
      //     getUserDetail()
      //   }}
      
      // )
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


    
      <div className="logo-nav">
        <img className="logo-img" src={LogoImg} alt="A diamond"/>
        <h1 className="logo-title">The Vintage Auction</h1>
        <nav className="nav">

        <ul id="nav-bar">
            <Link to="/" className="nav-li">Home</Link>
            {/* <li className="nav-li">Shop</li> */}
            <Link to="/productIndex" className="nav-li">Shop</Link>
            <Link to="/productCreate" className="nav-li">Add Item</Link>
            <Link to="/signup" className="nav-li">Signup</Link>
            <Link to="/signin" className="nav-li">Signin</Link>
            <Link to="/userProfile" className="nav-li">Profile</Link>
            <Link to="/logout" onClick={logoutHandler} className="nav-li">Logout</Link>
        </ul>

        </nav>
      </div>
      
      <Routes>
        <Route
          path="/"
          element={<HomePage loader = {loader} setLoader = {setLoader} userDetails = {getUserDetail}/>}
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
          path="/userProfile"
          element={isAuth ? <UserProfile userDetails = {userDetails}/> : <Signin login = {loginHandler} parentCallBack={handleCallBack}/>}
        />
        <Route
          path="/userUpdate"
          element={<UserUpdate idFunc = {getUserId} userId = {userId} detailsFunc = {getUserDetail} userDetails = {userDetails}/>}
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
          path="/myProducts"
          element={isAuth ? <MyProducts /> : <Signin login = {loginHandler} parentCallBack={handleCallBack}/>}
        />
        <Route
          path="/api/items/detail/:id/"
          element={<ProductDetail />}
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
    
      {/* <HomePage/> */}

      {/* <h1>The Vintage Auction</h1>
      <ProductForm /> */}
    </div>
  )
}

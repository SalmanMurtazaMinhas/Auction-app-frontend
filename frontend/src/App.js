import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import ProductForm from './components/product/ProductForm';
import Signin from './components/user/signin';
import Signup from './components/user/Signup'



export default function App() {
  const [isAuth, setIsAuth] = useState(false); // user is logged in or not
  const [user, setUser] = useState({}); // Contain User, if any.

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

    <Router>
      <nav>
          <div>
            <Link to="/signup">Signup</Link> &nbsp;
            <Link to="/signin">Signin</Link> &nbsp;
            <Link to="/logout" onClick={logoutHandler}>Logout</Link>
          </div>
        </nav>
      <Routes>
        <Route
          path="/signup"
          element={<Signup register={registerHandler} />}
        />
        <Route
          path="/signin"
          element={<Signin login = {loginHandler}/>}
        />
      </Routes>
    </Router>

      <h1>The Vintage Auction</h1>
      <ProductForm />
    </div>
  )
}

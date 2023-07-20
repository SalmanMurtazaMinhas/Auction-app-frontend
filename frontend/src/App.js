import React from 'react'
import LogoImg from '../src/images/Diamond.png'
import HomePage from './components/home/HomePage'

export default function App() {
  return (
    <div>
      <div className="logo-nav">
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
      <HomePage/>
    </div>
  )
}

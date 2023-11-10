import React from 'react'

import Products from '../components/product/Products'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import '../styles/Dashboard.scss'

const Home = () => {
  return (
    <div className="wrapper">
      <div className="main-content">
        <Hero />
        <Products />
        <Footer />
      </div>
    </div>
  )
}

export default Home

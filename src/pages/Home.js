import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Headertext from '../components/Headtext'
import Search from '../components/Search'
function Home() {
  return (
    <div>
        <NavBar/>
        <Header/>
        <Headertext/>
        <Search/>
    </div>
  )
}

export default Home
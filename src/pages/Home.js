import React from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import Headertext from '../components/Headtext'
import Search from '../components/Search'
import Main from '../components/Main'
function Home() {
  return (
    <div>
        <NavBar/>
        <Header/>
        <Headertext/>
        <Search/>
        <Main/>
    </div>
  )
}

export default Home
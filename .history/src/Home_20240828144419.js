import React from 'react'
import Banner from './comonents/Banner'
import Main from './comonents/Main';
import './Home.css';

function Home() {
    return (
     <div className='home'>
        <div className='banner'>
           <Banner/>
        </div>

        <div className='main-container'>
            <Main/>
        </div>

        <div className='review-container'>
            
     </div> 
    )
}

export default Home

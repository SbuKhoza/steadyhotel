import React from 'react'
import Banner from './components/Banner'
import Main from './components/Main';
import Review from './components/Review';
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
            <Review/>
        </div>
     </div> 
    )
}

export default Home
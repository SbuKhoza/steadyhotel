import React from 'react'
import Banner from './comonents/Banner'

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
     </div> 
    )
}

export default Home

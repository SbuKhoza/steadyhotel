import React from 'react'

 function Main() {
  return (
    <div className='maincont'>

        <h3>Choose accommodation</h3>

     <div id='maincont'>
         
        <div className='tile1'>

            <h4>Standard</h4>
            <img src='honeymoon.jpg' alt='honeymoon' />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            {/* <button>Book Now</button> */}

        </div>
        <div className='tile2'>

        <h4>Standard</h4>
            <img src='standard.jpg' alt='rooms' />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            {/* <button>Book Now</button> */}

        </div>

        <div className='tile3'>

        <h4>Standard</h4>
            <img src='spar.jpg' alt='rooms' />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            {/* <button>Book Now</button> */}

        </div>


        <div className='tile4'>

        <h4>Standard</h4>
            <img src='conference.jpg' alt='rooms' />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Book Now</button>
        </div>  

        </div>
    </div>
  )
}

export default Main;
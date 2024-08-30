import React from 'react'
imp

 function Main() {
  return (
    <div className='maincont'>

        <h3>Choose accommodation</h3>

     <div id='maincont'>
         
        <div className='tile1'>           
            <img src='honeymoon.jpg' alt='honeymoon' />
            <h4>Honeymoon Suit</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Book Now</button>

        </div>
        <div className='tile2'>
            <img src='standard.jpg' alt='rooms' />
            <h4>Standard Rooming</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Book Now</button>

        </div>

        <div className='tile3'>      
            <img src='spar.jpg' alt='rooms' />
            <h4>Spar</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Book Now</button>

        </div>


        <div className='tile4'>
            <img src='conference.jpg' alt='rooms' />
            <h4>Conference Vanues</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <button>Book Now</button>
        </div>  

        </div>
    </div>
  )
}

export default Main;
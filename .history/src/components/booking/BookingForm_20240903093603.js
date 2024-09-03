import React from 'react'

function BookingForm() {
  return (
    <div className='book'>
        <form id='bookingform'>
           
            <label>
                Check-in:
                
            </label>

            <input type="date" name="check-in" />

            <label>
                Check-out:
                
            </label>

            <input type="date" name="check-out" />

            <label>
                Number of Guests:
                
            </label>

            <input type="number" name="guests" min="1" max="10" />
            <br/>

            <label>
                Room Type:
                
            </label><br/>
            <input type="submit" value="Book Now" />
        </form>
      
    </div>
  )
}

export default BookingForm

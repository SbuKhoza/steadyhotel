import React from 'react'

function BookingForm() {
  return (
    <div className='book'>
        <form>
           
            <label>
                Check-in:
                <input type="date" name="check-in" />
            </label>
            <label>
                Check-out:
                <input type="date" name="check-out" />
            </label>
            <label>
                Number of Guests:
                <input type="number" name="guests" min="1" max="10" />
            </label>
            <label></label>
            <input type="submit" value="Book Now" />
        </form>
      
    </div>
  )
}

export default BookingForm

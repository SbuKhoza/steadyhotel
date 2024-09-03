import React from 'react'

function BookingForm() {
  return (
    <div className='book'>
        <form id='bookingform'>
           
            <label>
                Check-in:
                <input type="date" name="check-in" />
            </label><br
            <label>
                Check-out:
                <input type="date" name="check-out" />
            </label>
            <label>
                Number of Guests:
                <input type="number" name="guests" min="1" max="10" />
            </label>
            <label>
                Room Type:
                <select name="room-type">
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="premium">Premium</option>
                </select>
            </label>
            <input type="submit" value="Book Now" />
        </form>
      
    </div>
  )
}

export default BookingForm

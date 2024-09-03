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
                
            </label><br/>
            <label>
                Room Type:
                <select name="room-type">
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="premium">Premium</option>
                </select>
            </label><br/>
            <input type="submit" value="Book Now" />
        </form>
      
    </div>
  )
}

export default BookingForm

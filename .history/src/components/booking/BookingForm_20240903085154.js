import React from 'react'

function BookingForm() {
  return (
    <div className='book'>
        <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Email:
                <input type="email" name="email" />
            </label>
            <label>
                Phone:
                <input type="tel" name="phone" />
            </label>
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
            <input type="submit" value="Book Now" />
        </form>
      
    </div>
  )
}

export default BookingForm

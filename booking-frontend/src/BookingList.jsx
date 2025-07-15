import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";




const BookingList = forwardRef((props, ref) => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    axios.get("http://localhost:8000/api/bookings/")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Greška:", err));
  };

  useImperativeHandle(ref, () => ({
    refresh: fetchBookings,
  }));

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Postojeće rezervacije</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <strong>{booking.full_name}</strong> ({booking.email})<br />
            Od: {booking.date_from} | Do: {booking.date_to}
          </li>
        ))}
      </ul>
    </div>
  );
});


export default BookingList;
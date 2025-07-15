import { useEffect, useState } from "react";
import axios from "axios";


function BookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/bookings/")
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => {
                console.error("Greska pri dohvacanju rezervacija:", err);
            });
    }, []) 

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
}

export default BookingList;
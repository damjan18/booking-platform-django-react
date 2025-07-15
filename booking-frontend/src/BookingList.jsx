import { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import axios from "axios";

const BookingList = forwardRef((props, ref) => {
  const [bookings, setBookings] = useState([]);
  const [ascending, setAscending] = useState(true);

  const fetchBookings = useCallback(() => {
    axios
      .get("http://localhost:8000/api/bookings/")
      .then((res) => {
        const sorted = res.data.sort((a, b) => {
          const dateA = new Date(a.date_from);
          const dateB = new Date(b.date_from);
          return ascending ? dateA - dateB : dateB - dateA;
        });
        setBookings(sorted);
      })
      .catch((err) => console.error("Greška:", err));
  }, [ascending]);

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm("Da li sigurno želiš da obrišeš ovu rezervaciju?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/bookings/${id}/`);
      fetchBookings();
    } catch (err) {
      console.error("Greška pri brisanju:", err);
      alert("Greška pri brisanju. Pokušaj ponovo.");
    }
  };

  useImperativeHandle(ref, () => ({
    refresh: fetchBookings,
  }));

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleToggle = () => {
    setAscending((prev) => !prev);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Postojeće rezervacije</h2>
        <button
          onClick={handleToggle}
          className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Sortiraj po datumu {ascending ? "▲" : "▼"}
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">Nema rezervacija.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{booking.full_name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{booking.email}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 mt-2">
                    <strong>Od:</strong> {booking.date_from} <br />
                    <strong>Do:</strong> {booking.date_to}
                  </p>
                </div>

                <button
                  onClick={() => deleteBooking(booking.id)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition"
                >
                  Obriši
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default BookingList;

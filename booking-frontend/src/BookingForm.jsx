import { useState } from "react";
import axios from "axios";



function BookingForm({onSuccess}) {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        date_from: "",
        date_to: "",
    })


    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    if (form.date_from && form.date_to && form.date_to < form.date_from) {
      setError("Datum do ne moze biti pre datuma od.");
      return
    }

    try {
        await axios.post("http://localhost:8000/api/bookings/", form);
        alert("Rezervacija uspjesno poslata");
        setForm({ full_name: "", email: "", date_from: "", date_to: "" });

        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.error("Greska pri slanju:", error);
        alert("Greska! Pokusaj ponovo.")
      }
    };


    return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6 space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Ime i prezime</label>
        <input
          name="full_name"
          placeholder="Ime i prezime"
          value={form.full_name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Datum od</label>
        <input
          name="date_from"
          type="date"
          value={form.date_from}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Datum do</label>
        <input
          name="date_to"
          type="date"
          value={form.date_to}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        Pošalji rezervaciju
      </button>
    </form>
  );
}

export default BookingForm;
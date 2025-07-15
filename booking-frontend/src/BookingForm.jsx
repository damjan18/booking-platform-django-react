import { useState } from "react";
import axios from "axios";



function BookingForm() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        date_from: "",
        date_to: "",
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

    try {
        await axios.post("http://localhost:8000/api/bookings/", form);
        alert("Rezervacija uspjesno poslata");
        setForm({ full_name: "", email: "", date_from: "", date_to: "" });
    } catch (error) {
        console.error("Greska pri slanju:", error);
        alert("Greska! Pokusaj ponovo.")
      }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input name="full_name" placeholder="Ime i prezime" value={form.full_name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="date_from" type="date" value={form.date_from} onChange={handleChange} required />
            <input name="date_to" type="date" value={form.date_to} onChange={handleChange} required />
            <button type="submit">Pošalji rezervaciju</button>
        </form>
    );
}

export default BookingForm;
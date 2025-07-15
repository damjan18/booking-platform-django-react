
import { useRef } from "react";
import BookingForm from "./BookingForm";
import BookingList from "./BookingList";

function App() {
  const listRef = useRef();

  const handleFormSuccess = () => {
    if (listRef.current) {
      listRef.current.refresh();
    }
  };


  return (
    <div>
      <h1>Rezervacija</h1>
      <BookingForm onSuccess={handleFormSuccess} />
      <hr />
      <BookingList ref={listRef} />
    </div>
  )
}

export default App


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
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans p-6">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking App</h1>
      <BookingForm onSuccess={handleFormSuccess} />
      <BookingList ref={listRef} />
    </div>
    </div>
  )
}

export default App

import { useState } from "react";
import BookingForm from "../BookingForm/BookingForm";
import "../BookingForm/BookingForm.css";

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Book Now Button */}
      <button
        className="floating-book-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Book a cab"
      >
        🚖 Book Now
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <>
          <div 
            className="booking-modal-overlay" 
            onClick={() => setIsOpen(false)}
          />
          <BookingForm 
            isModal={true} 
            onClose={() => setIsOpen(false)} 
          />
        </>
      )}
    </>
  );
};

export default BookingModal;

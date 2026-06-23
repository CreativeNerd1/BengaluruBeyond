import { useState, useEffect, useCallback } from "react";
import BookingForm from "../BookingForm/BookingForm";
import "../BookingForm/BookingForm.css";

const BookingModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = useCallback(() => setIsOpen(false), []);

  // Close on Escape key and trap focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

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
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book a cab"
        >
          <div 
            className="booking-modal-overlay" 
            onClick={closeModal}
            aria-hidden="true"
          />
          <BookingForm 
            isModal={true} 
            onClose={closeModal} 
          />
        </div>
      )}
    </>
  );
};

export default BookingModal;

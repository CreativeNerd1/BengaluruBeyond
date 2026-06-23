import { useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";
import "./BookingForm.css";

const BookingForm = ({ 
  preSelectedTrip = null, 
  preSelectedCar = null,
  preSelectedService = null,
  onClose = null,
  isModal = false 
}) => {
  const { siteInfo, cars, tripPackages } = useSiteData();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    passengers: "2",
    tripType: preSelectedService || "outstation", // local, airport, outstation
    selectedTrip: preSelectedTrip?.id || "",
    selectedCar: preSelectedCar?.id || "",
    additionalRequests: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Format message for WhatsApp
  const formatWhatsAppMessage = () => {
    const selectedTripData = tripPackages.find(t => t.id === parseInt(formData.selectedTrip));
    const selectedCarData = cars.find(c => c.id === parseInt(formData.selectedCar));
    
    let message = `🚖 *New Booking Request*\n\n`;
    message += `👤 *Name:* ${formData.name}\n`;
    message += `📱 *Phone:* ${formData.phone}\n`;
    if (formData.email) message += `📧 *Email:* ${formData.email}\n`;
    message += `\n`;
    
    message += `🚗 *Trip Type:* ${getTripTypeLabel(formData.tripType)}\n`;
    if (selectedTripData) {
      message += `📍 *Package:* ${selectedTripData.title || selectedTripData.name}\n`;
    }
    if (selectedCarData) {
      message += `🚙 *Preferred Car:* ${selectedCarData.name}\n`;
    }
    message += `\n`;
    
    message += `📍 *Pickup:* ${formData.pickupLocation}\n`;
    if (formData.dropLocation) message += `📍 *Drop:* ${formData.dropLocation}\n`;
    message += `📅 *Date:* ${formatDate(formData.pickupDate)}`;
    if (formData.pickupTime) message += ` at ${formData.pickupTime}`;
    message += `\n`;
    if (formData.returnDate) message += `📅 *Return:* ${formatDate(formData.returnDate)}\n`;
    message += `👥 *Passengers:* ${formData.passengers}\n`;
    
    if (formData.additionalRequests) {
      message += `\n💬 *Additional Requests:*\n${formData.additionalRequests}\n`;
    }
    
    return encodeURIComponent(message);
  };

  const getTripTypeLabel = (type) => {
    const labels = {
      local: "Local City Ride",
      airport: "Airport Transfer",
      outstation: "Outstation Trip"
    };
    return labels[type] || type;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Open WhatsApp with formatted message
      const whatsappUrl = `${siteInfo.socialLinks?.whatsapp || 'https://wa.me/916366244686'}?text=${formatWhatsAppMessage()}`;
      window.open(whatsappUrl, '_blank');
      
      setSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setSubmitted(false);
        if (onClose) onClose();
      }, 3000);
      
    } catch (err) {
      console.error('Booking error:', err);
      setError("Unable to open WhatsApp. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={`booking-form-container ${isModal ? 'modal' : ''}`}>
      {isModal && (
        <div className="booking-form-header">
          <h2>📝 Book Your Ride</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close booking form">×</button>
        </div>
      )}
      
      {!isModal && <h2 className="booking-form-title">📝 Book Your Ride</h2>}
      
      {submitted ? (
        <div className="booking-success" role="alert" aria-live="polite">
          <div className="success-icon" aria-hidden="true">✅</div>
          <h3>Booking Request Sent!</h3>
          <p>We've opened WhatsApp with your booking details. Our team will confirm shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          {error && <div className="form-error" role="alert">❌ {error}</div>}
          
          {/* Personal Details */}
          <div className="form-section">
            <h4>👤 Your Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="booking-name">Name *</label>
                <input
                  id="booking-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="booking-phone">Phone *</label>
                <input
                  id="booking-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 63662 44686"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="booking-email">Email (Optional)</label>
              <input
                id="booking-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Trip Type Selection */}
          <div className="form-section">
            <h4>🚗 Trip Type</h4>
            <div className="trip-type-selector" role="group" aria-label="Select trip type">
              <button
                type="button"
                className={`trip-type-btn ${formData.tripType === 'local' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, tripType: 'local', selectedTrip: '' }))}
                aria-pressed={formData.tripType === 'local'}
              >
                <span className="icon" aria-hidden="true">🚕</span>
                <span>Local</span>
              </button>
              <button
                type="button"
                className={`trip-type-btn ${formData.tripType === 'airport' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, tripType: 'airport', selectedTrip: '' }))}
                aria-pressed={formData.tripType === 'airport'}
              >
                <span className="icon" aria-hidden="true">✈️</span>
                <span>Airport</span>
              </button>
              <button
                type="button"
                className={`trip-type-btn ${formData.tripType === 'outstation' ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, tripType: 'outstation' }))}
                aria-pressed={formData.tripType === 'outstation'}
              >
                <span className="icon" aria-hidden="true">🗺️</span>
                <span>Outstation</span>
              </button>
            </div>
          </div>

          {/* Trip Package Selection (for outstation) */}
          {formData.tripType === 'outstation' && tripPackages.length > 0 && (
            <div className="form-section">
              <h4>📍 Select Package (Optional)</h4>
              <select
                name="selectedTrip"
                id="booking-trip"
                value={formData.selectedTrip}
                onChange={handleChange}
                className="form-select"
                aria-label="Select trip package"
              >
                <option value="">-- Custom Trip --</option>
                {tripPackages.map(trip => (
                  <option key={trip.id} value={trip.id}>
                    {trip.title || trip.name} - {trip.destination} ({trip.duration})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Travel Details */}
          <div className="form-section">
            <h4>📍 Travel Details</h4>
            <div className="form-group">
              <label htmlFor="booking-pickup">Pickup Location *</label>
              <input
                id="booking-pickup"
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder={formData.tripType === 'airport' ? "e.g., Koramangala, Bangalore" : "Enter pickup address"}
                required
                autoComplete="street-address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="booking-drop">{formData.tripType === 'local' ? 'Drop Location (Optional)' : 'Drop Location *'}</label>
              <input
                id="booking-drop"
                type="text"
                name="dropLocation"
                value={formData.dropLocation}
                onChange={handleChange}
                placeholder={formData.tripType === 'airport' ? "Kempegowda International Airport" : "Enter drop address"}
                required={formData.tripType !== 'local'}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="booking-date">Pickup Date *</label>
                <input
                  id="booking-date"
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  min={today}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="booking-time">Pickup Time</label>
                <input
                  id="booking-time"
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            {formData.tripType === 'outstation' && (
              <div className="form-group">
                <label htmlFor="booking-return">Return Date (for round trip)</label>
                <input
                  id="booking-return"
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.pickupDate || today}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="booking-passengers">Number of Passengers *</label>
              <select
                id="booking-passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="1">1 Passenger</option>
                <option value="2">2 Passengers</option>
                <option value="3">3 Passengers</option>
                <option value="4">4 Passengers</option>
                <option value="5">5 Passengers</option>
                <option value="6">6 Passengers</option>
                <option value="7+">7+ Passengers (Tempo)</option>
              </select>
            </div>
          </div>

          {/* Car Preference */}
          {cars.length > 0 && (
            <div className="form-section">
              <h4>🚙 Car Preference (Optional)</h4>
              <select
                name="selectedCar"
                id="booking-car"
                value={formData.selectedCar}
                onChange={handleChange}
                className="form-select"
                aria-label="Select preferred car"
              >
                <option value="">-- Any Available Car --</option>
                {cars.map(car => (
                  <option key={car.id} value={car.id}>
                    {car.name} - {car.seatingCapacity || car.capacity || '4+1'} seater
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Additional Requests */}
          <div className="form-section">
            <h4>💬 Additional Requests</h4>
            <textarea
              name="additionalRequests"
              id="booking-requests"
              value={formData.additionalRequests}
              onChange={handleChange}
              placeholder="Any special requests? (Child seat, specific pickup instructions, etc.)"
              rows="3"
              aria-label="Additional requests"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <span className="whatsapp-icon">💬</span>
                Send Booking via WhatsApp
              </>
            )}
          </button>
          
          <p className="form-note">
            Your details will be sent to our WhatsApp for quick confirmation
          </p>
        </form>
      )}
    </div>
  );
};

export default BookingForm;

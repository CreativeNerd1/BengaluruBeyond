import { useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";
import "./HomeCabServices.css";

const HomeCabServices = () => {
  const { cars, loading } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCar, setSelectedCar] = useState(null);

  // Get unique categories
  const categories = ['all', ...new Set(cars.map(car => car.type))];
  
  // Filter cars by category and show max 8
  const filteredCars = cars
    .filter(car => selectedCategory === 'all' || car.type === selectedCategory)
    .slice(0, 8);

  if (loading.cars && cars.length === 0) {
    return (
      <section className="home-cab-services" id="cab-services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Fleet</h2>
            <p className="section-subtitle">Loading vehicles...</p>
          </div>
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return null;
  }

  return (
    <section className="home-cab-services" id="cab-services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Fleet</h2>
          <p className="section-subtitle">
            Choose from our wide range of well-maintained vehicles
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Vehicles' : category}
            </button>
          ))}
        </div>

        {/* Cars Grid */}
        <div className="cars-grid">
          {filteredCars.map(car => (
            <div 
              key={car.id} 
              className="car-card"
              onClick={() => setSelectedCar(car)}
            >
              <div className="car-image">
                <img 
                  src={car.imageUrl || '/placeholder-car.jpg'} 
                  alt={car.name}
                  loading="lazy"
                />
                <span className="car-type-badge">{car.type}</span>
              </div>
              <div className="car-content">
                <h3 className="car-name">{car.name}</h3>
                <div className="car-features">
                  <span className="feature">
                    <span className="icon">👥</span> {car.seatingCapacity} Seats
                  </span>
                  <span className="feature">
                    <span className="icon">⛽</span> {car.fuelType}
                  </span>
                  <span className="feature">
                    <span className="icon">⚙️</span> {car.transmission}
                  </span>
                  {car.hasAC && (
                    <span className="feature">
                      <span className="icon">❄️</span> AC
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="car-modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="car-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCar(null)}>×</button>
            <div className="modal-image">
              <img src={selectedCar.imageUrl || '/placeholder-car.jpg'} alt={selectedCar.name} />
            </div>
            <div className="modal-content">
              <span className="modal-type">{selectedCar.type}</span>
              <h2>{selectedCar.name}</h2>
              <div className="modal-features">
                <div className="modal-feature">
                  <span className="label">Seating</span>
                  <span className="value">{selectedCar.seatingCapacity} Passengers</span>
                </div>
                <div className="modal-feature">
                  <span className="label">Fuel Type</span>
                  <span className="value">{selectedCar.fuelType}</span>
                </div>
                <div className="modal-feature">
                  <span className="label">Transmission</span>
                  <span className="value">{selectedCar.transmission}</span>
                </div>
                <div className="modal-feature">
                  <span className="label">AC</span>
                  <span className="value">{selectedCar.hasAC ? 'Yes' : 'No'}</span>
                </div>
              </div>
              {selectedCar.features && (
                <div className="modal-amenities">
                  <h4>Features & Amenities</h4>
                  <p>{selectedCar.features}</p>
                </div>
              )}
              <a 
                href={`https://wa.me/+919606919300?text=I%20would%20like%20to%20book%20${encodeURIComponent(selectedCar.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="book-now-btn"
              >
                📱 Book This Vehicle
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeCabServices;

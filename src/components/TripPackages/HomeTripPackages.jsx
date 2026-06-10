import { Link } from "react-router-dom";
import { useSiteData } from "../../context/SiteDataContext";
import "./HomeTripPackages.css";

const FALLBACK_TRIP_IMAGE = "https://picsum.photos/seed/cabmitra-trip/800/500";

const getTripImage = (trip) => {
  const candidates = [trip.imageUrl, trip.image, ...(trip.images || [])].filter(Boolean);
  return candidates[0] || FALLBACK_TRIP_IMAGE;
};

const HomeTripPackages = () => {
  const { tripPackages, loading } = useSiteData();

  // Show only first 6 packages on homepage
  const displayPackages = tripPackages.slice(0, 6);

  if (loading.tripPackages && tripPackages.length === 0) {
    return (
      <section className="home-trip-packages" id="trip-packages">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Trip Packages</h2>
            <p className="section-subtitle">Loading packages...</p>
          </div>
        </div>
      </section>
    );
  }

  if (tripPackages.length === 0) {
    return null;
  }

  return (
    <section className="home-trip-packages" id="trip-packages">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Trip Packages</h2>
          <p className="section-subtitle">
            Explore our curated travel packages to popular destinations
          </p>
        </div>
        
        <div className="packages-grid">
          {displayPackages.map((trip) => (
            <Link 
              key={trip.id} 
              to={`/packages/${trip.id}`} 
              className="package-card"
            >
              <div className="package-image">
                <img 
                  src={getTripImage(trip)}
                  alt={trip.title || trip.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_TRIP_IMAGE;
                  }}
                />
                <div className="package-overlay">
                  <span className="view-text">View Details</span>
                </div>
              </div>
              <div className="package-content">
                <span className="package-destination">{trip.destination}</span>
                <h3 className="package-title">{trip.title || trip.name}</h3>
                <div className="package-meta">
                  <span className="package-duration">
                    {trip.duration} {trip.durationType || 'Days'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {tripPackages.length > 6 && (
          <div className="view-all-wrapper">
            <Link to="/packages" className="view-all-btn">
              View All Packages →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeTripPackages;

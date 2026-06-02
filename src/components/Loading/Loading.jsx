import "./Loading.css";

// Full page loading spinner
export const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-content">
      <div className="car-loader">
        <span className="car-icon">🚖</span>
        <div className="road">
          <div className="road-line"></div>
        </div>
      </div>
      <p className="loader-text">Loading...</p>
    </div>
  </div>
);

// Skeleton loader for cards
export const CardSkeleton = () => (
  <div className="card-skeleton">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
    </div>
  </div>
);

// Skeleton loader for text
export const TextSkeleton = ({ lines = 3 }) => (
  <div className="text-skeleton">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`skeleton skeleton-line ${i === lines - 1 ? "short" : ""}`}
      ></div>
    ))}
  </div>
);

// Image skeleton
export const ImageSkeleton = ({ aspectRatio = "16/9" }) => (
  <div className="image-skeleton skeleton" style={{ aspectRatio }}></div>
);

// Inline spinner
export const Spinner = ({ size = "medium" }) => (
  <div className={`spinner spinner-${size}`}>
    <div className="spinner-ring"></div>
  </div>
);

export default PageLoader;

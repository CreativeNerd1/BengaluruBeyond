import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import HomeCabServices from "./components/CabServices/HomeCabServices";
import HomeTripPackages from "./components/TripPackages/HomeTripPackages";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import ScrollToTop, { ScrollToTopOnRoute } from "./components/ScrollToTop/ScrollToTop";
import SEO from "./components/SEO/SEO";
import { PageLoader } from "./components/Loading/Loading";
import { AdminProvider, useAdmin } from "./context/AdminContext";
import { SiteDataProvider } from "./context/SiteDataContext";
import "./App.css";

// Lazy load pages for better performance
const Contact = lazy(() => import("./components/Contact/Contact"));
const About = lazy(() => import("./components/About/About"));
const TripPackages = lazy(() => import("./components/TripPackages/TripPackages"));
const TripDetail = lazy(() => import("./components/TripDetail/TripDetail"));
const CabServices = lazy(() => import("./components/CabServices/CabServices"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy/PrivacyPolicy"));
const Terms = lazy(() => import("./components/Terms/Terms"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const BookingModal = lazy(() => import("./components/BookingModal/BookingModal"));

// Admin lazy imports
const AdminLogin = lazy(() => import("./admin/AdminLogin/AdminLogin"));
const AdminLayout = lazy(() => import("./admin/AdminLayout/AdminLayout"));
const AdminDashboard = lazy(() => import("./admin/Dashboard/Dashboard"));
const AdminSiteSettings = lazy(() => import("./admin/SiteSettings/SiteSettings"));
const AdminServices = lazy(() => import("./admin/Services/Services"));
const AdminTripPackages = lazy(() => import("./admin/TripPackages/TripPackages"));
const AdminTestimonials = lazy(() => import("./admin/Testimonials/Testimonials"));
const AdminInquiries = lazy(() => import("./admin/Inquiries/Inquiries"));
const AdminCars = lazy(() => import("./admin/Cars/Cars"));
const AdminNavigation = lazy(() => import("./admin/Navigation/Navigation"));
const AdminSettings = lazy(() => import("./admin/Settings/Settings"));

// Protected Route for Admin
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin();
  
  if (loading) {
    return <PageLoader />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Home Page Component
const HomePage = () => (
  <>
    <Hero />
    <Services />
    <HomeCabServices />
    <HomeTripPackages />
    <Testimonials />
  </>
);

// Layout wrapper to conditionally show header/footer
const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin Routes
  if (isAdminRoute) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="site-settings" element={<AdminSiteSettings />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="trip-packages" element={<AdminTripPackages />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="cars" element={<AdminCars />} />
            <Route path="navigation" element={<AdminNavigation />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="app">
      <SEO />
      <ScrollToTopOnRoute />
      <Header />
      <main id="main-content" role="main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/local-cabs" element={<CabServices serviceType="local" />} />
            <Route path="/airport-cabs" element={<CabServices serviceType="airport" />} />
            <Route path="/outstation-cabs" element={<CabServices serviceType="outstation" />} />
            {/* Alternative routes with /services/ prefix */}
            <Route path="/services/local-cabs" element={<CabServices serviceType="local" />} />
            <Route path="/services/airport-cabs" element={<CabServices serviceType="airport" />} />
            <Route path="/services/airport-transfers" element={<CabServices serviceType="airport" />} />
            <Route path="/services/outstation-cabs" element={<CabServices serviceType="outstation" />} />
            <Route path="/services/outstation-trips" element={<CabServices serviceType="outstation" />} />
            <Route path="/packages" element={<TripPackages />} />
            <Route path="/packages/:slug" element={<TripDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <BookingModal />
      </Suspense>
      <ScrollToTop />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <SiteDataProvider>
        <AdminProvider>
          <AppLayout />
        </AdminProvider>
      </SiteDataProvider>
    </Router>
  );
};

export default App;

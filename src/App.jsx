import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import ScrollToTop, { ScrollToTopOnRoute } from "./components/ScrollToTop/ScrollToTop";
import SEO from "./components/SEO/SEO";
import { PageLoader } from "./components/Loading/Loading";
import "./App.css";

// Lazy load pages for better performance
const Contact = lazy(() => import("./components/Contact/Contact"));
const About = lazy(() => import("./components/About/About"));
const TripPackages = lazy(() => import("./components/TripPackages/TripPackages"));
const TripDetail = lazy(() => import("./components/TripDetail/TripDetail"));
const CabServices = lazy(() => import("./components/CabServices/CabServices"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

// Home Page Component
const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Testimonials />
  </>
);

const App = () => {
  return (
    <Router>
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
              <Route path="/packages" element={<TripPackages />} />
              <Route path="/packages/:slug" element={<TripDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
};

export default App;

/**
 * SiteDataContext
 * Provides site-wide data from API to all components
 * Handles loading, error states, and caching
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchSiteInfo, fetchGoogleRating } from '../services/api/siteInfoApi';
import { fetchNavLinks } from '../services/api/navLinksApi';
import { fetchServices } from '../services/api/servicesApi';
import { fetchTestimonials } from '../services/api/testimonialsApi';
import { fetchTripPackages } from '../services/api/tripPackagesApi';
import { fetchCars } from '../services/api/carsApi';

const SiteDataContext = createContext(null);

/**
 * Default/fallback data when API calls fail
 */
const defaultData = {
  siteInfo: {
    name: 'CabMitra',
    tagline: 'Where Journeys Begin',
    description: 'Explore the vibrant city with our reliable cab services',
    phone: '+91 9606919300',
    email: 'info@cabmitra.com',
    address: {
      line1: 'Bengaluru',
      line2: 'Karnataka',
      city: 'India',
    },
    socialLinks: {
      whatsapp: 'https://wa.me/+919606919300',
      instagram: '#',
      youtube: '#',
      google: '#',
    },
  },
  googleRating: { rating: 4.9, totalReviews: 100 },
  navLinks: [],
  services: [],
  testimonials: [],
  tripPackages: [],
  cars: [],
};

/**
 * SiteDataProvider component
 * Wraps the app and provides site data to all components
 */
export function SiteDataProvider({ children }) {
  const [data, setData] = useState({
    siteInfo: null,
    googleRating: null,
    navLinks: null,
    services: null,
    testimonials: null,
    tripPackages: null,
    cars: null,
  });
  
  const [loading, setLoading] = useState({
    siteInfo: true,
    navLinks: true,
    services: true,
    testimonials: true,
    tripPackages: true,
    cars: true,
  });
  
  const [errors, setErrors] = useState({});

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      // Fetch site info
      try {
        const [siteResult, ratingResult] = await Promise.all([
          fetchSiteInfo(),
          fetchGoogleRating(),
        ]);
        setData(prev => ({
          ...prev,
          siteInfo: siteResult.success ? siteResult.data : defaultData.siteInfo,
          googleRating: ratingResult.success ? ratingResult.data : defaultData.googleRating,
        }));
      } catch (error) {
        console.error('Error fetching site info:', error);
        setData(prev => ({ ...prev, siteInfo: defaultData.siteInfo, googleRating: defaultData.googleRating }));
        setErrors(prev => ({ ...prev, siteInfo: error.message }));
      }
      setLoading(prev => ({ ...prev, siteInfo: false }));

      // Fetch nav links
      try {
        const result = await fetchNavLinks();
        setData(prev => ({
          ...prev,
          navLinks: result.success ? result.data : defaultData.navLinks,
        }));
      } catch (error) {
        console.error('Error fetching nav links:', error);
        setData(prev => ({ ...prev, navLinks: defaultData.navLinks }));
        setErrors(prev => ({ ...prev, navLinks: error.message }));
      }
      setLoading(prev => ({ ...prev, navLinks: false }));

      // Fetch services
      try {
        const result = await fetchServices();
        setData(prev => ({
          ...prev,
          services: result.success ? result.data : defaultData.services,
        }));
      } catch (error) {
        console.error('Error fetching services:', error);
        setData(prev => ({ ...prev, services: defaultData.services }));
        setErrors(prev => ({ ...prev, services: error.message }));
      }
      setLoading(prev => ({ ...prev, services: false }));

      // Fetch testimonials
      try {
        const result = await fetchTestimonials();
        setData(prev => ({
          ...prev,
          testimonials: result.success ? result.data : defaultData.testimonials,
        }));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setData(prev => ({ ...prev, testimonials: defaultData.testimonials }));
        setErrors(prev => ({ ...prev, testimonials: error.message }));
      }
      setLoading(prev => ({ ...prev, testimonials: false }));

      // Fetch trip packages
      try {
        const result = await fetchTripPackages();
        setData(prev => ({
          ...prev,
          tripPackages: result.success ? result.data : defaultData.tripPackages,
        }));
      } catch (error) {
        console.error('Error fetching trip packages:', error);
        setData(prev => ({ ...prev, tripPackages: defaultData.tripPackages }));
        setErrors(prev => ({ ...prev, tripPackages: error.message }));
      }
      setLoading(prev => ({ ...prev, tripPackages: false }));

      // Fetch cars
      try {
        const result = await fetchCars();
        setData(prev => ({
          ...prev,
          cars: result.success ? result.data : defaultData.cars,
        }));
      } catch (error) {
        console.error('Error fetching cars:', error);
        setData(prev => ({ ...prev, cars: defaultData.cars }));
        setErrors(prev => ({ ...prev, cars: error.message }));
      }
      setLoading(prev => ({ ...prev, cars: false }));
    };

    fetchAllData();
  }, []);

  // Refresh individual data
  const refresh = useCallback(async (key) => {
    setLoading(prev => ({ ...prev, [key]: true }));
    
    try {
      let result;
      switch (key) {
        case 'siteInfo':
          result = await fetchSiteInfo();
          if (result.success) setData(prev => ({ ...prev, siteInfo: result.data }));
          break;
        case 'navLinks':
          result = await fetchNavLinks();
          if (result.success) setData(prev => ({ ...prev, navLinks: result.data }));
          break;
        case 'services':
          result = await fetchServices();
          if (result.success) setData(prev => ({ ...prev, services: result.data }));
          break;
        case 'testimonials':
          result = await fetchTestimonials();
          if (result.success) setData(prev => ({ ...prev, testimonials: result.data }));
          break;
        case 'tripPackages':
          result = await fetchTripPackages();
          if (result.success) setData(prev => ({ ...prev, tripPackages: result.data }));
          break;
        case 'cars':
          result = await fetchCars();
          if (result.success) setData(prev => ({ ...prev, cars: result.data }));
          break;
        default:
          console.warn(`Unknown data key: ${key}`);
      }
    } catch (error) {
      console.error(`Error refreshing ${key}:`, error);
      setErrors(prev => ({ ...prev, [key]: error.message }));
    }
    
    setLoading(prev => ({ ...prev, [key]: false }));
  }, []);

  // Refresh all data
  const refreshAll = useCallback(async () => {
    await Promise.all([
      refresh('siteInfo'),
      refresh('navLinks'),
      refresh('services'),
      refresh('testimonials'),
      refresh('tripPackages'),
      refresh('cars'),
    ]);
  }, [refresh]);

  // Check if any data is loading
  const isLoading = useMemo(() => 
    Object.values(loading).some(Boolean),
    [loading]
  );

  // Check if initial load is complete
  const isInitialized = useMemo(() => 
    Object.values(data).every(v => v !== null),
    [data]
  );

  const value = useMemo(() => ({
    // Data
    siteInfo: data.siteInfo || defaultData.siteInfo,
    googleRating: data.googleRating || defaultData.googleRating,
    navLinks: data.navLinks || defaultData.navLinks,
    services: data.services || defaultData.services,
    testimonials: data.testimonials || defaultData.testimonials,
    tripPackages: data.tripPackages || defaultData.tripPackages,
    cars: data.cars || defaultData.cars,
    
    // Loading states
    loading,
    isLoading,
    isInitialized,
    
    // Errors
    errors,
    
    // Actions
    refresh,
    refreshAll,
  }), [data, loading, isLoading, isInitialized, errors, refresh, refreshAll]);

  return (
    <SiteDataContext.Provider value={value}>
      {children}
    </SiteDataContext.Provider>
  );
}

/**
 * Hook to access site data
 * @returns {Object} Site data context value
 */
export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}

/**
 * Convenience hooks for specific data
 */
export const useSiteInfo = () => {
  const { siteInfo, googleRating, loading } = useSiteData();
  return { siteInfo, googleRating, loading: loading.siteInfo };
};

export const useNavLinks = () => {
  const { navLinks, loading } = useSiteData();
  return { navLinks, loading: loading.navLinks };
};

export const useServicesData = () => {
  const { services, loading } = useSiteData();
  return { services, loading: loading.services };
};

export const useTestimonialsData = () => {
  const { testimonials, googleRating, loading } = useSiteData();
  return { testimonials, googleRating, loading: loading.testimonials };
};

export const useTripPackagesData = () => {
  const { tripPackages, loading } = useSiteData();
  return { tripPackages, loading: loading.tripPackages };
};

export const useCarsData = () => {
  const { cars, loading } = useSiteData();
  return { cars, loading: loading.cars };
};

export default SiteDataContext;

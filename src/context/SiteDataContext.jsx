/**
 * Static SiteDataContext
 * Public site data is fully static and sourced from a single file.
 */

import { createContext, useContext, useMemo } from 'react';
import staticContent from '../data/staticContent';

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const loading = useMemo(
    () => ({
      siteInfo: false,
      navLinks: false,
      services: false,
      testimonials: false,
      tripPackages: false,
      cars: false,
    }),
    []
  );

  const refresh = async () => {
    // Static mode: no backend refresh required.
  };

  const value = useMemo(
    () => ({
      siteInfo: staticContent.siteInfo,
      googleRating: staticContent.googleRating,
      navLinks: staticContent.navLinks,
      services: staticContent.services,
      testimonials: staticContent.testimonials,
      tripPackages: staticContent.tripPackages,
      cars: staticContent.cars,
      loading,
      isLoading: false,
      isInitialized: true,
      errors: {},
      refresh,
      refreshAll: refresh,
    }),
    [loading]
  );

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}

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

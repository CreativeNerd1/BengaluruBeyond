/**
 * Hooks Index
 * Re-exports all custom hooks for convenient imports
 */

// Generic hooks
export { useAsync } from './useAsync';
export { useFetch } from './useFetch';

// Domain-specific hooks (traditional)
export { useTestimonials } from './useTestimonials';
export { useServices } from './useServices';
export { useTripPackages, useTripDestinations } from './useTripPackages';
export { useSiteInfo, useGoogleRating } from './useSiteInfo';

// React 19 Suspense-based hooks (use with Suspense boundary)
export { 
  useTestimonialsData, 
  fetchTestimonialsPromise,
  useTestimonialsMutation 
} from './useTestimonialsData';

export { 
  useServicesData, 
  fetchServicesPromise,
  useServicesMutation 
} from './useServicesData';

export { 
  useTripDestinationsData, 
  fetchTripDestinationsPromise,
  useTripPackagesMutation 
} from './useTripPackagesData';

export { 
  useSiteInfoData, 
  useGoogleRatingData,
  fetchSiteInfoPromise,
  fetchGoogleRatingPromise,
  useSiteInfoMutation 
} from './useSiteInfoData';

// Animation hooks (existing)
export { useInView, useScrollProgress } from './useAnimations';

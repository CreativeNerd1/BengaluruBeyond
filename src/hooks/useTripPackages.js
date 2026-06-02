/**
 * useTripPackages Hook
 * Hook for fetching and managing trip packages data
 */

import { useFetch } from './useFetch';
import { 
  fetchTripPackages as apiFetchTripPackages,
  fetchTripDestinations as apiFetchTripDestinations 
} from '../services/api/index';
import { tripDestinations as staticTripDestinations } from '../data/tripData';

/**
 * Hook for fetching trip packages
 * @param {Object} options - Hook options
 * @param {boolean} [options.activeOnly=true] - Whether to fetch only active packages
 * @returns {Object} Trip packages data and state
 */
export const useTripPackages = (options = {}) => {
  const { activeOnly = true } = options;

  const fetchFn = () => apiFetchTripPackages(activeOnly);

  const { data, loading, error, refetch } = useFetch(fetchFn, {
    immediate: true,
    fallbackData: [],
  });

  return {
    tripPackages: data || [],
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for fetching trip packages grouped by destination
 * @param {Object} options - Hook options
 * @param {boolean} [options.activeOnly=true] - Whether to fetch only active packages
 * @returns {Object} Trip destinations data and state
 */
export const useTripDestinations = (options = {}) => {
  const { activeOnly = true } = options;

  const fetchFn = () => apiFetchTripDestinations(activeOnly);

  const { data, loading, error, refetch } = useFetch(fetchFn, {
    immediate: true,
    fallbackData: staticTripDestinations,
  });

  return {
    destinations: data || [],
    loading,
    error,
    refetch,
  };
};

export default useTripPackages;

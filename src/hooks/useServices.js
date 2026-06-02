/**
 * useServices Hook
 * Hook for fetching and managing services data
 */

import { useFetch } from './useFetch';
import { fetchServices as apiFetchServices } from '../services/api/index';
import { services as staticServices } from '../data/siteData';

/**
 * Hook for fetching services
 * @param {Object} options - Hook options
 * @param {boolean} [options.activeOnly=true] - Whether to fetch only active services
 * @returns {Object} Services data and state
 */
export const useServices = (options = {}) => {
  const { activeOnly = true } = options;

  const fetchFn = () => apiFetchServices(activeOnly);

  const { data, loading, error, refetch } = useFetch(fetchFn, {
    immediate: true,
    fallbackData: staticServices,
  });

  return {
    services: data || [],
    loading,
    error,
    refetch,
  };
};

export default useServices;

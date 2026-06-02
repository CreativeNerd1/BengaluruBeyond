/**
 * useTestimonials Hook
 * Hook for fetching and managing testimonials data
 */

import { useFetch } from './useFetch';
import { fetchTestimonials as apiFetchTestimonials } from '../services/api/index';
import { testimonials as staticTestimonials } from '../data/siteData';

/**
 * Hook for fetching testimonials
 * @param {Object} options - Hook options
 * @param {boolean} [options.activeOnly=true] - Whether to fetch only active testimonials
 * @returns {Object} Testimonials data and state
 */
export const useTestimonials = (options = {}) => {
  const { activeOnly = true } = options;

  const fetchFn = () => apiFetchTestimonials(activeOnly);

  const { data, loading, error, refetch } = useFetch(fetchFn, {
    immediate: true,
    fallbackData: staticTestimonials,
  });

  return {
    testimonials: data || [],
    loading,
    error,
    refetch,
  };
};

export default useTestimonials;

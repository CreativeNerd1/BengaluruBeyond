/**
 * useTestimonialsData Hook (React 19)
 * Uses the `use` hook for Suspense-based data fetching
 */

import { use, useMemo, useTransition, useCallback } from 'react';
import { fetchTestimonials } from '../services/api/index';
import { createCachedFetcher, invalidateCache } from '../lib/suspenseUtils';
import { testimonials as staticTestimonials } from '../data/siteData';

// Cache key for testimonials
const CACHE_KEY = 'testimonials';

/**
 * Creates a promise for fetching testimonials (for use with `use` hook)
 * @param {boolean} activeOnly - Whether to fetch only active testimonials
 * @returns {Promise<Array>} Promise resolving to testimonials array
 */
export const fetchTestimonialsPromise = (activeOnly = true) => {
  return createCachedFetcher(
    `${CACHE_KEY}-${activeOnly}`,
    () => fetchTestimonials(activeOnly),
    5 * 60 * 1000 // 5 minute cache
  );
};

/**
 * Hook for using testimonials with React 19's `use` hook
 * Must be used within a Suspense boundary
 * @param {Promise<Array>} promise - Promise from fetchTestimonialsPromise
 * @returns {Array} Testimonials data
 */
export const useTestimonialsData = (promise) => {
  const data = use(promise);
  return data?.length > 0 ? data : staticTestimonials;
};

/**
 * Hook for testimonials with mutation support
 * @returns {Object} Testimonials state and actions
 */
export const useTestimonialsMutation = () => {
  const [isPending, startTransition] = useTransition();

  const refetch = useCallback(() => {
    invalidateCache(`${CACHE_KEY}-true`);
    invalidateCache(`${CACHE_KEY}-false`);
  }, []);

  return {
    isPending,
    refetch,
    startTransition,
  };
};

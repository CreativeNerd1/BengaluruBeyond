/**
 * useServicesData Hook (React 19)
 * Uses the `use` hook for Suspense-based data fetching
 */

import { use, useCallback, useTransition } from 'react';
import { fetchServices } from '../services/api/index';
import { createCachedFetcher, invalidateCache } from '../lib/suspenseUtils';
import { services as staticServices } from '../data/siteData';

const CACHE_KEY = 'services';

/**
 * Creates a promise for fetching services (for use with `use` hook)
 * @param {boolean} activeOnly - Whether to fetch only active services
 * @returns {Promise<Array>} Promise resolving to services array
 */
export const fetchServicesPromise = (activeOnly = true) => {
  return createCachedFetcher(
    `${CACHE_KEY}-${activeOnly}`,
    () => fetchServices(activeOnly),
    5 * 60 * 1000
  );
};

/**
 * Hook for using services with React 19's `use` hook
 * Must be used within a Suspense boundary
 * @param {Promise<Array>} promise - Promise from fetchServicesPromise
 * @returns {Array} Services data
 */
export const useServicesData = (promise) => {
  const data = use(promise);
  return data?.length > 0 ? data : staticServices;
};

/**
 * Hook for services with mutation support
 */
export const useServicesMutation = () => {
  const [isPending, startTransition] = useTransition();

  const refetch = useCallback(() => {
    invalidateCache(`${CACHE_KEY}-true`);
    invalidateCache(`${CACHE_KEY}-false`);
  }, []);

  return { isPending, refetch, startTransition };
};

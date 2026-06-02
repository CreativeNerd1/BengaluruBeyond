/**
 * useTripPackagesData Hook (React 19)
 * Uses the `use` hook for Suspense-based data fetching
 */

import { use, useCallback, useTransition } from 'react';
import { fetchTripDestinations } from '../services/api/index';
import { createCachedFetcher, invalidateCache } from '../lib/suspenseUtils';
import { tripDestinations as staticTripDestinations } from '../data/tripData';

const CACHE_KEY = 'tripDestinations';

/**
 * Creates a promise for fetching trip destinations (for use with `use` hook)
 * @param {boolean} activeOnly - Whether to fetch only active packages
 * @returns {Promise<Array>} Promise resolving to destinations array
 */
export const fetchTripDestinationsPromise = (activeOnly = true) => {
  return createCachedFetcher(
    `${CACHE_KEY}-${activeOnly}`,
    () => fetchTripDestinations(activeOnly),
    5 * 60 * 1000
  );
};

/**
 * Hook for using trip destinations with React 19's `use` hook
 * Must be used within a Suspense boundary
 * @param {Promise<Array>} promise - Promise from fetchTripDestinationsPromise
 * @returns {Array} Trip destinations data
 */
export const useTripDestinationsData = (promise) => {
  const data = use(promise);
  return data?.length > 0 ? data : staticTripDestinations;
};

/**
 * Hook for trip packages with mutation support
 */
export const useTripPackagesMutation = () => {
  const [isPending, startTransition] = useTransition();

  const refetch = useCallback(() => {
    invalidateCache(`${CACHE_KEY}-true`);
    invalidateCache(`${CACHE_KEY}-false`);
  }, []);

  return { isPending, refetch, startTransition };
};

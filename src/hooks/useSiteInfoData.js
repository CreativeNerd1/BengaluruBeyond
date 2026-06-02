/**
 * useSiteInfoData Hook (React 19)
 * Uses the `use` hook for Suspense-based data fetching
 */

import { use, useCallback, useTransition } from 'react';
import { fetchSiteInfo, fetchGoogleRating } from '../services/api/index';
import { createCachedFetcher, invalidateCache } from '../lib/suspenseUtils';
import { siteInfo as staticSiteInfo, googleRating as staticGoogleRating } from '../data/siteData';

const CACHE_KEY = 'siteInfo';
const RATING_CACHE_KEY = 'googleRating';

/**
 * Creates a promise for fetching site info (for use with `use` hook)
 * @returns {Promise<Object>} Promise resolving to site info
 */
export const fetchSiteInfoPromise = () => {
  return createCachedFetcher(
    CACHE_KEY,
    fetchSiteInfo,
    10 * 60 * 1000 // 10 minute cache for site info
  );
};

/**
 * Creates a promise for fetching Google rating (for use with `use` hook)
 * @returns {Promise<Object>} Promise resolving to Google rating
 */
export const fetchGoogleRatingPromise = () => {
  return createCachedFetcher(
    RATING_CACHE_KEY,
    fetchGoogleRating,
    10 * 60 * 1000
  );
};

/**
 * Hook for using site info with React 19's `use` hook
 * Must be used within a Suspense boundary
 * @param {Promise<Object>} promise - Promise from fetchSiteInfoPromise
 * @returns {Object} Site info data
 */
export const useSiteInfoData = (promise) => {
  const data = use(promise);
  return data || staticSiteInfo;
};

/**
 * Hook for using Google rating with React 19's `use` hook
 * Must be used within a Suspense boundary
 * @param {Promise<Object>} promise - Promise from fetchGoogleRatingPromise
 * @returns {Object} Google rating data
 */
export const useGoogleRatingData = (promise) => {
  const data = use(promise);
  return data || staticGoogleRating;
};

/**
 * Hook for site info with mutation support
 */
export const useSiteInfoMutation = () => {
  const [isPending, startTransition] = useTransition();

  const refetch = useCallback(() => {
    invalidateCache(CACHE_KEY);
    invalidateCache(RATING_CACHE_KEY);
  }, []);

  return { isPending, refetch, startTransition };
};

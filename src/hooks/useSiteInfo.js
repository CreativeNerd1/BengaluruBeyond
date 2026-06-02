/**
 * useSiteInfo Hook
 * Hook for fetching and managing site information
 */

import { useFetch } from './useFetch';
import { fetchSiteInfo as apiFetchSiteInfo, fetchGoogleRating as apiFetchGoogleRating } from '../services/api/index';
import { siteInfo as staticSiteInfo, googleRating as staticGoogleRating } from '../data/siteData';

/**
 * Hook for fetching site information
 * @returns {Object} Site info data and state
 */
export const useSiteInfo = () => {
  const { data, loading, error, refetch } = useFetch(apiFetchSiteInfo, {
    immediate: true,
    fallbackData: staticSiteInfo,
  });

  return {
    siteInfo: data,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook for fetching Google rating
 * @returns {Object} Google rating data and state
 */
export const useGoogleRating = () => {
  const { data, loading, error, refetch } = useFetch(apiFetchGoogleRating, {
    immediate: true,
    fallbackData: staticGoogleRating,
  });

  return {
    googleRating: data || staticGoogleRating,
    loading,
    error,
    refetch,
  };
};

export default useSiteInfo;

/**
 * useFetch Hook
 * Hook for fetching data on component mount with automatic loading states
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * @typedef {Object} FetchOptions
 * @property {boolean} [immediate=true] - Whether to fetch immediately on mount
 * @property {*} [fallbackData=null] - Fallback data if fetch fails
 * @property {Array} [deps=[]] - Dependencies that trigger refetch
 */

/**
 * Hook for fetching data with automatic state management
 * @param {Function} fetchFn - Async function that returns {success, data, error}
 * @param {FetchOptions} options - Hook options
 * @returns {Object} Fetch state and control functions
 */
export const useFetch = (fetchFn, options = {}) => {
  const { 
    immediate = true, 
    fallbackData = null,
    deps = [],
  } = options;

  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();

      // Only update state if component is still mounted
      if (!mountedRef.current) return;

      if (result.success && result.data) {
        setData(result.data);
      } else if (fallbackData) {
        setData(fallbackData);
        if (result.error) setError(result.error);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err.message || 'An error occurred');
      if (fallbackData) setData(fallbackData);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [fetchFn, fallbackData]);

  const refetch = useCallback(() => {
    return fetch();
  }, [fetch]);

  // Initial fetch and dependency-based refetch
  useEffect(() => {
    mountedRef.current = true;
    
    if (immediate) {
      fetch();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [immediate, ...deps]); // eslint-disable-line react-hooks/exhaustive-deps

  return { 
    data, 
    loading, 
    error, 
    refetch,
    setData,
  };
};

export default useFetch;

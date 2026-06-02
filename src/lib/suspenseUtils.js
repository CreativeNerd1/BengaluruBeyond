/**
 * React 19 Data Fetching Utilities
 * Uses the new `use` hook with Suspense for cleaner data fetching
 */

// Simple cache implementation for deduping requests
const cache = new Map();

/**
 * Creates a cached fetch function that can be used with React's `use` hook
 * @param {string} key - Unique cache key
 * @param {Function} fetcher - Async function that returns data
 * @param {number} ttl - Time to live in ms (default: 5 minutes)
 * @returns {Promise} Cached promise
 */
export const createCachedFetcher = (key, fetcher, ttl = 5 * 60 * 1000) => {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.promise;
  }

  const promise = fetcher().then(result => {
    if (result.success) {
      return result.data;
    }
    throw new Error(result.error || 'Fetch failed');
  });

  cache.set(key, { promise, timestamp: Date.now() });
  
  return promise;
};

/**
 * Invalidates a cache entry
 * @param {string} key - Cache key to invalidate
 */
export const invalidateCache = (key) => {
  cache.delete(key);
};

/**
 * Clears the entire cache
 */
export const clearCache = () => {
  cache.clear();
};

/**
 * Creates a resource for use with React Suspense
 * Follows the "render-as-you-fetch" pattern
 * @param {Function} fetcher - Async function that returns {success, data, error}
 * @returns {Object} Resource with read() method
 */
export const createResource = (fetcher) => {
  let status = 'pending';
  let result;

  const promise = fetcher().then(
    (res) => {
      if (res.success) {
        status = 'success';
        result = res.data;
      } else {
        status = 'error';
        result = new Error(res.error || 'Fetch failed');
      }
    },
    (error) => {
      status = 'error';
      result = error;
    }
  );

  return {
    read() {
      switch (status) {
        case 'pending':
          throw promise; // Suspense will catch this
        case 'error':
          throw result;
        case 'success':
          return result;
        default:
          throw new Error('Unknown status');
      }
    },
  };
};

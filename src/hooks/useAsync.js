/**
 * useAsync Hook
 * Generic hook for handling async operations with loading, error, and data states
 */

import { useState, useCallback } from 'react';

/**
 * @typedef {Object} AsyncState
 * @property {*} data - The fetched data
 * @property {boolean} loading - Whether the operation is in progress
 * @property {string|null} error - Error message if any
 */

/**
 * Generic hook for async operations
 * @returns {Object} Async state and execute function
 */
export const useAsync = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFn, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFn(...args);
      
      if (result.success) {
        setData(result.data);
        return { success: true, data: result.data };
      } else {
        setError(result.error || 'Operation failed');
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset, setData };
};

export default useAsync;

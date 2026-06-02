/**
 * Base API Client
 * Handles HTTP requests with authentication and error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5077/api';

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => localStorage.getItem('admin_token');

/**
 * Generic API response type
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {string} [message] - Optional message
 * @property {*} [data] - Response data
 * @property {string} [error] - Error message if failed
 */

/**
 * Makes an authenticated API call
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<ApiResponse>} API response
 */
export const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || `Request failed with status ${response.status}` 
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { 
      success: false, 
      error: error.message || 'Network error' 
    };
  }
};

/**
 * HTTP method helpers
 */
export const httpGet = (endpoint) => apiCall(endpoint);

export const httpPost = (endpoint, body) =>
  apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

export const httpPut = (endpoint, body) =>
  apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

export const httpDelete = (endpoint) =>
  apiCall(endpoint, {
    method: 'DELETE',
  });

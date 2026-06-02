/**
 * API Services Index
 * Re-exports all API services for convenient imports
 */

// Base client
export { apiCall, httpGet, httpPost, httpPut, httpDelete } from './apiClient';

// Domain APIs
export * from './testimonialsApi';
export * from './servicesApi';
export * from './tripPackagesApi';
export * from './siteInfoApi';

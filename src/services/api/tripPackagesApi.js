/**
 * Trip Packages API Service
 * Handles all trip package-related API calls with data transformation
 */

import { httpGet, httpPost, httpPut, httpDelete } from './apiClient';
import { 
  mapTripPackageFromApi, 
  mapTripPackagesFromApi, 
  mapTripPackageToApi,
  groupPackagesByDestination 
} from '../mappers/tripPackageMapper';

/**
 * Fetch all trip packages
 * @param {boolean} activeOnly - Whether to fetch only active packages
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchTripPackages = async (activeOnly = true) => {
  const result = await httpGet(`/trippackages?activeOnly=${activeOnly}&pageSize=100`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTripPackagesFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch trip packages grouped by destination
 * @param {boolean} activeOnly - Whether to fetch only active packages
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchTripDestinations = async (activeOnly = true) => {
  const result = await fetchTripPackages(activeOnly);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: groupPackagesByDestination(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch a single trip package by ID
 * @param {number} id - Trip package ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchTripPackageById = async (id) => {
  const result = await httpGet(`/trippackages/${id}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTripPackageFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch a trip package by slug
 * @param {string} slug - Trip package slug
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchTripPackageBySlug = async (slug) => {
  const result = await fetchTripPackages(true);
  
  if (result.success && result.data) {
    const item = result.data.find(p => p.slug === slug);
    return item 
      ? { success: true, data: item }
      : { success: false, error: 'Package not found' };
  }
  
  return result;
};

/**
 * Create a new trip package
 * @param {Object} tripPackage - Trip package data (frontend format)
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const createTripPackage = async (tripPackage) => {
  const dto = mapTripPackageToApi(tripPackage);
  const result = await httpPost('/trippackages', dto);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTripPackageFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Update an existing trip package
 * @param {number} id - Trip package ID
 * @param {Object} tripPackage - Updated trip package data (frontend format)
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateTripPackage = async (id, tripPackage) => {
  const dto = mapTripPackageToApi(tripPackage);
  const result = await httpPut(`/trippackages/${id}`, dto);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTripPackageFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Delete a trip package
 * @param {number} id - Trip package ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteTripPackage = async (id) => {
  return await httpDelete(`/trippackages/${id}`);
};

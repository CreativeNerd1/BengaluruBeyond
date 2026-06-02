/**
 * Services API Service
 * Handles all service-related API calls with data transformation
 */

import { httpGet, httpPost, httpPut, httpDelete } from './apiClient';
import { 
  mapServiceFromApi, 
  mapServicesFromApi, 
  mapServiceToApi 
} from '../mappers/serviceMapper';

/**
 * Fetch all services
 * @param {boolean} activeOnly - Whether to fetch only active services
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchServices = async (activeOnly = true) => {
  const result = await httpGet(`/services?activeOnly=${activeOnly}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapServicesFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch a single service by ID
 * @param {number} id - Service ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchServiceById = async (id) => {
  const result = await httpGet(`/services/${id}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapServiceFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Create a new service
 * @param {Object} service - Service data (frontend format)
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const createService = async (service) => {
  const dto = mapServiceToApi(service);
  const result = await httpPost('/services', dto);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapServiceFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Update an existing service
 * @param {number} id - Service ID
 * @param {Object} service - Updated service data (frontend format)
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateService = async (id, service) => {
  const dto = mapServiceToApi(service);
  const result = await httpPut(`/services/${id}`, dto);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapServiceFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Delete a service
 * @param {number} id - Service ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteService = async (id) => {
  return await httpDelete(`/services/${id}`);
};

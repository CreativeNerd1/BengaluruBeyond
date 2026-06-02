/**
 * Drivers API Service
 * Handles all driver-related API calls with data transformation
 */

import { httpGet, httpPost, httpPut, httpDelete } from './apiClient';

/**
 * Transform API driver data to frontend format
 */
const mapDriverFromApi = (driver) => ({
  id: driver.id,
  name: driver.name,
  phone: driver.phone,
  email: driver.email,
  address: driver.address,
  licenseNumber: driver.licenseNumber,
  licenseExpiry: driver.licenseExpiry,
  experienceYears: driver.experienceYears,
  experience: `${driver.experienceYears || 0}+ years`,
  imageUrl: driver.imageUrl,
  image: driver.imageUrl,
  status: driver.status,
  rating: driver.rating || 0,
  totalTrips: driver.totalTrips || 0,
  languages: driver.languages ? driver.languages.split(',').map(l => l.trim()) : ['English', 'Hindi', 'Kannada'],
  isVerified: driver.isVerified,
  verified: driver.isVerified,
  isActive: driver.isActive,
  // UI computed fields
  available: driver.status === 'Available',
  badge: driver.isVerified ? 'Verified' : null,
});

const mapDriversFromApi = (drivers) => drivers.map(mapDriverFromApi);

/**
 * Fetch all drivers
 * @param {boolean} activeOnly - Whether to fetch only active drivers
 * @param {string} status - Filter by status
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchDrivers = async (activeOnly = true, status = null) => {
  const params = new URLSearchParams();
  if (activeOnly) params.append('activeOnly', 'true');
  if (status) params.append('status', status);
  
  const result = await httpGet(`/drivers?${params.toString()}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapDriversFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch a single driver by ID
 * @param {number} id - Driver ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchDriverById = async (id) => {
  const result = await httpGet(`/drivers/${id}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapDriverFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Create a new driver (admin only)
 * @param {Object} driverData - Driver data
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const createDriver = async (driverData) => {
  const payload = {
    name: driverData.name,
    phone: driverData.phone,
    email: driverData.email,
    address: driverData.address,
    licenseNumber: driverData.licenseNumber,
    licenseExpiry: driverData.licenseExpiry,
    experienceYears: driverData.experienceYears,
    imageUrl: driverData.imageUrl || driverData.image,
    status: driverData.status || 'Available',
    rating: driverData.rating || 0,
    totalTrips: driverData.totalTrips || 0,
    languages: Array.isArray(driverData.languages) ? driverData.languages.join(', ') : driverData.languages,
    isVerified: driverData.isVerified ?? false,
    isActive: driverData.isActive ?? true,
  };
  
  const result = await httpPost('/drivers', payload);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapDriverFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Update a driver (admin only)
 * @param {number} id - Driver ID
 * @param {Object} driverData - Updated driver data
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateDriver = async (id, driverData) => {
  const payload = {};
  
  // Only include fields that are defined
  if (driverData.name !== undefined) payload.name = driverData.name;
  if (driverData.phone !== undefined) payload.phone = driverData.phone;
  if (driverData.email !== undefined) payload.email = driverData.email;
  if (driverData.address !== undefined) payload.address = driverData.address;
  if (driverData.licenseNumber !== undefined) payload.licenseNumber = driverData.licenseNumber;
  if (driverData.licenseExpiry !== undefined) payload.licenseExpiry = driverData.licenseExpiry;
  if (driverData.experienceYears !== undefined) payload.experienceYears = driverData.experienceYears;
  if (driverData.imageUrl !== undefined) payload.imageUrl = driverData.imageUrl;
  if (driverData.image !== undefined) payload.imageUrl = driverData.image;
  if (driverData.status !== undefined) payload.status = driverData.status;
  if (driverData.rating !== undefined) payload.rating = driverData.rating;
  if (driverData.totalTrips !== undefined) payload.totalTrips = driverData.totalTrips;
  if (driverData.languages !== undefined) {
    payload.languages = Array.isArray(driverData.languages) ? driverData.languages.join(', ') : driverData.languages;
  }
  if (driverData.isVerified !== undefined) payload.isVerified = driverData.isVerified;
  if (driverData.isActive !== undefined) payload.isActive = driverData.isActive;
  
  const result = await httpPut(`/drivers/${id}`, payload);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapDriverFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Delete a driver (admin only)
 * @param {number} id - Driver ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteDriver = async (id) => {
  return await httpDelete(`/drivers/${id}`);
};

// Export bundled API object for convenience
export const driversApi = {
  getAll: fetchDrivers,
  getById: fetchDriverById,
  create: createDriver,
  update: updateDriver,
  delete: deleteDriver,
};

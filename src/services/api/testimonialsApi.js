/**
 * Testimonials API Service
 * Handles all testimonial-related API calls with data transformation
 */

import { httpGet, httpPost, httpPut, httpDelete } from './apiClient';
import { 
  mapTestimonialFromApi, 
  mapTestimonialsFromApi, 
  mapTestimonialToApi 
} from '../mappers/testimonialMapper';

/**
 * Fetch all testimonials
 * @param {boolean} activeOnly - Whether to fetch only active testimonials
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchTestimonials = async (activeOnly = true) => {
  const result = await httpGet(`/testimonials?activeOnly=${activeOnly}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTestimonialsFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch a single testimonial by ID
 * @param {number} id - Testimonial ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchTestimonialById = async (id) => {
  const result = await httpGet(`/testimonials/${id}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTestimonialFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Create a new testimonial
 * @param {Object} testimonial - Testimonial data (frontend format)
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const createTestimonial = async (testimonial) => {
  const dto = mapTestimonialToApi(testimonial);
  const result = await httpPost('/testimonials', dto);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTestimonialFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Update an existing testimonial
 * @param {number} id - Testimonial ID
 * @param {Object} testimonial - Updated testimonial data (frontend format)
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateTestimonial = async (id, testimonial) => {
  const dto = mapTestimonialToApi(testimonial);
  const result = await httpPut(`/testimonials/${id}`, dto);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapTestimonialFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Delete a testimonial
 * @param {number} id - Testimonial ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteTestimonial = async (id) => {
  return await httpDelete(`/testimonials/${id}`);
};

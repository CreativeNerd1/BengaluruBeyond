/**
 * Site Info API Service
 * Handles site information API calls with data transformation
 */

import { httpGet, httpPut } from './apiClient';
import { 
  mapSiteInfoFromApi, 
  mapSiteInfoToApi,
  extractGoogleRating 
} from '../mappers/siteInfoMapper';

/**
 * Fetch site information
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchSiteInfo = async () => {
  const result = await httpGet('/siteinfo');
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapSiteInfoFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch Google rating from site info
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchGoogleRating = async () => {
  const result = await fetchSiteInfo();
  
  if (result.success && result.data) {
    return {
      success: true,
      data: extractGoogleRating(result.data),
    };
  }
  
  return result;
};

/**
 * Update site information
 * @param {Object} siteInfo - Site info data (frontend format)
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateSiteInfo = async (siteInfo) => {
  const dto = mapSiteInfoToApi(siteInfo);
  const result = await httpPut('/siteinfo', dto);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapSiteInfoFromApi(result.data),
    };
  }
  
  return result;
};

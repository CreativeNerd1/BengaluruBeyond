/**
 * NavLinks API Service
 * Handles navigation links API calls with data transformation
 */

import { httpGet, httpPost, httpPut, httpDelete } from './apiClient';

/**
 * Transform API navlink data to frontend format
 */
const mapNavLinkFromApi = (navLink) => ({
  id: navLink.id,
  label: navLink.label,
  name: navLink.label, // Alias for compatibility
  path: navLink.path,
  link: navLink.path, // Alias for compatibility
  icon: navLink.icon,
  parentId: navLink.parentId,
  displayOrder: navLink.displayOrder,
  isExternal: navLink.isExternal,
  external: navLink.isExternal,
  isActive: navLink.isActive,
  children: navLink.children ? navLink.children.map(mapNavLinkFromApi) : [],
  hasDropdown: navLink.children && navLink.children.length > 0,
});

const mapNavLinksFromApi = (navLinks) => navLinks.map(mapNavLinkFromApi);

/**
 * Fetch all navigation links (hierarchical structure)
 * @param {boolean} activeOnly - Whether to fetch only active links
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchNavLinks = async (activeOnly = true) => {
  const params = new URLSearchParams();
  if (activeOnly) params.append('activeOnly', 'true');
  
  const result = await httpGet(`/navlinks?${params.toString()}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapNavLinksFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch flat list of all navigation links (for admin)
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchNavLinksFlat = async () => {
  const result = await httpGet('/navlinks/flat');
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapNavLinksFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch a single navigation link by ID
 * @param {number} id - NavLink ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchNavLinkById = async (id) => {
  const result = await httpGet(`/navlinks/${id}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapNavLinkFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Create a new navigation link (admin only)
 * @param {Object} navLinkData - NavLink data
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const createNavLink = async (navLinkData) => {
  const payload = {
    label: navLinkData.label || navLinkData.name,
    path: navLinkData.path || navLinkData.link,
    icon: navLinkData.icon,
    parentId: navLinkData.parentId,
    displayOrder: navLinkData.displayOrder || 0,
    isExternal: navLinkData.isExternal ?? navLinkData.external ?? false,
    isActive: navLinkData.isActive ?? true,
  };
  
  const result = await httpPost('/navlinks', payload);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapNavLinkFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Update a navigation link (admin only)
 * @param {number} id - NavLink ID
 * @param {Object} navLinkData - Updated navlink data
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateNavLink = async (id, navLinkData) => {
  const payload = {};
  
  // Only include fields that are defined
  if (navLinkData.label !== undefined) payload.label = navLinkData.label;
  if (navLinkData.name !== undefined) payload.label = navLinkData.name;
  if (navLinkData.path !== undefined) payload.path = navLinkData.path;
  if (navLinkData.link !== undefined) payload.path = navLinkData.link;
  if (navLinkData.icon !== undefined) payload.icon = navLinkData.icon;
  if (navLinkData.parentId !== undefined) payload.parentId = navLinkData.parentId;
  if (navLinkData.displayOrder !== undefined) payload.displayOrder = navLinkData.displayOrder;
  if (navLinkData.isExternal !== undefined) payload.isExternal = navLinkData.isExternal;
  if (navLinkData.external !== undefined) payload.isExternal = navLinkData.external;
  if (navLinkData.isActive !== undefined) payload.isActive = navLinkData.isActive;
  
  const result = await httpPut(`/navlinks/${id}`, payload);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapNavLinkFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Delete a navigation link (admin only)
 * @param {number} id - NavLink ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteNavLink = async (id) => {
  return await httpDelete(`/navlinks/${id}`);
};

// Export bundled API object for convenience
export const navLinksApi = {
  getAll: fetchNavLinks,
  getFlat: fetchNavLinksFlat,
  getById: fetchNavLinkById,
  create: createNavLink,
  update: updateNavLink,
  delete: deleteNavLink,
};

// API Service Layer - Connects to the backend API

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthToken = () => localStorage.getItem('admin_token');

// Generic API helper for authenticated requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
};

// Site Info API
export const siteInfoApi = {
  get: () => apiRequest('/siteinfo'),
  update: (info) => apiRequest('/siteinfo', {
    method: 'PUT',
    body: JSON.stringify(info),
  }),
};

// Services API
export const servicesApi = {
  getAll: () => apiRequest('/services'),
  getById: (id) => apiRequest(`/services/${id}`),
  create: (service) => apiRequest('/services', {
    method: 'POST',
    body: JSON.stringify(service),
  }),
  update: (id, service) => apiRequest(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(service),
  }),
  delete: (id) => apiRequest(`/services/${id}`, {
    method: 'DELETE',
  }),
};

// Trip Packages API
export const tripPackagesApi = {
  getAll: () => apiRequest('/trippackages'),
  getById: (id) => apiRequest(`/trippackages/${id}`),
  getBySlug: (slug) => apiRequest(`/trippackages/slug/${slug}`),
  create: (pkg) => apiRequest('/trippackages', {
    method: 'POST',
    body: JSON.stringify(pkg),
  }),
  update: (id, pkg) => apiRequest(`/trippackages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(pkg),
  }),
  delete: (id) => apiRequest(`/trippackages/${id}`, {
    method: 'DELETE',
  }),
};

// Testimonials API
export const testimonialsApi = {
  getAll: () => apiRequest('/testimonials'),
  getById: (id) => apiRequest(`/testimonials/${id}`),
  create: (testimonial) => apiRequest('/testimonials', {
    method: 'POST',
    body: JSON.stringify(testimonial),
  }),
  update: (id, testimonial) => apiRequest(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(testimonial),
  }),
  delete: (id) => apiRequest(`/testimonials/${id}`, {
    method: 'DELETE',
  }),
};

// Cars API
export const carsApi = {
  getAll: () => apiRequest('/cars'),
  getById: (id) => apiRequest(`/cars/${id}`),
  create: (car) => apiRequest('/cars', {
    method: 'POST',
    body: JSON.stringify(car),
  }),
  update: (id, car) => apiRequest(`/cars/${id}`, {
    method: 'PUT',
    body: JSON.stringify(car),
  }),
  delete: (id) => apiRequest(`/cars/${id}`, {
    method: 'DELETE',
  }),
};

// Navigation Links API
export const navLinksApi = {
  getAll: () => apiRequest('/navlinks'),
  getById: (id) => apiRequest(`/navlinks/${id}`),
  create: (navLink) => apiRequest('/navlinks', {
    method: 'POST',
    body: JSON.stringify(navLink),
  }),
  update: (id, navLink) => apiRequest(`/navlinks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(navLink),
  }),
  delete: (id) => apiRequest(`/navlinks/${id}`, {
    method: 'DELETE',
  }),
};

// Inquiries API
export const inquiriesApi = {
  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/inquiries${queryParams ? `?${queryParams}` : ''}`);
  },
  getRecent: (count = 5) => apiRequest(`/inquiries/recent?count=${count}`),
  getStats: () => apiRequest('/inquiries/stats'),
  getById: (id) => apiRequest(`/inquiries/${id}`),
  create: (inquiry) => apiRequest('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  }),
  update: (id, updates) => apiRequest(`/inquiries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }),
  delete: (id) => apiRequest(`/inquiries/${id}`, {
    method: 'DELETE',
  }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => apiRequest('/dashboard/stats'),
};

export default {
  siteInfoApi,
  servicesApi,
  tripPackagesApi,
  testimonialsApi,
  carsApi,
  navLinksApi,
  inquiriesApi,
  dashboardApi,
};

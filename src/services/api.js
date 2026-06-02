// API Service Layer - Mock API using localStorage
// This can be easily replaced with real API calls later

const STORAGE_KEYS = {
  SITE_INFO: 'bengaluruBeyond_siteInfo',
  SERVICES: 'bengaluruBeyond_services',
  TRIP_PACKAGES: 'bengaluruBeyond_tripPackages',
  TESTIMONIALS: 'bengaluruBeyond_testimonials',
  CARS: 'bengaluruBeyond_cars',
  DRIVERS: 'bengaluruBeyond_drivers',
  NAV_LINKS: 'bengaluruBeyond_navLinks',
};

// Helper to simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to generate unique IDs
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

// Initialize with default data if not exists
const initializeData = (key, defaultData) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultData));
  }
};

// Generic CRUD operations
const createItem = async (key, item) => {
  await delay();
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  const newItem = { ...item, id: generateId(), createdAt: new Date().toISOString() };
  items.push(newItem);
  localStorage.setItem(key, JSON.stringify(items));
  return { success: true, data: newItem };
};

const getItems = async (key) => {
  await delay();
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  return { success: true, data: items };
};

const getItemById = async (key, id) => {
  await delay();
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  const item = items.find(i => i.id === id);
  return item ? { success: true, data: item } : { success: false, error: 'Item not found' };
};

const updateItem = async (key, id, updates) => {
  await delay();
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return { success: false, error: 'Item not found' };
  
  items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify(items));
  return { success: true, data: items[index] };
};

const deleteItem = async (key, id) => {
  await delay();
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  const filtered = items.filter(i => i.id !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
  return { success: true };
};

// Site Info API (single object, not array)
export const siteInfoApi = {
  get: async () => {
    await delay();
    const data = localStorage.getItem(STORAGE_KEYS.SITE_INFO);
    return { success: true, data: data ? JSON.parse(data) : null };
  },
  update: async (info) => {
    await delay();
    localStorage.setItem(STORAGE_KEYS.SITE_INFO, JSON.stringify(info));
    return { success: true, data: info };
  },
};

// Services API
export const servicesApi = {
  getAll: () => getItems(STORAGE_KEYS.SERVICES),
  getById: (id) => getItemById(STORAGE_KEYS.SERVICES, id),
  create: (service) => createItem(STORAGE_KEYS.SERVICES, service),
  update: (id, service) => updateItem(STORAGE_KEYS.SERVICES, id, service),
  delete: (id) => deleteItem(STORAGE_KEYS.SERVICES, id),
};

// Trip Packages API
export const tripPackagesApi = {
  getAll: () => getItems(STORAGE_KEYS.TRIP_PACKAGES),
  getById: (id) => getItemById(STORAGE_KEYS.TRIP_PACKAGES, id),
  getBySlug: async (slug) => {
    await delay();
    const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.TRIP_PACKAGES) || '[]');
    const item = items.find(i => i.slug === slug);
    return item ? { success: true, data: item } : { success: false, error: 'Package not found' };
  },
  create: (pkg) => createItem(STORAGE_KEYS.TRIP_PACKAGES, pkg),
  update: (id, pkg) => updateItem(STORAGE_KEYS.TRIP_PACKAGES, id, pkg),
  delete: (id) => deleteItem(STORAGE_KEYS.TRIP_PACKAGES, id),
};

// Testimonials API
export const testimonialsApi = {
  getAll: () => getItems(STORAGE_KEYS.TESTIMONIALS),
  getById: (id) => getItemById(STORAGE_KEYS.TESTIMONIALS, id),
  create: (testimonial) => createItem(STORAGE_KEYS.TESTIMONIALS, testimonial),
  update: (id, testimonial) => updateItem(STORAGE_KEYS.TESTIMONIALS, id, testimonial),
  delete: (id) => deleteItem(STORAGE_KEYS.TESTIMONIALS, id),
};

// Cars API
export const carsApi = {
  getAll: () => getItems(STORAGE_KEYS.CARS),
  getById: (id) => getItemById(STORAGE_KEYS.CARS, id),
  create: (car) => createItem(STORAGE_KEYS.CARS, car),
  update: (id, car) => updateItem(STORAGE_KEYS.CARS, id, car),
  delete: (id) => deleteItem(STORAGE_KEYS.CARS, id),
};

// Drivers API
export const driversApi = {
  getAll: () => getItems(STORAGE_KEYS.DRIVERS),
  getById: (id) => getItemById(STORAGE_KEYS.DRIVERS, id),
  create: (driver) => createItem(STORAGE_KEYS.DRIVERS, driver),
  update: (id, driver) => updateItem(STORAGE_KEYS.DRIVERS, id, driver),
  delete: (id) => deleteItem(STORAGE_KEYS.DRIVERS, id),
};

// Navigation Links API
export const navLinksApi = {
  getAll: () => getItems(STORAGE_KEYS.NAV_LINKS),
  update: async (links) => {
    await delay();
    localStorage.setItem(STORAGE_KEYS.NAV_LINKS, JSON.stringify(links));
    return { success: true, data: links };
  },
};

// Initialize default data from static files
export const initializeDefaultData = async (siteData, tripData, cabData) => {
  // Only initialize if data doesn't exist
  if (!localStorage.getItem(STORAGE_KEYS.SITE_INFO)) {
    localStorage.setItem(STORAGE_KEYS.SITE_INFO, JSON.stringify(siteData.siteInfo));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
    const services = siteData.services.map((s, i) => ({ ...s, id: `service_${i}` }));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.TRIP_PACKAGES)) {
    const packages = tripData.tripDestinations.map((t, i) => ({ ...t, id: `trip_${i}` }));
    localStorage.setItem(STORAGE_KEYS.TRIP_PACKAGES, JSON.stringify(packages));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    const testimonials = siteData.testimonials.map((t, i) => ({ ...t, id: `testimonial_${i}` }));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CARS)) {
    const cars = cabData.cars.map((c, i) => ({ ...c, id: `car_${i}` }));
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.DRIVERS)) {
    const drivers = cabData.drivers.map((d, i) => ({ ...d, id: `driver_${i}` }));
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.NAV_LINKS)) {
    const navLinks = siteData.navLinks.map((n, i) => ({ ...n, id: `nav_${i}` }));
    localStorage.setItem(STORAGE_KEYS.NAV_LINKS, JSON.stringify(navLinks));
  }
};

// Clear all data (for testing)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
};

export default {
  siteInfoApi,
  servicesApi,
  tripPackagesApi,
  testimonialsApi,
  carsApi,
  driversApi,
  navLinksApi,
  initializeDefaultData,
  clearAllData,
};

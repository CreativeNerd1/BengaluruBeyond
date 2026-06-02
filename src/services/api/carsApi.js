/**
 * Cars API Service
 * Handles all car-related API calls with data transformation
 */

import { httpGet, httpPost, httpPut, httpDelete } from './apiClient';

/**
 * Transform API car data to frontend format
 */
const mapCarFromApi = (car) => ({
  id: car.id,
  name: car.name,
  type: car.type,
  brand: car.brand,
  model: car.model,
  year: car.year,
  registrationNumber: car.registrationNumber,
  seatingCapacity: car.seatingCapacity,
  capacity: `${car.seatingCapacity - 1}+1`, // Format as "4+1" style
  fuelType: car.fuelType,
  fuel: car.fuelType,
  transmission: car.transmission,
  hasAC: car.hasAC,
  ac: car.hasAC,
  pricePerKm: car.pricePerKm,
  pricePerDay: car.pricePerDay,
  imageUrl: car.imageUrl,
  images: car.imageUrl ? [car.imageUrl] : [],
  features: car.features ? car.features.split(',').map(f => f.trim()) : [],
  isAvailable: car.isAvailable,
  isActive: car.isActive,
  assignedDriverId: car.assignedDriverId,
  assignedDriverName: car.assignedDriverName,
  // Add computed fields for UI compatibility
  category: car.type?.toLowerCase().replace(' ', '-') || 'sedan',
  luggage: car.seatingCapacity > 5 ? '4 Large Bags' : '2 Large Bags',
  rating: 4.8,
  totalTrips: 0,
  description: `${car.brand || ''} ${car.model || ''} - ${car.type || 'Sedan'}. Comfortable travel with ${car.seatingCapacity || 4} seating capacity.`,
  pricing: {
    local: { baseKm: 40, baseFare: 800, extraKmRate: car.pricePerKm || 14 },
    airport: { oneway: 1200, roundTrip: 2000 },
    outstation: { perKm: car.pricePerKm || 12, minKmPerDay: 300, driverAllowance: 400 },
  },
});

const mapCarsFromApi = (cars) => cars.map(mapCarFromApi);

/**
 * Fetch all cars
 * @param {boolean} activeOnly - Whether to fetch only active cars
 * @param {boolean} availableOnly - Whether to fetch only available cars
 * @returns {Promise<{success: boolean, data?: Array, error?: string}>}
 */
export const fetchCars = async (activeOnly = true, availableOnly = false) => {
  const params = new URLSearchParams();
  if (activeOnly) params.append('activeOnly', 'true');
  if (availableOnly) params.append('availableOnly', 'true');
  
  const result = await httpGet(`/cars?${params.toString()}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapCarsFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Fetch a single car by ID
 * @param {number} id - Car ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const fetchCarById = async (id) => {
  const result = await httpGet(`/cars/${id}`);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapCarFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Create a new car (admin only)
 * @param {Object} carData - Car data
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const createCar = async (carData) => {
  const payload = {
    name: carData.name,
    type: carData.type,
    brand: carData.brand,
    model: carData.model,
    year: carData.year,
    registrationNumber: carData.registrationNumber,
    seatingCapacity: carData.seatingCapacity,
    fuelType: carData.fuelType,
    transmission: carData.transmission,
    hasAC: carData.hasAC ?? true,
    pricePerKm: carData.pricePerKm,
    pricePerDay: carData.pricePerDay,
    imageUrl: carData.imageUrl,
    features: Array.isArray(carData.features) ? carData.features.join(', ') : carData.features,
    isAvailable: carData.isAvailable ?? true,
    isActive: carData.isActive ?? true,
    assignedDriverId: carData.assignedDriverId,
  };
  
  const result = await httpPost('/cars', payload);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapCarFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Update a car (admin only)
 * @param {number} id - Car ID
 * @param {Object} carData - Updated car data
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export const updateCar = async (id, carData) => {
  const payload = {};
  
  // Only include fields that are defined
  if (carData.name !== undefined) payload.name = carData.name;
  if (carData.type !== undefined) payload.type = carData.type;
  if (carData.brand !== undefined) payload.brand = carData.brand;
  if (carData.model !== undefined) payload.model = carData.model;
  if (carData.year !== undefined) payload.year = carData.year;
  if (carData.registrationNumber !== undefined) payload.registrationNumber = carData.registrationNumber;
  if (carData.seatingCapacity !== undefined) payload.seatingCapacity = carData.seatingCapacity;
  if (carData.fuelType !== undefined) payload.fuelType = carData.fuelType;
  if (carData.transmission !== undefined) payload.transmission = carData.transmission;
  if (carData.hasAC !== undefined) payload.hasAC = carData.hasAC;
  if (carData.pricePerKm !== undefined) payload.pricePerKm = carData.pricePerKm;
  if (carData.pricePerDay !== undefined) payload.pricePerDay = carData.pricePerDay;
  if (carData.imageUrl !== undefined) payload.imageUrl = carData.imageUrl;
  if (carData.features !== undefined) {
    payload.features = Array.isArray(carData.features) ? carData.features.join(', ') : carData.features;
  }
  if (carData.isAvailable !== undefined) payload.isAvailable = carData.isAvailable;
  if (carData.isActive !== undefined) payload.isActive = carData.isActive;
  if (carData.assignedDriverId !== undefined) payload.assignedDriverId = carData.assignedDriverId;
  
  const result = await httpPut(`/cars/${id}`, payload);
  
  if (result.success && result.data) {
    return {
      success: true,
      data: mapCarFromApi(result.data),
    };
  }
  
  return result;
};

/**
 * Delete a car (admin only)
 * @param {number} id - Car ID
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteCar = async (id) => {
  return await httpDelete(`/cars/${id}`);
};

// Export bundled API object for convenience
export const carsApi = {
  getAll: fetchCars,
  getById: fetchCarById,
  create: createCar,
  update: updateCar,
  delete: deleteCar,
};

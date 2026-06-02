/**
 * Trip Package Mapper
 * Transforms data between API format and frontend format
 */

/**
 * Maps backend trip package DTO to frontend model
 * @param {Object} dto - Backend trip package DTO
 * @returns {Object} Frontend trip package model
 */
export const mapTripPackageFromApi = (dto) => {
  if (!dto) return null;

  return {
    id: dto.id,
    name: dto.title,
    title: dto.title,
    slug: generateSlug(dto.title),
    description: dto.description,
    tagline: dto.description?.substring(0, 100) || `Explore ${dto.destination}`,
    destination: dto.destination,
    duration: formatDuration(dto.duration, dto.durationType),
    durationValue: dto.duration,
    durationType: dto.durationType,
    price: dto.price,
    basePrice: dto.price,
    priceType: dto.priceType || 'Per Person',
    image: dto.imageUrl,
    images: dto.imageUrl ? [dto.imageUrl] : getDefaultImages(),
    highlights: parseMultilineField(dto.highlights),
    includes: parseMultilineField(dto.inclusions),
    excludes: parseMultilineField(dto.exclusions),
    maxGroupSize: dto.maxGroupSize,
    isPopular: dto.isPopular,
    popular: dto.isPopular,
    isActive: dto.isActive,
    active: dto.isActive,
    displayOrder: dto.displayOrder,
  };
};

/**
 * Maps frontend trip package model to backend DTO for create/update
 * @param {Object} model - Frontend trip package model
 * @returns {Object} Backend trip package DTO
 */
export const mapTripPackageToApi = (model) => {
  if (!model) return null;

  const { duration, durationType } = parseDurationString(model.duration);

  return {
    title: model.name || model.title,
    description: model.description || model.tagline || '',
    destination: model.destination || model.name || '',
    price: parseFloat(model.basePrice) || parseFloat(model.price) || 0,
    priceType: model.priceType || 'Per Person',
    duration: duration,
    durationType: durationType,
    imageUrl: Array.isArray(model.images) ? model.images[0] : (model.image || model.images || null),
    highlights: stringifyArray(model.highlights),
    inclusions: stringifyArray(model.includes),
    exclusions: stringifyArray(model.excludes),
    maxGroupSize: model.maxGroupSize || 10,
    isPopular: model.popular ?? model.isPopular ?? false,
    isActive: model.active ?? model.isActive ?? true,
    displayOrder: model.displayOrder || 0,
  };
};

/**
 * Maps array of backend DTOs to frontend models
 * @param {Array} dtos - Array of backend trip package DTOs
 * @returns {Array} Array of frontend trip package models
 */
export const mapTripPackagesFromApi = (dtos) => {
  if (!Array.isArray(dtos)) return [];
  return dtos.map(mapTripPackageFromApi).filter(Boolean);
};

/**
 * Groups trip packages by destination for the trip packages page
 * @param {Array} packages - Array of trip packages
 * @returns {Array} Array of destinations with their packages
 */
export const groupPackagesByDestination = (packages) => {
  if (!Array.isArray(packages)) return [];

  const destinationMap = new Map();

  packages
    .filter(pkg => pkg.isActive !== false)
    .forEach(pkg => {
      const destination = pkg.destination || pkg.name;

      if (!destinationMap.has(destination)) {
        destinationMap.set(destination, {
          id: pkg.id,
          slug: pkg.slug || generateSlug(destination),
          name: destination,
          tagline: pkg.tagline || `Explore ${destination}`,
          description: pkg.description,
          images: pkg.images?.length > 0 ? pkg.images : getDefaultImages(),
          packages: [],
        });
      }

      destinationMap.get(destination).packages.push({
        id: pkg.id,
        name: pkg.name,
        vehicleType: pkg.priceType || 'Standard',
        vehicleIcon: '🚗',
        price: pkg.price || pkg.basePrice,
        duration: pkg.duration,
      });
    });

  return Array.from(destinationMap.values());
};

// Helper functions
const generateSlug = (title) => {
  if (!title) return '';
  return title.toLowerCase().replace(/\s+/g, '-');
};

const formatDuration = (duration, durationType) => {
  if (!duration) return '';
  return `${duration} ${durationType || 'days'}`;
};

const parseDurationString = (durationStr) => {
  if (!durationStr) return { duration: 1, durationType: 'days' };

  const match = durationStr.match(/(\d+)/);
  const duration = match ? parseInt(match[1]) : 1;

  let durationType = 'days';
  const lowerStr = durationStr.toLowerCase();
  if (lowerStr.includes('night')) durationType = 'nights';
  else if (lowerStr.includes('hour')) durationType = 'hours';
  else if (lowerStr.includes('week')) durationType = 'weeks';

  return { duration, durationType };
};

const parseMultilineField = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  // Split by newline or comma
  return value.split(/[\n,]/).map(item => item.trim()).filter(item => item);
};

const stringifyArray = (arr) => {
  if (!arr) return '';
  if (typeof arr === 'string') return arr;
  return arr.join('\n');
};

const getDefaultImages = () => [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
];

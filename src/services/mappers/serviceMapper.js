/**
 * Service Mapper
 * Transforms data between API format and frontend format
 */

/**
 * Maps backend service DTO to frontend model
 * @param {Object} dto - Backend service DTO
 * @returns {Object} Frontend service model
 */
export const mapServiceFromApi = (dto) => {
  if (!dto) return null;

  return {
    id: dto.id,
    title: dto.title,
    name: dto.title,
    slug: generateSlug(dto.title),
    icon: dto.icon || '🚗',
    description: dto.description,
    shortDescription: dto.description,
    displayOrder: dto.displayOrder,
    isActive: dto.isActive,
    link: `/services/${generateSlug(dto.title)}`,
  };
};

/**
 * Maps frontend service model to backend DTO for create/update
 * @param {Object} model - Frontend service model
 * @returns {Object} Backend service DTO
 */
export const mapServiceToApi = (model) => {
  if (!model) return null;

  return {
    title: model.name || model.title,
    description: model.description || model.shortDescription || '',
    icon: model.icon || '🚀',
    displayOrder: model.displayOrder || 0,
    isActive: model.active ?? model.isActive ?? true,
  };
};

/**
 * Maps array of backend DTOs to frontend models
 * @param {Array} dtos - Array of backend service DTOs
 * @returns {Array} Array of frontend service models
 */
export const mapServicesFromApi = (dtos) => {
  if (!Array.isArray(dtos)) return [];
  return dtos.map(mapServiceFromApi).filter(Boolean);
};

// Helper functions
const generateSlug = (title) => {
  if (!title) return '';
  return title.toLowerCase().replace(/\s+/g, '-');
};

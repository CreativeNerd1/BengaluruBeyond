/**
 * Testimonial Mapper
 * Transforms data between API format and frontend format
 */

/**
 * Maps backend testimonial DTO to frontend model
 * @param {Object} dto - Backend testimonial DTO
 * @returns {Object} Frontend testimonial model
 */
export const mapTestimonialFromApi = (dto) => {
  if (!dto) return null;
  
  return {
    id: dto.id,
    name: dto.customerName,
    avatar: dto.customerImage || getInitials(dto.customerName),
    location: dto.location,
    review: dto.content,
    rating: dto.rating || 5,
    trip: dto.tripName,
    date: formatDate(dto.tripDate),
    featured: dto.isVerified,
    isActive: dto.isActive,
    displayOrder: dto.displayOrder,
  };
};

/**
 * Maps frontend testimonial model to backend DTO for create/update
 * @param {Object} model - Frontend testimonial model
 * @returns {Object} Backend testimonial DTO
 */
export const mapTestimonialToApi = (model) => {
  if (!model) return null;

  return {
    customerName: model.name,
    content: model.review || model.text,
    rating: model.rating || 5,
    customerImage: typeof model.avatar === 'string' && model.avatar.length > 2 
      ? model.avatar 
      : null,
    location: model.location || null,
    tripName: model.trip || null,
    tripDate: model.date ? new Date(model.date).toISOString() : null,
    isVerified: model.featured ?? false,
    isActive: model.isActive ?? true,
    displayOrder: model.displayOrder || 0,
  };
};

/**
 * Maps array of backend DTOs to frontend models
 * @param {Array} dtos - Array of backend testimonial DTOs
 * @returns {Array} Array of frontend testimonial models
 */
export const mapTestimonialsFromApi = (dtos) => {
  if (!Array.isArray(dtos)) return [];
  return dtos.map(mapTestimonialFromApi).filter(Boolean);
};

// Helper functions
const getInitials = (name) => {
  if (!name) return '??';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  } catch {
    return dateString;
  }
};

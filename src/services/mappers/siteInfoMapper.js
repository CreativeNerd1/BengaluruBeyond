/**
 * Site Info Mapper
 * Transforms data between API format and frontend format
 */

/**
 * Maps backend site info DTO to frontend model
 * @param {Object} dto - Backend site info DTO
 * @returns {Object} Frontend site info model
 */
export const mapSiteInfoFromApi = (dto) => {
  if (!dto) return null;

  return {
    id: dto.id,
    name: dto.name,
    tagline: dto.tagline,
    phone: dto.phone,
    email: dto.email,
    address: dto.address,
    googleRating: dto.googleRating,
    totalReviews: dto.totalReviews,
    // Flattened social links for form usage
    facebook: dto.facebookUrl,
    instagram: dto.instagramUrl,
    twitter: dto.twitterUrl,
    youtube: dto.youtubeUrl,
    whatsapp: dto.whatsappUrl,
    googleMaps: dto.googleMapsUrl,
    // Nested social links for compatibility
    socialLinks: {
      facebook: dto.facebookUrl,
      instagram: dto.instagramUrl,
      twitter: dto.twitterUrl,
      youtube: dto.youtubeUrl,
      whatsapp: dto.whatsappUrl,
      googleMaps: dto.googleMapsUrl,
    },
  };
};

/**
 * Maps frontend site info model to backend DTO for update
 * @param {Object} model - Frontend site info model
 * @returns {Object} Backend site info DTO
 */
export const mapSiteInfoToApi = (model) => {
  if (!model) return null;

  return {
    name: model.name,
    tagline: model.tagline,
    phone: model.phone,
    email: model.email,
    address: model.address,
    googleRating: model.googleRating,
    totalReviews: model.totalReviews,
    facebookUrl: model.socialLinks?.facebook || model.facebook || null,
    instagramUrl: model.socialLinks?.instagram || model.instagram || null,
    twitterUrl: model.socialLinks?.twitter || model.twitter || null,
    youtubeUrl: model.socialLinks?.youtube || model.youtube || null,
    whatsappUrl: model.socialLinks?.whatsapp || model.whatsapp || null,
    googleMapsUrl: model.socialLinks?.googleMaps || model.googleMaps || null,
  };
};

/**
 * Extracts Google rating info for display
 * @param {Object} siteInfo - Site info model
 * @returns {Object} Google rating object
 */
export const extractGoogleRating = (siteInfo) => {
  return {
    score: siteInfo?.googleRating || 4.8,
    totalReviews: siteInfo?.totalReviews || 100,
  };
};

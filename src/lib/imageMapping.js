// Image path mapping utility
const IMAGE_MAPPING = {
  // Product Images
  'sattuMaavuPack.png': '/assets/images/sattuMaavuPack.png',
  'SproutedSathumaavuBackPack.png': '/assets/images/SproutedSathumaavuBackPack.png',
  'SproutedSathumaavuFront.png': '/assets/images/SproutedSathumaavuFront.png',
  'SproutedSathumaavuBack.png': '/assets/images/SproutedSathumaavuBack.png',

  // Add more mappings as needed
};

export function getImagePath(imageName) {
  // If the image is already a full path, return it
  if (imageName.startsWith('/') || imageName.startsWith('http')) {
    return imageName;
  }

  // Look up the mapped path
  const mappedPath = IMAGE_MAPPING[imageName];
  
  if (mappedPath) {
    return mappedPath;
  }

  // If no mapping found, return the original name (fallback)
  console.warn(`No mapping found for image: ${imageName}`);
  return `/assets/images/${imageName}`;
}

export function getAllImagePaths() {
  return IMAGE_MAPPING;
}

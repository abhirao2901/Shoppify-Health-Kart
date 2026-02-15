import manifest from './images-manifest.json';
import placeholderSvg from '../assets/placeholder-product.svg';

// Create slug from product name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function withImages(products) {
  return products.map((product) => {
    const slug = createSlug(product.name);
    const imageData = manifest.bySlug[slug];
    
    return {
      ...product,
      slug,
      image: imageData?.image || placeholderSvg,
      thumbnail: imageData?.thumbnail || imageData?.image || placeholderSvg,
      imageAlt: imageData?.alt || `${product.name} product image`,
      fallback: imageData?.fallback || placeholderSvg
    };
  });
}

// Helper to get image path with fallback handling
export function getProductImage(product, type = 'image') {
  const imageData = manifest.bySlug[product.slug];
  
  switch (type) {
    case 'thumbnail':
      return imageData?.thumbnail || imageData?.image || placeholderSvg;
    case 'fallback':
      return imageData?.fallback || placeholderSvg;
    default:
      return imageData?.image || placeholderSvg;
  }
}

export const placeholder = placeholderSvg;

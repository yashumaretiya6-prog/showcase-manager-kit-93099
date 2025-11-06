export function isClothingCategory(category?: string, description?: string, name?: string): boolean {
  if (!category && !description && !name) return false;
  
  const clothingKeywords = [
    'kurti', 'saree', 'dress', 'shirt', 'pant', 'jeans', 'skirt',
    'top', 'bottom', 'clothing', 'apparel', 'wear', 'garment',
    'fabric', 'textile', 'embroidered', 'printed', 'designer',
    't-shirt', 'jacket', 'coat', 'sweater', 'blouse', 'lehenga'
  ];
  
  const searchText = `${category} ${description} ${name}`.toLowerCase();
  return clothingKeywords.some(keyword => searchText.includes(keyword));
}

export function getClothingSizes(): string[] {
  return ['S', 'M', 'L', 'XL', 'XXL'];
}

export function isElectronicsCategory(category?: string): boolean {
  if (!category) return false;
  const keywords = ['electronics', 'smartphone', 'laptop', 'tablet', 'headphone', 'camera', 'phone', 'computer'];
  return keywords.some(k => category.toLowerCase().includes(k));
}

export function isBeautyCategory(category?: string): boolean {
  if (!category) return false;
  const keywords = ['beauty', 'cosmetic', 'makeup', 'skincare', 'haircare'];
  return keywords.some(k => category.toLowerCase().includes(k));
}

export function isHomeKitchenCategory(category?: string): boolean {
  if (!category) return false;
  const keywords = ['home', 'kitchen', 'cookware', 'appliance'];
  return keywords.some(k => category.toLowerCase().includes(k));
}

export function isSportsCategory(category?: string): boolean {
  if (!category) return false;
  const keywords = ['sport', 'fitness', 'gym', 'athletic', 'running'];
  return keywords.some(k => category.toLowerCase().includes(k));
}

export function getCategoryAttributes(category: string): string[] {
  if (isClothingCategory(category)) {
    return ['Material', 'Pattern', 'Fit Type', 'Occasion', 'Sleeve Length', 'Neck Type'];
  }
  if (isElectronicsCategory(category)) {
    return ['Brand', 'Model', 'Warranty', 'Color', 'Power Consumption', 'Dimensions'];
  }
  if (isBeautyCategory(category)) {
    return ['Ingredients', 'Skin Type', 'Volume', 'Expiry', 'Fragrance', 'Usage'];
  }
  if (isHomeKitchenCategory(category)) {
    return ['Material', 'Capacity', 'Power', 'Dimensions', 'Color', 'Warranty'];
  }
  if (isSportsCategory(category)) {
    return ['Sport Type', 'Material', 'Weight', 'Size', 'Color'];
  }
  return ['Brand', 'Material', 'Color', 'Dimensions'];
}

export function getRequiredFields(category: string): string[] {
  const base = ['name', 'price', 'category', 'brand'];
  
  if (isClothingCategory(category)) {
    return [...base, 'sizes', 'colors'];
  }
  if (isElectronicsCategory(category)) {
    return [...base, 'warranty', 'specifications'];
  }
  
  return base;
}

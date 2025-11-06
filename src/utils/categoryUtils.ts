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

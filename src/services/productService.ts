import { Product } from '@/types/product';

export class ProductService {
  static async deleteAllProducts(): Promise<void> {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  static async bulkImport(products: Product[]): Promise<void> {
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

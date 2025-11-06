import { Product } from '@/types/product';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 999,
    originalPrice: 1499,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800'],
    category: 'Clothing',
    brand: 'StyleCraft',
    description: 'Premium quality cotton t-shirt with modern fit. Made from 100% organic cotton, this t-shirt offers superior comfort and breathability. Perfect for casual wear or layering.',
    specifications: {
      'Fabric & Care': {
        'Fabric': '100% Cotton',
        'Pattern': 'Solid',
        'Sleeve Length': 'Short Sleeves',
        'Neck': 'Round Neck',
        'Fit': 'Regular Fit',
        'Wash Care': 'Machine wash cold, tumble dry low'
      },
      'General': {
        'Brand': 'StyleCraft',
        'Model': 'TSH-001',
        'Occasion': 'Casual',
        'Season': 'All Season',
        'Country of Origin': 'India'
      }
    },
    keyFeatures: [
      '100% organic cotton fabric',
      'Pre-shrunk for lasting fit',
      'Tagless design for comfort',
      'Reinforced shoulder seams',
      'Available in multiple colors'
    ],
    warrantyDetails: {
      duration: '30 days quality guarantee',
      coverage: [
        'Manufacturing defects',
        'Fabric quality issues',
        'Color bleeding or fading'
      ],
      terms: [
        'Product must be unused and in original condition',
        'Original tags must be attached',
        'Valid proof of purchase required'
      ]
    },
    rating: 4.5,
    reviews: 128,
    freeDelivery: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colorOptions: [
      { name: 'Black', hex: '#000000', available: true },
      { name: 'White', hex: '#FFFFFF', available: true },
      { name: 'Navy', hex: '#000080', available: true },
    ],
    stock_quantity: 50,
    sku: 'TSH-001',
    emiAvailable: false,
    codAvailable: true,
    warranty: '30 days quality guarantee',
    bulkDiscounts: [
      { minQuantity: 2, discountPercent: 5 },
      { minQuantity: 3, discountPercent: 10 },
    ],
    reviews_data: [
      {
        id: '1',
        userId: 'u1',
        userName: 'John Doe',
        rating: 5,
        title: 'Excellent quality!',
        comment: 'The fabric quality is outstanding and the fit is perfect.',
        isVerifiedPurchase: true,
        helpful: 24,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        userId: 'u2',
        userName: 'Sarah Smith',
        rating: 4,
        title: 'Good value',
        comment: 'Nice t-shirt for the price. Comfortable to wear.',
        isVerifiedPurchase: true,
        helpful: 12,
        createdAt: '2024-01-10'
      }
    ]
  }
];

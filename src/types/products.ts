
/**
 * Type definitions for product-related data
 */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  discount_percent?: number;
  category?: string;
  featured?: boolean;
  stock?: number;
  recommended?: boolean;
  rating?: number;
}

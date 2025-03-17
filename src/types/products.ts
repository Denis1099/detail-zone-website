
/**
 * Type definitions for product-related data
 */

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  featured?: boolean;
  stock?: number;
}

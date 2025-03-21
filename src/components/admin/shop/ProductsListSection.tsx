
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductsList } from '@/components/admin/shop/ProductsList';
import { Product } from '@/types/products';

interface ProductsListSectionProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductsListSection({
  products,
  isLoading,
  onEdit,
  onDelete
}: ProductsListSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>רשימת מוצרים</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductsList
          products={products}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </CardContent>
    </Card>
  );
}

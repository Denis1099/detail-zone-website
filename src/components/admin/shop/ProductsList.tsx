
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types/products';

interface ProductsListProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductsList({ 
  products, 
  isLoading, 
  onEdit, 
  onDelete 
}: ProductsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        אין מוצרים עדיין
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 overflow-hidden rounded-md">
              <img
                src={product.image || 'https://placehold.co/100x100?text=No+Image'}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mr-4">
              <div className="font-medium">{product.name}</div>
              <div className="flex items-center text-xs">
                <span className={product.discount_percent ? "text-muted-foreground line-through mr-2" : "text-muted-foreground"}>
                  ₪{product.price.toFixed(2)}
                </span>
                {product.discount_percent > 0 && (
                  <>
                    <span className="text-green-500 mr-1">
                      ₪{(product.price * (1 - product.discount_percent / 100)).toFixed(2)}
                    </span>
                    <span className="text-primary bg-primary/10 rounded-full px-2 py-0.5 mr-1">
                      {product.discount_percent}% הנחה
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(product)}
              className="mr-2"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

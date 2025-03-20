import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Percent } from 'lucide-react';
import { Product } from '@/types/products';
import { ProductImageUpload } from './ProductImageUpload';

interface ProductFormProps {
  isEditing: boolean;
  currentProduct: Product | null;
  onSubmit: (
    productData: {
      id?: number;
      name: string;
      description: string;
      price: number;
      discount_percent: number;
      image: string;
      imageFile: File | null;
      category?: string;
      featured?: boolean;
      stock?: number;
      recommended?: boolean;
    },
    isEditing: boolean
  ) => Promise<boolean>;
  onCancel: () => void;
  isLoading: boolean;
}

export function ProductForm({
  isEditing,
  currentProduct,
  onSubmit,
  onCancel,
  isLoading
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    discount_percent: 0,
    image: '',
    imageFile: null as File | null,
    category: '',
    featured: false,
    stock: 0,
    recommended: false
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (currentProduct && isEditing) {
      setFormData({
        id: currentProduct.id,
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        discount_percent: currentProduct.discount_percent || 0,
        image: currentProduct.image,
        imageFile: null,
        category: currentProduct.category || '',
        featured: currentProduct.featured || false,
        stock: currentProduct.stock || 0,
        recommended: currentProduct.recommended || false
      });
      setImagePreview(currentProduct.image);
    } else {
      setFormData({
        id: 0,
        name: '',
        description: '',
        price: 0,
        discount_percent: 0,
        image: '',
        imageFile: null,
        category: '',
        featured: false,
        stock: 0,
        recommended: false
      });
      setImagePreview(null);
    }
  }, [currentProduct, isEditing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [id]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [id]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      setFormData({ ...formData, imageFile: file });
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, imageFile: null, image: '' });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, isEditing);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'עריכת מוצר' : 'הוספת מוצר חדש'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">שם המוצר</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="שם המוצר"
              className="mt-1"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">מחיר (₪)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="discount_percent">הנחה (%)</Label>
              <div className="relative mt-1">
                <Input
                  id="discount_percent"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount_percent}
                  onChange={handleChange}
                  placeholder="0"
                  className="pr-8"
                />
                <Percent className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="category">קטגוריה</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="קטגוריה (אופציונלי)"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="description">תיאור</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="תיאור המוצר"
              className="mt-1"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="recommended"
              checked={formData.recommended}
              onChange={(e) => setFormData({...formData, recommended: e.target.checked})}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="recommended">מוצר מומלץ</Label>
          </div>
          
          <ProductImageUpload 
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
            onImageRemove={handleImageRemove}
          />
          
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              ביטול
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent ml-2" />
                  שומר...
                </>
              ) : (
                <>
                  <Save className="ml-2 h-4 w-4" />
                  {isEditing ? 'עדכן מוצר' : 'הוסף מוצר'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

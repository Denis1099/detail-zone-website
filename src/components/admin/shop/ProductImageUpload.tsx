
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';

interface ProductImageUploadProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  onImageRemove: () => void;
}

export function ProductImageUpload({ 
  imagePreview, 
  onImageChange, 
  onImageRemove 
}: ProductImageUploadProps) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div>
      <label htmlFor="image" className="block text-sm font-medium text-text">
        תמונת המוצר
      </label>
      <div className="mt-1 flex items-center">
        <label className="flex cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent">
          <Upload className="ml-2 h-4 w-4" />
          <span>{imagePreview ? 'שנה תמונה' : 'העלה תמונה'}</span>
          <Input
            id="image"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        {imagePreview && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={onImageRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      {imagePreview && (
        <div className="mt-4">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border border-input">
            <img
              src={imagePreview}
              alt="תצוגה מקדימה"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

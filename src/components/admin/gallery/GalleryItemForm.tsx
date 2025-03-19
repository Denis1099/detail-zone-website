
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Upload } from 'lucide-react';
import { CarColor } from '@/data/gallery';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GalleryItemFormProps {
  currentItem: {
    id?: number;
    before: string;
    after: string;
    label: string;
    color: CarColor;
    beforeFile: File | null;
    afterFile: File | null;
  };
  setCurrentItem: React.Dispatch<React.SetStateAction<{
    id?: number;
    before: string;
    after: string;
    label: string;
    color: CarColor;
    beforeFile: File | null;
    afterFile: File | null;
  }>>;
  beforePreview: string | null;
  afterPreview: string | null;
  colorMap: Record<Exclude<CarColor, "all">, string>;
  isLoading: boolean;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  handleBeforeImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAfterImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GalleryItemForm: React.FC<GalleryItemFormProps> = ({
  currentItem,
  setCurrentItem,
  beforePreview,
  afterPreview,
  colorMap,
  isLoading,
  isEditing,
  onSubmit,
  onCancel,
  handleBeforeImageChange,
  handleAfterImageChange,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="label" className="block text-sm font-medium text-text">
          שם הרכב
        </label>
        <Input
          id="label"
          value={currentItem.label}
          onChange={(e) => setCurrentItem({...currentItem, label: e.target.value})}
          placeholder="שם הרכב"
          className="mt-1 border-secondary/20 bg-background focus-visible:ring-primary"
          required
        />
      </div>
      
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-text">
          צבע הרכב
        </label>
        <Select
          value={currentItem.color}
          onValueChange={(value) => setCurrentItem({...currentItem, color: value as Exclude<CarColor, "all">})}
        >
          <SelectTrigger className="mt-1 border-secondary/20 bg-background focus-visible:ring-primary">
            <SelectValue placeholder="בחר צבע" />
          </SelectTrigger>
          <SelectContent className="bg-background border-secondary/20">
            {Object.entries(colorMap).map(([key, value]) => (
              <SelectItem key={key} value={key} className="focus:bg-primary/20">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: value }}
                  />
                  <span>{key === 'white' ? 'לבן' : 
                        key === 'black' ? 'שחור' : 
                        key === 'silver' ? 'כסף' : 
                        key === 'red' ? 'אדום' : 
                        key === 'blue' ? 'כחול' : 
                        key === 'gray' ? 'אפור' : key}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="before" className="block text-sm font-medium text-text">
            תמונת לפני
          </label>
          <div className="mt-1 flex items-center">
            <label className="flex cursor-pointer items-center rounded-md border border-secondary/20 bg-background px-3 py-2 text-sm shadow-sm hover:bg-secondary/10">
              <Upload className="ml-2 h-4 w-4" />
              <span>{currentItem.beforeFile || currentItem.before ? 'שנה תמונה' : 'העלה תמונה'}</span>
              <Input
                id="before"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleBeforeImageChange}
              />
            </label>
          </div>
          {beforePreview && (
            <div className="mt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-secondary/20">
                <img
                  src={beforePreview}
                  alt="תצוגה מקדימה לפני"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="after" className="block text-sm font-medium text-text">
            תמונת אחרי
          </label>
          <div className="mt-1 flex items-center">
            <label className="flex cursor-pointer items-center rounded-md border border-secondary/20 bg-background px-3 py-2 text-sm shadow-sm hover:bg-secondary/10">
              <Upload className="ml-2 h-4 w-4" />
              <span>{currentItem.afterFile || currentItem.after ? 'שנה תמונה' : 'העלה תמונה'}</span>
              <Input
                id="after"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAfterImageChange}
              />
            </label>
          </div>
          {afterPreview && (
            <div className="mt-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-secondary/20">
                <img
                  src={afterPreview}
                  alt="תצוגה מקדימה אחרי"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="border-secondary/20 hover:bg-secondary/10 text-text"
        >
          ביטול
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-text"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent ml-2" />
              שומר...
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              {isEditing ? 'עדכן פריט' : 'הוסף פריט'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default GalleryItemForm;

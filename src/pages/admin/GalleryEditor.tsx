
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { beforeAfterPairs, colorMap, CarColor, BeforeAfterPairWithColor } from '@/data/gallery';
import GalleryItemForm from '@/components/admin/gallery/GalleryItemForm';
import GalleryItemList from '@/components/admin/gallery/GalleryItemList';
import { uploadGalleryImage } from '@/utils/galleryUpload';

interface GalleryItem {
  id?: number;
  before: string;
  after: string;
  label: string;
  color: CarColor;
  beforeFile: File | null;
  afterFile: File | null;
}

export default function GalleryEditor() {
  const [galleryItems, setGalleryItems] = useState<BeforeAfterPairWithColor[]>(beforeAfterPairs);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem>({
    before: '',
    after: '',
    label: '',
    color: 'white',
    beforeFile: null,
    afterFile: null
  });
  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [afterPreview, setAfterPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setCurrentItem({
      before: '',
      after: '',
      label: '',
      color: 'white',
      beforeFile: null,
      afterFile: null
    });
    setBeforePreview(null);
    setAfterPreview(null);
    setIsEditing(false);
  };

  const handleBeforeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentItem({
        ...currentItem,
        beforeFile: file
      });
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setBeforePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAfterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCurrentItem({
        ...currentItem,
        afterFile: file
      });
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setAfterPreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditItem = (item: BeforeAfterPairWithColor) => {
    setCurrentItem({
      id: item.id,
      before: item.before,
      after: item.after,
      label: item.label || '',
      color: item.color,
      beforeFile: null,
      afterFile: null
    });
    setBeforePreview(item.before);
    setAfterPreview(item.after);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let beforeUrl = currentItem.before;
      let afterUrl = currentItem.after;
      
      if (currentItem.beforeFile) {
        const result = await uploadGalleryImage(
          currentItem.beforeFile, 
          'before', 
          currentItem.label
        );
        
        if (result.error) throw result.error;
        beforeUrl = result.url;
      }
      
      if (currentItem.afterFile) {
        const result = await uploadGalleryImage(
          currentItem.afterFile, 
          'after', 
          currentItem.label
        );
        
        if (result.error) throw result.error;
        afterUrl = result.url;
      }
      
      const updatedItem: BeforeAfterPairWithColor = {
        id: currentItem.id || Math.max(0, ...galleryItems.map(item => item.id || 0)) + 1,
        before: beforeUrl,
        after: afterUrl,
        label: currentItem.label,
        color: currentItem.color as Exclude<CarColor, "all">
      };
      
      if (isEditing) {
        const updatedItems = galleryItems.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        );
        setGalleryItems(updatedItems);
        toast({
          title: 'פריט עודכן',
          description: 'פריט הגלריה עודכן בהצלחה',
        });
      } else {
        setGalleryItems([...galleryItems, updatedItem]);
        toast({
          title: 'פריט נוסף',
          description: 'פריט הגלריה נוסף בהצלחה',
        });
      }
      
      resetForm();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'שמירת פריט גלריה נכשלה',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
    toast({
      title: 'פריט נמחק',
      description: 'פריט הגלריה נמחק בהצלחה',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ניהול גלריה</h1>
        <p className="text-muted-foreground">הוספה ועריכה של פריטי גלריה לפני/אחרי</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'עריכת פריט גלריה' : 'הוספת פריט גלריה חדש'}</CardTitle>
          </CardHeader>
          <CardContent>
            <GalleryItemForm
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              beforePreview={beforePreview}
              afterPreview={afterPreview}
              colorMap={colorMap}
              isLoading={isLoading}
              isEditing={isEditing}
              onSubmit={handleSubmit}
              onCancel={resetForm}
              handleBeforeImageChange={handleBeforeImageChange}
              handleAfterImageChange={handleAfterImageChange}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>רשימת פריטי גלריה</CardTitle>
          </CardHeader>
          <CardContent>
            <GalleryItemList
              galleryItems={galleryItems}
              onEdit={handleEditItem}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

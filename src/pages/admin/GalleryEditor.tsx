
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { colorMap, CarColor, BeforeAfterPairWithColor } from '@/data/gallery';
import GalleryItemForm from '@/components/admin/gallery/GalleryItemForm';
import GalleryItemList from '@/components/admin/gallery/GalleryItemList';
import { uploadGalleryImage } from '@/utils/galleryUpload';
import { supabase } from '@/lib/supabase';

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
  const [galleryItems, setGalleryItems] = useState<BeforeAfterPairWithColor[]>([]);
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
  const [isLoadingItems, setIsLoadingItems] = useState(true);
  const { toast } = useToast();

  // Fetch gallery items from Supabase when the component mounts
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    setIsLoadingItems(true);
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        throw error;
      }

      console.log('Fetched gallery items:', data);
      // Convert database string colors to CarColor type
      const typedItems: BeforeAfterPairWithColor[] = data?.map(item => ({
        id: item.id,
        before: item.before,
        after: item.after,
        label: item.label,
        color: item.color as CarColor
      })) || [];
      
      setGalleryItems(typedItems);
    } catch (error: any) {
      console.error('Error fetching gallery items:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: `שגיאה בטעינת פריטי הגלריה: ${error.message}`,
      });
    } finally {
      setIsLoadingItems(false);
    }
  };

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
      
      const itemToSave = {
        before: beforeUrl,
        after: afterUrl,
        label: currentItem.label,
        color: currentItem.color as Exclude<CarColor, "all">
      };
      
      if (isEditing && currentItem.id) {
        // Update existing item
        const { error } = await supabase
          .from('gallery_items')
          .update(itemToSave)
          .eq('id', currentItem.id);
          
        if (error) throw error;
        
        toast({
          title: 'פריט עודכן',
          description: 'פריט הגלריה עודכן בהצלחה',
        });
      } else {
        // Create new item
        const { error, data } = await supabase
          .from('gallery_items')
          .insert(itemToSave)
          .select();
          
        if (error) throw error;
        
        toast({
          title: 'פריט נוסף',
          description: 'פריט הגלריה נוסף בהצלחה',
        });
      }
      
      // Refresh the gallery items
      await fetchGalleryItems();
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

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Update local state to reflect deletion
      setGalleryItems(galleryItems.filter(item => item.id !== id));
      
      toast({
        title: 'פריט נמחק',
        description: 'פריט הגלריה נמחק בהצלחה',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: `מחיקת פריט נכשלה: ${error.message}`,
      });
    }
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
            {isLoadingItems ? (
              <div className="flex justify-center py-10">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <GalleryItemList
                galleryItems={galleryItems}
                onEdit={handleEditItem}
                onDelete={handleDelete}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

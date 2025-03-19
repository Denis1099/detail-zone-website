
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Save, Trash2, Edit, Upload, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { beforeAfterPairs, colorMap, CarColor } from '@/data/gallery';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [galleryItems, setGalleryItems] = useState(beforeAfterPairs);
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

  const handleEditItem = (item: any) => {
    setCurrentItem({
      id: item.id,
      before: item.before,
      after: item.after,
      label: item.label,
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
      
      // Upload before image if selected
      if (currentItem.beforeFile) {
        const fileExt = currentItem.beforeFile.name.split('.').pop();
        const fileName = `before-after/${currentItem.label}-before-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('admin-uploads')
          .upload(fileName, currentItem.beforeFile);
          
        if (uploadError) {
          throw new Error('שגיאה בהעלאת תמונת לפני');
        }
        
        const { data } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(fileName);
          
        beforeUrl = data.publicUrl;
      }
      
      // Upload after image if selected
      if (currentItem.afterFile) {
        const fileExt = currentItem.afterFile.name.split('.').pop();
        const fileName = `before-after/${currentItem.label}-after-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('admin-uploads')
          .upload(fileName, currentItem.afterFile);
          
        if (uploadError) {
          throw new Error('שגיאה בהעלאת תמונת אחרי');
        }
        
        const { data } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(fileName);
          
        afterUrl = data.publicUrl;
      }
      
      const updatedItem = {
        id: currentItem.id || galleryItems.length + 1,
        before: beforeUrl,
        after: afterUrl,
        label: currentItem.label,
        color: currentItem.color as Exclude<CarColor, "all">
      };
      
      if (isEditing) {
        // Update existing item
        const updatedItems = galleryItems.map(item => 
          item.id === updatedItem.id ? updatedItem : item
        );
        setGalleryItems(updatedItems);
        toast({
          title: 'פריט עודכן',
          description: 'פריט הגלריה עודכן בהצלחה',
        });
      } else {
        // Add new item
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="label" className="block text-sm font-medium">
                  שם הרכב
                </label>
                <Input
                  id="label"
                  value={currentItem.label}
                  onChange={(e) => setCurrentItem({...currentItem, label: e.target.value})}
                  placeholder="שם הרכב"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="color" className="block text-sm font-medium">
                  צבע הרכב
                </label>
                <Select
                  value={currentItem.color}
                  onValueChange={(value) => setCurrentItem({...currentItem, color: value as Exclude<CarColor, "all">})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="בחר צבע" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(colorMap).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
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
                  <label htmlFor="before" className="block text-sm font-medium">
                    תמונת לפני
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="flex cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent">
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
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-input">
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
                  <label htmlFor="after" className="block text-sm font-medium">
                    תמונת אחרי
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="flex cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent">
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
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-input">
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
                  onClick={resetForm}
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
                      {isEditing ? 'עדכן פריט' : 'הוסף פריט'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>רשימת פריטי גלריה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {galleryItems.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  אין פריטי גלריה עדיין
                </div>
              ) : (
                galleryItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <div className="h-12 w-12 overflow-hidden rounded-md border">
                          <img
                            src={item.before}
                            alt={`לפני - ${item.label}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="h-12 w-12 overflow-hidden rounded-md border">
                          <img
                            src={item.after}
                            alt={`אחרי - ${item.label}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="mr-4">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <div 
                            className="w-2 h-2 rounded-full mr-1" 
                            style={{ backgroundColor: colorMap[item.color] }}
                          />
                          {item.color === 'white' ? 'לבן' : 
                          item.color === 'black' ? 'שחור' : 
                          item.color === 'silver' ? 'כסף' : 
                          item.color === 'red' ? 'אדום' : 
                          item.color === 'blue' ? 'כחול' : 
                          item.color === 'gray' ? 'אפור' : item.color}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(item.id!)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

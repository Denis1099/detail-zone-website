
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Save, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [readTime, setReadTime] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = '';
      
      // Upload image if selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `blog/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('admin-uploads')
          .upload(filePath, imageFile);
          
        if (uploadError) {
          throw new Error('שגיאה בהעלאת התמונה');
        }
        
        const { data } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(filePath);
          
        imageUrl = data.publicUrl;
      }
      
      // Here you would save to your posts table in Supabase
      // This is a placeholder for now
      
      toast({
        title: 'הצלחה!',
        description: 'פוסט בלוג נשמר בהצלחה',
      });
      
      // Reset form
      setTitle('');
      setExcerpt('');
      setContent('');
      setImageFile(null);
      setImagePreview(null);
      setReadTime(3);
      
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'שמירת הפוסט נכשלה',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">עורך הבלוג</h1>
        <p className="text-muted-foreground">יצירה ועריכה של פוסטים בבלוג</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-text">
                  כותרת הפוסט
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="הזן כותרת לפוסט"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-text">
                  תקציר
                </label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="תיאור קצר של הפוסט"
                  className="mt-1 resize-none"
                  rows={2}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-text">
                  תוכן
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="כתוב את תוכן הפוסט כאן"
                  className="mt-1"
                  rows={15}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="readTime" className="block text-sm font-medium text-text">
                  זמן קריאה (דקות)
                </label>
                <Input
                  id="readTime"
                  type="number"
                  value={readTime}
                  onChange={(e) => setReadTime(parseInt(e.target.value))}
                  min={1}
                  max={60}
                  className="mt-1 w-32"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-text">
                  תמונה ראשית
                </label>
                <div className="mt-1 flex items-center">
                  <label className="flex cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent">
                    <Upload className="mr-2 h-4 w-4" />
                    <span>{imageFile ? 'שנה תמונה' : 'העלה תמונה'}</span>
                    <Input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {imageFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-input">
                      <img
                        src={imagePreview}
                        alt="תצוגה מקדימה"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
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
                שמור פוסט
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

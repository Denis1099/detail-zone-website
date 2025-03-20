
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, ArrowLeft } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { BlogImageUpload } from './BlogImageUpload';

interface BlogPostFormProps {
  isEditing: boolean;
  currentPost: BlogPost | null;
  onSubmit: (
    formData: {
      title: string;
      excerpt: string;
      content: string;
      readTime: number;
      imageFile: File | null;
      imagePreview: string | null;
    },
    isEditing: boolean,
    postId: number | null
  ) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function BlogPostForm({
  isEditing,
  currentPost,
  onSubmit,
  onCancel,
  isLoading
}: BlogPostFormProps) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [readTime, setReadTime] = useState(3);

  // Initialize form with current post data when editing
  useEffect(() => {
    if (currentPost && isEditing) {
      setTitle(currentPost.title);
      setExcerpt(currentPost.excerpt);
      setContent(currentPost.content);
      setReadTime(currentPost.readTime);
      setImagePreview(currentPost.imageUrl);
    } else {
      // Reset form when not editing
      setTitle('');
      setExcerpt('');
      setContent('');
      setImageFile(null);
      setImagePreview(null);
      setReadTime(3);
    }
  }, [currentPost, isEditing]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await onSubmit(
      {
        title,
        excerpt,
        content,
        readTime,
        imageFile,
        imagePreview
      },
      isEditing,
      currentPost?.id || null
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'עריכת פוסט' : 'יצירת פוסט חדש'}</CardTitle>
        </CardHeader>
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
            
            <BlogImageUpload 
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-2">
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
              {isEditing ? 'מעדכן...' : 'שומר...'}
            </>
          ) : (
            <>
              <Save className="ml-2 h-4 w-4" />
              {isEditing ? 'עדכן פוסט' : 'שמור פוסט'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}


import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BlogImageUpload } from './BlogImageUpload';

interface BlogFormInputFieldsProps {
  title: string;
  setTitle: (value: string) => void;
  excerpt: string;
  setExcerpt: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  readTime: number;
  setReadTime: (value: number) => void;
  imageFile: File | null;
  imagePreview: string | null;
  handleImageChange: (file: File | null) => void;
  handleImageRemove: () => void;
}

export function BlogFormInputFields({
  title,
  setTitle,
  excerpt,
  setExcerpt,
  content,
  setContent,
  readTime,
  setReadTime,
  imageFile,
  imagePreview,
  handleImageChange,
  handleImageRemove
}: BlogFormInputFieldsProps) {
  return (
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
  );
}

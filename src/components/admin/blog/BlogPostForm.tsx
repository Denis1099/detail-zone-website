
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/types/blog';
import { BlogFormHeader } from './BlogFormHeader';
import { BlogFormInputFields } from './BlogFormInputFields';
import { BlogFormActions } from './BlogFormActions';

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
    postId: number | string | null
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
        <BlogFormHeader isEditing={isEditing} />
        <CardContent className="pt-6">
          <BlogFormInputFields
            title={title}
            setTitle={setTitle}
            excerpt={excerpt}
            setExcerpt={setExcerpt}
            content={content}
            setContent={setContent}
            readTime={readTime}
            setReadTime={setReadTime}
            imageFile={imageFile}
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            handleImageRemove={handleImageRemove}
          />
        </CardContent>
      </Card>
      
      <BlogFormActions
        isEditing={isEditing}
        isLoading={isLoading}
        onCancel={onCancel}
      />
    </form>
  );
}

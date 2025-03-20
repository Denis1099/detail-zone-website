
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { BlogPostForm } from '@/components/admin/blog/BlogPostForm';
import { BlogPostsList } from '@/components/admin/blog/BlogPostsList';
import { useBlogPosts } from '@/hooks/useBlogPosts';

export default function BlogEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  
  const {
    blogPosts,
    isLoading,
    isInitialLoading,
    saveBlogPost,
    deleteBlogPost
  } = useBlogPosts();

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleResetForm = () => {
    setCurrentPost(null);
    setIsEditing(false);
  };

  const handleSubmit = async (
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
  ) => {
    const success = await saveBlogPost(formData, isEditing, postId);
    
    if (success) {
      handleResetForm();
    }
  };

  const handleDeletePost = async (id: number) => {
    await deleteBlogPost(id);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">עורך הבלוג</h1>
        <p className="text-muted-foreground">יצירה ועריכה של פוסטים בבלוג</p>
      </div>
      
      {isEditing && (
        <Button 
          variant="outline" 
          onClick={handleResetForm}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          חזרה לפוסט חדש
        </Button>
      )}
      
      <BlogPostForm
        isEditing={isEditing}
        currentPost={currentPost}
        onSubmit={handleSubmit}
        onCancel={handleResetForm}
        isLoading={isLoading}
      />

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>פוסטים קיימים</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogPostsList
            blogPosts={blogPosts}
            isLoading={isInitialLoading}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        </CardContent>
      </Card>
    </div>
  );
}

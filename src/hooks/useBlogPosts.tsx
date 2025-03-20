
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';
import { 
  fetchBlogPostsFromSupabase,
  saveBlogPostToSupabase,
  deleteBlogPostFromSupabase,
  uploadBlogImage
} from '@/services/blog/blogService';
import { loadLocalBlogPosts } from '@/utils/blogUtils';

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  readTime: number;
  imageFile: File | null;
  imagePreview: string | null;
}

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const posts = await fetchBlogPostsFromSupabase();
      
      if (posts && posts.length > 0) {
        setBlogPosts(posts);
      } else {
        // If no posts from Supabase, try loading from local data
        const localPosts = await loadLocalBlogPosts();
        setBlogPosts(localPosts);
      }
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה בטעינת הפוסטים',
        description: error.message || 'אירעה שגיאה בטעינת הפוסטים מהמסד נתונים',
      });
      
      // Fallback to local data on error
      const localPosts = await loadLocalBlogPosts();
      setBlogPosts(localPosts);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const saveBlogPost = async (
    formData: BlogFormData,
    isEditing: boolean,
    postId: number | string | null
  ) => {
    setIsLoading(true);

    try {
      let imageUrl = formData.imagePreview || '';
      
      // Upload image if a new one is provided
      if (formData.imageFile) {
        imageUrl = await uploadBlogImage(formData.imageFile);
      }
      
      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        read_time: formData.readTime,
        image_url: imageUrl,
        date: new Date().toISOString()
      };
      
      const result = await saveBlogPostToSupabase(blogData, isEditing, postId);
      
      toast({
        title: 'הצלחה!',
        description: result.message,
      });
      
      if (isEditing && postId) {
        // Update local state for edited post
        setBlogPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId
              ? { 
                  ...post, 
                  title: formData.title, 
                  excerpt: formData.excerpt, 
                  content: formData.content, 
                  readTime: formData.readTime, 
                  imageUrl,
                  date: new Date().toISOString() 
                } 
              : post
          )
        );
      } else if (result.data) {
        // Add new post to local state
        const newPost: BlogPost = {
          id: result.data.id,
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          date: result.data.date,
          imageUrl,
          readTime: formData.readTime
        };
        
        setBlogPosts(prevPosts => [newPost, ...prevPosts]);
      }
      
      return true;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'שמירת הפוסט נכשלה',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBlogPost = async (id: number | string) => {
    try {
      const result = await deleteBlogPostFromSupabase(id);
      
      toast({
        title: 'הצלחה!',
        description: result.message,
      });
      
      setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      return true;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'מחיקת הפוסט נכשלה',
      });
      return false;
    }
  };

  return {
    blogPosts,
    isLoading,
    isInitialLoading,
    saveBlogPost,
    deleteBlogPost
  };
}

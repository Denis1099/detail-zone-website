import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { useToast } from '@/components/ui/use-toast';

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
      console.log('Fetching blog posts from Supabase...');
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        console.log('Fetched blog posts:', data);
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          date: post.date,
          imageUrl: post.image_url,
          readTime: post.read_time,
          serviceSlug: post.service_slug || undefined
        }));
        setBlogPosts(formattedPosts);
      }
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      toast({
        variant: 'destructive',
        title: 'שגיאה בטעינת הפוסטים',
        description: error.message || 'אירעה שגיאה בטעינת הפוסטים מהמסד נתונים',
      });
      
      // Try to load from local data if available
      try {
        const { blogPosts: localPosts } = await import('@/data/blog/index');
        console.log('Loading blog posts from local data:', localPosts);
        setBlogPosts(localPosts);
      } catch (localError) {
        console.error('Could not load local blog data:', localError);
      }
    } finally {
      setIsInitialLoading(false);
    }
  };

  const saveBlogPost = async (
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
  ) => {
    setIsLoading(true);

    try {
      let imageUrl = formData.imagePreview || '';
      
      // Upload image if selected
      if (formData.imageFile) {
        const fileExt = formData.imageFile.name.split('.').pop();
        const fileName = `blog/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('admin-uploads')
          .upload(fileName, formData.imageFile);
          
        if (uploadError) {
          throw new Error('שגיאה בהעלאת התמונה');
        }
        
        const { data } = supabase.storage
          .from('admin-uploads')
          .getPublicUrl(fileName);
          
        imageUrl = data.publicUrl;
      }
      
      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        read_time: formData.readTime,
        image_url: imageUrl,
        date: new Date().toISOString()
      };
      
      if (isEditing && postId) {
        // Update existing post - handle both string and number types for postId
        const postIdNum = typeof postId === 'string' ? parseInt(postId, 10) : postId;
        
        const { error } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', postIdNum);
          
        if (error) throw error;
        
        toast({
          title: 'הצלחה!',
          description: 'פוסט בלוג עודכן בהצלחה',
        });
        
        // Update local state
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
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('blog_posts')
          .insert(blogData)
          .select();
          
        if (error) throw error;
        
        if (data && data[0]) {
          toast({
            title: 'הצלחה!',
            description: 'פוסט בלוג נשמר בהצלחה',
          });
          
          // Add to local state
          const newPost: BlogPost = {
            id: data[0].id,
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            date: data[0].date,
            imageUrl,
            readTime: formData.readTime
          };
          
          setBlogPosts(prevPosts => [newPost, ...prevPosts]);
        }
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
      // Handle both string and number types for id
      const idNum = typeof id === 'string' ? parseInt(id, 10) : id;
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', idNum);
        
      if (error) throw error;
      
      toast({
        title: 'הצלחה!',
        description: 'פוסט בלוג נמחק בהצלחה',
      });
      
      // Update local state
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

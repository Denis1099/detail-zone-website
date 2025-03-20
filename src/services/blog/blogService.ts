
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { toast } from '@/components/ui/use-toast';

export const fetchBlogPostsFromSupabase = async () => {
  console.log('Fetching blog posts from Supabase...');
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  if (data && data.length > 0) {
    console.log('Fetched blog posts from Supabase:', data);
    return data.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: post.date,
      imageUrl: post.image_url,
      readTime: post.read_time,
      serviceSlug: post.service_slug || undefined
    }));
  }
  
  console.log('No blog posts found in Supabase');
  return [];
};

export const saveBlogPostToSupabase = async (
  blogData: {
    title: string;
    excerpt: string;
    content: string;
    read_time: number;
    image_url: string;
    date: string;
  },
  isEditing: boolean,
  postId: number | string | null
) => {
  if (isEditing && postId) {
    const postIdNum = typeof postId === 'string' ? parseInt(postId, 10) : postId;
    
    const { error } = await supabase
      .from('blog_posts')
      .update(blogData)
      .eq('id', postIdNum);
      
    if (error) throw error;
    
    return { success: true, message: 'פוסט בלוג עודכן בהצלחה' };
  } else {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(blogData)
      .select();
      
    if (error) throw error;
    
    if (data && data[0]) {
      return { 
        success: true, 
        message: 'פוסט בלוג נשמר בהצלחה',
        data: data[0]
      };
    }
    
    throw new Error('Failed to save blog post');
  }
};

export const deleteBlogPostFromSupabase = async (id: number | string) => {
  const idNum = typeof id === 'string' ? parseInt(id, 10) : id;
  
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', idNum);
    
  if (error) throw error;
  
  return { success: true, message: 'פוסט בלוג נמחק בהצלחה' };
};

export const uploadBlogImage = async (imageFile: File) => {
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `blog/${crypto.randomUUID()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('admin-uploads')
    .upload(fileName, imageFile);
    
  if (uploadError) {
    throw new Error('שגיאה בהעלאת התמונה');
  }
  
  const { data } = supabase.storage
    .from('admin-uploads')
    .getPublicUrl(fileName);
    
  return data.publicUrl;
};

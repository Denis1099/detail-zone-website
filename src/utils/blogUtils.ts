
import { BlogPost } from '@/types/blog';

export const loadLocalBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { blogPosts: localPosts } = await import('@/data/blog/index');
    console.log('Loading blog posts from local data:', localPosts);
    
    if (localPosts && localPosts.length > 0) {
      return localPosts;
    } else {
      console.warn('No local blog posts found either');
      return [];
    }
  } catch (localError) {
    console.error('Could not load local blog data:', localError);
    return [];
  }
};

export const mapToBlogPost = (post: any): BlogPost => {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    imageUrl: post.image_url,
    readTime: post.read_time,
    serviceSlug: post.service_slug || undefined
  };
};

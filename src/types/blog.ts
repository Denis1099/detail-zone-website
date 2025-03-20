
export interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  serviceSlug?: string;
  readTime: number;
}

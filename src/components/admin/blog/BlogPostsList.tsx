
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogPostsListProps {
  blogPosts: BlogPost[];
  isLoading: boolean;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: number) => void;
}

export function BlogPostsList({ 
  blogPosts, 
  isLoading, 
  onEdit, 
  onDelete 
}: BlogPostsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        אין פוסטים עדיין
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>תמונה</TableHead>
          <TableHead>כותרת</TableHead>
          <TableHead>תקציר</TableHead>
          <TableHead>תאריך</TableHead>
          <TableHead>פעולות</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogPosts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              <div className="h-12 w-16 overflow-hidden rounded-md">
                <img 
                  src={post.imageUrl || 'https://placehold.co/100x100?text=No+Image'} 
                  alt={post.title}
                  className="h-full w-full object-cover" 
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{post.title}</TableCell>
            <TableCell className="max-w-xs truncate">{post.excerpt}</TableCell>
            <TableCell>{new Date(post.date).toLocaleDateString('he-IL')}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(post)}
                  className="mr-2"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

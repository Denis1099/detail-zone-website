
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Save, Trash2, Edit, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [readTime, setReadTime] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
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
          id: post.id.toString(),
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
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setImageFile(null);
    setImagePreview(null);
    setReadTime(3);
    setCurrentPostId(null);
    setIsEditing(false);
  };

  const handleEditPost = (post: BlogPost) => {
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setReadTime(post.readTime);
    setImagePreview(post.imageUrl);
    setCurrentPostId(post.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = imagePreview || '';
      
      // Upload image if selected
      if (imageFile) {
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
          
        imageUrl = data.publicUrl;
      }
      
      const blogData = {
        title,
        excerpt,
        content,
        read_time: readTime,
        image_url: imageUrl,
        date: new Date().toISOString()
      };
      
      if (isEditing && currentPostId) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(blogData)
          .eq('id', currentPostId);
          
        if (error) throw error;
        
        toast({
          title: 'הצלחה!',
          description: 'פוסט בלוג עודכן בהצלחה',
        });
        
        // Update local state
        setBlogPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === currentPostId
              ? { 
                  ...post, 
                  title, 
                  excerpt, 
                  content, 
                  readTime, 
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
            id: data[0].id.toString(),
            title,
            excerpt,
            content,
            date: data[0].date,
            imageUrl,
            readTime
          };
          
          setBlogPosts(prevPosts => [newPost, ...prevPosts]);
        }
      }
      
      // Reset form
      resetForm();
      
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'שמירת הפוסט נכשלה',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: 'הצלחה!',
        description: 'פוסט בלוג נמחק בהצלחה',
      });
      
      // Update local state
      setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'מחיקת הפוסט נכשלה',
      });
    }
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
          onClick={resetForm}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          חזרה לפוסט חדש
        </Button>
      )}
      
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
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-text">
                  תמונה ראשית
                </label>
                <div className="mt-1 flex items-center">
                  <label className="flex cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm hover:bg-accent">
                    <Upload className="ml-2 h-4 w-4" />
                    <span>{imageFile || imagePreview ? 'שנה תמונה' : 'העלה תמונה'}</span>
                    <Input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {(imageFile || imagePreview) && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {imagePreview && (
                  <div className="mt-4">
                    <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-input">
                      <img
                        src={imagePreview}
                        alt="תצוגה מקדימה"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
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

      {/* Blog Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>פוסטים קיימים</CardTitle>
        </CardHeader>
        <CardContent>
          {isInitialLoading ? (
            <div className="flex justify-center py-10">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              אין פוסטים עדיין
            </div>
          ) : (
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
                          onClick={() => handleEditPost(post)}
                          className="mr-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

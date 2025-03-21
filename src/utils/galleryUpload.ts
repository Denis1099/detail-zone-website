
import { supabase } from '@/lib/supabase';

export interface ImageUploadResult {
  url: string;
  error: Error | null;
}

export async function uploadGalleryImage(
  file: File, 
  prefix: string, 
  label: string
): Promise<ImageUploadResult> {
  try {
    if (!file) {
      console.error('No file provided for upload');
      throw new Error(`יש לבחור קובץ לפני העלאה`);
    }

    // Validate file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size);
      throw new Error(`קובץ גדול מדי. הגודל המקסימלי הוא 10MB`);
    }

    const fileExt = file.name.split('.').pop();
    const sanitizedLabel = label.replace(/[^a-zA-Z0-9\u0590-\u05FF]/g, '-');
    const fileName = `${prefix}/${sanitizedLabel}-${Date.now()}.${fileExt}`;
    
    console.log(`Uploading file: ${fileName}, size: ${file.size} bytes, type: ${file.type}`);
    
    // Check if storage bucket exists, create if it doesn't
    const { data: buckets } = await supabase.storage.listBuckets();
    const adminUploadsBucket = buckets?.find(bucket => bucket.name === 'admin-uploads');
    
    if (!adminUploadsBucket) {
      console.log('Creating admin-uploads bucket');
      // User will need to create the bucket via Supabase dashboard
      throw new Error('יש ליצור מאגר "admin-uploads" במערכת אחסון הקבצים');
    }
    
    // Add cache busting to prevent stale data
    const { error: uploadError, data } = await supabase.storage
      .from('admin-uploads')
      .upload(fileName, file, {
        cacheControl: '0', // Disable caching to ensure fresh data
        upsert: false,
        contentType: file.type // Explicitly set content type
      });
      
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`שגיאה בהעלאת תמונת ${prefix}: ${uploadError.message}`);
    }
    
    console.log('Upload successful, getting public URL for', fileName);
    
    // Make sure to refresh the CDN cache
    const { data: urlData } = supabase.storage
      .from('admin-uploads')
      .getPublicUrl(fileName, {
        download: false,
        transform: {
          width: 800, // Optimize image size for faster loading
          quality: 80
        }
      });
      
    // Add a timestamp to the URL to prevent caching
    const cacheBustedUrl = `${urlData.publicUrl}?t=${Date.now()}`;
    console.log('Public URL:', cacheBustedUrl);
    
    return { url: cacheBustedUrl, error: null };
  } catch (error) {
    console.error('Error in uploadGalleryImage:', error);
    return { url: '', error: error as Error };
  }
}

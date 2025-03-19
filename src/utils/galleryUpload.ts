
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
      throw new Error(`יש לבחור קובץ לפני העלאה`);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${prefix}/${label}-${prefix}-${Date.now()}.${fileExt}`;
    
    console.log(`Uploading file: ${fileName}`);
    
    const { error: uploadError, data } = await supabase.storage
      .from('admin-uploads')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`שגיאה בהעלאת תמונת ${prefix}: ${uploadError.message}`);
    }
    
    console.log('Upload successful, getting public URL');
    
    const { data: urlData } = supabase.storage
      .from('admin-uploads')
      .getPublicUrl(fileName);
      
    console.log('Public URL:', urlData.publicUrl);
    
    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    console.error('Error in uploadGalleryImage:', error);
    return { url: '', error: error as Error };
  }
}

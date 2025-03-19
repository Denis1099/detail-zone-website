
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
    const fileExt = file.name.split('.').pop();
    const fileName = `${prefix}/${label}-${prefix}-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('admin-uploads')
      .upload(fileName, file);
      
    if (uploadError) {
      throw new Error(`שגיאה בהעלאת תמונת ${prefix}`);
    }
    
    const { data } = supabase.storage
      .from('admin-uploads')
      .getPublicUrl(fileName);
      
    return { url: data.publicUrl, error: null };
  } catch (error) {
    return { url: '', error: error as Error };
  }
}

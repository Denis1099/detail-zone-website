
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface BlogFormActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onCancel: () => void;
}

export function BlogFormActions({ 
  isEditing, 
  isLoading, 
  onCancel 
}: BlogFormActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        ביטול
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        variant="default"
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
  );
}

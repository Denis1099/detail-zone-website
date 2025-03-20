
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface BlogFormHeaderProps {
  isEditing: boolean;
}

export function BlogFormHeader({ isEditing }: BlogFormHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>{isEditing ? 'עריכת פוסט' : 'יצירת פוסט חדש'}</CardTitle>
    </CardHeader>
  );
}

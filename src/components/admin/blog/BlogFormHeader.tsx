
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface BlogFormHeaderProps {
  isEditing: boolean;
}

export function BlogFormHeader({ isEditing }: BlogFormHeaderProps) {
  return (
    <CardHeader className="bg-background border-b border-primary/10">
      <CardTitle className="text-foreground">
        {isEditing ? 'עריכת פוסט' : 'יצירת פוסט חדש'}
      </CardTitle>
    </CardHeader>
  );
}


import React from 'react';

interface ShopHeaderProps {
  title: string;
  description: string;
}

export function ShopHeader({ title, description }: ShopHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

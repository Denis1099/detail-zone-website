
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { BeforeAfterPairWithColor, colorMap } from '@/data/gallery';

interface GalleryItemListProps {
  galleryItems: BeforeAfterPairWithColor[];
  onEdit: (item: BeforeAfterPairWithColor) => void;
  onDelete: (id: number) => void;
}

const GalleryItemList: React.FC<GalleryItemListProps> = ({
  galleryItems,
  onEdit,
  onDelete,
}) => {
  // Helper function to translate color names to Hebrew
  const getHebrewColorName = (colorName: string): string => {
    switch (colorName) {
      case 'white': return 'לבן';
      case 'black': return 'שחור';
      case 'silver': return 'כסף';
      case 'red': return 'אדום';
      case 'blue': return 'כחול';
      case 'gray': return 'אפור';
      default: return colorName;
    }
  };

  return (
    <div className="space-y-4">
      {galleryItems.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          אין פריטי גלריה עדיין
        </div>
      ) : (
        galleryItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <div className="h-12 w-12 overflow-hidden rounded-md border">
                  <img
                    src={item.before}
                    alt={`לפני - ${item.label}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-12 w-12 overflow-hidden rounded-md border">
                  <img
                    src={item.after}
                    alt={`אחרי - ${item.label}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="mr-4">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-1" 
                    style={{ backgroundColor: colorMap[item.color] }}
                  />
                  {getHebrewColorName(item.color)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(item.id!)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GalleryItemList;

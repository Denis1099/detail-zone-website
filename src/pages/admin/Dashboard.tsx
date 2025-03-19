
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileEdit, ShoppingBag, Image, Clock } from 'lucide-react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { adminUser } = useAdminAuth();
  
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">לוח בקרה</h1>
        <p className="text-muted-foreground">
          ברוך שובך, {adminUser?.email}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">פוסטים בבלוג</CardTitle>
            <FileEdit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              סך כל הפוסטים שפורסמו
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">מוצרים</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              סך כל המוצרים
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">קבצי מדיה</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              סך כל ההעלאות
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>פעילות אחרונה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-muted-foreground">
              אין פעילות אחרונה
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>פעולות מהירות</CardTitle>
            <CardDescription>נהל את תוכן האתר שלך</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid gap-2">
              <Link to="/admin/blog" className="flex items-center p-2 rounded-lg bg-card/50 hover:bg-accent transition-colors cursor-pointer">
                <span>יצירת פוסט חדש בבלוג</span>
                <FileEdit className="mr-auto h-4 w-4 text-primary" />
              </Link>
              <Link to="/admin/shop" className="flex items-center p-2 rounded-lg bg-card/50 hover:bg-accent transition-colors cursor-pointer">
                <span>הוספת מוצר חדש</span>
                <ShoppingBag className="mr-auto h-4 w-4 text-primary" />
              </Link>
              <Link to="/admin/gallery" className="flex items-center p-2 rounded-lg bg-card/50 hover:bg-accent transition-colors cursor-pointer">
                <span>עדכון גלריה</span>
                <Image className="mr-auto h-4 w-4 text-primary" />
              </Link>
              <Link to="/admin/media" className="flex items-center p-2 rounded-lg bg-card/50 hover:bg-accent transition-colors cursor-pointer">
                <span>העלאת מדיה חדשה</span>
                <Image className="mr-auto h-4 w-4 text-primary" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center glass-card p-10 rounded-lg">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl mb-6">הדף שחיפשת לא נמצא</p>
        <Button asChild>
          <a href="/">חזרה לדף הבית</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

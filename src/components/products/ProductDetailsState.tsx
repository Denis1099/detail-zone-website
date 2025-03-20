
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link as RouterLink } from "react-router-dom";

interface LoadingStateProps {
  isLoading: boolean;
}

export function LoadingState({ isLoading }: LoadingStateProps) {
  if (!isLoading) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24 flex-1 flex justify-center items-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
      <Footer />
    </div>
  );
}

interface NotFoundStateProps {
  isNotFound: boolean;
}

export function NotFoundState({ isNotFound }: NotFoundStateProps) {
  if (!isNotFound) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 pt-24 flex-1 flex justify-center items-center flex-col">
        <h2 className="text-2xl font-bold mb-4">המוצר לא נמצא</h2>
        <Button asChild>
          <RouterLink to="/shop">חזרה לחנות</RouterLink>
        </Button>
      </div>
      <Footer />
    </div>
  );
}

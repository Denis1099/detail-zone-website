
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 bg-[#25D366] hover:bg-[#20BA5C] shadow-lg"
      asChild
    >
      <a
        href="https://wa.link/d5yaro"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
    </Button>
  );
};

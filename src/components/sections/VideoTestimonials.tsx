
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Extend Window interface to include YouTube API
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

// Define the video testimonials data
const videoTestimonials = [
  { id: "a5BTGA3dPa0", title: "דויד - מרצדס A45 AMG" },
  { id: "Gq0Mwjs2YSM", title: "נהוראי - שברולט אימפלה" },
  { id: "qkOWWR0YUz8", title: "יובל - ב.מ.וו מיני קופר" },
  { id: "WN0wO41fmPo", title: "דורון - דודג׳ צ׳לנג׳ר" },
];

export function VideoTestimonials() {
  const [apiLoaded, setApiLoaded] = useState(false);
  const [playersInitialized, setPlayersInitialized] = useState(false);
  const playerRefs = useRef<{ [key: string]: any }>({});
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const { toast } = useToast();

  // Function to load YouTube API
  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setApiLoaded(true);
      return;
    }

    // Function that will be called when API is ready
    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API ready");
      setApiLoaded(true);
    };

    // Load the API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Cleanup
    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  // Initialize players when API is loaded
  useEffect(() => {
    if (!apiLoaded || playersInitialized) return;

    const initializePlayers = () => {
      videoTestimonials.forEach(video => {
        if (!containerRefs.current[video.id]) return;

        try {
          console.log(`Initializing player for video ID: ${video.id}`);
          playerRefs.current[video.id] = new window.YT.Player(containerRefs.current[video.id], {
            videoId: video.id,
            playerVars: {
              playsinline: 1,
              controls: 1,
              rel: 0,
              modestbranding: 1,
            },
            events: {
              onStateChange: (event: any) => {
                // Pause other videos when one starts playing
                if (event.data === window.YT.PlayerState.PLAYING) {
                  Object.entries(playerRefs.current).forEach(([id, player]) => {
                    if (id !== video.id && player && typeof player.pauseVideo === 'function') {
                      player.pauseVideo();
                    }
                  });
                }
              },
              onReady: (event: any) => {
                console.log(`Player ready for video ID: ${video.id}`);
              },
              onError: (event: any) => {
                console.error(`Player error for video ID: ${video.id}`, event);
                toast({
                  variant: "destructive",
                  title: "שגיאה בטעינת הסרטון",
                  description: "לא ניתן לטעון את הסרטון כרגע. נסה שוב מאוחר יותר.",
                });
              }
            }
          });
        } catch (error) {
          console.error(`Error initializing player for ${video.id}:`, error);
        }
      });

      setPlayersInitialized(true);
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initializePlayers();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [apiLoaded, toast]);

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">הלקוחות שלנו מספרים</h2>
          <p className="text-muted-foreground mt-2">
            תשמעו מהלקוחות שלנו על החוויה שלהם איתנו
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoTestimonials.map((video) => (
            <div key={video.id} className="w-full">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                {!apiLoaded && (
                  <Skeleton className="w-full h-full absolute inset-0" />
                )}
                <div
                  ref={(el) => (containerRefs.current[video.id] = el)}
                  className="w-full h-full"
                  id={`youtube-player-${video.id}`}
                />
              </div>
              <h3 className="mt-3 text-center font-semibold">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

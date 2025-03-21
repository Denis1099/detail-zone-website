
import React, { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
  const playerRefs = useRef<{ [key: string]: any }>({});
  const iframeRefs = useRef<{ [key: string]: HTMLDivElement | HTMLIFrameElement | null }>({});
  const { toast } = useToast();

  const loadYouTubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      setApiLoaded(true);
    }
  };

  const onStateChange = (event: { data: number; target: any }) => {
    if (event.data === window.YT?.PlayerState?.PLAYING) {
      // Pause all other videos when one starts playing
      Object.entries(playerRefs.current).forEach(([id, player]) => {
        if (player && player !== event.target) {
          player.pauseVideo();
        }
      });
    }
  };

  const initializePlayer = (videoId: string) => {
    if (!window.YT?.Player) return;

    playerRefs.current[videoId] = new window.YT.Player(`player-${videoId}`, {
      videoId: videoId,
      playerVars: {
        playsinline: 1,
        controls: 1,
        rel: 0,
        modestbranding: 1,
      },
      events: {
        onStateChange: onStateChange,
      },
    });
  };

  useEffect(() => {
    loadYouTubeAPI();

    window.onYouTubeIframeAPIReady = () => {
      setApiLoaded(true);
      videoTestimonials.forEach((video) => {
        initializePlayer(video.id);
      });
    };

    return () => {
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, []);

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">הלקוחות שלנו מספרים</h2>
          <p className="text-muted-foreground mt-2">
            תשמעו מהלקוחות שלנו על החוויה שלהם איתנו
          </p>
        </div>

        {/* Updated grid layout to show 4 videos on large screens and 2 on medium screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoTestimonials.map((video) => (
            <div key={video.id} className="w-full">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <div
                  id={`player-${video.id}`}
                  ref={(el) => (iframeRefs.current[video.id] = el)}
                  className="w-full h-full"
                ></div>
              </div>
              <h3 className="mt-3 text-center font-semibold">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";
import InvitationContent from "@/components/InvitationContent";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const playTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (playTimerRef.current !== null) {
        window.clearTimeout(playTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Content is always mounted so video can be revealed immediately */}
      <div
        className={`transition-opacity duration-300 ${
          isRevealing || isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <InvitationContent shouldPlayVideo={shouldPlayVideo} />
      </div>

      {/* Envelope on top */}
      {!isOpen && (
        <EnvelopeOverlay
          onOpenStart={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            setIsRevealing(true);
            if (playTimerRef.current !== null) {
              window.clearTimeout(playTimerRef.current);
            }
            // Envelope animation is 3.5s; start the video around halfway.
            playTimerRef.current = window.setTimeout(() => {
              setShouldPlayVideo(true);
            }, 1750);
          }}
          onOpened={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            setShouldPlayVideo(true);
            setIsOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default Index;

import { useEffect, useRef, useState } from "react";
import AfterpartyContent from "@/components/AfterpartyContent";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";
import darkEnvelopeTop from "@/assets/envelop-boven-langer-donker.png";
import darkEnvelopeBottom from "@/assets/envelop-beneden-langer-donker.png";
import babyMusic from "@/assets/music/Baby.mp3";

const Afterparty = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isOpen) {
      audio.currentTime = 0;
      void audio.play().catch(() => {
        // If the browser blocks autoplay, user can still control audio via the mute button.
      });
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, [isOpen]);

  return (
    <div className="relative min-h-screen bg-background">
      <audio ref={audioRef} src={babyMusic} loop preload="auto" />

      <div
        className={`transition-opacity duration-300 ${
          isRevealing || isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <AfterpartyContent isOpen={isOpen} />
      </div>

      {isOpen && (
        <button
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
          className="fixed bottom-5 right-5 z-50 rounded-full bg-black/45 p-3 text-white shadow-lg backdrop-blur transition hover:bg-black/60"
          aria-label={isMuted ? "Unmute muziek" : "Mute muziek"}
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="m23 9-6 6" />
              <path d="m17 9 6 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M11 5 6 9H3v6h3l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
      )}

      {!isOpen && (
        <EnvelopeOverlay
          textVariant="light"
          topImageSrc={darkEnvelopeTop}
          bottomImageSrc={darkEnvelopeBottom}
          onOpenStart={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            setIsRevealing(true);
          }}
          onOpened={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            setIsOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default Afterparty;

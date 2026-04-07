import ScrollReveal from "@/components/ScrollReveal";
import { useState, useRef } from "react";

const InvitationContent = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = () => {
    setIsVideoLoaded(true);
    // Ensure video plays when it becomes visible
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was blocked by browser, user can click to play
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Video Section - mobile first full screen */}
      <section className="relative w-full h-[100svh] flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/video/invitation.mp4"
          controls
          playsInline
          autoPlay
          muted
          preload="auto"
          onCanPlay={handleCanPlay}
          style={{ opacity: isVideoLoaded ? 1 : 0, transition: "opacity 0.3s ease-in" }}
        />
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
              <p className="text-foreground/60 text-sm font-sans">Loading video...</p>
            </div>
          </div>
        )}
      </section>

      {/* Details Section */}
      <section className="py-16 px-6 md:py-24 md:px-12 max-w-2xl mx-auto text-center">
        <div className="space-y-10 md:space-y-14">
          <ScrollReveal>
            <div className="space-y-3">
              <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground font-sans">
                You are invited
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-foreground leading-tight">
                Save the Date
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="w-12 h-px bg-gold mx-auto" />
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="space-y-5">
              <div>
                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground">
                  Saturday, June 14th, 2026
                </p>
                <p className="text-muted-foreground mt-2 font-sans text-xs sm:text-sm tracking-wide">
                  at four o'clock in the afternoon
                </p>
              </div>
              <div>
                <p className="font-serif text-lg sm:text-xl text-foreground">
                  The Grand Venue
                </p>
                <p className="text-muted-foreground mt-1 font-sans text-xs sm:text-sm tracking-wide">
                  123 Beautiful Street, Amsterdam
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="w-12 h-px bg-gold mx-auto" />
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <p className="text-muted-foreground font-sans text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              We would be honored to have you celebrate this special day with us.
              Dinner and dancing to follow the ceremony.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="pt-4">
              <p className="font-serif text-base sm:text-lg text-gold italic">
                RSVP by May 1st, 2026
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center">
        <ScrollReveal>
          <p className="text-muted-foreground font-sans text-xs tracking-[0.2em] uppercase">
            With love
          </p>
        </ScrollReveal>
      </footer>
    </div>
  );
};

export default InvitationContent;

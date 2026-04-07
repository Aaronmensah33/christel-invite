import { useState } from "react";
import envelopTop from "@/assets/envelop-boven.png";
import envelopBottom from "@/assets/envelop-beneden.png";

interface EnvelopeOverlayProps {
  onOpened: () => void;
}

const EnvelopeOverlay = ({ onOpened }: EnvelopeOverlayProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpened();
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer bg-background"
      onClick={handleClick}
    >
      {/* Top flap - starts at center, slides up */}
      <div
        className="absolute inset-x-0 top-0 h-full z-10 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isOpening ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <img
          src={envelopTop}
          alt=""
          className="absolute bottom-0 w-full h-[55%] object-cover object-bottom"
        />
      </div>

      {/* Bottom flap - starts at center, slides down */}
      <div
        className="absolute inset-x-0 bottom-0 h-full z-10 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: isOpening ? "translateY(100%)" : "translateY(0)",
        }}
      >
        <img
          src={envelopBottom}
          alt=""
          className="absolute top-0 w-full h-[55%] object-cover object-top"
        />
      </div>

      {/* Tap prompt */}
      {!isOpening && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground/60 animate-pulse-soft tracking-widest">
            Tap to open
          </p>
        </div>
      )}
    </div>
  );
};

export default EnvelopeOverlay;

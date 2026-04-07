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
      className="fixed inset-0 z-50 cursor-pointer"
      onClick={handleClick}
    >
      {/* Top flap */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 z-10 flex items-end justify-center ${
          isOpening ? "animate-flap-open-top" : ""
        }`}
      >
        <img
          src={envelopTop}
          alt=""
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Bottom flap */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 z-10 flex items-start justify-center ${
          isOpening ? "animate-flap-open-bottom" : ""
        }`}
      >
        <img
          src={envelopBottom}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Tap prompt */}
      {!isOpening && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <p className="font-serif text-2xl md:text-3xl text-foreground/70 animate-pulse-soft tracking-widest">
            Tap to open
          </p>
        </div>
      )}
    </div>
  );
};

export default EnvelopeOverlay;

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
    }, 3500);
  };

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer bg-background overflow-hidden"
      onClick={handleClick}
    >
      {/* Bottom flap - starts at center, slides down - behind */}
      <div
        className="absolute inset-x-0 top-1/2 z-10 pointer-events-none"
        style={{
          transform: isOpening ? "translateY(100%) translateZ(0)" : "translateY(-50%) translateZ(0)",
          transition: "transform 3.5s ease-in-out",
          willChange: isOpening ? "transform" : "auto",
          backfaceVisibility: "hidden",
        }}
      >
        <img
          src={envelopBottom}
          alt=""
          className="w-full h-auto object-contain"
          style={{ 
            display: "block",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* Top flap - starts at center, slides up - in front */}
      <div
        className="absolute inset-x-0 top-1/2 z-20 pointer-events-none"
        style={{
          transform: isOpening ? "translateY(-150%) translateZ(0)" : "translateY(-50%) translateZ(0)",
          transition: "transform 3.5s ease-in-out",
          willChange: isOpening ? "transform" : "auto",
          backfaceVisibility: "hidden",
        }}
      >
        <img
          src={envelopTop}
          alt=""
          className="w-full h-auto object-contain"
          style={{ 
            display: "block",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      {/* Tap prompt - removed */}
    </div>
  );
};

export default EnvelopeOverlay;

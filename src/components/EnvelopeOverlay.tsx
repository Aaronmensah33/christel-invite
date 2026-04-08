import { useState } from "react";
import envelopTop from "@/assets/envelop-boven-langer.png";
import envelopBottom from "@/assets/envelop-beneden-langer.png";
import "./envelopeFlap.css";

interface EnvelopeOverlayProps {
  onOpenStart?: () => void;
  onOpened: () => void;
  topImageSrc?: string;
  bottomImageSrc?: string;
  textVariant?: "dark" | "light";
}

const EnvelopeOverlay = ({
  onOpenStart,
  onOpened,
  topImageSrc = envelopTop,
  bottomImageSrc = envelopBottom,
  textVariant = "dark",
}: EnvelopeOverlayProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const OPEN_DURATION_MS = 1500;

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    onOpenStart?.();
    setTimeout(() => {
      onOpened();
    }, OPEN_DURATION_MS);
  };

  const renderFlapWords = (text: string, startDelay = 0, invert = false) => {
    const words = text.split(" ");

    return (
      <span className="animated-phrase" aria-label={text}>
        {words.map((word, wordIndex) => {
          const wordDelay = startDelay + wordIndex * 0.12;
          const directionClass =
            (wordIndex + (invert ? 1 : 0)) % 2 === 0
              ? "word-left"
              : "word-right";
          const useFirstLetterAccent = word.length > 1 && wordIndex % 2 === 0;
          const [firstLetter, ...remainingLetters] = Array.from(word);

          return (
            <span
              key={`${word}-${wordIndex}`}
              className={`animated-word ${directionClass}`}
              style={{ animationDelay: `${wordDelay}s` }}
            >
              {useFirstLetterAccent && firstLetter ? (
                <>
                  <span
                    className={`word-first-letter ${
                      directionClass === "word-left"
                        ? "word-first-letter-left"
                        : "word-first-letter-right"
                    }`}
                    style={{ animationDelay: `${wordDelay + 0.03}s` }}
                  >
                    {firstLetter}
                  </span>
                  {remainingLetters.map((char, charIndex) => (
                    <span
                      key={`${char}-${charIndex}`}
                      className="word-letter"
                      style={{
                        animationDelay: `${wordDelay + 0.08 + charIndex * 0.025}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </>
              ) : (
                <span className="word-whole">{word}</span>
              )}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 cursor-pointer overflow-hidden transition-colors duration-200 ${
        isOpening ? "bg-transparent" : "bg-background"
      }`}
      onClick={handleClick}
    >
      <div
        className="absolute inset-x-0 top-1/2 z-10 pointer-events-none"
        style={{
          transform: isOpening
            ? "translateY(100%) translateZ(0)"
            : "translateY(-50%) translateZ(0)",
          transition: `transform ${OPEN_DURATION_MS}ms ease-in-out`,
          willChange: isOpening ? "transform" : "auto",
          backfaceVisibility: "hidden",
        }}
      >
        <img
          src={bottomImageSrc}
          alt=""
          className="w-full h-auto object-contain"
          style={{
            display: "block",
            backfaceVisibility: "hidden",
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-1/2 z-20 pointer-events-none relative"
        style={{
          transform: isOpening
            ? "translateY(-150%) translateZ(0)"
            : "translateY(-50%) translateZ(0)",
          transition: `transform ${OPEN_DURATION_MS}ms ease-in-out`,
          willChange: isOpening ? "transform" : "auto",
          backfaceVisibility: "hidden",
        }}
      >
        <img
          src={topImageSrc}
          alt=""
          className="w-full h-auto object-contain"
          style={{
            display: "block",
            backfaceVisibility: "hidden",
          }}
        />

        {!isOpening && (
          <div
            className={`envelope-flap-hero envelope-flap-hero--${textVariant} reveal-visible font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight`}
            aria-hidden="true"
          >
            <div className="envelope-flap-hero-inner">
              {renderFlapWords("open up for a surprise", 0.04)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvelopeOverlay;

import ScrollReveal from "@/components/ScrollReveal";
import { CalendarDays, Camera, Gift, Heart, MapPin } from "lucide-react";
import flowerCluster from "@/assets/flowers.png";
import flowerBouquet from "@/assets/elegant-bouquet-peonies-mixed-flowers.png";
import paperGrain from "@/assets/offwhite-paper-grain.png";
import scannedPaper from "@/assets/vecteezy_scanned-paper-halftone-faded-gradient-texture-grunge_51785245.jpg";
import waxSeal from "@/assets/waxseal.png";
import { useEffect, useRef, useState } from "react";

interface InvitationContentProps {
  isOpen: boolean;
}

const InvitationContent = ({ isOpen }: InvitationContentProps) => {
  const addressTimeRef = useRef<HTMLElement | null>(null);
  const dresscodeRef = useRef<HTMLElement | null>(null);
  const birthdayGiftsRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setShowConfetti(true);
    const timer = window.setTimeout(() => {
      setShowConfetti(false);
    }, 3500);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const scrollToY = (targetY: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1500;
    let startTime: number | null = null;

    const easeInOutCubic = (value: number) => {
      return value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;
    };

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo({ top: startY + distance * easedProgress, left: 0 });

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  };

  const scrollTo = (target: HTMLElement | null) => {
    if (!target) return;
    scrollToY(target.getBoundingClientRect().top + window.scrollY);
  };

  type WordAnimationProfile = {
    firstLetterMode?: "cadence" | "all" | "none";
    firstLetterEvery?: number;
    directionMode?: "alternate" | "reverseAlternate" | "left" | "right";
    wordStep?: number;
    letterStep?: number;
    firstLetterOffset?: number;
  };

  const renderAnimatedWords = (
    text: string,
    startDelay = 0,
    profile: WordAnimationProfile = {},
  ) => {
    const {
      firstLetterMode = "cadence",
      firstLetterEvery = 3,
      directionMode = "alternate",
      wordStep = 0.14,
      letterStep = 0.025,
      firstLetterOffset = 0.03,
    } = profile;

    const words = text.split(" ");

    return (
      <span className="animated-phrase" aria-label={text}>
        {words.map((word, wordIndex) => {
          const wordDelay = startDelay + wordIndex * wordStep;
          const useFirstLetterAccent =
            word.length > 1 &&
            (firstLetterMode === "all" ||
              (firstLetterMode === "cadence" &&
                wordIndex % firstLetterEvery === 0));
          const directionClass =
            directionMode === "left"
              ? "word-left"
              : directionMode === "right"
                ? "word-right"
                : directionMode === "reverseAlternate"
                  ? wordIndex % 2 === 0
                    ? "word-right"
                    : "word-left"
                  : wordIndex % 2 === 0
                    ? "word-left"
                    : "word-right";
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
                    className={`word-first-letter ${directionClass === "word-left" ? "word-first-letter-left" : "word-first-letter-right"}`}
                    style={{
                      animationDelay: `${wordDelay + firstLetterOffset}s`,
                    }}
                  >
                    {firstLetter}
                  </span>
                  {remainingLetters.map((char, charIndex) => (
                    <span
                      key={`${char}-${charIndex}`}
                      className="word-letter"
                      style={{
                        animationDelay: `${wordDelay + firstLetterOffset + 0.05 + charIndex * letterStep}s`,
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
    <div className="invite-stage timeline-root min-h-screen bg-background">
      <img src={paperGrain} alt="" className="paper-grain-layer" />
      <img
        src={scannedPaper}
        alt=""
        className="paper-grain-layer paper-grain-secondary"
      />

      {showConfetti && (
        <div
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 24 }).map((_, index) => {
            const left = (index * 4.1) % 100;
            const delay = (index % 8) * 0.12;
            const duration = 2.7 + (index % 5) * 0.25;
            const sway = (index % 2 === 0 ? 1 : -1) * (8 + (index % 4) * 3);

            return (
              <span
                key={index}
                className="confetti-piece"
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  transform: `translateX(${sway}px)`,
                }}
              />
            );
          })}
        </div>
      )}

      <section className="timeline-section min-h-[100svh] py-16 px-6 md:py-24 md:px-12 max-w-2xl mx-auto text-center flex items-center justify-center">
        <img src={waxSeal} alt="" className="wax-seal-deco wax-seal-mid" />
        <img
          src={flowerCluster}
          alt=""
          className="floral-deco floral-deco-left"
        />
        <div className="w-full space-y-10 md:space-y-14">
          <ScrollReveal isEnabled={isOpen}>
            <div className="space-y-6">
              <div className="flex justify-center">
                <Heart className="h-7 w-7 text-gold" strokeWidth={1.5} />
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-foreground leading-tight">
                {renderAnimatedWords("You’re invited for", 0.06)}
                <span className="script-mix">Christel&rsquo;s</span>{" "}
                {renderAnimatedWords("big 25!", 0.55)}
              </h1>
              <div className="w-16 h-px bg-white/95 mx-auto" />
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={220}>
            <button
              type="button"
              onClick={() => scrollTo(addressTimeRef.current)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-background"
            >
              <span className="text-lg leading-none animate-bounce">↓</span>
            </button>
          </ScrollReveal>
        </div>
      </section>

      <section
        ref={addressTimeRef}
        className="timeline-section min-h-[100svh] py-16 px-6 md:py-24 md:px-12 max-w-2xl mx-auto text-center flex items-center justify-center"
      >
        <div className="w-full space-y-10 md:space-y-14">
          <ScrollReveal isEnabled={isOpen}>
            <div className="space-y-4">
              <div className="flex justify-center gap-3 text-gold">
                <CalendarDays className="h-6 w-6" strokeWidth={1.5} />
                <MapPin className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
                {renderAnimatedWords("address and time:", 0.03, {
                  firstLetterMode: "none",
                  directionMode: "reverseAlternate",
                  wordStep: 0.11,
                })}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={80}>
            <div className="w-16 h-px bg-white/95 mx-auto" />
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={130}>
            <div className="space-y-5 text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
              <p className="dropcap-line">
                {renderAnimatedWords("Sunday 13.09.26.", 0.01, {
                  firstLetterMode: "none",
                  directionMode: "left",
                  wordStep: 0.09,
                })}
              </p>
              <p className="dropcap-line">
                Time: you are kindly requested to arrive at 17:30
              </p>
              <p className="dropcap-line">
                -Party Centrum Ons Huis-
                <br />
                Beatrijsstraat 120
                <br />
                2531 XE Den Haag
              </p>
              <p className="dropcap-line">
                PS: please note that paid parking applies in the area from 18:00
                onwards.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={200}>
            <button
              type="button"
              onClick={() => scrollTo(dresscodeRef.current)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-background"
            >
              <span className="text-lg leading-none animate-bounce">↓</span>
            </button>
          </ScrollReveal>
        </div>
      </section>

      <section
        ref={dresscodeRef}
        className="timeline-section min-h-[100svh] py-16 px-6 md:py-24 md:px-12 max-w-2xl mx-auto text-center flex items-center justify-center"
      >
        <img
          src={flowerBouquet}
          alt=""
          className="floral-deco floral-deco-right"
        />
        <div className="w-full space-y-10 md:space-y-14">
          <ScrollReveal isEnabled={isOpen}>
            <div className="space-y-4">
              <div className="flex justify-center text-gold">
                <Camera className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
                {renderAnimatedWords("Dresscode", 0.03, {
                  firstLetterMode: "all",
                  directionMode: "left",
                })}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={80}>
            <div className="w-16 h-px bg-white/95 mx-auto" />
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={130}>
            <div className="space-y-5 text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
              <p className="dropcap-line">
                Styled for the camera 📸, ready for the dancefloor 💃🏿
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={200}>
            <button
              type="button"
              onClick={() => scrollTo(birthdayGiftsRef.current)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-background"
            >
              <span className="text-lg leading-none animate-bounce">↓</span>
            </button>
          </ScrollReveal>
        </div>
      </section>

      <section
        ref={birthdayGiftsRef}
        className="timeline-section min-h-[100svh] py-16 px-6 md:py-24 md:px-12 max-w-2xl mx-auto text-center flex items-center justify-center"
      >
        <div className="w-full space-y-10 md:space-y-14">
          <ScrollReveal isEnabled={isOpen}>
            <div className="space-y-4">
              <div className="flex justify-center text-gold">
                <Gift className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
                {renderAnimatedWords("Birthdaygifts", 0.03, {
                  firstLetterMode: "all",
                  directionMode: "right",
                })}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={80}>
            <div className="w-16 h-px bg-white/95 mx-auto" />
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={130}>
            <div className="space-y-5 text-muted-foreground font-sans text-sm sm:text-base leading-relaxed">
              <p className="dropcap-line">
                Birthdaygifts: your presence is the greatest gift.
                <br />
                If you would like to give something, a financial gift would be
                truly appreciated.
                <br />
                Alternatively, you are welcome to explore my wishlist.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={200}>
            <button
              type="button"
              onClick={() => scrollTo(closingRef.current)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-background"
            >
              <span className="text-lg leading-none animate-bounce">↓</span>
            </button>
          </ScrollReveal>
        </div>
      </section>

      <section
        ref={closingRef}
        className="timeline-section min-h-[100svh] py-16 px-6 md:py-24 md:px-12 max-w-2xl mx-auto text-center flex items-center justify-center"
      >
        <img src={waxSeal} alt="" className="wax-seal-deco wax-seal-bottom" />
        <img
          src={flowerCluster}
          alt=""
          className="floral-deco floral-deco-left"
        />
        <div className="w-full space-y-10 md:space-y-14">
          <ScrollReveal isEnabled={isOpen}>
            <div className="space-y-4">
              <div className="flex justify-center text-gold">
                <Heart className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-tight">
                <span className="script-mix">Much love,</span>
                <br />
                {renderAnimatedWords("Christel’s 25❤️.", 0.04, {
                  firstLetterMode: "cadence",
                  firstLetterEvery: 2,
                  directionMode: "reverseAlternate",
                  wordStep: 0.12,
                })}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={80}>
            <div className="w-16 h-px bg-white/95 mx-auto" />
          </ScrollReveal>

          <ScrollReveal isEnabled={isOpen} delay={200}>
            <div className="pt-2 text-center">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToY(0);
                }}
                className="text-xs tracking-[0.25em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                Back to top
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default InvitationContent;


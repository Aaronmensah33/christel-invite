import ScrollReveal from "@/components/ScrollReveal";
import { Camera, Clock3, Gift, MapPin } from "lucide-react";
import silkBackground from "@/assets/silk-background.png";
import invite25 from "@/assets/25.png";
import { useEffect, useRef, useState } from "react";

interface InvitationContentProps {
  isOpen: boolean;
}

const InvitationContent = ({ isOpen }: InvitationContentProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const detailsRef = useRef<HTMLElement | null>(null);
  const dressRef = useRef<HTMLElement | null>(null);
  const giftsRef = useRef<HTMLElement | null>(null);
  const closingRef = useRef<HTMLElement | null>(null);

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
    const duration = 1100;
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
    scrollToY(target.getBoundingClientRect().top + window.scrollY - 24);
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
          const useFirstLetterAccent =
            word.length > 1 &&
            (firstLetterMode === "all" ||
              (firstLetterMode === "cadence" &&
                wordIndex % firstLetterEvery === 0));

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
    <div className="invite-scroll-page min-h-screen">
      <img src={silkBackground} alt="" className="silk-background-layer" />
      <div className="sparkle-overlay" aria-hidden="true">
        {Array.from({ length: 36 }).map((_, index) => (
          <span
            key={index}
            className="sparkle-dot"
            style={{
              left: `${(index * 9.7) % 100}%`,
              top: `${(index * 13.3) % 100}%`,
              animationDelay: `${(index % 12) * 0.22}s`,
              animationDuration: `${2.2 + (index % 5) * 0.45}s`,
            }}
          />
        ))}
      </div>

      {showConfetti && (
        <div
          className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: 24 }).map((_, index) => {
            const left = (index * 4.1) % 100;
            const delay = (index % 8) * 0.12;
            const duration = 2.7 + (index % 5) * 0.25;
            const sway = (index % 2 === 0 ? 1 : -1) * (7 + (index % 4) * 3);

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

      <main className="single-sheet-shell">
        <article className="invite-card single-invite-sheet">
          <div className="paper-stroke-frame">
            <ScrollReveal
              isEnabled={isOpen}
              className="sheet-panel sheet-panel-hero"
            >
              <header className="sheet-hero">
                <p className="invite-script-line">
                  {renderAnimatedWords("You are invited to", 0.03, {
                    directionMode: "reverseAlternate",
                    firstLetterMode: "none",
                  })}
                </p>
                <h1 className="invite-title">
                  {renderAnimatedWords("CHRISTEL'S", 0.04, {
                    firstLetterMode: "all",
                    directionMode: "alternate",
                    wordStep: 0.16,
                    letterStep: 0.06,
                    firstLetterOffset: 0.12,
                  })}
                </h1>
                <div className="invite-25-holder">
                  <img
                    src={invite25}
                    alt="25th birthday"
                    className="invite-25-image"
                  />
                  <span className="invite-25-suffix" aria-hidden="true">
                    TH
                  </span>
                </div>
                <p className="invite-main-label">Birthday Dinner</p>
                <p className="invite-date">Sunday, 13 September 2026</p>
                <div className="sheet-scroll-row">
                  <button
                    type="button"
                    className="sheet-scroll-button"
                    onClick={() => scrollTo(detailsRef.current)}
                    aria-label="Scroll naar details"
                  >
                    ↓
                  </button>
                </div>
              </header>
            </ScrollReveal>

            <ScrollReveal
              isEnabled={isOpen}
              delay={120}
              className="sheet-panel"
            >
              <section ref={detailsRef} className="sheet-block">
                <h2 className="details-title">
                  {renderAnimatedWords("The Details", 0.03, {
                    firstLetterMode: "cadence",
                    firstLetterEvery: 2,
                    directionMode: "reverseAlternate",
                  })}
                </h2>
                <div className="details-divider" />

                <div className="details-item">
                  <Clock3 className="details-icon" strokeWidth={1.5} />
                  <div>
                    <h3>
                      {renderAnimatedWords(
                        "Kindly arrive at 17:30 sharp",
                        0.02,
                        {
                          firstLetterMode: "none",
                          directionMode: "left",
                          wordStep: 0.09,
                        },
                      )}
                    </h3>
                    <p>
                      {renderAnimatedWords(
                        "so we can start the evening together on time.",
                        0.03,
                        {
                          firstLetterMode: "none",
                          directionMode: "reverseAlternate",
                          wordStep: 0.08,
                        },
                      )}
                    </p>
                  </div>
                </div>

                <div className="details-divider" />

                <div className="details-item">
                  <MapPin className="details-icon" strokeWidth={1.5} />
                  <div>
                    <h3>
                      {renderAnimatedWords("Address and parking", 0.02, {
                        firstLetterMode: "cadence",
                        firstLetterEvery: 2,
                        directionMode: "right",
                      })}
                    </h3>
                    <p>
                      Partycentrum Ons Huis
                      <br />
                      Beatrijsstraat 120
                      <br />
                      2531 XE Den Haag
                    </p>
                    <p className="details-note">
                      (from 18:00 onwards paid parking applies)
                    </p>
                  </div>
                </div>
              </section>
              <div className="sheet-scroll-row">
                <button
                  type="button"
                  className="sheet-scroll-button"
                  onClick={() => scrollTo(dressRef.current)}
                  aria-label="Scroll naar dress code"
                >
                  ↓
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal
              isEnabled={isOpen}
              delay={220}
              className="sheet-panel"
            >
              <section ref={dressRef} className="sheet-block">
                <div className="dress-headline">
                  <Camera className="dress-icon" strokeWidth={1.5} />
                  <h2>
                    {renderAnimatedWords("Dress code", 0.03, {
                      firstLetterMode: "all",
                      directionMode: "left",
                    })}
                  </h2>
                </div>
                <p className="sheet-inline-text">
                  {renderAnimatedWords(
                    "Styled for the camera📷, ready for the dance floor💃🏿.",
                    0.02,
                    {
                      firstLetterMode: "none",
                      directionMode: "alternate",
                      wordStep: 0.08,
                    },
                  )}
                </p>
              </section>
              <div className="sheet-scroll-row">
                <button
                  type="button"
                  className="sheet-scroll-button"
                  onClick={() => scrollTo(giftsRef.current)}
                  aria-label="Scroll naar gifts"
                >
                  ↓
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal
              isEnabled={isOpen}
              delay={300}
              className="sheet-panel"
            >
              <section ref={giftsRef} className="sheet-block">
                <div className="dress-headline">
                  <Gift className="dress-icon" strokeWidth={1.5} />
                  <h2>
                    {renderAnimatedWords("Gifts", 0.03, {
                      firstLetterMode: "all",
                      directionMode: "right",
                    })}
                  </h2>
                </div>
                <p className="sheet-inline-text">
                  {renderAnimatedWords(
                    "If you would like to give something, a financial gift would be truly appreciated.",
                    0.02,
                    {
                      firstLetterMode: "none",
                      directionMode: "left",
                      wordStep: 0.075,
                    },
                  )}
                </p>
                <p className="sheet-inline-text">
                  {renderAnimatedWords(
                    "Alternatively, you are welcome to explore my wishlist.",
                    0.02,
                    {
                      firstLetterMode: "none",
                      directionMode: "reverseAlternate",
                      wordStep: 0.075,
                    },
                  )}
                </p>
              </section>
              <div className="sheet-scroll-row">
                <button
                  type="button"
                  className="sheet-scroll-button"
                  onClick={() => scrollTo(closingRef.current)}
                  aria-label="Scroll naar afsluiting"
                >
                  ↓
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal
              isEnabled={isOpen}
              delay={370}
              className="sheet-panel"
            >
              <footer ref={closingRef} className="sheet-closing">
                <p className="invite-love">Much love,</p>
                <p className="invite-signature">Christel</p>
                <div className="sheet-scroll-row">
                  <button
                    type="button"
                    className="sheet-scroll-button"
                    onClick={() => scrollToY(0)}
                    aria-label="Scroll terug naar boven"
                  >
                    ↑
                  </button>
                </div>
              </footer>
            </ScrollReveal>
          </div>
        </article>
      </main>
    </div>
  );
};

export default InvitationContent;

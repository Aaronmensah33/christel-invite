import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  isEnabled?: boolean;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  isEnabled = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      setIsVisible(false);
      return;
    }

    let revealTimer: number | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = window.setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (revealTimer !== null) {
        window.clearTimeout(revealTimer);
      }
    };
  }, [delay, isEnabled]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isVisible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

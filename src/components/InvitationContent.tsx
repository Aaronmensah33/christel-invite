import ScrollReveal from "@/components/ScrollReveal";

const InvitationContent = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Video Section - mobile first full screen */}
      <section className="relative w-full h-[100svh] flex items-center justify-center">
        <video
          className="w-full h-full object-cover"
          src="/video/invitation.mp4"
          controls
          playsInline
          autoPlay
          muted
        />
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

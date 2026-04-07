const InvitationContent = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Video Section */}
      <section className="relative w-full h-screen flex items-center justify-center bg-foreground/5">
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
      <section className="py-20 px-6 md:px-12 max-w-3xl mx-auto text-center">
        <div className="space-y-12 animate-fade-in-up">
          <div className="space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground font-sans">
              You are invited
            </p>
            <h1 className="font-serif text-5xl md:text-7xl font-light text-foreground leading-tight">
              Save the Date
            </h1>
          </div>

          <div className="w-16 h-px bg-gold mx-auto" />

          <div className="space-y-6">
            <div>
              <p className="font-serif text-2xl md:text-3xl text-foreground">
                Saturday, June 14th, 2026
              </p>
              <p className="text-muted-foreground mt-2 font-sans text-sm tracking-wide">
                at four o'clock in the afternoon
              </p>
            </div>

            <div>
              <p className="font-serif text-xl text-foreground">
                The Grand Venue
              </p>
              <p className="text-muted-foreground mt-1 font-sans text-sm tracking-wide">
                123 Beautiful Street, Amsterdam
              </p>
            </div>
          </div>

          <div className="w-16 h-px bg-gold mx-auto" />

          <div className="space-y-4">
            <p className="text-muted-foreground font-sans text-sm leading-relaxed max-w-md mx-auto">
              We would be honored to have you celebrate this special day with us. 
              Dinner and dancing to follow the ceremony.
            </p>
          </div>

          <div className="pt-8">
            <p className="font-serif text-lg text-gold italic">
              RSVP by May 1st, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <p className="text-muted-foreground font-sans text-xs tracking-[0.2em] uppercase">
          With love
        </p>
      </footer>
    </div>
  );
};

export default InvitationContent;

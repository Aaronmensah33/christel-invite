import { useState, useEffect } from "react";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";
import InvitationContent from "@/components/InvitationContent";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Video loads immediately in background - always rendered */}
      <div
        className={`fixed inset-0 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: isOpen ? 10 : -1 }}
      >
        <InvitationContent />
      </div>

      {/* Envelope on top */}
      {!isOpen && <EnvelopeOverlay onOpened={() => setIsOpen(true)} />}
    </div>
  );
};

export default Index;

import { useState } from "react";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";
import InvitationContent from "@/components/InvitationContent";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {!isOpen && <EnvelopeOverlay onOpened={() => setIsOpen(true)} />}
      <div
        className={`transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <InvitationContent />
      </div>
    </div>
  );
};

export default Index;

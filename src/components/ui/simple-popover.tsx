import React from "react";

interface SimplePopoverProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const SimplePopover: React.FC<SimplePopoverProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div className="bg-background rounded-lg shadow-lg" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

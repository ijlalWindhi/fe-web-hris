import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/utils";

type TSheetActionProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  position?: "right" | "left" | "top" | "bottom";
  showFooter?: boolean;
  footerContent?: React.ReactNode;
};

function SheetAction({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  position = "right",
  showFooter = false,
  footerContent,
}: TSheetActionProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Position classes for the sheet
  const positionClasses = {
    right: "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm translate-x-0",
    left: "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm translate-x-0",
    top: "inset-x-0 top-0 translate-y-0",
    bottom: "inset-x-0 bottom-0 translate-y-0",
  };

  const animationClasses = {
    right: "animate-slide-in-from-right",
    left: "animate-slide-in-from-left",
    top: "animate-slide-in-from-top",
    bottom: "animate-slide-in-from-bottom",
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed inset-0 overflow-hidden">
        <div
          className="absolute inset-0 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div
            className={cn(
              "pointer-events-none fixed",
              positionClasses[position],
              className,
            )}
          >
            <div
              className={cn(
                "pointer-events-auto flex h-full flex-col overflow-y-auto bg-background p-6 shadow-lg",
                animationClasses[position],
              )}
            >
              {/* Header */}
              <div className="flex flex-row items-center justify-between mb-6">
                <div className="flex flex-col space-y-2 text-center sm:text-left">
                  {title && (
                    <h2 className="text-lg font-semibold text-foreground">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              {title && <Separator className="mb-4" />}

              {/* Content */}
              <div className="flex-1 overflow-y-auto">{children}</div>

              {/* Footer */}
              {showFooter && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                    {footerContent}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default SheetAction;

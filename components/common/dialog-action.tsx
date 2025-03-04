import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Separator } from "../ui/separator";

import { cn } from "@/utils/utils";

type TDialogActionProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

function DialogAction({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: TDialogActionProps) {
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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className={cn(
            "relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all",
            className,
          )}
        >
          <div
            className={`flex flex-row items-center justify-between ${title && "mb-6"}`}
          >
            <div>
              {title && (
                <h2
                  id="dialog-title"
                  className="text-base font-medium leading-none tracking-tight"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id="dialog-description"
                  className="mt-2 text-sm text-gray-500"
                >
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 opacity-70 ring-offset-white transition-opacity hover:opacity-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {title && <Separator />}

          <div>{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DialogAction;

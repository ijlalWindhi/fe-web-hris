"use client";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { cn } from "@/utils/utils";
import { isValidImageFile } from "@/utils/image-validation";
import { toast } from "@/hooks/use-toast";

interface InputProfileProps {
  defaultImage?: string;
  width?: string;
  height?: string;
  onFileChange?: (file: File) => void;
  shouldChange?: boolean;
}

export default function InputProfile({
  defaultImage,
  width = "w-24",
  height = "h-24",
  onFileChange,
  shouldChange = true,
}: Readonly<InputProfileProps>) {
  // variables
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // functions
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileChange && shouldChange) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const buffer = reader.result as ArrayBuffer;
          const isValid = isValidImageFile(buffer);
          if (!isValid) {
            toast({
              title: "Invalid Image",
              description: "Please upload a valid image file.",
              variant: "destructive",
            });
            return;
          }
          onFileChange(file);
          // Create preview URL
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        }
      };
      reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // lifecycle
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  return (
    <div
      className={cn(
        "w-fit h-fit relative mx-auto",
        shouldChange ? "cursor-pointer" : "",
      )}
      onClick={shouldChange ? handleAvatarClick : undefined}
    >
      <Avatar className={cn("mx-auto", width, height)}>
        <AvatarImage
          src={previewUrl ?? defaultImage ?? "/images/unavailable-profile.webp"}
          alt="avatar"
          className="object-cover w-full h-full rounded-full"
        />
        <AvatarFallback />
      </Avatar>
      {shouldChange && (
        <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full">
          <Camera size={16} className="h-3 md:h-5 w-3 md:w-5" />
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".jpeg,.png,.jpg,.webp"
        className="hidden"
      />
    </div>
  );
}

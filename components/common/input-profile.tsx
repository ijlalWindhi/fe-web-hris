"use client";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { cn } from "@/utils/utils";

interface InputProfileProps {
  defaultImage?: string;
  width?: string;
  height?: string;
  onFileChange: (file: File) => void;
}

export default function InputProfile({
  defaultImage,
  width = "w-24",
  height = "h-24",
  onFileChange,
}: Readonly<InputProfileProps>) {
  // variables
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // functions
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
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
      className="w-fit h-fit relative mx-auto cursor-pointer"
      onClick={handleAvatarClick}
    >
      <Avatar className={cn("mx-auto", width, height)}>
        <AvatarImage
          src={previewUrl || defaultImage || "/images/unavailable-profile.webp"}
          alt="avatar"
          className="object-cover w-full h-full rounded-full"
        />
        <AvatarFallback />
      </Avatar>
      <div className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full">
        <Camera size={16} />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

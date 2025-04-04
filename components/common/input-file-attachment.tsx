"use client";
import React, { useRef, useState } from "react";
import { Link, Info } from "lucide-react";

import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { toast } from "@/hooks/use-toast";

interface InputFileProps {
  onFileChange?: (file: File) => void;
  accept?: string;
  acceptLabel?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
}

export default function InputFile({
  onFileChange,
  accept = ".pdf",
  acceptLabel = "PDF",
  maxSize = 5, // default 5MB
  disabled = false,
  label = "Upload File",
  placeholder = "Choose file to upload",
  defaultValue = "",
}: Readonly<InputFileProps>) {
  // variables
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // functions
  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type && accept) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!accept.includes(`.${extension}`)) {
        toast({
          title: "Invalid File Type",
          description: `Please upload a file with extension: ${accept}`,
          variant: "destructive",
        });
        return false;
      }
    } else if (
      !file.type.match(accept.replace(/\./g, "").split(",").join("|"))
    ) {
      toast({
        title: "Invalid File Type",
        description: `Please upload a file with extension: ${accept}`,
        variant: "destructive",
      });
      return false;
    }

    // Check file size
    const fileSize = file.size / (1024 * 1024); // Convert to MB
    if (fileSize > maxSize) {
      toast({
        title: "File Too Large",
        description: `File size should not exceed ${maxSize}MB`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileChange && !disabled) {
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileChange(file);
      }
    }
  };

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex justify-between items-center gap-2 rounded-full border border-input bg-background px-3 py-2 text-xs md:text-sm">
        <div className="flex gap-1 items-center">
          <Link size={18} className="text-primary" />
          <span className="ml-2 text-sm text-gray-500">
            {selectedFile?.name ?? defaultValue ?? placeholder}
          </span>
        </div>
        <Button
          type="button"
          size="sm"
          disabled={disabled}
          onClick={handleButtonClick}
        >
          Upload
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          disabled={disabled}
          className="hidden"
        />
      </div>
      {accept && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Info size={16} />
          <span>Accepts: {acceptLabel}</span>
        </div>
      )}
    </div>
  );
}

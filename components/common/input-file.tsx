"use client";

import { useState, useCallback, useEffect, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { CloudIcon } from "lucide-react";

import { cn } from "@/utils/utils";

interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: File | null;
  onChange: (value: File | null) => void;
  onBlur: () => void;
  name: string;
  maxSize?: number; // in MB
  supportedFormats?: string[];
  error?: string;
  defaultImage?: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      value,
      onChange,
      onBlur,
      name,
      maxSize = 10,
      supportedFormats = ["image/jpeg", "image/png"],
      error,
      className,
      defaultImage,
      ...props
    },
    ref,
  ) => {
    // variables
    const [preview, setPreview] = useState<string | null>(null);
    const [_, setFileValue] = useState<File | null>(null);

    // functions
    const updatePreview = useCallback((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }, []);

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        if (acceptedFiles?.length > 0) {
          const file = acceptedFiles[0];
          setFileValue(file);
          updatePreview(file);

          // Call onChange prop if provided
          if (onChange) {
            onChange(file);
          }
        }
      },
      [onChange, updatePreview],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": supportedFormats.map((format) =>
          format.replace("image/", "."),
        ),
      },
      maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
      multiple: false,
    });

    const handleContainerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      const input = document.querySelector<HTMLInputElement>(
        `input[name="${name}"]`,
      );
      if (input) {
        input.click();
      }
    };

    // lifecycle
    useEffect(() => {
      if (value instanceof File) {
        setFileValue(value);
        updatePreview(value);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <div className={cn("w-full", className)}>
        <div
          {...getRootProps({
            onClick: handleContainerClick, // Override the click handler
          })}
          className={cn(
            "border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors overflow-hidden",
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50",
            error ? "border-destructive" : "",
            "flex flex-col items-center justify-center",
            preview ? "p-0" : "p-4",
          )}
          style={{
            minHeight: "150px",
          }}
        >
          <input
            {...getInputProps()}
            name={name}
            ref={ref}
            onBlur={onBlur}
            {...props}
          />

          {preview || defaultImage ? (
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ minHeight: "150px" }}
            >
              <div
                className="absolute inset-0 bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    preview ? preview : defaultImage ? defaultImage : ""
                  })`,
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <CloudIcon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm mb-1 font-semibold">
                Drag and Drop File or{" "}
                <span className="text-primary font-medium">Choose File</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
          <p>
            Supported formats:{" "}
            {supportedFormats
              .map((format) => format.replace("image/", "."))
              .join(", ")}
          </p>
          <p>Max: {maxSize} MB</p>
        </div>
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export { FileUpload };

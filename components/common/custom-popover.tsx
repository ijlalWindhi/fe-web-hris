"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface CustomPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const CustomPopover = ({
  content,
  children,
  className,
}: CustomPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className={className}>{content}</PopoverContent>
    </Popover>
  );
};

export default CustomPopover;

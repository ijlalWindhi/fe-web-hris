import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/utils/utils";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMeta } from "@/types";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex w-full justify-center md:justify-end", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "default" : "ghost",
        size,
      }),
      "!rounded-full",
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <Button size="icon" variant="outline" className="!rounded-full">
      <ChevronLeft className="h-4 w-4" />
    </Button>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <Button size="icon" variant="outline" className="!rounded-full">
      <ChevronRight className="h-4 w-4" />
    </Button>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-9 w-9 items-center justify-center rounded-full",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

type TPaginationProps = {
  meta: IMeta;
  pageSize?: string[];
  onPageChange: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
  className?: string;
};

const PaginationCompo = ({
  meta,
  pageSize = ["10", "15", "20", "25"],
  onPageChange,
  className,
}: TPaginationProps) => {
  const { page, page_count } = meta;

  // Menghitung jumlah halaman untuk lompatan berdasarkan total halaman
  const calculateJumpSize = () => {
    if (page_count <= 10) return 2;
    if (page_count <= 20) return 3;
    if (page_count <= 50) return 5;
    return Math.floor(page_count / 10); // Lompatan 10% dari total halaman
  };

  const jumpSize = calculateJumpSize();

  // Handler untuk melompat beberapa halaman ke belakang
  const handleJumpBack = () => {
    const newPage = Math.max(1, page - jumpSize);
    onPageChange({ page: newPage, pageSize: meta.page_size });
  };

  // Handler untuk melompat beberapa halaman ke depan
  const handleJumpForward = () => {
    const newPage = Math.min(page_count, page + jumpSize);
    onPageChange({ page: newPage, pageSize: meta.page_size });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 5; // Jumlah halaman yang ditampilkan (tidak termasuk ellipsis)

    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > page_count) {
      endPage = page_count;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    // Tambahkan halaman pertama jika start page > 1
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("ellipsis1");
    }

    // Tambahkan halaman-halaman tengah
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Tambahkan halaman terakhir jika end page < page_count
    if (endPage < page_count) {
      if (endPage < page_count - 1) pageNumbers.push("ellipsis2");
      pageNumbers.push(page_count);
    }

    return pageNumbers;
  };

  if (page_count === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full justify-between items-center gap-4",
        "px-4 py-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      {/* Page Size Selector - Hidden on very small screens */}
      <div className="hidden sm:block">
        <Select
          defaultValue={String(meta.page_size)}
          onValueChange={(value) =>
            onPageChange({ page: 1, pageSize: Number(value) })
          }
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items per page</SelectLabel>
              {pageSize?.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent className="gap-1 sm:gap-2">
          {/* Navigation buttons - Shown based on screen size */}
          <div className="hidden sm:flex items-center">
            <PaginationItem>
              <PaginationLink
                onClick={handleJumpBack}
                className={cn(page <= 1 && "pointer-events-none opacity-50")}
              >
                <Button size="icon" variant="outline" className="!rounded-full">
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </PaginationLink>
            </PaginationItem>
          </div>

          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                onPageChange({
                  page: Math.max(1, page - 1),
                  pageSize: meta.page_size,
                })
              }
              className={cn(page === 1 && "pointer-events-none opacity-50")}
            />
          </PaginationItem>

          {/* Page Numbers - Responsive */}
          <div className="hidden sm:flex items-center">
            {getPageNumbers().map((pageNumber, index) => (
              <PaginationItem key={`${pageNumber}-${index}`}>
                {pageNumber === "ellipsis1" || pageNumber === "ellipsis2" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={page === pageNumber}
                    onClick={() =>
                      onPageChange({
                        page: pageNumber as number,
                        pageSize: meta.page_size,
                      })
                    }
                    className="cursor-pointer"
                  >
                    {pageNumber}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
          </div>

          {/* Mobile Current Page Indicator */}
          <div className="sm:hidden">
            <span className="text-xs md:text-sm text-center">
              Page {page} of {page_count}
            </span>
          </div>

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange({
                  page: Math.min(page_count, page + 1),
                  pageSize: meta.page_size,
                })
              }
              className={cn(
                page === page_count && "pointer-events-none opacity-50",
              )}
            />
          </PaginationItem>

          {/* Jump Forward - Hidden on mobile */}
          <div className="hidden sm:flex items-center">
            <PaginationItem>
              <PaginationLink
                onClick={handleJumpForward}
                className={cn(
                  page >= page_count && "pointer-events-none opacity-50",
                )}
              >
                <Button size="icon" variant="outline" className="!rounded-full">
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </PaginationLink>
            </PaginationItem>
          </div>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

PaginationCompo.displayName = "PaginationCompo";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationCompo,
};

import React, { useCallback, useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/utils/utils";
import { IResponsePagination } from "@/types";

type InfiniteMultiComboboxProps<T> = {
  values?: string[];
  selectedValue?: string[];
  onChange: (values: string[]) => void;
  onClear?: () => void;
  fetchData: (params: {
    page: number;
    page_size: number;
    src?: string;
  }) => Promise<IResponsePagination<T[]>>;
  fetchSelectedData?: (params: {
    page: number;
    page_size: number;
    src_id?: string;
  }) => Promise<IResponsePagination<T[]>>;
  valueKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  pageSize?: number;
  className?: string;
  disabled?: boolean;
  maxItems?: number;
};

/**
 * Multi-select Combobox with infinite scroll and search capabilities
 * @param values - selected values
 * @param selectedValue - selected values to display
 * @param onChange - callback when values change
 * @param onClear - callback when clear button is clicked
 * @param fetchData - function to fetch data
 * @param fetchSelectedData - function to fetch selected data
 * @param valueKey - key to use as value
 * @param labelKey - key to use as label
 * @param placeholder - placeholder text
 * @param pageSize - number of items to fetch per page
 * @param className - additional classes
 * @param disabled - disable the combobox
 * @param maxItems - maximum number of items that can be selected
 */
const InfiniteMultiCombobox = <T,>({
  values = [],
  selectedValue = [],
  onChange,
  onClear,
  fetchData,
  fetchSelectedData,
  valueKey,
  labelKey,
  placeholder = "Select items...",
  pageSize = 10,
  className,
  disabled,
  maxItems,
}: InfiniteMultiComboboxProps<T>) => {
  // variables
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMax, setIsMax] = useState<boolean>(false);
  const [backendFiltered, setBackendFiltered] = useState<boolean>(false);
  const [hasFetchedInitial, setHasFetchedInitial] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const isMaxItemsReached = maxItems ? values.length >= maxItems : false;

  // functions
  const loadItems = useCallback(
    async (pageNum: number, isNewSearch = false) => {
      if (loading || !open) return;

      setLoading(true);
      try {
        const newItems = await fetchData({
          page: pageNum,
          page_size: pageSize,
          src: debouncedSearch,
        });

        setIsMax(newItems.page === newItems.page_count);

        if (isNewSearch || pageNum === 1) {
          setItems(newItems.results || []);
        } else {
          setItems((prev) => [
            ...prev,
            ...(newItems.results || []).filter(
              (item) =>
                !prev.some((prevItem) => prevItem[valueKey] === item[valueKey]),
            ),
          ]);
        }

        setHasMore(
          newItems?.results?.length === pageSize &&
            newItems.page < newItems.page_count,
        );
        setPage(pageNum);
      } catch (error) {
        console.error("Error loading items:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, fetchData, pageSize, valueKey, loading, open],
  );

  const loadSelectedItems = useCallback(async () => {
    if (selectedValue.length === 0) return;
    if (fetchSelectedData) {
      const newItems = await fetchSelectedData({
        page: 1,
        page_size: pageSize,
        src_id: selectedValue.join(","),
      });
      setItems(newItems.results || []);
    }
  }, [fetchSelectedData, pageSize, selectedValue]);

  const handleSelect = (item: T) => {
    const itemValue = String(item[valueKey]);
    if (values.includes(itemValue)) {
      onChange(values.filter((v) => v !== itemValue));
    } else if (!isMaxItemsReached) {
      onChange([...values, itemValue]);
    }
  };

  const handleRemoveItem = (valueToRemove: string) => {
    onChange(values.filter((v) => v !== valueToRemove));
  };

  // lifecycle
  useEffect(() => {
    if (open && (!hasFetchedInitial || debouncedSearch !== "")) {
      loadItems(1, true);
      setHasFetchedInitial(true);
    }
  }, [open, debouncedSearch, loadItems, hasFetchedInitial]);

  useEffect(() => {
    // Reset state when popover is closed
    if (!open) {
      setSearchTerm("");
      setBackendFiltered(false);
    }
  }, [open]);

  useEffect(() => {
    if (inView && hasMore && !loading && !isMax && open) {
      loadItems(page + 1);
    }
  }, [inView, hasMore, loading, isMax, loadItems, page, open]);

  useEffect(() => {
    if (selectedValue.length > 0) {
      loadSelectedItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDisplayItems = () => {
    return values.map((value) => {
      const item = items.find((item) => String(item[valueKey]) === value);
      return item ? String(item[labelKey]) : value;
    });
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${className} min-h-[36px] h-auto`}
          >
            <div className="flex flex-wrap gap-1 py-1">
              {getDisplayItems().map((label, index) => (
                <Badge key={index} variant="secondary" className="mr-1 mb-1">
                  {label}
                  <span
                    role="button"
                    tabIndex={0}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleRemoveItem(values[index]);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveItem(values[index]);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </span>
                </Badge>
              ))}
              {values.length === 0 && (
                <span className="text-xs md:text-sm text-gray-500 font-normal">
                  {placeholder}
                </span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command shouldFilter={!backendFiltered}>
            <CommandInput
              placeholder="Search..."
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((item: T) => (
                  <CommandItem
                    key={`${String(item[valueKey])}-${page}`}
                    value={String(item[labelKey])}
                    onSelect={() => handleSelect(item)}
                  >
                    {String(item[labelKey])}
                    <Check
                      className={cn(
                        "ml-auto",
                        values.includes(String(item[valueKey]))
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              {hasMore && !isMax && (
                <div
                  ref={ref}
                  className="py-2 text-center text-xs md:text-sm text-gray-500"
                >
                  {loading ? "Loading..." : "Scroll for more"}
                </div>
              )}
              {isMax && (
                <div className="py-2 text-center text-xs md:text-sm text-gray-500">
                  No more items to load
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {values.length > 0 && onClear && !disabled && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-transparent"
          onClick={onClear}
        >
          <X className="h-4 w-4 opacity-50 hover:opacity-75" />
        </Button>
      )}
    </div>
  );
};

export default InfiniteMultiCombobox;

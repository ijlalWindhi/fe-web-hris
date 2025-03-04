import React, { useCallback, useEffect, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
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

import useDebounce from "@/hooks/use-debounce";
import { cn } from "@/utils/utils";
import { IResponsePagination } from "@/types";

type InfiniteComboboxProps<T> = {
  value?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  fetchData: (params: {
    page: number;
    page_size: number;
    src?: string;
  }) => Promise<IResponsePagination<T[]>>;
  valueKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  pageSize?: number;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
};

/**
 * Combobox with infinite scroll and search capabilities
 * @param value - selected value
 * @param onChange - callback when value changes
 * @param onClear - callback when clear button is clicked
 * @param fetchData - function to fetch data
 * @param valueKey - key to use as value
 * @param labelKey - key to use as label
 * @param placeholder - placeholder text
 * @param pageSize - number of items to fetch per page
 * @param className - additional classes
 * @param disabled - disable the combobox
 * @param defaultValue - default value when value is not found
 * @example
 * <InfiniteCombobox
      value={field.value}
      defaultValue={defaultFilter}
      onChange={(value) => handleFilterJenisPerangkat(value)}
      onClear={() => handleFilterJenisPerangkat("")}
      fetchData={(params) => getKodePerangkats({...params, wilayah_id: wilayahId})}
      valueKey="id"
      labelKey="name_perangkat"
      pageSize={10}
      placeholder="Select Perangkat"
      className="md:w-[192px] w-full"
    />
 */
const InfiniteCombobox = <T,>({
  value,
  onChange,
  onClear,
  fetchData,
  valueKey,
  labelKey,
  placeholder = "Select an item...",
  pageSize = 10,
  className,
  disabled,
  defaultValue,
}: InfiniteComboboxProps<T>) => {
  // variables
  const [items, setItems] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMax, setIsMax] = useState<boolean>(false);
  const [backendFiltered, setBackendFiltered] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { ref, inView } = useInView({ threshold: 0.5 });

  // functions
  const loadItems = useCallback(
    async (pageNum: number, isNewSearch = false) => {
      if (loading) return;

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
    [debouncedSearch, fetchData, pageSize, valueKey, loading],
  );

  // lifecycle
  useEffect(() => {
    if (!open) return;
    loadItems(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, debouncedSearch]);

  useEffect(() => {
    if (inView && hasMore && !loading && !isMax) {
      loadItems(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, loading]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setIsMax(false);
    setItems([]);
    setBackendFiltered(debouncedSearch.length > 0);
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${className} ${value ? "pr-8" : ""}`}
          >
            <span className="truncate text-xs md:text-sm text-gray-500 font-normal">
              {value
                ? selectedItem
                  ? String(selectedItem[labelKey])
                  : String(
                      items.find((item) => String(item[valueKey]) === value)?.[
                        labelKey
                      ] || defaultValue,
                    )
                : placeholder}
            </span>
            {!value && <ChevronsUpDown className="opacity-50" />}
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
                    onSelect={() => {
                      onChange(String(item[valueKey]));
                      setSelectedItem(item);
                      setOpen(false);
                    }}
                  >
                    {String(item[labelKey])}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === String(item[valueKey])
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
      {value && onClear && !disabled && (
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

export default InfiniteCombobox;

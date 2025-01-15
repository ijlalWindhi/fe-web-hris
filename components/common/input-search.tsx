"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";

import useDebounce from "@/hooks/use-debounce";

const SearchSchema = z.object({
  src: z.string().optional(),
});

type SearchFormValues = z.infer<typeof SearchSchema>;

interface InputSearchProps {
  onSearch: (searchTerm: string) => void;
  defaultValue?: string;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export default function InputSearch({
  onSearch,
  defaultValue = "",
  placeholder = "Search here...",
  debounceMs = 500,
  className = "text-xs md:text-sm !rounded-full",
}: Readonly<InputSearchProps>) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      src: defaultValue,
    },
  });

  const searchValue = form.watch("src");
  const debouncedSearch = useDebounce(searchValue, debounceMs);

  React.useEffect(() => {
    if (debouncedSearch !== undefined) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  const onSubmit = (values: SearchFormValues) => {
    onSearch(values.src || "");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="src"
          control={form.control}
          render={({ field }) => (
            <Input
              placeholder={placeholder}
              className={className}
              icon={Search}
              iconClassName="text-primary"
              {...field}
            />
          )}
        />
      </form>
    </Form>
  );
}

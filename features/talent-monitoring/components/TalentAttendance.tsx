import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Form } from "@/components/ui/form";
import AttendanceChart from "./AttendanceChart";
import AttendanceHistory from "./AttendanceHistory";
import AttendanceLeave from "./AttendanceLeave";

import { SearchSchema } from "../schemas/talent-monitoring.schema";
import { IParamsSearch } from "@/types";

interface ITalentAttendanceProps {
  talentId: string;
}

export default function TalentAttendance({ talentId }: ITalentAttendanceProps) {
  // variables
  const [sharedDateRange, setSharedDateRange] = useState<{
    start?: Date;
    end?: Date;
  }>({
    start: undefined,
    end: undefined,
  });
  const [params, setParams] = useState<IParamsSearch>({
    talent_id: talentId,
    start_date: undefined,
    end_date: undefined,
  });
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: {
        start: undefined,
        end: undefined,
      },
    },
  });
  const searchValue = form.watch("search");

  // Functions
  const onSubmit = async (data: z.infer<typeof SearchSchema>) => {
    try {
      setParams({
        ...params,
        start_date: data?.search?.start
          ? format(data?.search?.start, "yyyy-MM-dd")
          : undefined,
        end_date: data?.search?.end
          ? format(data?.search?.end, "yyyy-MM-dd")
          : undefined,
      });
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    }
  };

  const handleDateRangeChange = (value: { start?: Date; end?: Date }) => {
    setSharedDateRange(value);
    form.setValue("search", value);
    if (value?.start || value?.end) {
      setParams({
        ...params,
        start_date: value?.start
          ? format(value.start, "yyyy-MM-dd")
          : undefined,
        end_date: value?.end ? format(value.end, "yyyy-MM-dd") : undefined,
      });
    }
  };

  // lifecycle
  useEffect(() => {
    if (searchValue && (searchValue?.start || searchValue?.end)) {
      setSharedDateRange({
        start: searchValue?.start,
        end: searchValue?.end,
      });

      setParams({
        ...params,
        start_date: searchValue?.start
          ? format(searchValue.start, "yyyy-MM-dd")
          : undefined,
        end_date: searchValue?.end
          ? format(searchValue.end, "yyyy-MM-dd")
          : undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3 md:space-y-4">
          <AttendanceChart
            form={form}
            params={params}
            sharedDateRange={sharedDateRange}
            onDateRangeChange={handleDateRangeChange}
          />
          <AttendanceHistory
            form={form}
            params={params}
            sharedDateRange={sharedDateRange}
            onDateRangeChange={handleDateRangeChange}
          />
          <AttendanceLeave
            form={form}
            params={params}
            sharedDateRange={sharedDateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </div>
      </form>
    </Form>
  );
}

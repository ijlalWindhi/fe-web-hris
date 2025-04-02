import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { ITableHeader } from "@/components/ui/table";
import { Table } from "@/components/common/table";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import { DatePickerWithRange } from "@/components/common/input-date-picker-range";
import { InputField } from "@/components/common/input-field";

import { ITimesheetHistoryTalentMonitoring, IParamsSearch } from "@/types";
import { useTimesheet } from "../hooks/useTalentMonitoring";
import { SearchSchema } from "../schemas/talent-monitoring.schema";

const TableHeader: ITableHeader[] = [
  {
    key: "date",
    title: "Date",
    className: "min-w-[14rem]",
  },
  {
    key: "working_hours",
    title: "Working Hours",
    className: "min-w-[8rem]",
  },
  {
    key: "notes",
    title: "Notes",
    className: "min-w-[11rem]",
  },
];

interface ITalentTimesheetProps {
  talentId: string;
}

export default function TalentTimesheet({ talentId }: ITalentTimesheetProps) {
  // variables
  const [params, setParams] = useState<IParamsSearch>({
    talent_id: talentId,
    start_date: undefined,
    end_date: undefined,
  });
  const { data } = useTimesheet(params);
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

  // functions
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

  // lifecycle
  useEffect(() => {
    if (searchValue && (searchValue?.start || searchValue?.end)) {
      console.log("searchValue", searchValue);
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
        <div className="border rounded-xl p-4 space-y-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div className="flex gap-2 items-center">
              <h2 className="md:text-lg font-semibold">Timesheet History</h2>
              <Badge variant={"outline"}>
                <span className="text-primary mr-1">•</span> Total{" "}
                {data?.data?.total_workdays ?? 0} Working Days
              </Badge>
            </div>
            <InputField
              name="search"
              control={form.control}
              render={({ field }) => (
                <DatePickerWithRange
                  name="search"
                  control={form.control}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select date range"
                />
              )}
            />
          </div>
          <Table<ITimesheetHistoryTalentMonitoring>
            header={TableHeader}
            data={data?.data?.timesheet ?? []}
            loading={false}
          ></Table>
        </div>
      </form>
    </Form>
  );
}

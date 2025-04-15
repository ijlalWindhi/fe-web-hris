"use client";
import { useEffect, useState } from "react";
import { useNextCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { id } from "date-fns/locale";

import { Form } from "@/components/ui/form";
import { InputField } from "@/components/common/input-field";
import InputCombobox from "@/components/common/input-combobox";
import DialogAction from "@/components/common/dialog-action";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/common/input-date-picket";

import useTalentMapping from "@/stores/talent-mapping";
import useAuth from "@/stores/auth";
import { useShiftCalender } from "../hooks/useTalentMapping";
import { SearchWorkingArrangementSchema } from "../schemas/talent-mapping.schema";
import { formatDate } from "@/utils/format-date";

export default function ModalDetailWorkingArrangement() {
  // variables
  const {
    modalDetailWorkingArrangement,
    optionsClient,
    optionsOutlet,
    outletId,
    clientId,
    toggleModalDetailWorkingArrangement,
    fetchOptionsOutlet,
    fetchOptionsClient,
  } = useTalentMapping();
  const { profile } = useAuth();
  const form = useForm<z.infer<typeof SearchWorkingArrangementSchema>>({
    resolver: zodResolver(SearchWorkingArrangementSchema),
    defaultValues: {
      client_id: "",
      outlet_id: "",
      start_date: "",
      end_date: "",
    },
  });
  const { data, refetch } = useShiftCalender({
    client_id: form.watch("client_id"),
    outlet_id: form.watch("outlet_id"),
    start_date: form.watch("start_date")
      ? formatDate({
          inputDate: form.watch("start_date"),
          formatFrom: "dd MMMM yyyy",
          formatTo: "yyyy-MM-dd",
        })
      : "",
    end_date: form.watch("end_date")
      ? formatDate({
          inputDate: form.watch("end_date"),
          formatFrom: "dd MMMM yyyy",
          formatTo: "yyyy-MM-dd",
        })
      : "",
  });
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [],
    plugins: [eventsService, createEventModalPlugin()],
    callbacks: {
      onRender: () => {
        eventsService.getAll();
      },
    },
  });

  // functions
  const handleClientChange = async (value: string) => {
    await fetchOptionsOutlet(value);
    form.setValue("outlet_id", "");
  };

  const onSubmit = async (
    _: z.infer<typeof SearchWorkingArrangementSchema>,
  ) => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error onSubmit: ", error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (modalDetailWorkingArrangement) {
      fetchOptionsClient();
      form.setValue("client_id", clientId?.toString());
      form.setValue("outlet_id", outletId?.toString());
      form.setValue(
        "start_date",
        format(startOfMonth(new Date()), "dd MMMM yyyy", {
          locale: id,
        }),
      );
      form.setValue(
        "end_date",
        format(endOfMonth(new Date()), "dd MMMM yyyy", { locale: id }),
      );
      if (clientId) {
        fetchOptionsOutlet(clientId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalDetailWorkingArrangement]);

  useEffect(() => {
    if (data?.data) {
      const mapped = data.data.map((item) => {
        const start =
          item.time_start && !isNaN(Date.parse(item.time_start))
            ? item.time_start
            : "2000-01-01 00:00";

        const end =
          item.time_end && !isNaN(Date.parse(item.time_end))
            ? item.time_end
            : "2000-01-01 00:00";

        return {
          id: item.id.toString(),
          title: item.emp_name ?? "No Name",
          start,
          end,
        };
      });
      eventsService.set(mapped);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(
    () => {
      const client_id = form.watch("client_id");
      const outlet_id = form.watch("outlet_id");
      const start_date = form.watch("start_date");
      const end_date = form.watch("end_date");

      if (client_id && outlet_id && start_date && end_date) {
        refetch();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      form.watch("client_id"),
      form.watch("outlet_id"),
      form.watch("start_date"),
      form.watch("end_date"),
    ],
  );

  return (
    <DialogAction
      isOpen={modalDetailWorkingArrangement}
      onClose={() => toggleModalDetailWorkingArrangement(false)}
      title={"Detail Shift Schedule"}
      className="max-w-full md:max-w-7xl"
    >
      <div className="space-y-2 max-h-[75vh] overflow-y-auto mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-end gap-2"
          >
            <InputField
              name="client_id"
              label="Client Name"
              primary
              control={form.control}
              render={({ field }) => (
                <InputCombobox
                  field={field}
                  options={
                    optionsClient?.map((item) => ({
                      label: item.name,
                      value: item.id?.toString() ?? "",
                    })) || []
                  }
                  placeholder="Select client name"
                  onChange={(value) => handleClientChange(value)}
                  disabled={profile?.role?.id === 2}
                />
              )}
            />
            <InputField
              name="outlet_id"
              label="Outlet Name"
              primary
              control={form.control}
              render={({ field }) => (
                <InputCombobox
                  field={field}
                  options={
                    optionsOutlet?.map((item) => ({
                      label: item.name,
                      value: item.id?.toString() ?? "",
                    })) || []
                  }
                  placeholder="Select outlet"
                  disabled={form.watch("client_id") === ""}
                />
              )}
            />
            <InputField
              name="start_date"
              label="Start Date"
              primary
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Choose Start Date"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <InputField
              name="end_date"
              label="End Date"
              primary
              control={form.control}
              render={({ field }) => (
                <DatePicker
                  placeholder="Choose End Date"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <Button type="submit">Search</Button>
          </form>
        </Form>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </DialogAction>
  );
}

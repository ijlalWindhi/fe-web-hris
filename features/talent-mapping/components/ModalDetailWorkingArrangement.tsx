"use client";
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

import DialogAction from "@/components/common/dialog-action";

import useTalentMapping from "@/stores/talent-mapping";
import { useState } from "react";

export default function ModalDetailWorkingArrangement() {
  // variables
  const { modalDetailWorkingArrangement, toggleModalDetailWorkingArrangement } =
    useTalentMapping();
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2023-12-16",
        end: "2023-12-16",
      },
      {
        id: "2",
        title: "Agnes Putri",
        start: "2023-11-29 08:00",
        end: "2023-11-29 17:00",
      },
    ],
    plugins: [eventsService, createEventModalPlugin()],
    callbacks: {
      onRender: () => {
        // get all events
        eventsService.getAll();
      },
    },
  });

  return (
    <DialogAction
      isOpen={modalDetailWorkingArrangement}
      onClose={() => toggleModalDetailWorkingArrangement(false)}
      title={"Detail Shift Schedule"}
      className="max-w-full md:max-w-7xl"
    >
      <div className="space-y-2 max-h-[75vh] overflow-y-auto mt-6">
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </DialogAction>
  );
}

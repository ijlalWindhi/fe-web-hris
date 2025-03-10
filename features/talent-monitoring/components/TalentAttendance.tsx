import React from "react";

import AttendanceChart from "./AttendanceChart";
import AttendanceHistory from "./AttendanceHistory";
import AttendanceLeave from "./AttendanceLeave";

export default function TalentAttendance() {
  return (
    <div className="space-y-3 md:space-y-4">
      <AttendanceChart />
      <AttendanceHistory />
      <AttendanceLeave />
    </div>
  );
}

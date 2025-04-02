import React from "react";

import AttendanceChart from "./AttendanceChart";
import AttendanceHistory from "./AttendanceHistory";
import AttendanceLeave from "./AttendanceLeave";

interface ITalentAttendanceProps {
  talentId: string;
}

export default function TalentAttendance({ talentId }: ITalentAttendanceProps) {
  return (
    <div className="space-y-3 md:space-y-4">
      <AttendanceChart talentId={talentId} />
      <AttendanceHistory talentId={talentId} />
      <AttendanceLeave talentId={talentId} />
    </div>
  );
}

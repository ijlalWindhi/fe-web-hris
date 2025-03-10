import React from "react";

const shifts = [
  { shiftId: "S001", day: "Monday", time: "08:00 - 15:00" },
  { shiftId: "S002", day: "Tuesday", time: "08:00 - 15:00" },
  { shiftId: "S003", day: "Wednesday", time: "08:00 - 15:00" },
  { shiftId: "S004", day: "Thursday", time: "08:00 - 15:00" },
  { shiftId: "S005", day: "Friday", time: "08:00 - 15:00" },
];

export default function TalentMapping() {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="md:text-lg font-semibold">Client Identification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Client ID</p>
              <p className="font-medium">-</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Client Address</p>
              <p className="font-medium">-</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Outlet Address</p>
              <p className="font-medium">-</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Client Name</p>
              <p className="font-medium">-</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Outlet Mapping</p>
              <p className="font-medium">-</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Outlet Latitude-Longitude
              </p>
              <p className="font-medium">-</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-4 space-y-2">
        <h2 className="md:text-lg font-semibold">Working Arrangement</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">
                  Workdays
                </th>
                <th className="text-left py-2 font-medium text-muted-foreground">
                  5
                </th>
                <th className="text-left py-2 font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => (
                <tr key={shift.shiftId} className="border-b border-gray-100">
                  <td className="py-3 pr-4">Shift ID</td>
                  <td className="py-3 pr-4 font-medium">{shift.shiftId}</td>
                  <td className="py-3">
                    <span className="mr-6">{shift.day}</span> {shift.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

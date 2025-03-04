import React from "react";
import DataRow from "./DataRowDetail";

export default function PersonalInformationDetail() {
  return (
    <dl className="divide-y">
      <DataRow label="Talent ID" value={"-"} />
      <DataRow label="Talent Name" value={"-"} />
      <DataRow label="Date of Birth" value={"-"} />
      <DataRow label="ID Number" value={"-"} />
      <DataRow label="Email Address" value={"-"} />
      <DataRow label="Number Phone" value={"-"} />
      <DataRow label="Address" value={"-"} />
      <DataRow label="Selfie Photo" value={null} />
    </dl>
  );
}

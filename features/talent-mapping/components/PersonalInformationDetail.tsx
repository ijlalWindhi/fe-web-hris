import React from "react";
import { format, parse } from "date-fns";

import DataRow from "./DataRowDetail";

import { useViewTalentMapping } from "../hooks/useTalentMapping";
import useTalentMapping from "@/stores/talent-mapping";

export default function PersonalInformationDetail() {
  // variables
  const { selectedData } = useTalentMapping();
  const { data } = useViewTalentMapping(selectedData?.talend_id ?? "");

  return (
    <dl className="divide-y">
      <DataRow label="TAD ID" value={data?.data?.personal?.talent_id ?? "-"} />
      <DataRow label="TAD Name" value={data?.data?.personal?.name ?? "-"} />
      <DataRow
        label="Date of Birth"
        value={
          data?.data?.personal?.dob
            ? format(
                parse(data.data.personal.dob, "dd-MM-yyyy", new Date()),
                "dd MMMM yyyy",
              )
            : "-"
        }
      />
      <DataRow label="ID Number" value={data?.data?.personal?.nik ?? "-"} />
      <DataRow
        label="Email Address"
        value={data?.data?.personal?.email ?? "-"}
      />
      <DataRow
        label="Number Phone"
        value={data?.data?.personal?.phone ?? "-"}
      />
      <DataRow label="Address" value={data?.data?.personal?.address ?? "-"} />
      <DataRow
        label="Selfie Photo"
        value={
          data?.data?.personal?.photo || "/images/unavailable-profile.webp"
        }
      />
    </dl>
  );
}

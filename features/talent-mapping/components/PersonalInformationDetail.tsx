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
      <DataRow label="ID TAD" value={data?.data?.personal?.talent_id ?? "-"} />
      <DataRow label="Nama TAD" value={data?.data?.personal?.name ?? "-"} />
      <DataRow
        label="Tanggal Lahir"
        value={
          data?.data?.personal?.dob
            ? format(
                parse(data.data.personal.dob, "dd-MM-yyyy", new Date()),
                "dd MMMM yyyy",
              )
            : "-"
        }
      />
      <DataRow label="NIK" value={data?.data?.personal?.nik ?? "-"} />
      <DataRow label="Email" value={data?.data?.personal?.email ?? "-"} />
      <DataRow label="No. Telepon" value={data?.data?.personal?.phone ?? "-"} />
      <DataRow label="Alamat" value={data?.data?.personal?.address ?? "-"} />
      <DataRow
        label="Swafoto"
        value={
          data?.data?.personal?.photo || "/images/unavailable-profile.webp"
        }
      />
    </dl>
  );
}

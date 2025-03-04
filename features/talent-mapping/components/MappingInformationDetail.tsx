import React from "react";
import { CircleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import DataRow from "./DataRowDetail";

import useTalentMapping from "@/stores/talent-mapping";

export default function MappingInformationDetail() {
  // variables
  const { toggleModalHistoryContract, toggleModalDetailTalentMapping } =
    useTalentMapping();

  return (
    <dl className="">
      <h2 className="font-medium text-sm md:text-base">
        Client Identification
      </h2>
      <DataRow label="Client ID" value={"-"} />
      <DataRow label="Client Name" value={"-"} />
      <DataRow label="Client Address" value={"-"} />
      <DataRow label="Outlet Mapping" value={"-"} />
      <DataRow label="Outlet Address" value={"-"} />
      <DataRow label="Outlet Latitude" value={"-"} />
      <DataRow label="Outlet Longitude" value={"-"} />

      <h2 className="font-medium text-sm md:text-base mt-4">
        Working Arrangement
      </h2>
      <DataRow label="Workdays" value={"-"} />
      <DataRow label="Shift ID" value={"-"} />
      <DataRow label="Set Time" value={"-"} />

      <h2 className="font-medium text-sm md:text-base mt-4">
        Contract Management
      </h2>
      <DataRow label="Contract Date" value={"-"} />
      <DataRow label="Contract Statement" value={"-"} />
      <Badge
        variant={"outline"}
        className="my-4 text-sm cursor-pointer"
        onClick={() => {
          toggleModalHistoryContract(true);
          toggleModalDetailTalentMapping(false);
        }}
      >
        <CircleAlert size={16} className="mr-2 text-primary" />
        History Contract
      </Badge>
    </dl>
  );
}

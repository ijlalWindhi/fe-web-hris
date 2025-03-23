import React from "react";
import { CircleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import DataRow from "./DataRowDetail";

import useTalentMapping from "@/stores/talent-mapping";
import { useViewTalentMapping } from "../hooks/useTalentMapping";
import { truncateText } from "@/utils/truncate";

export default function MappingInformationDetail() {
  // variables
  const {
    selectedData,
    toggleModalHistoryContract,
    toggleModalDetailTalentMapping,
  } = useTalentMapping();
  const { data } = useViewTalentMapping(selectedData?.talend_id ?? "");

  return (
    <dl className="">
      <h2 className="font-medium text-sm md:text-base">
        Client Identification
      </h2>
      <DataRow
        label="Client ID"
        value={data?.data?.mapping?.client_id ?? "-"}
      />
      <DataRow
        label="Client Name"
        value={data?.data?.mapping?.client_name ?? "-"}
      />
      <DataRow
        label="Client Address"
        value={data?.data?.mapping?.client_address ?? "-"}
      />
      <DataRow
        label="Outlet Mapping"
        value={data?.data?.mapping?.outlet_name ?? "-"}
      />
      <DataRow
        label="Outlet Address"
        value={data?.data?.mapping?.outlet_address ?? "-"}
      />
      <DataRow
        label="Outlet Latitude"
        value={data?.data?.mapping?.outlet_latitude?.toString() ?? "-"}
      />
      <DataRow
        label="Outlet Longitude"
        value={data?.data?.mapping?.outlet_longitude?.toString() ?? "-"}
      />

      <h2 className="font-medium text-sm md:text-base mt-4">
        Working Arrangement
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-medium text-muted-foreground">
                Workdays
              </th>
              <th className="text-left py-2 font-medium text-muted-foreground">
                {data?.data?.mapping?.workdays ?? 0}
              </th>
              <th className="text-left py-2 font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.mapping?.workarg?.map((shift) => (
              <tr key={shift.shift_id} className="border-b border-gray-100">
                <td className="py-3 pr-4">Shift ID</td>
                <td className="py-3 pr-4 font-medium">{shift.shift_id}</td>
                <td className="py-3">
                  <span className="mr-6">{shift.day}</span> {shift.start_time}-
                  {shift.end_time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <DataRow
        label="Workdays"
        value={data?.data?.mapping?.workdays?.toString() ?? "-"}
      /> */}

      <h2 className="font-medium text-sm md:text-base mt-4">
        Contract Management
      </h2>
      <DataRow
        label="Contract Date"
        value={`${data?.data?.mapping?.contract?.start_date ?? "-"} - ${data?.data?.mapping?.contract?.end_date ?? "-"}`}
      />
      <DataRow
        label="Contract Statement"
        value={
          truncateText(data?.data?.mapping?.contract?.file ?? "-", 20) ?? "-"
        }
      />
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

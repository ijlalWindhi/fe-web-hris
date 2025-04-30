import React from "react";
import Image from "next/image";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import useTalentMapping from "@/stores/talent-mapping";
import {
  useViewTalentMapping,
  useDeleteTalentMapping,
} from "../hooks/useTalentMapping";
import { hasPermission } from "@/utils/get-permission";

export default function HeaderDetailTalent() {
  // variables
  const { setModalDelete, setModalSuccess } = useTheme();
  const { selectedData, toggleModalDetailTalentMapping } = useTalentMapping();
  const { data } = useViewTalentMapping(selectedData?.talend_id ?? "");
  const deleteTalentMapping = useDeleteTalentMapping();

  // functions
  const handleDelete = () => {
    try {
      setModalDelete({
        open: true,
        type: "TAD",
        action: async () => {
          const res = await deleteTalentMapping.mutateAsync(
            selectedData?.talend_id ?? "",
          );
          if (res.status === "success") {
            setModalSuccess({
              open: true,
              title: "Data Deleted Successfully!",
              message: "The TAD data has been removed from the system.",
              actionMessage: "Back",
              actionVariant: "outline",
              animation: "success",
              action: () => {
                toggleModalDetailTalentMapping(false);
              },
            });
          }
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  return (
    <div className="w-full h-fit relative">
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          <Image
            src={
              data?.data?.personal?.photo || "/images/unavailable-profile.webp"
            }
            alt="avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-center">
          <h1 className="md:text-lg font-semibold">
            {data?.data?.personal?.name ?? "-"}
          </h1>
          <p className="text-sm text-gray-500">
            {data?.data?.personal?.role_name}
          </p>
        </div>
      </div>
      <div className="flex gap-1 absolute top-0 right-0">
        {hasPermission("Talent Mapping", "delete") && (
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleDelete}
          >
            <Trash className="h-5 w-5 text-red-500" />
          </Button>
        )}
      </div>
    </div>
  );
}

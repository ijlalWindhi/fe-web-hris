import React from "react";
import Image from "next/image";
import { Download, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import useTheme from "@/stores/theme";
import useTalentMapping from "@/stores/talent-mapping";
import {
  useViewTalentMapping,
  useDeleteTalentMapping,
} from "../hooks/useTalentMapping";

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
        type: "talent",
        action: () => {
          deleteTalentMapping.mutate(selectedData?.talend_id ?? "");
          toggleModalDetailTalentMapping(false);
        },
      });
    } catch (error) {
      console.error("Error from handleDelete: ", error);
    }
  };

  const handleDownload = () => {
    try {
      setModalSuccess({
        open: true,
        title: "Download Successful!",
        message:
          "The talent data has been downloaded successfully. You can now review it on your device.",
        actionMessage: "Close",
        actionVariant: "outline",
        animation: "success",
        action: () => {
          console.log("Download talent with ID: ", selectedData);
          toggleModalDetailTalentMapping(false);
        },
      });
    } catch (error) {
      console.error("Error from handleDownload: ", error);
    }
  };
  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="relative h-16 w-16 rounded-full overflow-hidden">
          <Image
            src={
              data?.data?.personal?.face_id ||
              "/images/unavailable-profile.webp"
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
          <p className="text-sm text-gray-500">Software Engineer</p>
        </div>
      </div>
      <div className="flex gap-1 absolute top-0 right-0">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleDownload}
        >
          <Download className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={handleDelete}
        >
          <Trash className="h-5 w-5 text-red-500" />
        </Button>
      </div>
    </div>
  );
}

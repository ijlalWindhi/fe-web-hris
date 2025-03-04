import React from "react";
import dynamic from "next/dynamic";
import { Pencil } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import HeaderDetailTalent from "./HeaderDetail";
const PersonalInformationDetail = dynamic(
  () => import("./PersonalInformationDetail"),
);
const MappingInformationDetail = dynamic(
  () => import("./MappingInformationDetail"),
);

import useTalentMapping from "@/stores/talent-mapping";

export default function DetailTalent() {
  // variables
  const {
    modalDetailTalentMapping,
    toggleModalDetailTalentMapping,
    toggleModalTalentMapping,
  } = useTalentMapping();

  return (
    <Sheet
      open={modalDetailTalentMapping}
      onOpenChange={() => toggleModalDetailTalentMapping(false)}
    >
      <SheetContent className="!min-w-[100vw] md:!min-w-[60vw] lg:!min-w-[40vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>View Talent</SheetTitle>
          <HeaderDetailTalent />
        </SheetHeader>
        <Tabs defaultValue="personal_information" className="min-w-full mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="personal_information">
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="mapping_information">
              Mapping Information
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal_information">
            <PersonalInformationDetail />
          </TabsContent>
          <TabsContent value="mapping_information">
            <MappingInformationDetail />
          </TabsContent>
        </Tabs>
        <SheetFooter>
          <Button
            className="w-full"
            type="submit"
            onClick={() => {
              toggleModalTalentMapping(true);
              toggleModalDetailTalentMapping(false);
            }}
          >
            <Pencil size={16} className="mr-2" /> Edit Data
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

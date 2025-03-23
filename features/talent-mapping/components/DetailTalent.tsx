"use client";
import React, { useEffect } from "react";
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
import PersonalInformationDetail from "./PersonalInformationDetail";
import MappingInformationDetail from "./MappingInformationDetail";

import useTalentMapping from "@/stores/talent-mapping";
import { useViewTalentMapping } from "../hooks/useTalentMapping";

export default function DetailTalent() {
  // variables
  const {
    modalDetailTalentMapping,
    selectedData,
    toggleModalDetailTalentMapping,
    toggleModalTalentMapping,
  } = useTalentMapping();
  const { refetch } = useViewTalentMapping(selectedData?.talend_id ?? "");

  useEffect(() => {
    if (selectedData?.talend_id) {
      refetch();
    }
  }, [selectedData, refetch]);

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

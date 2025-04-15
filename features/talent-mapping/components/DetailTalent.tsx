"use client";
import React, { useEffect } from "react";
import { Pencil } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SheetAction from "@/components/common/sheet-action";
import HeaderDetailTalent from "./HeaderDetail";
import PersonalInformationDetail from "./PersonalInformationDetail";
import MappingInformationDetail from "./MappingInformationDetail";
import WorkingArrangementDetail from "./WorkingArrangementDetail";

import useTalentMapping from "@/stores/talent-mapping";
import useAuth from "@/stores/auth";
import { useViewTalentMapping } from "../hooks/useTalentMapping";
import { hasPermission } from "@/utils/get-permission";

export default function DetailTalent() {
  // variables
  const {
    modalDetailTalentMapping,
    selectedData,
    toggleModalDetailTalentMapping,
    toggleModalTalentMapping,
  } = useTalentMapping();
  const { profile } = useAuth();
  const { refetch } = useViewTalentMapping(selectedData?.talend_id ?? "");

  useEffect(() => {
    if (selectedData?.talend_id) {
      refetch();
    }
  }, [selectedData, refetch]);

  const footerButtons = hasPermission("Talent Mapping", "edit") ? (
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
  ) : null;

  return (
    <SheetAction
      isOpen={modalDetailTalentMapping}
      onClose={() => toggleModalDetailTalentMapping(false)}
      title="View TAD"
      position="right"
      className="!min-w-[100vw] md:!min-w-[60vw] lg:!min-w-[40vw] !overflow-y-auto"
      showFooter={true}
      footerContent={footerButtons}
    >
      <HeaderDetailTalent />
      <Tabs defaultValue="personal_information" className="min-w-full mt-2">
        <TabsList className="w-full">
          <TabsTrigger value="personal_information">
            Personal Information
          </TabsTrigger>
          <TabsTrigger value="mapping_information">
            Mapping Information
          </TabsTrigger>
          {profile?.role?.id === 2 && (
            <TabsTrigger value="working_arrangement">
              Working Arrangement
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="personal_information">
          <PersonalInformationDetail />
        </TabsContent>
        <TabsContent value="mapping_information">
          <MappingInformationDetail />
        </TabsContent>
        <TabsContent value="working_arrangement">
          <WorkingArrangementDetail />
        </TabsContent>
      </Tabs>
    </SheetAction>
  );
}

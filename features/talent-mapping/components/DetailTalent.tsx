import React from "react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import useTalentMapping from "@/stores/talent-mapping";

export default function DetailTalent() {
  // variables
  const { modalDetailTalentMapping, toggleModalDetailTalentMapping } =
    useTalentMapping();
  return (
    <Sheet
      open={modalDetailTalentMapping}
      onOpenChange={() => {
        console.log("MASUK PAK LEK");
        toggleModalDetailTalentMapping(false);
      }}
    >
      <SheetContent className="!min-w-[100vw] md:!min-w-[60vw] lg:!min-w-[40vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detail Ticket</SheetTitle>
        </SheetHeader>
      </SheetContent>
      <SheetFooter></SheetFooter>
    </Sheet>
  );
}

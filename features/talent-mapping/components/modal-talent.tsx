import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import useTalentMapping from "@/stores/talent-mapping";

export default function ModalTalent() {
  // variables
  const {
    modalTalentMapping,
    selectedId,
    toggleModalTalentMapping,
    setSelectedId,
  } = useTalentMapping();

  // functions
  const handleClose = () => {
    setSelectedId(null);
    toggleModalTalentMapping(false);
  };
  return (
    <Dialog open={modalTalentMapping} onOpenChange={() => handleClose()}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="modal-update-sla"
      >
        <DialogHeader>
          <DialogTitle>{selectedId ? "Edit" : "Register"} Talent</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4"></div>
      </DialogContent>
    </Dialog>
  );
}

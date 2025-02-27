import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import InputProfile from "@/components/common/input-profile";

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
      <DialogContent className="sm:max-w-2xl" aria-describedby="modal-talent">
        <DialogHeader>
          <DialogTitle>{selectedId ? "Edit" : "Register"} Talent</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="grid gap-4">
          <InputProfile
            width="w-20"
            height="h-20"
            onFileChange={(file) => console.log(file)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import Lottie from "@/components/common/lottie";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import useTalentMonitoring from "@/stores/talent-monitoring";
import useTheme from "@/stores/theme";
import warningAnimation from "@/public/animations/warning.json";
import { useRejectLeave, useAttendance } from "../hooks/useTalentMonitoring";
import { IParamsSearch } from "@/types";

interface IRejectLeaveProps {
  params: IParamsSearch;
}

export default function ModalRejectLeave({
  params,
}: Readonly<IRejectLeaveProps>) {
  // variables
  const {
    selectedLeave,
    modalRejectLeave,
    toggleModalRejectLeave,
    setSelectedLeave,
  } = useTalentMonitoring();
  const { setModalSuccess } = useTheme();
  const rejectLeave = useRejectLeave();
  const { refetch } = useAttendance(params);

  // functions
  const handleClose = () => {
    toggleModalRejectLeave(false);
    setSelectedLeave(null);
  };

  const handleAction = async () => {
    try {
      const res = await rejectLeave.mutateAsync(
        selectedLeave?.leave_id?.toString() || "",
      );
      if (res.status === "success") {
        setModalSuccess({
          open: true,
          title: "Leave Request Rejectd",
          message: "The leave request has been successfully rejected.",
          actionVariant: "default",
          actionMessage: "Back",
          action: () => {
            handleClose();
            refetch();
          },
          animation: "success",
        });
      }
    } catch (error) {
      console.error("Error from handleAction: ", error);
    }
  };

  return (
    <Dialog open={modalRejectLeave} onOpenChange={() => handleAction}>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center gap-4">
        <Lottie animation={warningAnimation} height={180} width={180} />
        <div className="flex flex-col gap-1">
          <DialogTitle className="font-semibold text-center">
            Reject Leave Request
          </DialogTitle>
          <p className="text-xs text-center text-gray-400">
            Are you sure you want to reject this leave request? This action
            cannot be undone.
          </p>
        </div>
        <div className="flex w-full justify-between gap-3">
          <Button
            onClick={handleClose}
            className="w-full text-black"
            variant="outline"
            loading={rejectLeave.isPending}
          >
            Back
          </Button>
          <Button
            onClick={handleAction}
            className="w-full"
            loading={rejectLeave.isPending}
            variant="destructive"
          >
            Reject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

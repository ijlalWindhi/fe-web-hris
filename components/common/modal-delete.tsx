"use client";
import Lottie from "./lottie";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import useTheme from "@/stores/theme";
import warningAnimation from "@/public/animations/warning.json";

export default function ModalDelete() {
  // variables
  const { modalDelete, setModalDelete } = useTheme();

  // functions
  const handleAction = () => {
    if (modalDelete.action) {
      modalDelete.action();
    }
    setModalDelete({
      open: false,
      type: "",
      action: () => {},
    });
  };

  return (
    <Dialog open={modalDelete.open} onOpenChange={() => handleAction}>
      <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center gap-4">
        <Lottie animation={warningAnimation} height={180} width={180} />
        <div className="flex flex-col gap-1">
          <DialogTitle className="font-semibold text-center">
            Konfirmasi Penghapusan
          </DialogTitle>
          <p className="text-xs text-center text-gray-400">
            Apakah Anda yakin ingin menghapus data {modalDelete.type} ini?
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div className="flex w-full justify-between gap-3">
          <Button
            onClick={() =>
              setModalDelete({
                open: false,
                type: "",
                action: () => {},
              })
            }
            className="w-full text-black"
            variant="outline"
          >
            Batalkan
          </Button>
          <Button
            onClick={() => handleAction()}
            className="w-full"
            variant={"destructive"}
          >
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

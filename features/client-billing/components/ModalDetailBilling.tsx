"use client";
import DialogAction from "@/components/common/dialog-action";

import useClientBilling from "@/stores/client-billing";

export default function ModalDetailBilling() {
  // variables
  const {
    modalDetailBilling,
    selectedData,
    toggleModalDetailBilling,
    toggleModalDetailClientBilling,
    setSelectedData,
  } = useClientBilling();

  // functions
  const handleClose = () => {
    try {
      toggleModalDetailBilling(false);
      toggleModalDetailClientBilling(true);
      setSelectedData(selectedData);
    } catch (error) {
      console.error("Error from handleClose: ", error);
    }
  };

  return (
    <DialogAction
      isOpen={modalDetailBilling}
      onClose={() => handleClose()}
      title={"Detail Billing"}
      className="max-w-full md:max-w-3xl"
    >
      <div className="space-y-2 mt-6">
        <div className="space-y-1 text-center">
          <h2 className="text-xs md:text-sm">
            Laporan Pengeluaran Biaya Program Gea RSA Cabang Bandung
          </h2>
          <h3 className="text-sm md:text-base font-semibold">PT. ABC</h3>
          <p className="text-xs md:text-sm">
            Periode: 16-11-2024 s/d 01-01-2025
          </p>
        </div>

        <div className="pt-6">
          <div className="grid grid-cols-4 text-sm px-3 font-medium border-b pb-2">
            <div>Keterangan</div>
            <div className="text-right">Rp.</div>
            <div className="text-right">Nominal</div>
            <div className="text-right">Jumlah</div>
          </div>

          <div className="grid grid-cols-4 text-sm px-3 py-3 border-b">
            <div>Biaya Operasional</div>
            <div className="text-right">Rp.</div>
            <div className="text-right">9,280,684</div>
            <div className="text-right"></div>
          </div>

          <div className="grid grid-cols-4 text-sm px-3 py-3 bg-blue-50 border-b">
            <div>Jumlah Biaya Operasional</div>
            <div className="text-right">Rp.</div>
            <div className="text-right"></div>
            <div className="text-right">9,280,684</div>
          </div>

          <div className="grid grid-cols-4 text-sm px-3 py-3 border-b">
            <div>Agency 6%</div>
            <div className="text-right">Rp.</div>
            <div className="text-right">505,117</div>
            <div className="text-right"></div>
          </div>

          <div className="grid grid-cols-4 text-sm px-3 py-3 bg-blue-50 border-b">
            <div>Jumlah Biaya</div>
            <div className="text-right">Rp.</div>
            <div className="text-right"></div>
            <div className="text-right">9,785,802</div>
          </div>

          <div className="grid grid-cols-4 text-sm px-3 py-3 border-b">
            <div>PPN 1%</div>
            <div className="text-right">Rp.</div>
            <div className="text-right">55,563</div>
            <div className="text-right"></div>
          </div>

          <div className="grid grid-cols-4 text-sm px-3 py-3 border-b">
            <div>PPN 2%</div>
            <div className="text-right">Rp.</div>
            <div className="text-right">(10,102)</div>
            <div className="text-right"></div>
          </div>

          <div className="grid grid-cols-4 text-sm px-3 py-3 bg-blue-50">
            <div>Grand Total Biaya</div>
            <div className="text-right">Rp.</div>
            <div className="text-right"></div>
            <div className="text-right">9,831,262</div>
          </div>
        </div>
      </div>
    </DialogAction>
  );
}

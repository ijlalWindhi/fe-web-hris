"use client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

import DialogAction from "@/components/common/dialog-action";

import useHistoryPayment from "@/stores/history-payment";
import { useDetailHistoryPayment } from "../hooks/useHistoryPayment";
import { cn } from "@/utils/utils";

const formatRupiah = (angka: number) => {
  if (angka === null || angka === undefined) return "";

  const stringAngka = angka?.toString();
  const split = stringAngka?.split(".");
  const depan = split?.[0];
  let belakang = split?.length > 1 ? split[1] : "";

  if (belakang?.length > 2) {
    belakang = belakang?.substring(0, 2);
  } else if (belakang?.length === 1) {
    belakang = belakang + "0";
  } else if (belakang?.length === 0 && split?.length > 1) {
    belakang = "00";
  }

  const reverseDepan = depan?.toString()?.split("")?.reverse()?.join("");
  const ribuan = reverseDepan?.match(/\d{1,3}/g);
  const hasilRibuan = ribuan?.join(".")?.split("")?.reverse()?.join("");

  return belakang ? `${hasilRibuan},${belakang}` : hasilRibuan;
};

export default function ModalDetailBilling() {
  // variables
  const {
    modalDetailHistoryPayment,
    selectedData,
    toggleModalDetailHistoryPayment,
    setSelectedData,
  } = useHistoryPayment();
  const { data, refetch, isLoading } = useDetailHistoryPayment(
    selectedData?.id ?? "",
  );

  // functions
  const handleClose = () => {
    try {
      toggleModalDetailHistoryPayment(false);
      setSelectedData(selectedData);
    } catch (error) {
      console.error("Error from handleClose: ", error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (selectedData?.id) {
      refetch();
    }
  }, [selectedData, refetch]);

  return (
    <DialogAction
      isOpen={modalDetailHistoryPayment}
      onClose={() => handleClose()}
      title={"Detail Billing"}
      className="max-w-full md:max-w-3xl"
    >
      <div className="space-y-2 mt-6">
        <div className="space-y-1 text-center">
          <h2 className="text-xs md:text-sm">{data?.data?.title ?? "-"}</h2>
          <h3 className="text-sm md:text-base font-semibold">
            {data?.data?.client_name ?? "-"}
          </h3>
          <p className="text-xs md:text-sm">
            Periode: {data?.data?.start_period ?? "-"} s/d{" "}
            {data?.data?.end_period ?? "-"}
          </p>
        </div>

        <div className="pt-6 max-h-[50vh] overflow-y-auto">
          <div className="grid grid-cols-4 text-sm px-3 font-medium border-b pb-2">
            <div>Keterangan</div>
            <div className="text-right">Rp.</div>
            <div className="text-right">Nominal</div>
            <div className="text-right">Jumlah</div>
          </div>
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            data?.data?.detail.map((item, index) => (
              <div
                key={index}
                className={cn("grid grid-cols-4 text-sm px-3 py-3 border-b", {
                  "bg-blue-50": item?.jumlah > 0,
                })}
              >
                <div>{item.keterangan}</div>
                <div className="text-right">Rp.</div>
                <div className="text-right">
                  {item?.nominal !== null ? formatRupiah(item.nominal) : ""}
                </div>
                <div className="text-right">
                  {item?.jumlah !== null ? formatRupiah(item.jumlah) : ""}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DialogAction>
  );
}

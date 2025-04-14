"use client";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

import DialogAction from "@/components/common/dialog-action";

import useRoleManagement from "@/stores/role-management";
import {
  usePermissionDetail,
  useUpdatePermission,
} from "../hooks/useRoleManagement";
import { Switch } from "@/components/ui/switch";

export default function ModalPermission() {
  // variables
  const { selectedData, modalRole, toggleModalRole, setSelectedData } =
    useRoleManagement();
  const { data, refetch, isLoading } = usePermissionDetail(
    selectedData?.id?.toString() ?? "0",
  );
  const updatePermission = useUpdatePermission();

  // functions
  const handleClose = () => {
    try {
      toggleModalRole(false);
      setSelectedData(selectedData);
    } catch (error) {
      console.error("Error from handleClose: ", error);
    }
  };

  const togglePermission = async (id: string) => {
    try {
      await updatePermission.mutateAsync(id);
    } catch (error) {
      console.error("Error from togglePermission: ", error);
    }
  };

  // lifecycle
  useEffect(() => {
    if (selectedData?.id) {
      refetch();
    }
  }, [selectedData?.id, refetch]);

  return (
    <DialogAction
      isOpen={modalRole}
      onClose={() => handleClose()}
      title={"Edit Role"}
      className="max-w-full md:max-w-5xl"
    >
      <div className="max-h-[50vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center w-full min-h-[20vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          data?.data?.map((permission) => (
            <div
              key={permission.name}
              className="grid grid-cols-5 gap-4 py-4 border-b items-center"
            >
              <div className="font-medium text-sm">{permission.name}</div>

              {permission?.permissions?.map((perm) => {
                return (
                  <div className="flex items-center gap-2 " key={perm.name}>
                    <Switch
                      id={perm?.id?.toString()}
                      checked={perm?.isact}
                      onCheckedChange={() =>
                        togglePermission(perm?.id?.toString())
                      }
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <span className="text-sm">{perm.name}</span>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </DialogAction>
  );
}

import React from "react";
import Lottie from "@/components/common/lottie";

import EmptyAnimation from "@/public/animations/empty.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function OutletEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 my-2">
      <Lottie animation={EmptyAnimation} height={150} width={150} />
      <p className="text-sm md:text-base">Oops! No Outlets Found</p>
      <p className="text-xs text-gray-400">
        It looks like there are no outlets available. Start adding one now to
        get started.
      </p>
      <Button className="w-fit" variant={"default-outline"} size="sm">
        <Plus size={16} />
        Add Outlet
      </Button>
    </div>
  );
}

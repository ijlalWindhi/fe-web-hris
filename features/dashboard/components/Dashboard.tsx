import React from "react";

import Summary from "./Summary";
import ClientBilling from "./ClientBilling";
import Talent from "./Talent";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch w-full h-full">
      <Summary />
      <div className="flex flex-col gap-4 lg:w-2/6">
        <Talent />
        <ClientBilling />
      </div>
    </div>
  );
}

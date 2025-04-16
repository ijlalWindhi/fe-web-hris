import React from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ICardReminderProps {
  client: string;
  date: string;
  status: string;
}

function CardReminder({ client, date, status }: Readonly<ICardReminderProps>) {
  return (
    <div className="min-w-[25.8rem] p-3 border border-gray-200 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <h2 className="text-sm font-medium">Payment Reminder</h2>
        </div>
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs px-3 py-1 h-auto"
        >
          Process Payment
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex text-sm">
          <div className="w-40 text-gray-500">Client</div>
          <div>{client ?? "-"}</div>
        </div>

        <div className="flex text-sm">
          <div className="w-40 text-gray-500">Contract Start Date:</div>
          <div>{date ?? "-"}</div>
        </div>

        <div className="flex text-sm">
          <div className="w-40 text-gray-500">Status:</div>
          <div className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
            {status ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardReminder;

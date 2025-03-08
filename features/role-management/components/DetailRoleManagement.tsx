import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DetailListUser from "./DetailListUser";

export default function DetailRoleManagement() {
  return (
    <Card>
      <CardContent>
        <div className="w-full flex flex-col lg:flex-row justify-start gap-4">
          <div className="lg:min-h-[75vh] w-full lg:w-1/4 flex flex-col md:justify-between md:gap-4">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="md:text-lg font-semibold">Super Admin</h2>
                <Badge variant={"outline"} className="w-fit">
                  <span className="text-primary">•</span> Total 100 User
                </Badge>
              </div>
              <ul className="space-y-1">
                <li className="text-sm">
                  <span className="text-primary mr-1">•</span> View User
                </li>
                <li className="text-sm">
                  <span className="text-primary mr-1">•</span> Create User
                </li>
                <li className="text-sm">
                  <span className="text-primary mr-1">•</span> Update User
                </li>
                <li className="text-sm">
                  <span className="text-primary mr-1">•</span> And 10 more...
                </li>
              </ul>
            </div>
            <Link href="/user-management/role-management">
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-full lg:w-1/2 !mt-6"
              >
                <ChevronLeft size={16} />
                Back
              </Button>
            </Link>
          </div>
          <div className="hidden lg:block min-h-[75vh] w-0.5 bg-gray-200" />
          <DetailListUser />
        </div>
      </CardContent>
    </Card>
  );
}

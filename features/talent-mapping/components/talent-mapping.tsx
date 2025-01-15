"use client";
import React from "react";
import { Download, Plus } from "lucide-react";

import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/common/input-search";
import List from "./list";
import ModalTalent from "./modal-talent";

import useTalentMapping from "@/stores/talent-mapping";

export default function TalentMapping() {
  // variables
  const { toggleModalTalentMapping } = useTalentMapping();

  // functions
  const handleSearch = (searchTerm: string) => {
    try {
      console.log(searchTerm);
    } catch (error) {
      console.error("Error from handleSearch: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 md:gap-4 w-full">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center md:gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-2 md:gap-1 w-full md:w-[40%]">
          <CardTitle className="font-semibold">Talent List</CardTitle>
          <Badge variant={"outline"} className="w-fit">
            <span className="text-primary">•</span> Total 100 Talent
          </Badge>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-[60%] items-center justify-end gap-2">
          <div className="w-full md:w-1/3 xl:w-1/4">
            <InputSearch
              onSearch={handleSearch}
              placeholder="Search talent here..."
              defaultValue={""}
            />
          </div>
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            <Download size={16} />
            Download
          </Button>
          <Button
            size="sm"
            className="w-full md:w-auto"
            onClick={() => toggleModalTalentMapping(true)}
          >
            <Plus size={16} />
            Register Talent
          </Button>
        </div>
      </div>
      <List />
      <ModalTalent />
    </div>
  );
}

import React, { useEffect } from "react";
import { FilterIcon } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import CustomPopover from "@/components/common/custom-popover";
import { Button } from "@/components/ui/button";
import InputCombobox from "@/components/common/input-combobox";
import { InputField } from "./input-field";
import { Form } from "../ui/form";

import { useOptionMasterClient } from "@/features/master-client/hooks/useMasterClient";
import useTalentMapping from "@/stores/talent-mapping";
import { useSetParams } from "@/utils/set-params";
import useAuth from "@/stores/auth";

interface IFilterProps {
  ownClient: boolean;
}

const FilterSchema = z.object({
  client_id: z.string().optional().nullable(),
  outlet_id: z.string().optional().nullable(),
});

function Filter({ ownClient }: IFilterProps) {
  // variables
  const updateParams = useSetParams();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      client_id: searchParams.get("client_id") || null,
      outlet_id: searchParams.get("outlet_id") || null,
    },
  });
  const { data: optionsClient } = useOptionMasterClient();
  const { optionsOutlet, fetchOptionsOutlet } = useTalentMapping();
  const { profile } = useAuth();

  // functions
  const handleSubmit = (data: z.infer<typeof FilterSchema>) => {
    const newParams = {
      client_id: data.client_id || undefined,
      outlet_id: data.outlet_id || undefined,
      page: 1,
    };

    updateParams(newParams);
  };

  const handleReset = () => {
    form.reset({
      client_id: null,
      outlet_id: null,
    });
    updateParams({
      client_id: undefined,
      outlet_id: undefined,
      page: 1,
    });
  };

  // lifecycle
  useEffect(() => {
    const clientId = searchParams.get("client_id");
    if (clientId) {
      fetchOptionsOutlet(clientId);
    }
  }, [searchParams, fetchOptionsOutlet]);

  useEffect(() => {
    if (ownClient) {
      form.setValue("client_id", profile.client?.id?.toString() || null);
      fetchOptionsOutlet(profile.client?.id?.toString());
    }
  }, [ownClient]);

  return (
    <CustomPopover
      content={
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2 w-full"
          >
            <InputField
              name="client_id"
              label="Klien"
              control={form.control}
              render={({ field }) => (
                <InputCombobox
                  field={field}
                  options={
                    optionsClient?.data?.map((item) => ({
                      value: item.id?.toString(),
                      label: item.name,
                    })) || []
                  }
                  placeholder="Pilih klien"
                  onChange={(value) => {
                    field.onChange(value);
                    if (value) {
                      fetchOptionsOutlet(value);
                      form.setValue("outlet_id", null);
                    }
                  }}
                  disabled={ownClient}
                />
              )}
            />
            <InputField
              name="outlet_id"
              label="Outlet"
              control={form.control}
              render={({ field }) => (
                <InputCombobox
                  field={field}
                  options={
                    optionsOutlet?.map((item) => ({
                      value: item.id?.toString(),
                      label: item.name,
                    })) || []
                  }
                  disabled={!form.watch("client_id")}
                  placeholder="Pilih outlet"
                />
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <Button
                variant={"destructive"}
                className="h-9 w-full"
                onClick={handleReset}
              >
                Hapus
              </Button>
              <Button type="submit" className="h-9 w-full">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      }
      className="min-w-[300px]"
    >
      <Button variant={"default-outline"} className="relative">
        <FilterIcon size={16} />
        Filter
        {(searchParams.get("client_id") || searchParams.get("outlet_id")) && (
          <span className="w-3 h-3 rounded-full bg-primary absolute top-0 right-0"></span>
        )}
      </Button>
    </CustomPopover>
  );
}

export default Filter;

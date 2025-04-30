"use client";
import React, { useState, useEffect, useRef } from "react";
import * as z from "zod";
import {
  UseFieldArrayUpdate,
  useForm,
  type UseFieldArrayAppend,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/common/input-field";
import DialogAction from "@/components/common/dialog-action";
import { Label } from "@/components/ui/label";
import Map from "@/components/common/map";

import useMasterClient from "@/stores/master-client";
import {
  CreateMasterClientOutletSchema,
  CreateMasterClientSchema,
} from "../schemas/master-client.schema";

interface IModalOutletProps {
  append: UseFieldArrayAppend<z.infer<typeof CreateMasterClientSchema>>;
  update: UseFieldArrayUpdate<
    z.infer<typeof CreateMasterClientSchema>,
    "outlet"
  >;
}

export default function ModalOutlet({
  append,
  update,
}: Readonly<IModalOutletProps>) {
  // variables
  const {
    modalAddOutlet,
    selectedOutlet,
    toggleModalAddOutlet,
    setSelectedOutlet,
  } = useMasterClient();
  const form = useForm<z.infer<typeof CreateMasterClientOutletSchema>>({
    resolver: zodResolver(CreateMasterClientOutletSchema),
    defaultValues: {
      name: "",
      address: "",
      long: "",
      lat: "",
    },
  });
  const [location, setLocation] = useState<{ lat: number; long: number }>({
    lat: -6.175372,
    long: 106.827194,
  });
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  // Custom debounce function implementation
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to debounce map updates from input
  const debouncedUpdateMapFromInput = (lat: number, long: number) => {
    if (isNaN(lat) || isNaN(long)) return;

    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      setLocation({ lat, long });
    }, 800);
  };

  // functions
  const handleClose = () => {
    setSelectedOutlet(null);
    toggleModalAddOutlet(false);
    form.reset();
    setLocation({ lat: -6.175372, long: 106.827194 });
    setAddress("");
  };

  const handleGetCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLocation({ lat: latitude, long: longitude });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location: ", error);
          setLoading(false);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "Accept-Language": "id",
            "User-Agent": "OMIS",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch address");
      }

      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress("Alamat tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Gagal mendapatkan alamat");
    }
  };

  const onSubmit = async (
    values: z.infer<typeof CreateMasterClientOutletSchema>,
  ) => {
    try {
      const payload = {
        name: values.name,
        address: values.address,
        latitude: values.lat,
        longitude: values.long,
        id_outlet: selectedOutlet?.id_outlet ?? undefined,
      };
      if (selectedOutlet) {
        update(selectedOutlet?.index ?? 0, payload);
      } else {
        append(payload);
      }
      handleClose();
    } catch (error) {
      console.error("Error from onSubmit: ", error);
    }
  };

  const handleLatLongChange = (field: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      if (field === "lat") {
        debouncedUpdateMapFromInput(numValue, location.long);
      } else if (field === "long") {
        debouncedUpdateMapFromInput(location.lat, numValue);
      }
    }
  };

  // lifecycle
  useEffect(() => {
    if (location.lat && location.long) {
      getAddressFromCoordinates(location.lat, location.long);
    }
  }, [location]);

  // Clear timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (address) {
      form.setValue("address", address);
    }
    if (location.lat) {
      form.setValue("lat", location.lat.toString());
    }
    if (location.long) {
      form.setValue("long", location.long.toString());
    }
  }, [address, location, form]);

  useEffect(() => {
    if (selectedOutlet) {
      form.setValue("name", selectedOutlet.name);
      form.setValue("address", selectedOutlet.address);
      form.setValue("lat", selectedOutlet.latitude.toString());
      form.setValue("long", selectedOutlet.longitude.toString());
      setLocation({
        lat: selectedOutlet.latitude,
        long: selectedOutlet.longitude,
      });
    }
  }, [selectedOutlet, form]);

  return (
    <DialogAction
      isOpen={modalAddOutlet}
      onClose={handleClose}
      title={`${selectedOutlet ? "Edit" : "Add"} Outlet`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form className="pt-2">
          <div className="space-y-4">
            <InputField
              name="name"
              label="Outlet Name"
              primary
              control={form.control}
              render={({ field }) => (
                <Input {...field} placeholder="e.g. Outlet 1" />
              )}
            />
            <div className="space-y-2">
              <Label>
                Outlet Address <span className="text-red-500">*</span>
              </Label>
              <Map
                latitude={location.lat}
                longitude={location.long}
                height="200px"
                width="100%"
                shouldFlyTo={true}
                setLocation={(newLocation) => {
                  setLocation(newLocation);
                }}
                setAddress={setAddress}
              />
              <div className="border rounded-lg flex flex-col md:flex-row justify-between items-start p-2 gap-1 md:gap-2">
                <div className="space-y-2 text-xs text-gray-500">
                  <p>{address || "-"}</p>
                  <div className="flex items-center gap-1">
                    <p>{location.lat || 0}</p>
                    <span>•</span>
                    <p>{location.long || 0}</p>
                  </div>
                </div>
                <Button
                  variant={"default-outline"}
                  size={"sm"}
                  type={"button"}
                  onClick={handleGetCurrentLocation}
                  loading={loading}
                  className="w-full md:w-fit"
                >
                  <MapPin size={16} />
                  Update Current Location
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="lat"
                label="Latitude"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Latitude"
                    onChange={(e) => {
                      field.onChange(e);
                      handleLatLongChange("lat", e.target.value);
                    }}
                  />
                )}
              />
              <InputField
                name="long"
                label="Longitude"
                control={form.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Longitude"
                    onChange={(e) => {
                      field.onChange(e);
                      handleLatLongChange("long", e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="hidden">
              <InputField
                name="address"
                label="Alamat"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Alamat akan terisi otomatis" />
                )}
              />
            </div>
            <Button
              type="button"
              onClick={form.handleSubmit((values) => onSubmit(values))}
              className="w-full"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </DialogAction>
  );
}

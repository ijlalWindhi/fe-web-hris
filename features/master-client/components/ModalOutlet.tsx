"use client";
import React, { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { CreateMasterClientOutletSchema } from "../schemas/master-client.schema";

export default function ModalOutlet() {
  // variables
  const {
    modalAddOutlet,
    selectedIdOutlet,
    toggleModalAddOutlet,
    setSelectedOutletId,
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

  // functions
  const handleClose = () => {
    setSelectedOutletId(null);
    toggleModalAddOutlet(false);
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

  // lifecycle
  useEffect(() => {
    if (location.lat && location.long) {
      getAddressFromCoordinates(location.lat, location.long);
    }
  }, [location]);

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

  return (
    <DialogAction
      isOpen={modalAddOutlet}
      onClose={handleClose}
      title={`${selectedIdOutlet ? "Edit" : "Add"} Outlet`}
      className="max-w-full md:max-w-2xl"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => console.log(values))}
          className="pt-2"
        >
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
              <div className="border rounded-lg flex flex-col md:flex-row justify-between items-start p-2">
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
                >
                  <MapPin size={16} />
                  Update Current Location
                </Button>
              </div>
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
              <InputField
                name="lat"
                label="Latitude"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Latitude" />
                )}
              />
              <InputField
                name="long"
                label="Longitude"
                control={form.control}
                render={({ field }) => (
                  <Input {...field} placeholder="Longitude" />
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </DialogAction>
  );
}

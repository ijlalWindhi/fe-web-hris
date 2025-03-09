import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

export default function Map({
  latitude,
  longitude,
  height,
  width,
  shouldFlyTo,
  setLocation,
  setAddress,
}: Readonly<{
  latitude: number;
  longitude: number;
  height: string;
  width: string;
  shouldFlyTo?: boolean;
  setLocation: (location: { lat: number; long: number }) => void;
  setAddress: (address: string) => void;
}>) {
  // variables
  const customIcon = new L.Icon({
    iconUrl: "/images/map_marker.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // functions
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

      // Format address
      if (data && data.display_name) {
        setAddress(data.display_name);
        return data.display_name;
      } else {
        setAddress("Alamat tidak ditemukan");
        return "Alamat tidak ditemukan";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Gagal mendapatkan alamat");
      return "Gagal mendapatkan alamat";
    }
  };

  function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap();

    useEffect(() => {
      if (shouldFlyTo) {
        map.flyTo([lat, lng], 13, { animate: true, duration: 1.5 });
      }
    }, [lat, lng, shouldFlyTo, map]);

    return null;
  }

  function LocationPicker() {
    useMapEvents({
      click(e) {
        const newLocation = { lat: e.latlng.lat, long: e.latlng.lng };
        setLocation(newLocation);
        getAddressFromCoordinates(e.latlng.lat, e.latlng.lng);
      },
    });

    return null;
  }

  // lifecycle
  useEffect(() => {
    if (latitude && longitude) {
      getAddressFromCoordinates(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <div className="flex flex-col gap-3">
      <MapContainer
        center={[latitude || 0, longitude || 0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: height || "100%", width: width || "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude || 0, longitude || 0]} icon={customIcon}>
          <Popup>Lokasi</Popup>
        </Marker>
        <FlyToLocation lat={latitude} lng={longitude} />
        <LocationPicker />
      </MapContainer>
    </div>
  );
}

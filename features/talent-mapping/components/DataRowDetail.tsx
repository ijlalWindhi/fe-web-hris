import Image from "next/image";
import { Download } from "lucide-react";

interface IDataRowProps {
  label: string;
  value: string | null;
  url?: string;
}

export default function DataRow({
  label,
  value,
  url,
}: Readonly<IDataRowProps>) {
  // functions
  const handleDownload = () => {
    try {
      window.open(url ?? value ?? "-", "_blank");
    } catch (error) {
      console.error("Error from handleDownload: ", error);
    }
  };

  const renderValue = () => {
    if (label === "Selfie Photo") {
      return (
        <div className="relative h-10 w-10 rounded-lg overflow-hidden">
          <Image
            src={value || "/images/unavailable-profile.webp"}
            alt="avatar"
            layout="fill"
            objectFit="cover"
          />
        </div>
      );
    } else if (label === "Contract Statement") {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-primary hover:underline"
          onClick={handleDownload}
        >
          <span className="text-sm">{value}</span>
          <Download size={16} className="text-primary" />
        </div>
      );
    } else {
      return (
        <dd className="text-sm text-left">
          {(!Array.isArray(value) && value) || "-"}
        </dd>
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-start py-3 border-b first:border-b-0 last:border-b-0">
      <dt className="text-sm font-medium text-muted-foreground min-w-48">
        {label}
      </dt>
      <span className="pr-2 hidden md:block w-2">:</span>
      {renderValue()}
    </div>
  );
}

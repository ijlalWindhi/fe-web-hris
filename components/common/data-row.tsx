import { cn } from "@/utils/utils";
import Image from "next/image";

interface IDataRowProps {
  label: string;
  value: string | null;
  type?: "text" | "image";
  bold?: boolean;
}

export default function DataRow({
  label,
  value,
  type = "text",
  bold = false,
}: Readonly<IDataRowProps>) {
  return (
    <div className="flex flex-col md:flex-row justify-start py-3 border-b first:border-b-0 last:border-b-0">
      <dt
        className={cn(
          "text-sm w-48",
          bold
            ? "font-semibold text-black"
            : "font-medium text-muted-foreground",
        )}
      >
        {label}
      </dt>
      <span className="pr-2 hidden md:block w-2">:</span>
      {type === "image" ? (
        <dd className="text-sm text-left md:text-right">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden">
            <Image
              src={value ?? "/images/unavailable-profile.webp"}
              alt="avatar"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </dd>
      ) : (
        <dd
          className={cn(
            "text-sm text-left md:text-right",
            bold ? "font-semibold text-black" : "",
          )}
        >
          {(!Array.isArray(value) && value) || "-"}
        </dd>
      )}
    </div>
  );
}

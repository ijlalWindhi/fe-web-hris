import Image from "next/image";

interface IDataRowProps {
  label: string;
  value: string | null;
}

export default function DataRow({ label, value }: Readonly<IDataRowProps>) {
  return (
    <div className="flex flex-col md:flex-row justify-start py-3 border-b first:border-b-0 last:border-b-0">
      <dt className="text-sm font-medium text-muted-foreground w-48">
        {label}
      </dt>
      <span className="pr-2 hidden md:block w-2">:</span>
      {label === "Selfie Photo" ? (
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
        <dd className="text-sm text-left md:text-right">
          {(!Array.isArray(value) && value) || "-"}
        </dd>
      )}
    </div>
  );
}

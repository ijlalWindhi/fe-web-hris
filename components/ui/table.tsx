/* eslint-disable */
import * as React from "react";

import { cn } from "@/utils/utils";
import { Loader2 } from "lucide-react";

// types
export interface ITableHeader {
  key: string;
  title: string;
  className?: string;
}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto bg-white p-2 rounded-md">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-xs md:text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-0 !bg-white", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

interface ITableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  loading?: boolean;
}
const TableBody = React.memo(
  React.forwardRef<HTMLTableSectionElement, ITableBodyProps>(
    ({ className, loading, children, ...props }, ref) => (
      <tbody
        ref={ref}
        className={cn(
          "[&_tr]:border-b-8 [&_tr]:border-white [&_td:last-child]:!rounded-e-3xl [&_td:first-child]:!rounded-s-3xl bg-gray-50 gap-4", // Tambahkan gap-4
          className,
        )}
        {...props}
      >
        {loading ? (
          <tr>
            <td colSpan={1000} className="h-32">
              <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            </td>
          </tr>
        ) : (
          children
        )}
      </tbody>
    ),
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-0 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

interface ITableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  name?: string;
}
const TableHead = React.forwardRef<HTMLTableCellElement, ITableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

interface ITableCellProps<T = any>
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  name?: string;
  children?:
    | React.ReactNode
    | ((props: { row: T; column: ITableHeader }) => React.ReactNode);
}
function TableCell<T = any>({
  className,
  children,
  name,
  ...props
}: Readonly<ITableCellProps<T>>) {
  // If the component is used as a renderer definition (with the 'name' prop), return null
  if (name) {
    return null;
  }

  // If the component is used as a regular rendering component
  return (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    >
      {typeof children === "function" ? null : (children ?? "-")}
    </td>
  );
}
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

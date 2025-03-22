/* eslint-disable */
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { ITableHeader } from "../ui/table";

// types
type TCellRendererProps<T> = {
  row: T;
  column: ITableHeader;
};

type TCellRenderer<T> =
  | React.ReactNode
  | ((props: TCellRendererProps<T>) => React.ReactNode);

interface ITableCompoProps<T>
  extends Omit<React.HTMLAttributes<HTMLTableElement>, "children"> {
  loading?: boolean;
  caption?: string;
  header: ITableHeader[];
  data: T[];
  children?: React.ReactNode;
  withoutHeader?: boolean;
}

function TableCompo<T>({
  className,
  caption,
  loading,
  header,
  data,
  children,
  ...props
}: Readonly<ITableCompoProps<T>>) {
  const headerChildren = React.useMemo(() => {
    return React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) &&
        (child.props as any).name?.startsWith("header-"),
    );
  }, [children]);

  const bodyChildren = React.useMemo(() => {
    return React.Children.toArray(children).filter(
      (child) =>
        React.isValidElement(child) &&
        !(child.props as any).name?.startsWith("header-"),
    );
  }, [children]);

  const renderHeaderCell = React.useCallback(
    (column: ITableHeader) => {
      const customHeader = headerChildren.find(
        (child) =>
          React.isValidElement(child) &&
          (child.props as any).name === `header-${column.key}`,
      );
      return (
        customHeader || (
          <TableHead key={column.title} className={column.className}>
            {column.title}
          </TableHead>
        )
      );
    },
    [headerChildren],
  );

  const renderBodyCell = React.useCallback(
    (row: T, column: ITableHeader) => {
      const customBody = bodyChildren.find(
        (child) =>
          React.isValidElement(child) &&
          (child.props as any).name === column.key,
      );
      if (customBody && React.isValidElement(customBody)) {
        const CustomComponent = (customBody as any).props
          .children as TCellRenderer<T>;
        return (
          <TableCell key={`${(row as any).id}-${column.key}`}>
            {typeof CustomComponent === "function"
              ? CustomComponent({ row, column })
              : CustomComponent}
          </TableCell>
        );
      }
      return (
        <TableCell key={`${(row as any).id}-${column.key}`}>
          {(row as any)[column.key]}
        </TableCell>
      );
    },
    [bodyChildren],
  );

  const memoizedHeader = React.useMemo(
    () => (
      <TableHeader>
        <TableRow>{header.map(renderHeaderCell)}</TableRow>
      </TableHeader>
    ),
    [header, renderHeaderCell],
  );

  const memoizedBody = React.useMemo(
    () => (
      <TableBody loading={loading}>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {header.map((column) => renderBodyCell(row, column))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={header.length} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    ),
    [data, header, loading, renderBodyCell],
  );

  return (
    <Table className={className} {...props}>
      {caption && <TableCaption>{caption}</TableCaption>}
      {!props.withoutHeader && memoizedHeader}
      {memoizedBody}
    </Table>
  );
}
const MemoizedTableCompo = React.memo(TableCompo) as typeof TableCompo;
(
  MemoizedTableCompo as React.MemoExoticComponent<typeof TableCompo>
).displayName = "TableCompo";

export { TableCompo as Table };

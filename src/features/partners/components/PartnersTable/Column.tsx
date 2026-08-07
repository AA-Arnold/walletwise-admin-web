import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { CellContext, createColumnHelper, Table } from "@tanstack/react-table";

import TableDate from "@/components/atoms/TableDate/TableDate";
import StatusBubble from "@/components/atoms/StatusBubble/StatusBubble";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Partner } from "../../types";
import PartnerActionCell from "../PartnerActionCell/PartnerActionCell";

const columnHelper = createColumnHelper<Partner>();

interface ColumnProps {
  table: Table<Partner>;
}

const sortableHeader = (label: string) =>
  function SortableHeader({
    column,
  }: {
    column: { toggleSorting: (descending: boolean) => void; getIsSorted: () => false | "asc" | "desc" };
  }) {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );
  };

export const PartnerColumns = [
  {
    id: "select",
    header: ({ table }: ColumnProps) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: CellContext<Partner, unknown>) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  columnHelper.accessor("company_name", {
    header: sortableHeader("Company Name"),
    cell: ({ row }) => (
      <Link href={`/manage-partner-events/info/${row.original.id}`} className="font-medium text-[#5c24cc] hover:underline dark:text-purple-400">
        {row.original.company_name}
      </Link>
    ),
  }),
  columnHelper.accessor("email", {
    header: sortableHeader("Email"),
  }),
  columnHelper.accessor("phone_number", {
    header: sortableHeader("Phone Number"),
  }),
  columnHelper.accessor("status", {
    header: sortableHeader("Status"),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <StatusBubble status={status || "unknown"} />;
    },
  }),
  columnHelper.accessor("created_at", {
    header: sortableHeader("Created"),
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string | undefined;
      return date ? <TableDate date={date} /> : "—";
    },
  }),
  {
    id: "actions",
    cell: ({ row }: CellContext<Partner, unknown>) => (
      <PartnerActionCell partner={row.original} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

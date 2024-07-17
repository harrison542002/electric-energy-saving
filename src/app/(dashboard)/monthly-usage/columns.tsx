import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";

export type MonthlyUsage = {
  id: number;
  household_id: string;
  date: string;
  electric_kWh: number;
  gas_kWh: number;
  total_energy_bill: number;
};

export const monthly_usages_columns: ColumnDef<MonthlyUsage>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <>{new Date(row.original.date).toDateString()}</>,
  },
  {
    accessorKey: "electric_kWh",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Electric usage (kWh)
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <>{row.original.electric_kWh.toFixed(2)}</>,
  },
  {
    accessorKey: "gas_kWh",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gas usage (kWh)
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <>{row.original.gas_kWh.toFixed(2)}</>,
  },
  {
    accessorKey: "total_energy_bill",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bill amount
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        {"£ "}
        {row.original.total_energy_bill.toFixed(2)}
      </>
    ),
  },
];

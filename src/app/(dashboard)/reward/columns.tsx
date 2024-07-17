import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
export type Reward = {
  id: number;
  status: string;
  expired_date: Date;
  monthly_usage_id: number;
  total_saving: number;
};

export const reward_columns: ColumnDef<Reward>[] = [
  {
    accessorKey: "total_saving",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Saving
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <>{row.original.total_saving.toFixed(2)}</>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <>
        {
          <div
            className={`${
              row.original.status === "CLAIMED"
                ? "bg-green-400"
                : row.original.status === "PENDING"
                ? "bg-yellow-400"
                : "bg-red-500"
            } w-fit p-1 capitalize rounded-md shadow-sm`}
          >
            {row.original.status.toLowerCase()}
          </div>
        }
      </>
    ),
  },
  {
    accessorKey: "expired_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expired Date
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <>{row.original.expired_date.toDateString()}</>,
  },
];

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { LuArrowUpDown } from "react-icons/lu";

export type RankPlace = {
  total_saving: number | null;
  rankPlace: number;
  household: {
    user: {
      name: string;
      profile: string | null;
    }[];
  };
};

export const rank_place_columns: ColumnDef<RankPlace>[] = [
  {
    accessorKey: "rankPlace",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rank Place
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <>{row.original.rankPlace}</>,
  },

  {
    accessorKey: "household",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Users
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        {row.original.household.user.length >= 3 ? (
          <div className="md:flex items-center gap-2 ">
            <div className="relative flex items-center">
              <Image
                src={"/profiles/" + row.original.household.user[0].profile}
                width={30}
                height={30}
                alt={row.original.household.user[0].name}
                className="rounded-full "
              />
              <Image
                src={"/profiles/" + row.original.household.user[1].profile}
                width={30}
                height={30}
                alt={row.original.household.user[1].name}
                className="rounded-full -ml-2"
              />
              <Image
                src={"/profiles/" + row.original.household.user[2].profile}
                width={30}
                height={30}
                alt={row.original.household.user[2].name}
                className="rounded-full -ml-2 "
              />
            </div>
            <p>{row.original.household.user[0].name} and friends house</p>
          </div>
        ) : row.original.household.user.length === 2 ? (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Image
                src={"/profiles/" + row.original.household.user[0].profile}
                width={30}
                height={30}
                alt={row.original.household.user[0].name}
                className="rounded-full "
              />
              <Image
                src={"/profiles/" + row.original.household.user[1].profile}
                width={30}
                height={30}
                alt={row.original.household.user[1].name}
                className="rounded-full -ml-2"
              />
            </div>
            <p>
              {row.original.household.user[0].name} and{" "}
              {row.original.household.user[1].name} house
            </p>
          </div>
        ) : row.original.household.user.length === 1 ? (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Image
                src={"/profiles/" + row.original.household.user[0].profile}
                width={30}
                height={30}
                alt={row.original.household.user[0].name}
                className="rounded-full "
              />
            </div>
            <p>{row.original.household.user[0].name}&apos;s house </p>
          </div>
        ) : (
          <>No users found</>
        )}
      </>
    ),
  },
  {
    accessorKey: "total_saving",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total saving
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <>{row.original.total_saving?.toFixed(2)}</>,
  },
];

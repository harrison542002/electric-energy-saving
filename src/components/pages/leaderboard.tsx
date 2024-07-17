"use client";
import {
  rank_place_columns,
  RankPlace,
} from "@/app/(dashboard)/leaderboard/columns";
import { DataTable } from "@/components/data-table";
import DashboardComponentLayout from "@/components/layout/dashboard-component-layout";
import React from "react";

type Props = {
  rankPlace: RankPlace[];
};

const Leaderboard = (props: Props) => {
  return (
    <DashboardComponentLayout>
      <DataTable columns={rank_place_columns} data={props.rankPlace} />
    </DashboardComponentLayout>
  );
};

export default Leaderboard;

"use client";
import { monthly_usages_columns } from "@/app/(dashboard)/monthly-usage/columns";
import { Reward, reward_columns } from "@/app/(dashboard)/reward/columns";
import { DataTable } from "@/components/data-table";
import DashboardComponentLayout from "@/components/layout/dashboard-component-layout";
import React from "react";

type Props = {
  rewards: Reward[];
};

const RewardList = (props: Props) => {
  return (
    <DashboardComponentLayout>
      <DataTable columns={reward_columns} data={props.rewards} />
    </DashboardComponentLayout>
  );
};

export default RewardList;

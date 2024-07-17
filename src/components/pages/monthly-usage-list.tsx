"use client";
import {
  monthly_usages_columns,
  MonthlyUsage,
} from "@/app/(dashboard)/monthly-usage/columns";
import { DataTable } from "@/components/data-table";
import DashboardComponentLayout from "@/components/layout/dashboard-component-layout";
import React from "react";

type Props = {
  monthlyusage: MonthlyUsage[];
};

const MonthlyUsageList = (props: Props) => {
  return (
    <DashboardComponentLayout>
      <DataTable columns={monthly_usages_columns} data={props.monthlyusage} />
    </DashboardComponentLayout>
  );
};

export default MonthlyUsageList;

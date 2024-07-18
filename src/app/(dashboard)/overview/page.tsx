import { authOptions } from "@/lib/auth";
import SavingCharts from "@/components/charts/saving-chart";
import DashboardNav from "@/components/dashboard-ui";
import Heading from "@/components/heading";
import KPICards from "@/components/kpi-cards";
import MonthlyUsageOverview from "@/components/monthly-usage-overview";
import RankOverview from "@/components/rank-overview";
import prisma from "@/lib/prisma";
import { current_month_rank } from "@/services/rank-services";
import { getKpiResults } from "@/services/results-services";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.id;

  const monthly_usage = await prisma.monthlyusage.findMany({
    take: 8,
  });

  const [rank, average_saving, previous_month_saving, total_cost, rewards] =
    await getKpiResults(user_id);

  const rankPlace = await current_month_rank();
  const date = new Date("2024-08-01");
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);

  const current_date = new Date("2024-08-01");
  current_date.setDate(1);

  return (
    <>
      <DashboardNav session={session} title="Overview" />
      <div className="p-4 flex flex-col gap-y-2">
        <KPICards
          kpiResults={[rank, average_saving, previous_month_saving, total_cost]}
        />

        <div className="grid grid-cols-2 gap-2">
          <MonthlyUsageOverview monthly_usage={monthly_usage} />
          <div>
            <div className="h-[250px]">
              <Heading className="text-center">
                Time serie of saving bill for current household
              </Heading>
              <SavingCharts rewards={rewards as any} />
            </div>
            <RankOverview rankReward={rankPlace as any} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

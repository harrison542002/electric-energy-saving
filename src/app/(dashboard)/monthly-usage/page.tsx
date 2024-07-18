import { monthly_usages_columns } from "@/app/(dashboard)/monthly-usage/columns";
import { authOptions } from "@/lib/auth";
import DashboardNav from "@/components/dashboard-ui";
import MonthlyUsageList from "@/components/pages/monthly-usage-list";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user_id = session?.user?.id;
  const user = await prisma.user.findUnique({
    where: {
      identity_number: user_id,
    },
    select: {
      household: {
        select: {
          monthlyusage: true,
        },
      },
    },
  });

  return (
    <>
      <DashboardNav session={session} title="Monthly Usages" />
      <div>
        <MonthlyUsageList monthlyusage={user?.household?.monthlyusage as any} />
      </div>
    </>
  );
};

export default Page;

import { Reward } from "@/app/(dashboard)/reward/columns";
import DashboardNav from "@/components/dashboard-ui";
import RewardList from "@/components/pages/reward-list";
import { authOptions } from "@/lib/auth";
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
          monthlyusage: {
            select: {
              reward: true,
            },
          },
        },
      },
    },
  });

  let rewards: Reward[] = [];
  user?.household?.monthlyusage.forEach((monthly_usage) => {
    if (monthly_usage.reward.length > 0) {
      rewards = [...rewards, ...monthly_usage.reward];
    }
  });

  return (
    <>
      <DashboardNav session={session} title="Rewards" />
      <div>
        <RewardList rewards={rewards} />
      </div>
    </>
  );
};

export default Page;

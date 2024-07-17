import { Reward } from "@/app/(dashboard)/reward/columns";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import RewardList from "@/components/pages/reward-list";
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
    <div>
      <RewardList rewards={rewards} />
    </div>
  );
};

export default Page;

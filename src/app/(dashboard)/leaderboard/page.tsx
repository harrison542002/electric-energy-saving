import { authOptions } from "@/lib/auth";
import DashboardNav from "@/components/dashboard-ui";
import Leaderboard from "@/components/pages/leaderboard";
import { current_month_rank } from "@/services/rank-services";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const rankPlaces = await current_month_rank();
  return (
    <>
      <DashboardNav session={session} title="Leaderboard" />
      <div>
        <Leaderboard rankPlace={rankPlaces} />
      </div>
    </>
  );
};

export default Page;

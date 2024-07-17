import Leaderboard from "@/components/pages/leaderboard";
import { current_month_rank } from "@/services/rank-services";
import React from "react";

const Page = async () => {
  const rankPlaces = await current_month_rank();
  return (
    <div>
      <Leaderboard rankPlace={rankPlaces} />
    </div>
  );
};

export default Page;

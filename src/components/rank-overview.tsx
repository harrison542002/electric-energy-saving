import Heading from "@/components/heading";
import { household, rankreward, user } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  rankReward: (rankreward & {
    household: household & {
      user: user[];
    };
  })[];
};

const RankOverview = ({ rankReward }: Props) => {
  return (
    <div>
      <Heading className="text-center">Rank</Heading>
      <div className="text-sm bg-slate-50 border h-64 overflow-y-auto">
        <div className="grid grid-cols-6 p-1 border-b bg-slate-100 sticky top-0">
          <p>No.</p>
          <p className="col-span-4">User (s)</p>
          <p>Saving</p>
        </div>
        <div className="flex flex-col gap-y-2">
          {rankReward.map((rankReward) => (
            <div className="grid grid-cols-6 border-b p-1" key={rankReward.id}>
              <p className="flex flex-col justify-center">
                {rankReward.rankPlace}
              </p>
              <div className="flex gap-2 items-center col-span-4">
                {rankReward.household.user.length > 0 ? (
                  rankReward.household.user.length === 1 ? (
                    <>
                      <Image
                        src={
                          "/profiles/" + rankReward.household.user[0].profile
                        }
                        width={30}
                        height={30}
                        alt={rankReward.household.user[0].name}
                        className="rounded-full"
                      />
                      <p>{rankReward.household.user[0].name}&apos;s house</p>
                    </>
                  ) : rankReward.household.user.length === 2 ? (
                    <>
                      <Image
                        src={
                          "/profiles/" + rankReward.household.user[0].profile
                        }
                        width={30}
                        height={30}
                        alt={rankReward.household.user[0].name}
                        className="rounded-full"
                      />
                      <p>{rankReward.household.user[0].name}&apos;s house</p>
                    </>
                  ) : (
                    <>
                      <Image
                        src={
                          "/profiles/" + rankReward.household.user[0].profile
                        }
                        width={30}
                        height={30}
                        alt={rankReward.household.user[0].name}
                        className="rounded-full"
                      />
                      <p>{rankReward.household.user[0].name}&apos;s house</p>
                    </>
                  )
                ) : (
                  <p>No users found</p>
                )}
              </div>
              <p className="flex flex-col justify-center">
                {rankReward.total_saving}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankOverview;

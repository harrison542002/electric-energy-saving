import prisma from "@/lib/prisma";
import { reward } from "@prisma/client";
import fs from "fs";
export const getKpiResults = async (id: string) => {
  const average_total_saving = await prisma.reward.aggregate({
    _avg: {
      total_saving: true,
    },
    where: {
      status: "CLAIMED",
    },
  });

  //To get the first day of previous month
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);

  const current_date = new Date();
  current_date.setDate(1);

  const user = await prisma.user.findUnique({
    where: { identity_number: id },
    include: {
      household: { select: { hidp: true } },
    },
  });

  let saving_pervious_month = 0;
  if (user?.current_hidp) {
    const previous_monthly_usage = await prisma.monthlyusage.findFirst({
      where: {
        household_id: user?.current_hidp,
      },
      include: {
        reward: {
          where: {
            expired_date: {
              lt: current_date,
              gte: date,
            },
          },
          select: {
            total_saving: true,
          },
        },
      },
    });

    if (previous_monthly_usage?.reward) {
      saving_pervious_month = previous_monthly_usage.reward.reduce(
        (curr_value, reward) => {
          return curr_value + reward.total_saving;
        },
        0
      );
    }
  }

  const total_spending_energy = await prisma.monthlyusage.aggregate({
    _sum: {
      total_energy_bill: true,
    },
    where: {
      household_id: user?.household?.hidp,
    },
  });

  const getBillsWithTime = await prisma.household.findUnique({
    select: {
      monthlyusage: {
        select: { reward: true },
        where: {
          reward: {
            every: {
              status: "CLAIMED",
            },
          },
        },
      },
    },
    where: {
      hidp: user?.household?.hidp,
    },
  });

  let rewards: reward[] = [];
  getBillsWithTime?.monthlyusage.forEach((monthly_usage) => {
    if (monthly_usage.reward.length > 0) {
      rewards = [...rewards, ...monthly_usage.reward];
    }
  });

  const rank = user?.current_hidp
    ? await prisma.rankreward.findFirst({
        where: { hipd: user?.current_hidp },
      })
    : 0;

  const average_saving = average_total_saving._avg.total_saving?.toFixed(2);
  const previous_month_saving = saving_pervious_month.toFixed(2);
  const total_cost = total_spending_energy._sum.total_energy_bill?.toFixed(2);

  return [rank, average_saving, previous_month_saving, total_cost, rewards];
};

export const toRandomlyPutImages = async () => {
  const files = fs.readdirSync(
    "C:/Users/AungThihaTun/OneDrive/Desktop/side-projects/energy-efficiency/public/profiles"
  );

  const users = await prisma.user.findMany({
    select: {
      identity_number: true,
    },
  });

  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    await prisma.user.update({
      where: {
        identity_number: user.identity_number,
      },
      data: {
        profile: files[Math.floor(Math.random() * files.length)],
      },
    });
  }
};

export const createRanking = async (start_date: Date, end_date: Date) => {
  const checkIfExist = await prisma.rankreward.findMany({
    where: {
      granted_date: {
        gte: start_date,
      },
    },
  });
  if (checkIfExist.length <= 0) {
    const monthly_usages = await prisma.monthlyusage.findMany({
      where: {
        date: {
          gte: start_date,
          lt: end_date,
        },
      },
      select: {
        household: true,
        reward: true,
      },
    });

    const rank_data: { house_id: string; total_saving: number }[] = [];
    for (let index = 0; index < monthly_usages.length; index++) {
      const monthly_usage = monthly_usages[index];
      const found_index = rank_data.findIndex(
        (ele) => ele.house_id === monthly_usage.household.hidp
      );
      if (found_index < 0) {
        rank_data.push({
          house_id: monthly_usage.household.hidp,
          total_saving: monthly_usage.reward.reduce(
            (curr, reward) => curr + reward.total_saving,
            0
          ),
        });
      } else {
        const data = rank_data[found_index];
        data.total_saving += monthly_usage.reward.reduce(
          (curr, reward) => curr + reward.total_saving,
          0
        );
      }
    }

    //sorting
    rank_data.sort((a, b) => {
      return b.total_saving - a.total_saving;
    });

    for (let index = 0; index < rank_data.length; index++) {
      const element = rank_data[index];
      if (element.total_saving > 0) {
        await prisma.rankreward.create({
          data: {
            granted_date: start_date,
            rankPlace: index + 1,
            hipd: element.house_id,
            total_saving: element.total_saving,
          },
        });
      }
    }
  }
};

export const claimForSaving = async (user_id: string) => {
  let current_date = new Date();
  current_date = new Date(
    `${current_date.getFullYear()}-${current_date.getMonth() + 1}-01 00:00:00`
  );
  const user = await prisma.user.findUnique({
    where: {
      identity_number: user_id,
    },
    select: {
      household: {
        select: {
          monthlyusage: {
            where: {
              date: {
                gte: current_date,
              },
            },
          },
        },
      },
    },
  });

  if (!user?.household) {
    return {
      error: true,
      message: "No household found!",
    };
  }

  if (user?.household.monthlyusage.length === 0) {
    return {
      error: true,
      message: "No usage bill for current month",
    };
  }

  if (
    user?.household.monthlyusage[0].electric_kWh > 225 ||
    user?.household.monthlyusage[0].gas_kWh > 958
  ) {
    return {
      error: true,
      message: "No saving amount tile now",
    };
  }
  //If condition satisfy
  //Check if there is already saving exist.
  const reward = await prisma.reward.findFirst({
    where: {
      expired_date: {
        gte: current_date,
      },
      status: "CLAIMED",
    },
  });

  console.log(reward);

  if (reward) {
    return {
      error: true,
      message: "Reward already exists.",
    };
  }
  //If not create a new one and return how much is save.
  const expired_date = new Date(
    `${current_date.getFullYear()}-${current_date.getMonth() + 1}-15 00:00:00`
  );
  await prisma.reward.create({
    data: {
      expired_date,
      total_saving: calculateTotalSaving(
        user?.household.monthlyusage[0].electric_kWh +
          user?.household.monthlyusage[0].gas_kWh
      ),
      monthly_usage_id: user?.household.monthlyusage[0].id,
      status: "PENDING",
    },
  });
  return {
    error: false,
    message: "New reward is created.",
  };
};

function calculateTotalSaving(n: number) {
  const totalSaving = Math.floor(79 / Math.log10(1 + n) + 1);
  return totalSaving;
}

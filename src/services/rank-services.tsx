import prisma from "@/lib/prisma";

export const current_month_rank = async () => {
  //To get the first day of previous month
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  let current_date = new Date();
  current_date = new Date(
    `${current_date.getFullYear()}-${current_date.getMonth() + 1}-01 00:00:00`
  );

  const rankPlace = await prisma.rankreward.findMany({
    where: {
      granted_date: {
        lt: current_date,
        gt: date,
      },
      rankPlace: {
        lte: 100,
      },
    },
    select: {
      household: {
        select: {
          user: {
            select: {
              name: true,
              profile: true,
            },
          },
        },
      },
      total_saving: true,
      rankPlace: true,
    },
    orderBy: {
      rankPlace: "asc",
    },
  });
  return rankPlace;
};

export const my_household_rank = async (hipd: string) => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  const current_date = new Date();
  current_date.setDate(1);

  const my_rank_place = await prisma.rankreward.findFirst({
    where: {
      hipd,
      granted_date: {
        lt: current_date,
        gt: date,
      },
      rankPlace: {
        lte: 100,
      },
    },
  });

  return my_rank_place ? my_rank_place.rankPlace : 0;
};

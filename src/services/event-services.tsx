import prisma from "@/lib/prisma";

export const getEvents = async () => {
  return prisma.event.findMany();
};

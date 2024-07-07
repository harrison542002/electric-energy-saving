import { errorHandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, password, identity_number, name } = await req.json();
    const checkDuplication = await prisma.user.findUnique({
      where: { identity_number },
    });
    if (checkDuplication) {
      return Response.json(
        { message: "You already have an account, please login!" },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.create({
      data: { username, password, identity_number, name },
    });
    return Response.json({
      message: `Welcome ${user.name}, you have registered successfully!`,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

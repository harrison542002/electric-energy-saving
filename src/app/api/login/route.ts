import { SECRETE } from "@/constant/server-variable";
import { errorHandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    const user = await prisma.user.findFirstOrThrow({
      where: {
        username,
        password,
      },
    });
    if (user) {
      const encryptedSessionData = "";
      cookies().set("session", encryptedSessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // one week
        path: "/",
      });
      return Response.json({
        message: "Welcome to Greenie",
      });
    } else {
      throw new Error("Wrong Crendentials!");
    }
  } catch (error: any) {
    return errorHandler(error);
  }
}

import { authOptions } from "@/lib/auth";
import { claimForSaving } from "@/services/results-services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const res = await claimForSaving(session?.user.id);
  if (res.error) {
    return NextResponse.json(
      {
        message: res.message,
      }
      // {
      //   status: 400,
      // }
    );
  }
  return NextResponse.json({ message: res.message });
}

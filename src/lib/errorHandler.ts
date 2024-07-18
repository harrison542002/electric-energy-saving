import { NextResponse } from "next/server";

export const errorHandler = (error: any) => {
  switch (error.code) {
    case "P2025":
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    default:
      console.log(error.message);
      return NextResponse.json(
        {
          message: "Something went wrong",
        },
        {
          status: 500,
        }
      );
  }
};

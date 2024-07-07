export const errorHandler = (error: any) => {
  switch (error.code) {
    case "P2025":
      return Response.json(
        {
          message: error.message,
        },
        { status: 400 }
      );
    default:
      console.log(error.message);
      return Response.json(
        {
          message: "Something went wrong",
        },
        {
          status: 500,
        }
      );
  }
};

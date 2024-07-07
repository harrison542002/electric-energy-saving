export const post = async (url: string, data: {}) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      return { message: error.message, error: true };
    }
    const res = await response.json();
    return { message: res.message };
  } catch (error) {
    console.log(error);

    return { message: "Something went wrong", error: true };
  }
};

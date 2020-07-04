const apiHandler = async response => {
  try {
    if (response === null || response === undefined)
      throw new Error("Request error");

    if (response.status >= 200 && response.status < 400)
      return await response.json();

    if (response.status === 401) {
      // logout user
      console.log("Logout user");
    }

    //   throw error for other response
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default apiHandler;

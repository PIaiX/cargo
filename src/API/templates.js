import apiRoutes from "./config/apiRoutes";

export const getCurrentUserCargoTemplates = async (
  axiosPrivate,
  currentUserId,
  pageNumber,
  callback
) => {
  try {
    const response = await axiosPrivate.post(
      `${apiRoutes.CARGO_TEMPLATE}/${currentUserId}`,
      { page: pageNumber, limit: 7, orderBy: "desc" }
    );
    console.log(response.data);
    callback(response.data.body.data);
  } catch (error) {
    console.log(error);
  }
};

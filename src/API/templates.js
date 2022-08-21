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
      { page: pageNumber, limit: 4, orderBy: "desc" }
    );
    callback(response.data.body.data);
  } catch (error) {
    console.log(error);
  }
};

import apiRoutes from "./config/apiRoutes";
import axiosPrivate from "./axiosPrivate";

export const getCurrentUserCargoTemplates = async (
  axiosPrivate,
  currentUserId,
  pageNumber,
  callback
) => {
  try {
    const response = await axiosPrivate.post(
      `${apiRoutes.CARGO_TEMPLATE}/${currentUserId}`,
      { page: pageNumber, orderBy: "desc" }
    );
    callback(response.data.body.data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTemplate = async (
  id,
  currentState,
  successCallback,
  errorCallback
) => {
  //TODO: Handle the failure case properly, display an error notification
  try {
    successCallback((prev) => {
      const newTemplates = prev.filter((item) => item.id !== id);
      return newTemplates;
    });
    const response = await axiosPrivate.delete(
      `${apiRoutes.CARGO_TEMPLATE_ACTIONS}/${id}`
    );
    if (response.data.status !== 200) {
      errorCallback(currentState);
    }
  } catch (error) {
    errorCallback(currentState);
    console.log(error);
  }
};

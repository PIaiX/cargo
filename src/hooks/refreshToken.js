import axiosPrivate from "../API/axiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/reducers/currentUser";
import apiRoutes from "../API/config/apiRoutes";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.data);

  const refreshToken = async () => {
    try {
      const response = await axiosPrivate.post(`${apiRoutes.REFRESH_TOKEN}/37`);
      const newAccessToken = response.data.body;
      const newUser = { ...currentUser, token: newAccessToken };

      dispatch(setCurrentUser(newUser));
      return newAccessToken;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return refreshToken;
};

export default useRefreshToken;
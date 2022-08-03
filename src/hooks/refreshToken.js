import axiosPrivate from "../API/axiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/reducers/currentUser";
import apiRoutes from "../API/config/apiRoutes";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.currentUser.data);

  const refreshToken = async () => {
    try {
      const response = await axiosPrivate.get(apiRoutes.REFRESH_TOKEN);
      const {token, user} = response.data.body;
      const payload = { token, user };

      dispatch(setCurrentUser(payload));
      return token;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return refreshToken;
};

export default useRefreshToken;

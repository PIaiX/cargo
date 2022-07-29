import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../store/reducers/currentUser"
import axiosPrivate from "../API/axiosPrivate";
import apiRoutes from "../API/config/apiRoutes";

const useInitialAuth = () => {
    const dispatch = useDispatch();
    
    const currentUser = useSelector((state) => state.currentUser.data)

    useEffect(() => {
        const getToken = async () => {
          try {
            const response = await axiosPrivate.post(
              `${apiRoutes.REFRESH_TOKEN}/37`
            );

            const payload = {...currentUser, token: response.data.body}
            dispatch(setCurrentUser(payload));
          } catch (error) {
            console.log(error);
          }
        };
    
        getToken();
      }, []);
}

export default useInitialAuth
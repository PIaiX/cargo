import React, { useEffect } from "react";
import axiosPrivate from "../API/axiosPrivate";
import useRefreshToken from "./refreshToken";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken();
  const currentUserToken = useSelector((state) => state.currentUser.data.token);

  useEffect(() => {

    const requestInterceptor = axiosPrivate.interceptors.request.use((request) => {
        if(!request.headers["Authorization"]){
            request.headers["Authorization"] = `Bearer ${currentUserToken}`
        }
        return request
    }, (error) => {
        Promise.reject(error)
    })

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if(error.response.status === 403 && !prevRequest.isSent){
            console.log("interceptor is working")
            prevRequest.isSent = true
            const newAccessToken = await refreshToken()
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
            return axiosPrivate(prevRequest)
        }
        Promise.reject(error)
      }
    );

    return () => {
        axiosPrivate.interceptors.request.eject(requestInterceptor)
        axiosPrivate.interceptors.response.eject(responseInterceptor)
    }

  }, [currentUserToken, refreshToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;

import React, { useEffect, useState } from "react";
import useRefreshToken from "./refreshToken";
import { logout } from "../API/auth";
import { useDispatch } from "react-redux";

const useInitialAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const dispatch = useDispatch()
  const rememberMe = JSON.parse(localStorage.getItem("rememberMe"))

  useEffect(() => {
    const getToken = async () => {
      if(rememberMe === false){
        setIsLoading(false)
        return logout(dispatch)
      } 

      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getToken();
  }, []);

  return isLoading;
};

export default useInitialAuth;

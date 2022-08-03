import apiRoutes from "./config/apiRoutes"
import { resetCurrentUser } from "../store/reducers/currentUser"
import axiosPrivate from "./axiosPrivate"

export const logout = async (dispatch) => {
    try {
        await axiosPrivate.get(apiRoutes.LOGOUT)
        localStorage.setItem("rememberMe", false)
        dispatch(resetCurrentUser())
    } catch (error) {
        console.log(error)
    }
}

export const handleRemeberMe = (rememberMe) => {
    localStorage.setItem("rememberMe", rememberMe)
}

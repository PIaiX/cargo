import axios from 'axios'
import apiRoutes from "./config/apiRoutes";
const site = process.env.REACT_APP_BASE_URL

export const getAccountType = async () => {
    try {
        const response = await axios.get(`${site}${apiRoutes.ACCOUNT_TYPES}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export const updateUserInfo = async (id, formData, axiosPrivate) => {
    try {
        const response = await axiosPrivate.patch(`${site}${apiRoutes.UPDATE_USER}/${id}`, formData)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteUserAvatar = async (id, axiosPrivate) => {
    try {
        const response = await axiosPrivate.delete(`${site}${apiRoutes.DELETE_AVATAR}/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

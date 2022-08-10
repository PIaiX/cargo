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

export const updateUserInfo = async (axiosPrivate, id, formData, ) => {
    try {
        const response = await axiosPrivate.patch(`${site}${apiRoutes.ACTIONS_USER}/${id}`, formData)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteUserAvatar = async (axiosPrivate, id ) => {
    try {
        const response = await axiosPrivate.delete(`${site}${apiRoutes.DELETE_AVATAR}/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getUserInfo = async (userId) => {
    try {
        const response = await axios.get(`${site}${apiRoutes.ACTIONS_USER}/${userId}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const reportUser = async (axiosPrivate, ids) =>{
    try {
        const response = await axiosPrivate.post(`${site}${apiRoutes.REPORT_USER}`, ids)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
import apiRoutes from "./config/apiRoutes";
import axios from "axios";

const site = process.env.REACT_APP_BASE_URL

const searchRoute = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.ROUTE_SEARCH}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export const createRoute = async (payload ,axiosPrivate) => {
    try {
        const response = axiosPrivate.post(`${site}${apiRoutes.ROUTE_ACTIONS}`, payload)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getRoutePage = async (id,axiosPrivate) => {
    try {
        const response = axiosPrivate.get(`${site}${apiRoutes.ROUTE_ACTIONS}/${id}`)
        return response
    } catch (error) {

    }
}

export const getUserRoutes = async (limit,page,userId, axiosPrivate) => {
    try {
        const response = axiosPrivate.post(`${site}${apiRoutes.ROUTE_NOT_ARCHIVE}/${userId}`, {limit,page, orderBy:'desc'})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const saveTemplateRoute = async (data,dataTemplate,axiosPrivate) => {
    try {
        const response = axiosPrivate.post(`${site}${apiRoutes.SAVE_TEMPLATE}`, {...data, ...dataTemplate})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getTemplates = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = axiosPrivate.post(`${site}${apiRoutes.GET_TEMPLATES}/${userId}`, {page, limit, orderBy: 'desc'})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteTemplate = async (templateId,axiosPrivate) => {
    try {
        return axiosPrivate.delete(`${site}${apiRoutes.DELETE_TEMPLATES}/${templateId}`)
    } catch (error) {
        console.log(error)
    }
}

export const updateRoute = async (id,data,axiosPrivate) => {
    try {
        const response = axiosPrivate.patch(`${site}${apiRoutes.UPDATE_ROUTE}/${id}`, data)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getArchiveRoutes = async (limit,page,userId,axiosPrivate) => {
    try {
         const response = axiosPrivate.post(`${site}${apiRoutes.USER_ARCHIVE_ROUTES}/${userId}`, {page, limit})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteRoute = async (id,axiosPrivate) => {
    try {
        return axiosPrivate.delete(`${site}${apiRoutes.DELETE_ROUTE}/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export const updateTemplateRouteName = async (axiosPrivate, idTemplate, userId, data) => {
    try {
        const response = axiosPrivate.patch(`${site}${apiRoutes.UPDATE_NAME_TEMP}/${idTemplate}`, {userId, ...data})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getRoutesInCity = async (city, page= 1, limit = 6) => {
    try {
        const response = axios.post(`${site}${apiRoutes.ROUTE_CITY}/${city}`, {page, limit, orderBy: 'desc'})
        return response
    } catch (error) {
        console.log(error)
    }
}

export const unArchivedRoutes = async (axiosPrivate, routeId) => {
    try {
        return axiosPrivate.post(`${site}${apiRoutes.ROUTE_UNARCHIVE}/${routeId}`)
    } catch (error) {
        console.log(error)
    }
}
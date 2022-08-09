import apiRoutes from "../API/config/apiRoutes";
import axios from 'axios';

const getItemTypes = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ITEM_TYPES}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const getPackageTypes = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_PACKAGE_TYPES}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const getCargoCount = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_COUNT}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const searchCargo = async (page, limit, payloads = {}) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_SEARCH}`, {page, limit, ...payloads})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const paginateCargo = async (city, page, limit) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_PAGINATE}/${city}`, {page, limit})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const getNotArchivedCargo = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_NOT_ARCHIVE}/${userId}`, {page, limit})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const getArchivedCargo = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ARCHIVE}/${userId}`, {page, limit})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const unArchiveCargo = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_UNARCHIVE}/${id}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const getCargo = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const updateCargo = async (axiosPrivate, id, payloads) => {
    try {
        const response = await axiosPrivate.patch(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`, payloads)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const deleteCargo = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.delete(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const createCargo = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}`, payloads)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export {getItemTypes, getPackageTypes, getCargoCount, searchCargo, paginateCargo, getNotArchivedCargo, getArchivedCargo, unArchiveCargo, getCargo, updateCargo, deleteCargo, createCargo}
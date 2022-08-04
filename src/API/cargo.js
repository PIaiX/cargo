import apiRoutes from "../API/config/apiRoutes";
import axios from 'axios';

const getCount = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_COUNT}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const searchCargo = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_SEARCH}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const paginateCargo = async (city) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_PAGINATE}/${city}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getNotArchiveCargo = async (axiosPrivate, userId) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_NOT_ARCHIVE}/${userId}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getArchiveCargo = async (axiosPrivate, userId) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ARCHIVE}/${userId}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const unArchiveCargo = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_UNARCHIVE}/${id}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getCargo = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const updateCargo = async (axiosPrivate, id, payloads) => {
    try {
        const response = await axiosPrivate.patch(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`, payloads)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const deleteCargo = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.delete(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const createCargo = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}`, payloads)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export {getCount, searchCargo, paginateCargo, getNotArchiveCargo, getArchiveCargo, unArchiveCargo, getCargo, updateCargo, deleteCargo, createCargo}
import apiRoutes from "../API/config/apiRoutes";

const getCarTypes = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CAR_TYPES}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getCars = async (axiosPrivate, userId, page = 1, limit = '') => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARS}/${userId}`, {page, limit})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const createCar = async (axiosPrivate, payloads, userId) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CAR}`, {...payloads, userId})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getCar = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CAR}/${id}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const updateCar = async (axiosPrivate, payloads, userId) => {
    try {
        const response = await axiosPrivate.patch(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CAR}/${payloads.id}`, {...payloads, userId})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const deleteCar = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.delete(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CAR}/${id}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export {getCarTypes, getCars, createCar, getCar, updateCar, deleteCar}
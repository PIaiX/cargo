import apiRoutes from "./config/apiRoutes";

const acceptResponse = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.patch(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_ACTIONS}/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const rejectResponse = async (axiosPrivate, id) => {
    try {
        const response = await axiosPrivate.delete(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_ACTIONS}/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getIncomingsRouteResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INCOMINGS_ROUTE}/${userId}`, {page, limit})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getIncomingsCargoResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INCOMINGS_CARGO}/${userId}`, {page, limit})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getOutgoingsRouteResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_OUTGOINGS_ROUTE}/${userId}`, {page, limit})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getOutgoingsCargoResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_OUTGOINGS_CARGO}/${userId}`, {page, limit})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getInProcessRouteResponses = async (axiosPrivate, userId) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INPROCESS_ROUTE}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getInProcessCargoResponses = async (axiosPrivate, userId) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INPROCESS_CARGO}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCompletedRouteResponses = async (axiosPrivate, userId) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_COMPLETED_ROUTE}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCompletedCargoResponses = async (axiosPrivate, userId) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_COMPLETED_CARGO}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {
    acceptResponse,
    rejectResponse,
    getIncomingsRouteResponses,
    getIncomingsCargoResponses,
    getOutgoingsRouteResponses,
    getOutgoingsCargoResponses,
    getInProcessRouteResponses,
    getInProcessCargoResponses,
    getCompletedRouteResponses,
    getCompletedCargoResponses
}

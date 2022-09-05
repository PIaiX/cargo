import apiRoutes from "./config/apiRoutes";

const createResponse = async (axiosPrivate, payload) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_ACTIONS}`, payload)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

const acceptResponse = async (axiosPrivate, id, payloads) => {
    try {
        const response = await axiosPrivate.patch(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_ACCEPT}/${id}`, payloads)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const completeResponse = async (axiosPrivate, id) => {
    try {
        const response = axiosPrivate.patch(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_COMPLETE}/${id}`)
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
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INCOMINGS_ROUTE}/${userId}`, {page, limit, orderBy: 'desc'})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getIncomingsCargoResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INCOMINGS_CARGO}/${userId}`, {page, limit, orderBy: 'desc'})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getOutgoingsRouteResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_OUTGOINGS_ROUTE}/${userId}`, {page, limit, orderBy: 'desc'})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getOutgoingsCargoResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_OUTGOINGS_CARGO}/${userId}`, {page, limit, orderBy: 'desc'})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getInProcessRouteResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INPROCESS_ROUTE}/${userId}`, {page, limit})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getInProcessCargoResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INPROCESS_CARGO}/${userId}`, {page, limit})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCompletedRouteResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_COMPLETED_ROUTE}/${userId}`, {page, limit})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCompletedCargoResponses = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_COMPLETED_CARGO}/${userId}`, {page, limit})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {
    createResponse,
    acceptResponse,
    completeResponse,
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

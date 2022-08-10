import apiRoutes from "./config/apiRoutes";

const acceptResponse = (axiosPrivate, id) => {
    try {
        const response = axiosPrivate.patch(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_ACTIONS}/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const rejectResponse = (axiosPrivate, id) => {
    try {
        const response = axiosPrivate.delete(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_ACTIONS}/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getIncomingsRouteResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INCOMINGS_ROUTE}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getIncomingsCargoResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INCOMINGS_CARGO}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getOutgoingRouteResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_OUTGOINGS_ROUTE}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getOutgoingCargoResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_OUTGOINGS_CARGO}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getInProcessRouteResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INPROCESS_ROUTE}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getInProcessCargoResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_INPROCESS_CARGO}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCompletedRouteResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_COMPLETED_ROUTE}/${userId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getCompletedCargoResponses = (axiosPrivate, userId) => {
    try {
        const response = axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RESPONSE_COMPLETED_CARGO}/${userId}`)
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
    getOutgoingRouteResponses,
    getOutgoingCargoResponses,
    getInProcessRouteResponses,
    getInProcessCargoResponses,
    getCompletedRouteResponses,
    getCompletedCargoResponses
}

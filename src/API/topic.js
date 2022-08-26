import axios from 'axios';
import apiRoutes from './config/apiRoutes';

const paginateTopics = async (page, limit) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_PAGINATE}`, {page, limit})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const searchTopics = async (page, limit, query, orderBy = 'asc') => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_SEARCH}`, {
            page,
            limit,
            query,
            orderBy
        })
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const getStatistics = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_STATISTICS}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const paginateUserTopics = async (axiosPrivate, userId, page, limit) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_USER_PAGINATE}/${userId}`, {
            page,
            limit
        })
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const likeTopic = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_LIKE}`, payloads)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const resetLikeTopic = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.delete(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_LIKE}`, {data: payloads})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const createTopic = async (axiosPrivate, userId, payloads = {}) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_ACTIONS}`, {
            ...payloads,
            userId
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getTopic = async (id, userId) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_ACTIONS}/${id}/${userId ?? ''}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const createTopicMessage = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_CREATE}`, payloads)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const paginateTopicMessages = async (topicId, userId, page, limit) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_ACTIONS}/${topicId}/${userId}`, {
            page,
            limit
        })
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const paginateLastMessages = async (page, limit, orderBy) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_PAGINATE}`, {
            page,
            limit,
            orderBy
        })
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const likeTopicMessage = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_LIKE}`, payloads)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const resetLikeTopicMessage = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.delete(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_LIKE}`, {data: payloads})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const reportTopic = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.REPORT_TOPIC}`, payloads)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const reportTopicMessage = async (axiosPrivate, payloads) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.REPORT_TOPIC_MESSAGE}`, payloads)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {
    paginateTopics,
    searchTopics,
    getStatistics,
    paginateUserTopics,
    likeTopic,
    resetLikeTopic,
    createTopic,
    getTopic,
    createTopicMessage,
    paginateTopicMessages,
    paginateLastMessages,
    likeTopicMessage,
    resetLikeTopicMessage,
    reportTopic,
    reportTopicMessage
}
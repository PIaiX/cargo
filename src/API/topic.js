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
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_SEARCH}`, {page, limit, query, orderBy})
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
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_USER_PAGINATE}/${userId}`, {page, limit})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const likeTopic = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_LIKE}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const createTopic = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_ACTIONS}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const getTopic = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_ACTIONS}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const createTopicMessage = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_ACTIONS}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const paginateTopicMessage = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_ACTIONS}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const paginateLastMessages = async (page, limit, orderBy) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_PAGINATE}`, {page, limit, orderBy})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const likeTopicMessage = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TOPIC_MESSAGE_LIKE}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export {paginateTopics, searchTopics, getStatistics, paginateUserTopics, likeTopic, createTopic, getTopic, createTopicMessage, paginateTopicMessage, paginateLastMessages, likeTopicMessage}
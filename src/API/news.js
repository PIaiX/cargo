import axios from 'axios';
import apiRoutes from "../API/config/apiRoutes";

const getAllNews = async (page = 1, limit = '', orderBy = 'asc') => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.NEWS}`, {page, limit, orderBy})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getRandomNews = async (limit = 4) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.RANDOM_NEWS}`, {limit})
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

const getSingleNews = async (slug) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.NEWS}/${slug}`)
        return response.data.body
    } catch (error) {
        console.log(error)
    }
}

export {getAllNews, getRandomNews, getSingleNews}
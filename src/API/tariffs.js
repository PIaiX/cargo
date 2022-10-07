import axios from 'axios';
import apiRoutes from './config/apiRoutes';

const getTariffs = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.TARIFFS_GET}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export {getTariffs}
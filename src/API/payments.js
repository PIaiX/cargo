import axios from 'axios';
import apiRoutes from './config/apiRoutes';

const buyTariff = async (userId, tariffType) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.PAYMENTS_BUY_TARIFF}/${userId}`, {tariffType})
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

export {buyTariff}
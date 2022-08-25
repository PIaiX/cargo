import axios from 'axios';
import defineIP from './defineIP';

const defineCity = async () => {
    try {
        const ipAddress = await defineIP()
        const response = await axios.post(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ipAddress}`, {}, {
            headers: {
                "Authorization": `Token ${process.env.REACT_APP_DADATA_TOKEN}`
            }
        })
        return response?.data?.location?.data?.city;
    } catch(error) {
        console.log(error)
        return 'Москва'
    }
}

export default defineCity
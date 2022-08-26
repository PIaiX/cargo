import axios from "axios";

export const getDistance = async (payloads) => {
    try {
        const response = await axios.post(`https://routing.api.2gis.com/carrouting/6.0.0/global?key=53a9b1c0-7ee1-4f78-b6e9-45ef73bf8f98`, payloads)
        return response
    } catch (error) {
        console.log(error)
    }
}
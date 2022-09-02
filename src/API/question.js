import axios from "axios";
import apiRoutes from "./config/apiRoutes";

export const askQuestion = async (payloads) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.QUESTION_ASK}`, payloads)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}
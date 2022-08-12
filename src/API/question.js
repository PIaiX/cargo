import axios from "axios";
import apiRoutes from "./config/apiRoutes";

export const askQuestion = async (payloads) => {
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.QUESTION_ASK}`, payloads)
    } catch (error) {
        console.log(error)
        throw error
    }
}
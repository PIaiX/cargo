import {getAllNews, getAllNewsSuccess, getOneNews, getOneNewsSuccess} from "./../reducers/newsSlice"
import dummyNews from "./../../dummyData/news.json"

export const fetchAllNews = () => {
    return (dispatch) => {
        //Make an API call here
        dispatch(getAllNews())
        setTimeout(() => {
            //Implement error handling later
            dispatch(getAllNewsSuccess(dummyNews))
        }, 2000)
    }
}




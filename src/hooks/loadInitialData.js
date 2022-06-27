import { useEffect } from "react";
import {useDispatch} from "react-redux"
import {fetchAllNews} from "./../store/actions/news"

export const useInitialData = () => {
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(fetchAllNews())
    }, [dispatch])
}

import {useEffect, useState} from 'react';
import {setSelectedCity} from '../store/actions/selectedCity';
import {defineCity} from '../API/defineCity';
import {useDispatch} from 'react-redux/es/exports';

const useSelectedCity = () => {
    const dispatch = useDispatch()
    const [activeCity, setActiveCity] = useState(null)
    const [isDefinedCity, setIsDefinedCity] = useState(false)
    const localStorageUserCity = localStorage.getItem('userCity')

    useEffect(() => {
        if (localStorageUserCity) {
            setActiveCity(localStorageUserCity)
        } else {
            defineCity().then(city => {
                setActiveCity(city)
                setIsDefinedCity(true)
            })
        }
    }, [])

    useEffect(() => {
        if (activeCity) {
            dispatch(setSelectedCity(activeCity))
        }
    }, [activeCity])

    return {city: activeCity, setCity: setActiveCity, isDefinedCity}
}

export default useSelectedCity
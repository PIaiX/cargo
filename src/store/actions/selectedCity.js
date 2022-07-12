import {defineCity, defineCitySuccess, defineCityFailure} from "./../reducers/selectedCitySlice"

const setSelectedCity = (city) => {
    return (dispatch) => {
        dispatch(defineCity())
        dispatch(defineCitySuccess(city))
    }
}

const setSelectedCityFailure = (error) => {
    return (dispatch) => {
        dispatch(defineCity())
        dispatch(defineCityFailure(error))
    }
}

export {setSelectedCity, setSelectedCityFailure}
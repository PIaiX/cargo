import {setAlertAction, showNoAuthAlertAction, resetAlertAction} from "../reducers/alert"
import {NavLink} from 'react-router-dom';

const setAlert = (variant, message) => {
    return (dispatch) => {
        dispatch(setAlertAction({variant, message, isShow: true}))
    }
}

const showNoAuthAlert = () => {
    return (dispatch) => {
        dispatch(showNoAuthAlertAction({
            variant: 'danger',
            message: <span>Эта функция доступна только для авторизованных пользователей. <NavLink to="/login" className="green fw-bold">Войдите</NavLink>, чтобы она была доступна для вас</span>,
            isShow: true
        }))
    }
}

const resetAlert = () => {
    return (dispatch) => {
        dispatch(resetAlertAction())
    }
}

export {setAlert, showNoAuthAlert, resetAlert}
import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux/es/exports';
import {resetAlert} from '../store/actions/alert';

const useAlert = (delay) => {
    const [alertNode, setAlertNode] = useState(null)
    const submitAlert = useSelector(state => state?.alert?.data)
    const dispatch = useDispatch()

    useEffect(() => {
        setAlertNode(
            <Alert className='submit-alert' variant={submitAlert?.variant} show={submitAlert?.isShow}>
                {submitAlert?.message}
            </Alert>
        )

        if(submitAlert?.isShow) {
            const timeoutId = setTimeout(() => dispatch(resetAlert()), delay)

            return () => clearTimeout(timeoutId)
        }
    }, [submitAlert])

    return {alertNode}
}

export default useAlert
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";
import { resetAlert } from "../store/actions/alert";
import Backdrop from "@mui/material/Backdrop";

const useAlert = (delay) => {
  const [alertNode, setAlertNode] = useState(null);
  const submitAlert = useSelector((state) => state?.alert?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setAlertNode(
        <Backdrop sx={{ color: "#fff", zIndex: 342344 }} open={submitAlert?.isShow} onClick={() => dispatch(resetAlert())}>
        <Alert
          className="submit-alert"
          variant={submitAlert?.variant}
          show={submitAlert?.isShow}
        >
          {submitAlert?.message}
        </Alert>
        </Backdrop>
    );

    if(submitAlert?.isShow) {
        const timeoutId = setTimeout(() => dispatch(resetAlert()), delay)

        return () => clearTimeout(timeoutId)
    }
  }, [submitAlert]);

  return { alertNode };
};

export default useAlert;

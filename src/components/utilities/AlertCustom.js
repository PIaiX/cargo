import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { IoCloseOutline } from "react-icons/io5";

export default function AlertCustom({
  open,
  variant = "error",
  onClick,
  title,
  children,
  closeButton = true,
}) {
  const defaultTitle =
    variant === "error" ? "Что-то пошло не так..." : "Успешно!";

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: 342344 }}
        open={open}
        onClick={onClick}
      >
        <div
          style={{
            position: "absolute",
            top: 10,
            width: "100%",
            padding: "0 10px",
            margin: "0px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", minWidth: "50%" }}>
            <Alert severity={variant}>
              <AlertTitle style={{ marginRight: "20px" }}>
                {title ? title : defaultTitle}
              </AlertTitle>
              {closeButton && (
                <button
                  type="button"
                  className="btn-close m-1"
                  onClick={onClick}
                >
                  <IoCloseOutline
                    color={variant === "error" ? "#ff3b3b" : "#28b82b"}
                  />
                </button>
              )}
              <div>{children}</div>
            </Alert>
          </div>
        </div>
      </Backdrop>
    </div>
  );
}

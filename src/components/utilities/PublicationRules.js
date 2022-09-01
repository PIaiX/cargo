import React from 'react'
import { IconContext } from "react-icons";
import { IoCloseOutline } from "react-icons/io5";
import { BsFillInfoSquareFill } from "react-icons/bs";

export default function PublicationRules({setIsShowPublicationRules}) {
  return (
    <div className="small">
            <hr className="mt-4 mb-2" />
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center fs-11 mb-3">
                <IconContext.Provider
                  value={{
                    className: "icon-10 blue",
                    title: "Правила публикации",
                  }}
                >
                  <BsFillInfoSquareFill />
                </IconContext.Provider>
                <span className="blue ms-2">Правила публикации</span>
              </div>
              <button
                type="button"
                className="btn-close"
                style={{ position: "relative" }}
                onClick={() => setIsShowPublicationRules(false)}
              >
                <IoCloseOutline />
              </button>
            </div>
            <p className="gray-3">
              Администрация сайта не несет ответственности за информацию,
              публикуемую в форуме, и ее мнение может не совпадать с мнением
              авторов сообщений. Сообщения о незаконно размещенной информации на
              форуме присылайте на адрес:
              <a href="mailto:mail@gmail.com">mail@gmail.com</a>
            </p>
          </div>
  )
}

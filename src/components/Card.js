import React from "react";
import { Link } from "react-router-dom";
import {
  IoWine,
  IoSnow,
  IoShieldCheckmarkSharp,
  IoEllipsisVertical,
} from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";
import { IconContext } from "react-icons";

export default function Card(props) {
  const type = props.type;
  const iconsArr = [
    {
      name: "none",
      text: "Нет",
    },
    {
      name: "cold",
      text: "Режим",
      code: <IoSnow />,
    },
    {
      name: "fragile",
      text: "Хрупкое",
      code: <IoWine />,
    },
    {
      name: "dimensional",
      text: "Негабаритные",
      code: <MdLocalShipping />,
    },
  ];
  if (type === "cargo") {
    return (
      <div className={"card-mini " + props.className}>
        <div>
          <div className="title mb-2 mb-sm-3">{props.title}</div>
          {props.route && (
            <div className="fs-11 mt-1 mt-sm-2">
              <span className="fw-5">Маршут:</span> <span>{props.route}</span>
            </div>
          )}
          {props.size && (
            <div className="fs-11 mt-1 mt-sm-2">
              <span className="fw-5">Объем:</span> {props.size} м<sup>2</sup>
            </div>
          )}
          {props.weight && (
            <div className="fs-11 mt-1 mt-sm-2">
              <span className="fw-5">Вес:</span> {props.weight}
            </div>
          )}
          <div className="fs-11 d-flex align-items-center flex-wrap mt-1 mt-sm-2">
            <span className="fw-5">Особые пометки:</span>
            {iconsArr
              .filter((item) => item.name === props.notes)
              .map((item) => {
                return (
                  <div
                    key={item.name}
                    className="d-flex align-items-center ms-1"
                  >
                    <span>{item.text}</span>
                    {item.code && <div className="icon ms-1">{item.code}</div>}
                  </div>
                );
              })}
          </div>
        </div>
        <Link to={props.url} className="btn btn-1 mt-2 mt-sm-4 mt-xl-5">
          Перейти
        </Link>
        {props.profileView && (
          <div className="dropdown dropstart">
            <button
              type="button"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IconContext.Provider
                value={{
                  className: "icon-20 green",
                  title: "Пожаловаться на пользователя",
                }}
              >
                <IoEllipsisVertical />
              </IconContext.Provider>
            </button>
            <ul className="dropdown-menu py-2">
              <li>
                <Link to={`/edit-${props.type}/${props.id}`}>Редактировать</Link>
              </li>
              <li>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-ad"
                >
                  Удалить
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  } else if (type === "car") {
    return (
      <div className={"card-mini " + props.className}>
        <div>
          <div className="title mb-2 mb-sm-3">{props.route}</div>
          {props.carType && (
            <div className="fs-12 mt-1 mt-sm-2">
              <span className="fw-7 me-2">{props.carType}</span>
              <span className="green">
                {props.verified && <IoShieldCheckmarkSharp />}
              </span>
            </div>
          )}
          {props.date && (
            <div className="fs-11 mt-1 mt-sm-2">
              <span className="fw-5">Дата:</span> {props.date}
            </div>
          )}
          {props.carrying && (
            <div className="fs-11 mt-1 mt-sm-2">
              <span className="fw-5">Грузоподъемность:</span> {props.carrying} т
            </div>
          )}
          {props.size && (
            <div className="fs-11 mt-1 mt-sm-2">
              <span className="fw-5">Свободный объем:</span> {props.size} м
              <sup>2</sup>
            </div>
          )}
          {props.dimensions && (
            <div className="fs-11 mt-1 mt-sm-2">
              <span className="fw-5">Габариты кузова:</span> {props.dimensions}{" "}
              м
            </div>
          )}
        </div>
        <Link to={props.url} className="btn btn-1 mt-2 mt-sm-3 mt-xl-4">
          Перейти
        </Link>
        {props.profileView && (
          <div className="dropdown dropstart">
            <button
              type="button"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IconContext.Provider
                value={{
                  className: "icon-20 green",
                  title: "Пожаловаться на пользователя",
                }}
              >
                <IoEllipsisVertical />
              </IconContext.Provider>
            </button>
            <ul className="dropdown-menu py-2">
              {props.profileView === "archive" && (
                <li>
                  <button type="button">Восстановить</button>
                </li>
              )}
              <li>
                <Link to={`/edit-${props.type}/${props.id}`}>Редактировать</Link>
              </li>
              <li>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#delete-ad"
                >
                  Удалить
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="card-mini">
        произошла ошибка. не указан тип - груз/машина
      </div>
    );
  }
}

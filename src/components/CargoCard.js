import React from 'react';
import {NavLink} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {IoEllipsisVertical, IoSnow, IoWine} from 'react-icons/io5';
import {MdLocalShipping} from 'react-icons/md';

const CargoCard = (props) => {

    const icons = [
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

    return (
        <div className={`card-mini ${props.className ?? ''}`}>
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
                    {icons
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
            <NavLink to={`/cargo-page/${props.id}`} className="btn btn-1 mt-2 mt-sm-4 mt-xl-5">
                Перейти
            </NavLink>
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
                            <IoEllipsisVertical/>
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li>
                            <NavLink to={`/edit-cargo/${props.id}`}>Редактировать</NavLink>
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
};

export default CargoCard;
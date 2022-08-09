import React from 'react';
import {NavLink} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {IoEllipsisVertical} from 'react-icons/io5';
import {icons} from '../helpers/cargo';

const CargoCard = (props) => {

    return (
        <div className="card-mini__wrapper">
            <div className={`card-mini ${props.className ?? ''}`}>
                <div>
                    {props.id && <div className="title mb-2 mb-sm-3">Груз № {props.id}</div>}
                    {props.route && (
                        <div className="fs-11 mt-1 mt-sm-2">
                            <span className="fw-5">Маршут:</span> <span>{props.route}</span>
                        </div>
                    )}
                    {props.capacity && (
                        <div className="fs-11 mt-1 mt-sm-2">
                            <span className="fw-5">Общий объем:</span> {props.capacity} м<sup>2</sup>
                        </div>
                    )}
                    {props.weight && (
                        <div className="fs-11 mt-1 mt-sm-2">
                            <span className="fw-5">Общий вес:</span> {props.weight}
                        </div>
                    )}
                    {(props?.notesType?.length > 0) && (
                        <div className="fs-11 d-flex align-items-center flex-wrap mt-1 mt-sm-2 card-mini__notes">
                            <span className="fw-5">Особые пометки:</span>
                            <div className="d-flex align-items-center">
                                {props.notesType.map(item => (
                                    icons.map(i => {
                                        return (i.id === item) && <div
                                            key={i.id}
                                            className="d-flex align-items-center ms-1"
                                        >
                                            <span>{i.text}</span>
                                            {i.element && <div className="icon ms-1">{i.element}</div>}
                                        </div>
                                    })
                                ))}
                            </div>
                        </div>
                    )
                    }
                </div>
                <NavLink to={`/cargo-page/${props.id}`} className="btn btn-1 mt-2 mt-sm-4 mt-xl-5">
                    Перейти
                </NavLink>
                {props.hasActions && (
                    <div className="dropdown dropstart">
                        <button
                            type="button"
                            className="dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <IconContext.Provider
                                value={{className: "icon-20 green"}}
                            >
                                <IoEllipsisVertical/>
                            </IconContext.Provider>
                        </button>
                        <ul className="dropdown-menu py-2">
                            {props.archived && <li>
                                <button
                                    type="button"
                                    onClick={() => props.callback && props.callback({id: props.id, type: 'revovery'})}
                                >
                                    Восстановить
                                </button>
                            </li>}
                            <li>
                                <NavLink to={`/edit-cargo/${props.id}`}>Редактировать</NavLink>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => props.callback && props.callback({id: props.id, type: 'delete'})}
                                >
                                    Удалить
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CargoCard;
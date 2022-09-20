import React, {memo, useEffect, useState} from 'react';
import {IoEllipsisVertical} from 'react-icons/io5';
import {IconContext} from "react-icons";
import {NavLink} from "react-router-dom";
import {getRoute} from "../helpers/cargo";


const ResponseCard = (props) => {
    
    const uploadPhoto = (img) => {
        const site = 'https://api.eritrans.ru/uploads/./'
        if (img === null) {
            return '/img/users/no-photo.png'
        } else {
            return `${site}${img}`
        }
    }

    const cargoRoute = getRoute(props.cargo, false)

    return (
        <div className={"response " + props.className}>
            <div className='d-flex align-items-center mb-3'>
                <img src={uploadPhoto(props?.img)} alt={props.name} className="img"/>
                <div className='flex-1 ms-2 fs-11'>
                    {props?.subject ? <div className='fw-6'><NavLink to={`/view-profile/${props.userId}`}>{props.company}</NavLink></div> : ''}
                    <div className='fw-5 mt-1'><NavLink to={`/view-profile/${props.userId}`}>{props.name}</NavLink></div>
                </div>
            </div>
            {props.idCargo &&
                <div>
                    <NavLink to={`/cargo-page/${props.idCargo}`} className='link-to-product'>Груз №{props.idCargo} {cargoRoute}</NavLink>
                </div>
            }
            {props.idRoute &&
                <div>
                    <NavLink to={`/route-page/${props.idRoute}`} className='link-to-product'>Маршрут №{props.idRoute} {props.route.fromRoute} - {props.route.toRoute}</NavLink>
                </div>
            }
            {
                (props.type === 1 && props.inWork === true) ?
                    <div className='px-4'>
                        <button
                            type='button'
                            className="btn btn-1 w-100 mt-3"
                            onClick={() => props?.callbackComplete && props?.callbackComplete(props?.id)}
                        >
                            Выполнить
                        </button>
                        <button
                            type='button'
                            className="btn btn-2 w-100 mt-2"
                            onClick={() => props?.callbackDelete && props?.callbackDelete(props?.id)}
                        >
                            Отменить
                        </button>
                    </div>
                    : (props.type === 0 && props.inWork === false) ?
                        <div className='px-4'>
                            <button
                                type='button'
                                className="btn btn-1 w-100 mt-3"
                                onClick={() => {
                                    props?.callbackComplete && props?.callbackComplete(props?.id, (props?.idRoute || props?.idCargo))
                                }}
                            >
                                Принять
                            </button>
                            <button
                                type='button'
                                className="btn btn-2 w-100 mt-2"
                                onClick={() => props?.callbackDelete && props?.callbackDelete(props?.id)}
                            >
                                Отклонить
                            </button>
                        </div>
                        : (props.type === 2 && props.inWork === false) ?
                            <div className='px-4'>
                                <button
                                    type='button'
                                    className="btn btn-1 w-100 mt-3"
                                    onClick={() => props?.callbackDelete && props?.callbackDelete(props?.id)}
                                >
                                    Отменить
                                </button>
                            </div>
                            : ''
            }

            {
                (props.inWork && props?.type === 1) &&
                <div className="dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider
                            value={{className: "icon-20 green", title: "Пожаловаться на пользователя"}}>
                            <IoEllipsisVertical/>
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li>
                            <NavLink to='/personal-account/user-documents'>Сформировать документ</NavLink>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default memo(ResponseCard)
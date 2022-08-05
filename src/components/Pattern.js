import React, {useEffect, useState} from 'react';
import { IconContext  } from "react-icons";
import { IoTrash, IoCaretDown, IoEllipsisVertical } from 'react-icons/io5';
import {NavLink} from "react-router-dom";

const Pattern = (props) => {
    
    const [car, setCar] = useState({})
    
    useEffect(() => {
        props?.car && setCar(props.car)
    }, [props.car])

    return (
        <details className={props.className}>
            <summary className='d-flex align-items-center justify-content-between'>
                <div>
                    <h5 className='gray-2 mb-1'>
                        <span className='me-2'>{props.title}</span>
                        <IconContext.Provider value={{className: "icon-10", title: "Раскрыть" }}>
                            <IoCaretDown />
                        </IconContext.Provider>
                    </h5>
                    {
                        (props.car)&&
                        <div className='fs-11'>{props.car?.bodyType.name}</div>
                    }
                </div>
                {/*mobile*/}
                <div className="d-block d-md-none dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider value={{className: "icon-20 gray-4", title: "Пожаловаться на пользователя" }}>
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li>
                            <NavLink
                                type='button'
                                to={props.url}
                            >
                                Открыть
                            </NavLink>
                        </li>
                        <li>
                            <button
                            type='button'
                            onClick={() => props?.callbackForRename && props.callbackForRename(props.id)}
                            >
                                Переименовать
                            </button>
                        </li>
                        <li>
                            <button
                                type='button'
                                onClick={() => props?.callbackForDelete && props.callbackForDelete(props.id)}
                            >
                                Удалить
                            </button>
                        </li>
                    </ul>
                </div>
                {/*des*/}
                <div className='d-none d-md-flex'>
                    <NavLink
                        type='button'
                        className='btn btn-1 fs-09'
                        to={props.url}
                    >
                        Открыть
                    </NavLink>
                    <button
                        type='button'
                        className='btn btn-1 fs-09 ms-2 ms-xxl-3'
                        onClick={() => props?.callbackForRename && props.callbackForRename(props.id)}
                    >
                        Переименовать
                    </button>
                    <button
                        type='button'
                        onClick={() => props?.callbackForDelete && props.callbackForDelete(props.id)}
                        className='ms-3 ms-xxl-4'
                    >
                        <IconContext.Provider value={{className: "icon-15 gray-4", title: "Удалить" }}>
                            <IoTrash />
                        </IconContext.Provider>
                    </button>
                </div>
            </summary>
            <div className='mt-3'>
                <table>
                    <tbody>
                        <tr>
                            <th>Маршрут:</th>
                            <td>{props.fromRoute} - {props.toRoute}</td>
                        </tr>
                        <tr>
                            <th>Дата:</th>
                            <td>{props.date ? 'постоянно' : 'единожды'}</td>
                        </tr>
                        <tr>
                            <th>О&nbsp;машине:</th>
                            <td>{car && `${car?.bodyType?.name}, ${car?.name}, ${car?.carrying}Т,${car?.capacity}м3, ${car?.length}/${car?.width}/${car?.height}`}</td>
                        </tr>
                        <tr>
                            <th>Оплата:</th>
                            <td>
                                {props.bargainType ? 'возможен торг' : "без торга"},&nbsp;
                                {props.calculateType ? "наличный расчет" : "перевод по карте"},&nbsp;
                                {props.notVatPrice && `цена без НДС:${props.notVatPrice} ₽`},&nbsp;
                                {props.vatPrice && `цена с НДС:${props.vatPrice} ₽`},&nbsp;
                                предоплата {props.prepayment}%
                            </td>
                        </tr>
                        <tr>
                            <th>Контакты:</th>
                            <td>{props.contacts && `${props.contacts.map(i => i.phone)} ${props.contacts.map(i => i.firstName)}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </details>
    )
}

export default Pattern
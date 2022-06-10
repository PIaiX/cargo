import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoWine, IoSnow, IoShieldCheckmarkSharp, IoEllipsisVertical } from 'react-icons/io5';
import { MdLocalShipping } from "react-icons/md";
import { IconContext  } from "react-icons";

export default function ResponseCard(props) {
    const [more, setMore] = useState(false);

    return (
        <div className={"response " + props.className}>
            <div className='d-flex align-items-center mb-3'>
                <img src={props.img} alt={props.name} className="img"/>
                <div className='flex-1 ms-2 fs-11'>
                    <div className='fw-6'>{props.company}</div>
                    <div className='fw-5 mt-1'>{props.name}</div>
                </div>
            </div>
            <div className='fw-5'>Краткое описание:</div>
            <div>
                {
                    (more || props.text && props.text.length <= 50) ?
                        <>
                            <span>{props.text != undefined && props.text}</span>
                            <span className="more" onClick={() => setMore(false)}>скрыть</span>
                        </>
                        : <>
                            <span>{props.text != undefined && props.text.slice(0, 50) + '...'}</span>
                            <span className="more" onClick={() => setMore(true)}>полностью</span>
                        </>
                }
            </div>
            {
                (props.type === 1) ?
                <div className='px-4'>
                    <button type='button' className="btn btn-1 w-100 mt-3">Принять</button>
                    <button type='button' className="btn btn-2 w-100 mt-2">Отклонить</button>
                </div>
                : <div className='px-4'>
                    <button type='button' className="btn btn-1 w-100 mt-3">Отменить</button>
                </div>
            }
            
            {
                (props.inWork) &&
                <div className="dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider value={{className: "icon-20 green", title: "Пожаловаться на пользователя" }}>
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        {
                            (props.profileView === 'archive')&&
                            <li><button type='button'>Восстановить</button></li>
                        }
                        <li><Link to="/add-car">Сформировать документ</Link></li>
                        <li><button type='button' data-bs-toggle="modal" data-bs-target="#delete-ad">Удалить</button></li>
                    </ul>
                </div>
            }
        </div>
    )
}

import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { IconContext  } from "react-icons";
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPencilSquare, BsPrinter, BsDownload, BsTrash } from "react-icons/bs";

export default function DocPreview(props) {
    const navigate = useNavigate();

    return (
        <div
            className={`docs-preview ${props.className ?? ''}`}
            onClick={() => navigate(`/document/${props.docId}`)}
        >
            <div className='title' title={props.title}>{props.title}</div>
            <div className='number'>№ {props.number}</div>
            <div className='date'>{props.date}</div>
            <div className='contractor'>
                <Link to={props.contractor.url} className='blue bb-1' onClick={e => e.stopPropagation()}>
                    {props.contractor.name}
                </Link>
            </div>
            <div className="dropdown dropstart">
                <button
                    type='button'
                    className='dropdown-toggle'
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={e => e.stopPropagation()}
                >
                    <IconContext.Provider value={{className: "icon-15 gray-4", title: "Пожаловаться на пользователя" }}>
                        <IoEllipsisVertical />
                    </IconContext.Provider>
                </button>
                <ul className="dropdown-menu py-2">
                    <li>
                        <button type='button' onClick={e => e.stopPropagation()}>
                            <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Редактировать" }}>
                                <BsPencilSquare />
                            </IconContext.Provider>
                            <span className='ms-3'>Редактировать</span>
                        </button>
                    </li>
                    <li>
                        <button type='button' onClick={e => e.stopPropagation()}>
                            <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Скачать" }}>
                                <BsDownload />
                            </IconContext.Provider>
                            <span className='ms-3'>Скачать</span>
                        </button>
                    </li>
                    <li>
                        <button type='button' onClick={e => e.stopPropagation()}>
                            <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Печать" }}>
                                <BsPrinter />
                            </IconContext.Provider>
                            <span className='ms-3'>Печать</span>
                        </button>
                    </li>
                    <li>
                        <button type='button' onClick={e => e.stopPropagation()}>
                            <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Удалить" }}>
                                <BsTrash />
                            </IconContext.Provider>
                            <span className='ms-3'>Удалить</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
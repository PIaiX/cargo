import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPencilSquare, BsPrinter, BsDownload, BsTrash } from "react-icons/bs";

export default function DocPreview(props) {
    const view = props.type;

    return (
        <div className={'docs-preview ' + props.className}>
            <label>
                <input type='checkbox' name={props.docId}/>
            </label>
            {
                (view === 'doc')?
                <div className='title' title={props.title}>{props.title}</div>
                : <div className='title'>
                    <div>{props.title}</div>
                    <div>{props.note}</div>
                </div>
            }
            {
                (view === 'doc')&&
                <div className='number'>№ {props.number}</div>
            }
            {
                (view === 'doc')&&
                <div className='date'>{props.date}</div>
            }
            {
                (view === 'pattern')&&
                <div className='doc-type'>{props.docType}</div>
            }
            <div className='contractor'>
                <Link to={props.contractor.url} className='blue bb-1'>
                    {props.contractor.name}
                </Link>
            </div>
            <div className="dropdown dropstart">
                <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                    <IconContext.Provider value={{className: "icon-15 gray-4", title: "Пожаловаться на пользователя" }}>
                        <IoEllipsisVertical />
                    </IconContext.Provider>
                </button>
                <ul className="dropdown-menu py-2">
                    <li>
                        <button type='button'>
                            <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Редактировать" }}>
                                <BsPencilSquare />
                            </IconContext.Provider>
                            <span className='ms-3'>Редактировать</span>
                        </button>
                    </li>
                    <li>
                        <button type='button'>
                            <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Скачать" }}>
                                <BsDownload />
                            </IconContext.Provider>
                            <span className='ms-3'>Скачать</span>
                        </button>
                    </li>
                    <li>
                        <button type='button'>
                            <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Печать" }}>
                                <BsPrinter />
                            </IconContext.Provider>
                            <span className='ms-3'>Печать</span>
                        </button>
                    </li>
                    <li>
                        <button type='button'>
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
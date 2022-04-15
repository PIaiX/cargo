import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { IoFolderOpen, IoFolderOpenOutline, IoCaretDown } from 'react-icons/io5';

export default function ForumSection(props) {
    return (
        <div className='forum-section'>
            <div className='icon'>
                <IconContext.Provider value={{className: "green", title: "Раздел" }}>
                    <IoFolderOpen />
                </IconContext.Provider>
            </div>
            <div className='text'>
                <div className='fs-11 fw-5 title-font text-truncate'>{props.title}</div>
                {
                    (props.subsections) &&
                    <div className="dropdown">
                        <button type='button' className='dropdown-toggle green d-flex align-items-center' data-bs-toggle="dropdown" aria-expanded="false">
                            <span className='me-1'>Подразделы</span>
                            <IconContext.Provider value={{className: "icon-10 green"}}>
                                <IoCaretDown />
                            </IconContext.Provider>
                        </button>
                        <ul className="dropdown-menu py-2">
                            {
                                props.subsections.map(function(item, index) {
                                    return (
                                        <li key={index}>
                                            <Link to={item.url}>
                                                <IconContext.Provider value={{className: "icon-10 fs-12 green"}}>
                                                    <IoFolderOpenOutline />
                                                </IconContext.Provider>
                                                <span className='ms-3'>{item.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
                {
                    (props.info)&&
                    <div className='mt-1'>{props.info}</div>
                }
            </div>
            <div className='topics'>{props.topics} <span className='d-none d-xxl-inline'>тем</span></div>
            <div className='messages'>{props.messages} <span className='d-none d-xxl-inline'>сообщений</span></div>
            <div className='latest'>{props.latest}</div>
        </div>
    )
}
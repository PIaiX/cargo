import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { IoFolderOpen, IoFolderOpenOutline } from 'react-icons/io5';

export default function ForumSection(props) {
    return (
        <div className='forum-section'>
            <div className='icon'>
                <IconContext.Provider value={{className: "icon-20 green", title: "Раздел" }}>
                    <IoFolderOpen />
                </IconContext.Provider>
            </div>
            <div className='text'>
                <div className='fs-12 fw-5 title-font text-truncate'>{props.title}</div>
                {
                    (props.subsections) &&
                    <div className="dropdown">
                        <button type='button' className='dropdown-toggle green fs-11' data-bs-toggle="dropdown" aria-expanded="false">Подразделы</button>
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
                    <div>{props.info}</div>
                }
            </div>
            <div className='topics'>{props.topics} тем</div>
            <div className='messages'>{props.messages} сообщений</div>
            <div className='latest'>{props.latest}</div>
        </div>
    )
}
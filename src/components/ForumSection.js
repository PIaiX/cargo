import React from 'react';
import {NavLink} from 'react-router-dom';
import { IconContext  } from "react-icons";
import { IoFolderOpen } from 'react-icons/io5';

export default function ForumSection(props) {
    return (
        <div className='forum-section'>
            <div className='icon'>
                <IconContext.Provider value={{className: "green", title: "Раздел" }}>
                    <IoFolderOpen />
                </IconContext.Provider>
            </div>
            <div className='text-topic'>
                <NavLink to={`/forum-section/${props.id}`} className='fs-11 fw-5 title-font text-truncate d-block'>{props.title}</NavLink>
                {
                    (props.info) &&
                    <div className='info mt-1'>{props.info}</div>
                }
            </div>
            <div className='messages'>{props.messages}</div>
            <div className='latest'>
                <div className='mb-1'>{props.latest}</div>
                <div className='blue text-decoration-underline'>Имя пользователя</div>
            </div>
        </div>
    )
}
import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { IoFolderOpenOutline, IoCaretDown } from 'react-icons/io5';
import { BsFillChatRightTextFill, BsFillPinAngleFill } from "react-icons/bs";

export default function ForumTopic(props) {
    return (
        <div className='forum-section'>
            <div className='icon'>
                {
                    (props.fixedTopic) ?
                    <IconContext.Provider value={{className: "gray-4", title: "Тема" }}>
                        <BsFillPinAngleFill />
                    </IconContext.Provider>
                    :<IconContext.Provider value={{className: "gray-4", title: "Тема" }}>
                        <BsFillChatRightTextFill />
                    </IconContext.Provider>
                }
            </div>
            <div className='text-topic'>
                <Link to="/forum-section" className='fs-11 fw-5 title-font text-truncate d-block'>{props.title}</Link>
                {
                    (props.author)&&
                    <div className='info mt-2'>Автор: <Link className='blue text-decoration-underline' to={props.author.url}>{props.author.name}</Link></div>
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
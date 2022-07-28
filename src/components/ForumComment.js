import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { MdThumbUp, MdThumbDown, MdChatBubble, MdFormatQuote } from "react-icons/md";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

export default function ForumComment(props) {
    const [likes, setLikes] = useState({count: props.likes, state: false});
    const [dislikes, setDislikes] = useState({count: props.dislikes, state: false});

    const handleLike = () => {
        if(likes.state === false && dislikes.state === false){
            setLikes({count: likes.count+1, state: true});
        } else if(likes.state === false && dislikes.state === true){
            setLikes({count: likes.count+1, state: true});
            setDislikes({count: dislikes.count-1, state: false});
        } else {
            setLikes({count: likes.count-1, state: false});
        }
    };

    const handleDis = () => {
        if(dislikes.state === false && likes.state === false){
            setDislikes({count: dislikes.count+1, state: true});
        } else if(dislikes.state === false && likes.state === true){
            setDislikes({count: dislikes.count+1, state: true});
            setLikes({count: likes.count-1, state: false});
        } else {
            setDislikes({count: dislikes.count-1, state: false});
        }
    };

    return (
        <div className='comment'>
            <div className='user'>
                <div className='d-flex align-items-center d-md-block'>
                    {
                        (props.author.imgURL)?
                        <img src={props.author.imgURL} alt={props.author.name} />
                        : <img src="/img/users/no-photo.png" alt={props.author.name} />
                    }
                    <div>
                        <Link to={props.author.pageURL} className='blue text-decoration-underline d-block mb-2'>{props.author.name}</Link>
                        {
                            (props.author.post) &&
                            <div className='fw-5'>{props.author.post}</div>
                        }
                    </div>
                </div>
                <div className='gray-3 title-font text-end d-md-none'>
                    <div className='mb-2'>{props.date}</div>
                    <div>{props.time}</div>
                </div>
            </div>
            <div className='text'>
                <div className='gray-3 title-font d-none d-md-flex align-items-center mb-2'>
                    <div>{props.time}</div>
                    <div className='ms-4'>{props.date}</div>
                </div>
                {
                    (props.citation) &&
                    <blockquote>
                        <IconContext.Provider value={{className: "icon-20 green me-2", title: "Кавычка" }}>
                            <MdFormatQuote />
                        </IconContext.Provider>
                        <div className='text'>
                            <div className='author blue text-decoration-underline me-2'>{props.citation.name}:</div>
                            {props.citation.text}
                        </div>
                    </blockquote>
                }
                <div>{props.comment}</div>
            </div>
            <div className='btns'>
                <button type='button' onClick={() => handleLike()} className='d-flex align-items-center mb-lg-3'>
                    {
                        (likes.state)?
                        <IconContext.Provider value={{className: "icon-15 green", title: "Нравится" }}>
                            <MdThumbUp />
                        </IconContext.Provider>
                        :<IconContext.Provider value={{className: "icon-15 gray-4", title: "Нравится" }}>
                            <MdThumbUp />
                        </IconContext.Provider>
                    }
                    <span className='ms-1 ms-sm-2'>{likes.count}</span>
                </button>
                <button type='button' onClick={() => handleDis()} className='d-flex align-items-center mb-lg-3 ms-3 ms-sm-4 ms-lg-0'>
                    {
                        (dislikes.state)?
                        <IconContext.Provider value={{className: "icon-15 red", title: "Не нравится" }}>
                            <MdThumbDown />
                        </IconContext.Provider>
                        : <IconContext.Provider value={{className: "icon-15 gray-4", title: "Не нравится" }}>
                            <MdThumbDown />
                        </IconContext.Provider>
                    }
                    <span className='ms-1 ms-sm-2'>{dislikes.count}</span>
                </button>
                <button type='button' data-bs-toggle="modal" data-bs-target="#answer" className='answer d-flex align-items-center mb-lg-3'>
                    <IconContext.Provider value={{className: "icon-15 gray-4", title: "Ответить" }}>
                        <MdChatBubble />
                    </IconContext.Provider>
                    <span className='ms-2'>Ответить</span>
                </button>
                <button type='button' data-bs-toggle="modal" data-bs-target="#report-on-comment" className='report d-flex align-items-center ms-3 ms-sm-4 ms-lg-0'>
                    <IconContext.Provider value={{className: "icon-15 gray-4", title: "Пожаловаться" }}>
                        <BsFillExclamationTriangleFill />
                    </IconContext.Provider>
                    <span className='d-none d-sm-inline ms-2'>Пожаловаться</span>
                </button>
            </div>
        </div>
    )
}
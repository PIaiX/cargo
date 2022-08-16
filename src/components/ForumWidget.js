import React, {useEffect, useState} from 'react'
import {paginateLastMessages} from '../API/topic';
import Loader from './Loader';
import TimeAgo from 'javascript-time-ago'
import ru from 'javascript-time-ago/locale/ru.json'
import ReactTimeAgo from 'react-time-ago'

export default function ForumWidget(props) {
    TimeAgo.addLocale(ru)
    const [messages, setMessages] = useState({
        isLoading: false,
        error: null,
        items: []
    })

    useEffect(() => {
        paginateLastMessages(1, 7, 'desc')
            .then(result => setMessages(prev => ({...prev, isLoading: true, items: result?.data})))
            .catch(error => setMessages(prev => ({...prev, isLoading: true, error})))
    }, [])

    useEffect(() => {
        console.log(messages)
    }, [messages])

    return messages.isLoading
        ? messages?.items?.length
            ? <aside className={props.className}>
                <h5 className='mb-1'>Сообщения на форуме</h5>
                <div className='forum-widget'>
                    {messages.items.map(item => (
                        <div className='message' key={item.id}>
                            <ReactTimeAgo className="forum-widget__date" date={Date.parse(item.createdAt)} locale="ru-RU"/>
                            <h5>{item?.topic?.title || 'Без темы'}</h5>
                            <div className='text'>
                                <span className='author'>
                                    {item?.user?.firstName || 'Имя не указано'}&nbsp;
                                </span>
                                {item.description || ''}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
            : <div className="p-5" />
        : <div className="w-100 d-flex justify-content-center p-5"><Loader color="#545454"/></div>
}
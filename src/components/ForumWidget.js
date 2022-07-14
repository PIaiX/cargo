import React from 'react'

export default function ForumWidget(props) {
    return (
        <aside className={props.className}>
            <h5 className='mb-1'>Сообщения на форуме</h5>
            <div className='forum-widget'>
                <div className='message'>
                    <time className='d-block fs-11 green mb-2' dateTime="2022-04-01 10:00">10:00 &#8212; 01.04.2022</time>
                    <h5>Тема сообщения</h5>
                    <div className='text'><span className='author'>Имя пользователя</span> Lorem ipsum dolor sit amet, sconsectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in</div>
                </div>
                <div className='message'>
                    <time className='d-block fs-11 green mb-2' dateTime="2022-04-01 10:00">10:00 &#8212; 01.04.2022</time>
                    <h5>Тема сообщения</h5>
                    <div className='text'><span className='author'>Имя пользователя</span> Lorem ipsum dolor sit amet, sconsectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in</div>
                </div>
                <div className='message'>
                    <time className='d-block fs-11 green mb-2' dateTime="2022-04-01 10:00">10:00 &#8212; 01.04.2022</time>
                    <h5>Тема сообщения</h5>
                    <div className='text'><span className='author'>Имя пользователя</span> Lorem ipsum dolor sit amet, sconsectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in</div>
                </div>
                <div className='message'>
                    <time className='d-block fs-11 green mb-2' dateTime="2022-04-01 10:00">10:00 &#8212; 01.04.2022</time>
                    <h5>Тема сообщения</h5>
                    <div className='text'><span className='author'>Имя пользователя</span> Lorem ipsum dolor sit amet, sconsectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in</div>
                </div>
                <div className='message'>
                    <time className='d-block fs-11 green mb-2' dateTime="2022-04-01 10:00">10:00 &#8212; 01.04.2022</time>
                    <h5>Тема сообщения</h5>
                    <div className='text'><span className='author'>Имя пользователя</span> Lorem ipsum dolor sit amet, sconsectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in</div>
                </div>
                <div className='message'>
                    <time className='d-block fs-11 green mb-2' dateTime="2022-04-01 10:00">10:00 &#8212; 01.04.2022</time>
                    <h5>Тема сообщения</h5>
                    <div className='text'><span className='author'>Имя пользователя</span> Lorem ipsum dolor sit amet, sconsectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in</div>
                </div>
            </div>
        </aside>
    )
}
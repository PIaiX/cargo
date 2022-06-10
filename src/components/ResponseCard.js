import React, { useState } from 'react';

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
            
        </div>
    )
}

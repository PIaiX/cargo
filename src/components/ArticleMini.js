import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleMini(props) {
    return (
        <article className='mini'>
            <figure>
                <img src={props.img} alt={props.title} />
                <figcaption>{props.title}</figcaption>
            </figure>
            <time className='gray-3 fs-11 d-block mb-2 mb-xl-3' datetime="2021-12-13 19:00">13.12.2021</time>
            <div className='text'>{props.text}</div>
            <Link to={(props.url) ? props.url : "/"} className='stretched-link fs-12 blue d-block mt-1 mt-xl-2'>Читать далее...</Link>
        </article>
    )
}

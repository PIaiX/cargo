import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleCard(props) {
    return (
        <article>
            <figure>
                <img src={props.img} alt={props.title}/>
                <figcaption>
                    <Link to={props.url} className="title stretched-link">{props.title}</Link>
                    <div className="hidden-div">
                        <div className="text">
                            {props.text}
                        </div>
                    </div>
                </figcaption>
            </figure>
        </article>
    )
}

import React from "react";
import {Link} from "react-router-dom";

export default function ArticleMini(props) {
    const articleDate = new Date(props.date)

    return (
        <article className="mini">
            <figure>
                <img src={props.img} alt={props.title}/>
                {/*  need suggestion hover effect*/}
                <figcaption className="article__title">{props.title}</figcaption>
            </figure>
            {/* pass value to dateTime attribute if needed */}
            <time
                className="gray-3 fs-11 d-block mb-2 mb-xl-3"
                dateTime="2021-12-13 19:00"
            >
                {`${articleDate.getDate()}.${articleDate.getMonth() + 1}.${articleDate.getFullYear()}`}
            </time>
            <div className="text">{props.text}</div>
            <Link
                to={props.url}
                className="stretched-link fs-12 blue d-block mt-1 mt-xl-2"
            >
                Читать далее...
            </Link>
        </article>
    );
}

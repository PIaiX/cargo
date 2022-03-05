import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoWine, IoSnow } from 'react-icons/io5';

export default function Card(props) {
    // let notes = props.notes ? props.notes : []
    // const iconsArr = [, <IoSnow/>];
    
    // const iconsArr = [
    //     {
    //        ice: <IoSnow/>,
    //        fragile: <IoWine />,
    //        prop2: 'мыши',
    //        prop3: 'кот',
    //        prop4: 'на крыше',
    //     },
    //     {
    //        id: 'ViWgVtvU2qRo6huLg18DdYuio',
    //        prop1: 'А',
    //        prop2: 'котята',
    //        prop3: 'ещё',
    //        prop4: 'выше',
    //     },
    //     {
    //        id: 'wEp5mHF4StNNoo29JVxFZxcOq',
    //        prop1: 'Кот',
    //        prop2: 'пошёл',
    //        prop3: 'за',
    //        prop4: 'молоком',
    //     },
    //  ];
    return (
        <div className={"card-mini " + props.className}>
            <div className="title mb-2 mb-sm-3">{props.title}</div>
            <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Маршут:</span> <span>{props.route}</span></div>
            <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Объем:</span> {props.size} м<sup>2</sup></div>
            <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Вес:</span> {props.weight}</div>
            <div className="fs-11 mt-1 mt-sm-2">
                <span className="fw-5">Особые пометки: </span> 
                { 
                    (props.notes) &&
                    <>
                        <span>{props.notes.text}</span>
                    </>
                }
            </div>
            <NavLink to="/card-page" className="btn btn-1 mt-2 mt-sm-4 mt-xl-5">Перейти</NavLink>
        </div>
    )
}

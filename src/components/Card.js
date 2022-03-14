import React from 'react';
import { Link } from 'react-router-dom';
import { IoWine, IoSnow, IoShieldCheckmarkSharp } from 'react-icons/io5';
import { MdLocalShipping } from "react-icons/md";

export default function Card(props) {
    const type = props.type;
    const iconsArr = [
        {
            name: 'none',
            text: 'Нет',
        },
        {
            name: 'cold',
            text: 'Холод',
            code: <IoSnow/>,
        },
        {
            name: 'fragile',
            text: 'Хрупкое',
            code: <IoWine/>,
        },
        {
            name: 'dimensional',
            text: 'Габаритное',
            code: <MdLocalShipping/>,
        }
    ];
    if(type === 'cargo') {
        return (
            <div className={"card-mini " + props.className}>
                <div>
                <div className="title mb-2 mb-sm-3">{props.title}</div>
                {
                    (props.route) &&
                    <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Маршут:</span> <span>{props.route}</span></div>
                }
                {
                    (props.size) &&
                    <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Объем:</span> {props.size} м<sup>2</sup></div>
                }
                {
                    (props.weight)&&
                    <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Вес:</span> {props.weight}</div>
                }
                <div className="fs-11 d-flex align-items-center flex-wrap mt-1 mt-sm-2">
                    <span className="fw-5">Особые пометки:</span> 
                    {
                        (props.notes) &&
                        iconsArr.map(item => {
                            if(props.notes === item.name){
                                return (
                                    <div key={item.toString()} className="d-flex align-items-center ms-1">
                                        <span>{item.text}</span>
                                        {
                                            (item.code)&&
                                            <div className="icon ms-1">{item.code}</div>
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                </div>
                <Link to={props.url} className="btn btn-1 mt-2 mt-sm-4 mt-xl-5">Перейти</Link>
            </div>
        )
    } else if(type === 'car'){
        return (
            <div className={"card-mini " + props.className}>
                <div>
                <div className="title mb-2 mb-sm-3">{props.route}</div>
                {
                    (props.carType) &&
                    <div className="fs-12 mt-1 mt-sm-2">
                        <span className="fw-7 me-2">{props.carType}</span>
                        <span className="green">
                        {
                            (props.verified)&&
                            <IoShieldCheckmarkSharp />
                        }
                        </span>
                    </div>
                }
                {
                    (props.date) &&
                    <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Дата:</span> {props.date}</div>
                }
                {
                    (props.carrying) &&
                    <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Грузоподъемность:</span> {props.carrying} т</div>
                }
                {
                    (props.size) &&
                    <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Свободный объем:</span> {props.size} м<sup>2</sup></div>
                }
                {
                    (props.dimensions)&&
                    <div className="fs-11 mt-1 mt-sm-2"><span className="fw-5">Габариты кузова:</span> {props.dimensions} м</div>
                }
                </div>
                <Link to={props.url} className="btn btn-1 mt-2 mt-sm-3 mt-xl-4">Перейти</Link>
            </div>
        )
    } else {
        return (
            <div className="card-mini">произошла ошибка. не указан тип - груз/машина</div>
        )
    }
}

import React from 'react';
import {IoEllipsisVertical, IoShieldCheckmarkSharp} from 'react-icons/io5';
import {Link, useNavigate} from 'react-router-dom';
import {IconContext} from 'react-icons';

const CarCard = (props) => {
    const navigate = useNavigate()

    return (
        <div className={"card-mini " + props.className}>
            <div>
                <div className="title mb-2 mb-sm-3">{props.route}</div>
                {props.name && (
                    <div className="fs-12 mt-1 mt-sm-2">
                        <span className="fw-7 me-2">{props.name}</span>
                        <span className="green">
                {props.verified && <IoShieldCheckmarkSharp/>}
              </span>
                    </div>
                )}
                {true && (
                    <div className="fs-11 mt-1 mt-sm-2">
                        <span className="fw-5">Тип машины: </span>{props.carTypeForUser}
                    </div>
                )}
            </div>
            <div className="car-card__actions">
                <button
                    type="button"
                    className="btn btn-1 w-100"
                    onClick={() => navigate(`/edit-car/${props.id}`)}
                >
                    Редактировать
                </button>
                <button
                    type="button"
                    className="btn btn-2 w-100"
                    onClick={() => props.callback && props.callback(props.id)}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default CarCard;
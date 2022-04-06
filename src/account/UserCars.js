import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { IoAddCircleSharp } from 'react-icons/io5';

export default function UserCars() {
    return (
        <div className='box p-4 p-xl-5'>
            <div className='d-flex justify-content-between align-items-center'>
                <div></div>
                <button type='button' className='btn btn-2'>
                    <IconContext.Provider value={{className: "icon-15 blue", title: "Добавить машину" }}>
                        <IoAddCircleSharp />
                    </IconContext.Provider>
                    <span>Добавить машину</span>
                </button>
            </div>
        </div>
    )
}
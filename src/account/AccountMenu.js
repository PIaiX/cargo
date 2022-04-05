import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { MdLocalShipping } from 'react-icons/md';
import { IoCube, IoDocumentTextSharp, IoExitSharp, IoNewspaperSharp, IoAddCircleSharp } from 'react-icons/io5';
import { RiUserFill } from "react-icons/ri";

export default function AccountMenu() {
    return (
        <div>
            <nav className="d-block d-lg-none mt-3 mb-4 mb-sm-5" aria-label="breadcrumb">
                <Link to="/" className="gray-3">&#10094; На главную</Link>
            </nav>
            <nav className="menu">
                <ul>
                    <li>
                        <NavLink to="profile">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Профиль" }}>
                                <RiUserFill />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Профиль</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="my-ads">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Мои машины" }}>
                                <MdLocalShipping />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Мои машины</span>
                        </NavLink>
                        <button type='button'>
                            <IconContext.Provider value={{className: "icon-15 blue", title: "Добавить машину" }}>
                                <IoAddCircleSharp />
                            </IconContext.Provider>
                        </button>
                    </li>
                    <li>
                        <NavLink to="my-services">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Мои грузы" }}>
                                <IoCube />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Мои грузы</span>
                        </NavLink>
                        <button type='button'>
                            <IconContext.Provider value={{className: "icon-15 blue", title: "Добавить груз" }}>
                                <IoAddCircleSharp />
                            </IconContext.Provider>
                        </button>
                    </li>
                    <li>
                        <NavLink to="favorites">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Шаблоны" }}>
                                <IoNewspaperSharp/>
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Шаблоны</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="my-messages">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Документы" }}>
                                <IoDocumentTextSharp />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Документы</span>
                        </NavLink>
                    </li>
                    <li>
                        <button type="button">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Выход" }}>
                                <IoExitSharp />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Выход</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
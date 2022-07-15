import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { MdLocalShipping } from 'react-icons/md';
import { IoCube, IoDocumentTextSharp, IoExitSharp, IoNewspaperSharp, IoAddCircleSharp, IoBriefcase } from 'react-icons/io5';
import { RiUserFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { BsFillHandIndexThumbFill } from "react-icons/bs";

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
                        <NavLink to="user-cars">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Мои машины" }}>
                                <MdLocalShipping />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Мои машины</span>
                        </NavLink>
                        <Link to="/add-car">
                            <IconContext.Provider value={{className: "icon-15 blue", title: "Добавить машину" }}>
                                <IoAddCircleSharp />
                            </IconContext.Provider>
                        </Link>
                    </li>
                    <li>
                        <NavLink to="user-cargo">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Мои грузы" }}>
                                <IoCube />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Мои грузы</span>
                        </NavLink>
                        <Link to="/add-cargo">
                            <IconContext.Provider value={{className: "icon-15 blue", title: "Добавить груз" }}>
                                <IoAddCircleSharp />
                            </IconContext.Provider>
                        </Link>
                    </li>
                    <li>
                        <NavLink to="responses">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Мои отклики" }}>
                                <BsFillHandIndexThumbFill />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Мои отклики</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="in-work">
                            <IconContext.Provider value={{className: "icon-15 green", title: "В работе" }}>
                                <IoBriefcase/>
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>В работе</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="tariffs">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Тарифы" }}>
                                <RiMoneyDollarBoxFill/>
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Тарифы</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="user-patterns">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Шаблоны" }}>
                                <IoNewspaperSharp/>
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Шаблоны</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="user-documents">
                            <IconContext.Provider value={{className: "icon-15 green", title: "Документы" }}>
                                <IoDocumentTextSharp />
                            </IconContext.Provider>
                            <span className='ms-2 ms-xl-3'>Документы</span>
                        </NavLink>
                        <button type='button' data-bs-toggle="modal" data-bs-target="#docs-patterns">
                            <IconContext.Provider value={{className: "icon-15 blue", title: "Добавить документ" }}>
                                <IoAddCircleSharp />
                            </IconContext.Provider>
                        </button>
                    </li>
                    <li>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#account-exit">
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
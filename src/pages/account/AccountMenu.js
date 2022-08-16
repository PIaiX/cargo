import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { MdLocalShipping } from 'react-icons/md';
import {
    IoCube,
    IoDocumentTextSharp,
    IoExitSharp,
    IoNewspaperSharp,
    IoAddCircleSharp,
    IoBriefcase,
    IoMailOpenOutline
} from 'react-icons/io5';
import { RiUserFill, RiMoneyDollarBoxFill } from "react-icons/ri";
import { BsFillHandIndexThumbFill } from "react-icons/bs";
import { FaMapMarkerAlt } from 'react-icons/fa'
import {useSelector} from 'react-redux/es/exports';

export default function AccountMenu() {
    const roleId = useSelector(state => state?.currentUser?.data?.user?.roleId)

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
                    {((roleId === 1) || (roleId === 3) || (roleId === 4)) && (
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
                    )}
                    {((roleId === 1) || (roleId === 2) || (roleId === 4)) && (
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
                    )}
                    {((roleId === 1) || (roleId === 3) || (roleId === 4)) && (
                        <li>
                            <NavLink to='user-routes'>
                                <IconContext.Provider value={{className: 'icon-15 green', title: 'Мои маршруты'}}>
                                    <FaMapMarkerAlt/>
                                </IconContext.Provider>
                                <span className='ms-2 ms-xl-3'>Мои маршруты</span>
                            </NavLink>
                            <Link to='/add-route'>
                                <IconContext.Provider value={{className: 'icon-15 blue', title: 'Добавить маршрут'}}>
                                    <IoAddCircleSharp/>
                                </IconContext.Provider>
                            </Link>
                        </li>
                    )}
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
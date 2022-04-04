import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { MdPerson, MdLocalShipping } from 'react-icons/md';
import { IoCube, IoDocumentTextSharp, IoExitSharp, IoNewspaperSharp } from 'react-icons/io5';

export default function AccountMenu() {
    return (
        <div>
            <nav className="d-block d-lg-none mt-3 mb-4 mb-sm-5" aria-label="breadcrumb">
                <Link to="/" className="gray-3">&#10094; На главную</Link>
            </nav>
            <h1 className="d-block d-lg-none text-center color-1 mb-4">Личный кабинет</h1>
            <nav className="menu">
                <ul>
                    <li>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Профиль" }}>
                            <MdPerson />
                        </IconContext.Provider>
                        <NavLink to="profile">Профиль</NavLink>
                    </li>
                    <li>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Мои машины" }}>
                            <MdLocalShipping />
                        </IconContext.Provider>
                        <NavLink to="my-ads">Мои машины</NavLink>
                    </li>
                    <li>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Мои грузы" }}>
                            <IoCube />
                        </IconContext.Provider>
                        <NavLink to="my-services">Мои грузы</NavLink>
                    </li>
                    <li>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Шаблоны" }}>
                            <IoNewspaperSharp/>
                        </IconContext.Provider>
                        <NavLink to="favorites">Шаблоны</NavLink>
                    </li>
                    <li>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Документы" }}>
                            <IoDocumentTextSharp />
                        </IconContext.Provider>
                        <NavLink to="my-messages">Документы</NavLink>
                    </li>
                    <li>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Выход" }}>
                            <IoExitSharp />
                        </IconContext.Provider>
                        <button type="button">Выход</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
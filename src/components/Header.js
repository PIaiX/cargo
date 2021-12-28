import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomSelect from '../utilities/CustomSelect';

export default function Header() {
    return (
        <>
            <header>
                <div className="container">
                    <img src="/img/Лого.png" alt="Название сайта" className="logo me-lg-auto" />
                    <nav className="d-none d-lg-flex">
                        <NavLink to="/">Главная</NavLink>
                        {/* <div className="dropdown">
                            <a href="#" className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Услуги</a>
                            <ul className="dropdown-menu py-2">
                                <li>
                                    <NavLink to="/service" className="dropdown-item">Дизайн</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/service" className="dropdown-item">Ремонт</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/service" className="dropdown-item">Грузоперевозки</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/service" className="dropdown-item">Услуги риелторов</NavLink>
                                </li>
                            </ul>
                        </div> */}
                        <a href="/">Поиск</a>
                        <a href="/">Форум</a>
                        <a href="/">Информация</a>
                        <a href="/">Задать вопрос</a>
                    </nav>

                    <button type="button" className="d-none d-md-flex align-items-center ms-5">
                        <span className="fw-5 fs-12 me-2">Личный кабинет</span>
                        <img src="/img/icons/user.svg" alt="аккаунт"/>
                    </button>

                    <CustomSelect className="ms-5" checkedOpt="Казань" options={['Казань', 'Москва', 'Санкт-Петербург']} alignment="right"/>

                    <button type="button" data-bs-toggle="offcanvas" data-bs-target="#header-menu" className="d-block d-lg-none">
                        <img src="/real_estate/img/icons/menu.svg" alt="меню"/>
                    </button>
                </div> 
            </header>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="header-menu">
                <div className="offcanvas-body">
                    <nav>
                        <ul data-bs-dismiss="offcanvas">
                            <li><NavLink to="/">Главная</NavLink></li>
                            <li><a href="/">Услуги</a></li>
                            <li><a href="/">Задать вопрос</a></li>
                            <li><a href="/">Личный кабинет</a></li>
                            <li><a href="/">Избранное</a></li>
                            <li><a href="/">Сообщения</a></li>
                        </ul>
                    </nav>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas">
                        <svg viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.00006 1.18237L15 15.9049"/>
                            <path d="M14.9999 1.18237L1.00001 15.9049"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

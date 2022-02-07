import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomSelect from './utilities/CustomSelect';

export default function Header() {
    return (
        <>
            <header>
                <div className="container">
                    <img src="/cargo/img/Лого.png" alt="Название сайта" className="logo me-lg-auto" />
                    <nav className="d-none d-lg-flex">
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/search">Поиск</NavLink>
                        <a href="/">Форум</a>
                        <a href="/">Информация</a>
                        <a href="/">Задать вопрос</a>
                    </nav>
                    <div className="d-flex align-items-center ms-5">
                        <button type="button" className="d-none d-md-flex align-items-center order-2 order-lg-1 ms-4 ms-lg-0">
                            <span className="d-none d-xxl-inline fw-5 fs-12 me-2">Личный кабинет</span>
                            <img src="/cargo/img/icons/user.svg" alt="аккаунт" className="icon"/>
                        </button>

                        <CustomSelect className="order-1 order-lg-2 ms-lg-5" name="town" checkedOpt="Казань" options={['Казань', 'Москва', 'Санкт-Петербург']} alignment="right"/>

                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#header-menu" className="order-3 d-block d-lg-none ms-4">
                            <svg className="icon" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 9H20.1212"/>
                                <path d="M2 2H20.1212"/>
                                <path d="M2 16H20.1212"/>
                            </svg>
                        </button>
                    </div>
                </div> 
            </header>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="header-menu">
                <div className="offcanvas-body">
                    <nav>
                        <ul data-bs-dismiss="offcanvas">
                            <li><NavLink to="/">Главная</NavLink></li>
                            <li><a>Поиск</a></li>
                            <li><a>Форум</a></li>
                            <li><a>Информация</a></li>
                            <li><a>Задать вопрос</a></li>
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

import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {IconContext} from "react-icons";
import {MdMenu} from 'react-icons/md';
import {RiUserLine} from "react-icons/ri";
import CustomModal from "./utilities/CustomModal";
import CityContainer from './CityContainer';

export default function Header() {

    const [isShow, setIsShow] = useState(false)
    const [question, setQuestion] = useState({
        firstName: '',
        email: '',
        question: '',
    })

    return (
        <>
            <header>
                <div className="container">
                    <NavLink to="/" className="logo me-lg-auto"><img src="/img/logo.png" alt="Название сайта"
                                                                     className="logo me-lg-auto"/></NavLink>
                    <nav className="d-none d-lg-flex">
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/search">Поиск</NavLink>
                        <NavLink to="/forum">Форум</NavLink>
                        <a href="/">Информация</a>
                        <NavLink to="" onClick={() => setIsShow(true)}>Задать вопрос</NavLink>
                    </nav>
                    <div className="d-flex align-items-center ms-5">
                        <Link to="login" className="d-flex align-items-center order-2 order-lg-1 ms-4 ms-lg-0">
                            <span className="d-none d-xxl-inline fw-5 fs-12 me-2">Личный кабинет</span>
                            <IconContext.Provider value={{className: "icon", title: "аккаунт"}}>
                                <RiUserLine/>
                            </IconContext.Provider>
                        </Link>
                        <CityContainer />
                        <button type="button" data-bs-toggle="offcanvas" data-bs-target="#header-menu"
                                className="order-3 d-block d-lg-none ms-4">
                            <IconContext.Provider value={{className: "icon", title: "меню"}}>
                                <MdMenu/>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <CustomModal
                    centered={false}
                    isShow={isShow}
                    setIsShow={setIsShow}
                    closeButton={true}
                    title={true}
                    titleHead={'Задать вопрос'}
                    titleBody={'Задайте интересующий вопрос и мы ответим Вам в течение часа.'}
                    classNameHeader="questions-header"
                    classNameBody="quest"
                >
                    <form className="form-questions">
                        <label>Ваше имя</label>
                        <input
                            type="text"
                            value={question.firstName}
                            onChange={(e) => {
                                setQuestion(prevState => {
                                    return {...prevState, 'firstName': e.target.value}
                                })
                            }}
                        />
                        <label>Ваш Email</label>
                        <input
                            type="text"
                            value={question.email}
                            onChange={(e) => {
                                setQuestion(prevState => {
                                    return {...prevState, 'email': e.target.value}
                                })
                            }}
                        />
                        <label>Ваш вопрос</label>
                        <textarea
                            value={question.question}
                            onChange={(e) => {
                                setQuestion(prevState => {
                                    return {...prevState, 'question': e.target.value}
                                })
                            }}
                        />
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-2 fs-12 text-uppercase mt-3">Задать вопрос</button>
                        </div>
                    </form>
                </CustomModal>
            </header>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="header-menu">
                <div className="offcanvas-body">
                    <nav>
                        <ul data-bs-dismiss="offcanvas">
                            <li><NavLink to="/">Главная</NavLink></li>
                            <li><NavLink to="/search">Поиск</NavLink></li>
                            <li><NavLink to="/forum">Форум</NavLink></li>
                            <li><NavLink to="">Информация</NavLink></li>
                            <li><NavLink to="" onClick={() => setIsShow(true)}>Задать вопрос</NavLink></li>
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

import React, {useState} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {IconContext} from "react-icons";
import {MdMenu} from 'react-icons/md';
import {RiUserLine} from "react-icons/ri";
import CustomModal from "./utilities/CustomModal";
import CityContainer from './CityContainer';
import CustomOffcanvas from './utilities/CustomOffcanvas';

export default function Header() {

    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowOffcanvas, setIsShowOffcanvas] = useState(false)
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
                        <button className="header__button" type="button" onClick={() => setIsShowModal(true)}>Задать вопрос</button>
                    </nav>
                    <div className="d-flex align-items-center ms-5">
                        <Link to="login" className="d-flex align-items-center order-2 order-lg-1 ms-4 ms-lg-0">
                            <span className="d-none d-xxl-inline fw-5 fs-12 me-2">Личный кабинет</span>
                            <IconContext.Provider value={{className: "icon", title: "аккаунт"}}>
                                <RiUserLine/>
                            </IconContext.Provider>
                        </Link>
                        <CityContainer />
                        <button
                            type="button"
                            className="order-3 d-block d-lg-none ms-4"
                            onClick={() => setIsShowOffcanvas(true)}
                        >
                            <IconContext.Provider value={{className: "icon", title: "меню"}}>
                                <MdMenu/>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <CustomModal
                    className='modal__header'
                    centered={false}
                    isShow={isShowModal}
                    setIsShow={setIsShowModal}
                    closeButton={true}
                    titleHead={'Задать вопрос'}
                    titleBody={'Задайте интересующий вопрос и мы ответим Вам в течение часа.'}
                >
                    <form>
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

            <CustomOffcanvas
                isShow={isShowOffcanvas}
                setIsShow={setIsShowOffcanvas}
                closeButton={true}
                placement="end"
            >
                <nav>
                    <ul>
                        <li><NavLink to="/">Главная</NavLink></li>
                        <li><NavLink to="/search">Поиск</NavLink></li>
                        <li><NavLink to="/forum">Форум</NavLink></li>
                        <li><NavLink to="">Информация</NavLink></li>
                        <li><NavLink to="" onClick={() => setIsShowModal(true)}>Задать вопрос</NavLink></li>
                    </ul>
                </nav>
            </CustomOffcanvas>
        </>
    )
}

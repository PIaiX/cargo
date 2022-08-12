import React, {useState} from "react";
import {NavLink, Link} from "react-router-dom";
import {IconContext} from "react-icons";
import {MdMenu} from "react-icons/md";
import {RiUserLine} from "react-icons/ri";
import CustomModal from "./utilities/CustomModal";
import CityContainer from "./CityContainer";
import CustomOffcanvas from "./utilities/CustomOffcanvas";
import {useSelector} from "react-redux";
import {askQuestion} from "../API/question";
import {useForm} from "react-hook-form";
import ValidateWrapper from "./utilities/ValidateWrapper";

export default function Header() {
    const isAuthenticated = useSelector((state) => state.currentUser.data.token) !== "";
    const authLink = isAuthenticated ? "personal-account" : "login";
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowOffcanvas, setIsShowOffcanvas] = useState(false);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })

    return (
        <>
            <header>
                <div className="container">
                    <NavLink to="/" className="logo me-lg-auto">
                        <img
                            src="/img/logo.png"
                            alt="Название сайта"
                            className="logo me-lg-auto"
                        />
                    </NavLink>
                    <nav className="d-none d-lg-flex">
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/search">Поиск</NavLink>
                        <NavLink to="/forum">Форум</NavLink>
                        <a href="/">Информация</a>
                        <button
                            className="header__button"
                            type="button"
                            onClick={() => setIsShowModal(true)}
                        >
                            Задать вопрос
                        </button>
                    </nav>
                    <div className="d-flex align-items-center ms-5">
                        <Link
                            to={authLink}
                            className="d-flex align-items-center order-2 order-lg-1 ms-4 ms-lg-0"
                        >
              <span className="d-none d-xxl-inline fw-5 fs-12 me-2">
                Личный кабинет
              </span>
                            <IconContext.Provider
                                value={{className: "icon", title: "аккаунт"}}
                            >
                                <RiUserLine/>
                            </IconContext.Provider>
                        </Link>
                        <CityContainer/>
                        <button
                            type="button"
                            className="order-3 d-block d-lg-none ms-4"
                            onClick={() => setIsShowOffcanvas(true)}
                        >
                            <IconContext.Provider
                                value={{className: "icon", title: "меню"}}
                            >
                                <MdMenu/>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <CustomModal
                    className="modal__header"
                    centered={false}
                    isShow={isShowModal}
                    setIsShow={setIsShowModal}
                    closeButton={true}
                    titleHead={"Задать вопрос"}
                    titleBody={"Задайте интересующий вопрос и мы ответим Вам в течение часа."}
                >
                    <form onSubmit={handleSubmit(askQuestion)}>
                        <label>Ваше имя</label>
                        <ValidateWrapper error={errors?.name}>
                        <input
                            type="text"
                            {...register('name',{
                                required: "Поле обязательно к заполнению",
                                minLength: {
                                    value: 2,
                                    message: 'Минимум 2 символа'
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Максимум 50 символов'
                                }
                            })}
                        />
                        </ValidateWrapper>
                        <label>Ваш Email</label>
                        <ValidateWrapper error={errors?.email}>
                        <input
                            type="text"
                            {...register('email', {
                                required: 'Поле обязательно к заполнению',
                                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            })}
                        />
                        </ValidateWrapper>
                        <label>Ваш вопрос</label>
                        <ValidateWrapper error={errors.description}>
                        <textarea
                            {...register('description', {
                                required: 'Поле обязательно для заполнения',
                                minLength: {
                                    value: 5,
                                    message: "Минимум 5 символов"
                                },
                                maxLength: {
                                    value: 100,
                                    message: 'Максимум 100 символов'
                                }
                            })}
                        />
                        </ValidateWrapper>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-2 fs-12 text-uppercase mt-3"
                            >
                                Задать вопрос
                            </button>
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
                        <li>
                            <NavLink to="/" onClick={() => setIsShowOffcanvas(false)}>Главная</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search" onClick={() => setIsShowOffcanvas(false)}>Поиск</NavLink>
                        </li>
                        <li>
                            <NavLink to="/forum" onClick={() => setIsShowOffcanvas(false)}>Форум</NavLink>
                        </li>
                        <li>
                            <NavLink to="" onClick={() => setIsShowOffcanvas(false)}>Информация</NavLink>
                        </li>
                        <li>
                            <NavLink to="" onClick={() => {
                                setIsShowOffcanvas(false)
                                setIsShowModal(true)
                            }}>
                                Задать вопрос
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </CustomOffcanvas>
        </>
    );
}

import React, {useEffect, useState} from 'react';
import {IconContext} from "react-icons";
import {IoChevronBackSharp, IoChevronForwardSharp, IoEllipsisVertical} from 'react-icons/io5';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import {NavLink, Route, useParams} from "react-router-dom";
import RouteCard from "../../components/RouteCard";
import {getUserInfo, reportUser} from "../../API/profile";
import {getUserRoutes} from "../../API/route";
import useAxiosPrivate from "../../hooks/axiosPrivate";
import {getNotArchivedCargo} from "../../API/cargo";
import {getGeneralCapacity, getGeneralWeight, getNotesType, getRoute} from "../../helpers/cargo";
import CargoCard from "../../components/CargoCard";
import Loader from "../../components/Loader";
import {useSelector} from "react-redux";
import CustomModal from "../../components/utilities/CustomModal";
import {Alert} from "react-bootstrap";

SwiperCore.use([Navigation, Pagination]);

export default function ViewAccount() {

    const {id} = useParams()
    const axiosPrivate = useAxiosPrivate()
    const [user, setUser] = useState({})
    const [routes, setRoutes] = useState({
        routes: [],
        meta: {},
        isLoading: false
    })
    const [cargos, setCargos] = useState({
        cargos: [],
        meta: {},
        isLoading: true
    })
    const currentUser = useSelector(state => state.currentUser.data.user)

    useEffect(() => {
        getUserInfo(id).then(res => setUser(res?.data?.body))
    }, [id])

    useEffect(() => {
        getUserRoutes(axiosPrivate, id, 1, 6)
            .then(res => setRoutes({routes: res?.data?.body?.data, meta: res?.data?.body?.meta, isLoading: true}))
            .catch()
    }, [id])

    useEffect(() => {
        getNotArchivedCargo(axiosPrivate, id, 1, 6)
            .then(res => setCargos({cargos: res?.data, meta: res?.meta, isLoading: true}))
            .catch()
    }, [id])

    const uploadPhoto = (img) => {
        const site = 'https://api.eritrans.ru/uploads/./'
        if (img === null) {
            return '/img/users/no-photo.png'
        } else {
            return `${site}${img}`
        }
    }

    const [alertReport, setAlertReport] = useState({
        show: false,
        complete: null
    })

    return (
        <div className='box p-0' >
            <div className='p-3 p-md-4 d-flex align-items-center'>
                <h4 className='flex-1 text-center text-uppercase mb-0 position-relative'>{user?.subject ? user?.companyName : user?.fullName}</h4>
                {alertReport.complete &&
                    <Alert
                        show={alertReport.show}
                        className='position-absolute m-0 p-2 alertreportuser'
                        variant='success'
                    >
                        <span>Жалоба отправлена</span>
                    </Alert>
                }
                {alertReport.complete === false &&
                    <Alert
                        show={alertReport.show}
                        className='position-absolute m-0 p-2 alertreportuser'
                        variant='danger'
                    >
                        <span>Жалоба отправлена</span>
                    </Alert>
                }
                <div className="dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider
                            value={{className: "icon-20 green", title: "Пожаловаться на пользователя"}}>
                            <IoEllipsisVertical/>
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li>
                            <button
                                type='button'
                                onClick={() => {
                                    reportUser(axiosPrivate, {toId: user?.id, fromId: currentUser?.id})
                                        .then(() => {
                                            setAlertReport({show: true, complete: true})
                                            setTimeout(() => setAlertReport({show: false, complete: null}), 1500)
                                        })
                                        .catch(() => {
                                            setAlertReport({show: true, complete: false})
                                            setTimeout(() => setAlertReport({show: false, complete: null}), 1500)
                                        })
                                }}
                            >
                                Пожаловаться на пользователя
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div className='p-4 p-xl-5'>
                <div className='row flex-md-row-reverse'>
                    <div className='col-md-4'>
                        <div className='profile-picture mx-auto mb-4 mb-sm-5'>
                            <img src={uploadPhoto(user?.avatar)} alt="ООО НТК"/>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='row g-sm-4 fs-12'>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Тип аккаунта:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>{user?.roleForUser}</div>
                            </div>

                            {user?.subject &&
                                <>
                                    <div className='col-sm-4 mb-1 mb-sm-0'>
                                        <div className='gray-2 title-font fw-5'>ИНН:</div>
                                    </div>
                                    <div className='col-sm-8 mb-3 mb-sm-0'>
                                        <div>{user?.taxIdentificationNumber}</div>
                                    </div>

                                    <div className='col-sm-4 mb-1 mb-sm-0'>
                                        <div className='gray-2 title-font fw-5'>Имя:</div>
                                    </div>
                                    <div className='col-sm-8 mb-3 mb-sm-0'>
                                        <div>{user?.firstName}</div>
                                    </div>

                                    <div className='col-sm-4 mb-1 mb-sm-0'>
                                        <div className='gray-2 title-font fw-5'>Фамилия:</div>
                                    </div>
                                    <div className='col-sm-8 mb-3 mb-sm-0'>
                                        <div>{user?.lastName}</div>
                                    </div>
                                </>
                            }

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Email:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>{user?.email}</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Телефон:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>{user?.phone}</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Город:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>{user?.city}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-3 py-sm-4 p-lg-4 p-xl-5'>
                <h4 className='text-center text-uppercase mb-2 mb-sm-3 mb-lg-4'>объявления Пользователя</h4>
                <div className='position-relative mb-4 mb-lg-5'>
                    {(routes?.isLoading || cargos?.isLoading) ?
                        (routes?.routes.length > 0 || cargos?.cargos.length > 0) ?
                            <Swiper className="swiper-4"
                                    spaceBetween={4}
                                    slidesPerView={2}
                                    freeMode={true}
                                    breakpoints={{
                                        576: {
                                            slidesPerView: 2,
                                            spaceBetween: 10,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 8,
                                        },
                                        992: {
                                            slidesPerView: 2,
                                            spaceBetween: 16,
                                        },
                                        1200: {
                                            slidesPerView: 2,
                                            spaceBetween: 30,
                                        },
                                        1660: {
                                            slidesPerView: 3,
                                            spaceBetween: 25,
                                        }
                                    }}
                                    pagination={{
                                        el: '.swiper-pagination',
                                        type: 'bullets',
                                        clickable: true,
                                    }}
                                    navigation={{
                                        nextEl: '.swiper-button-next',
                                        prevEl: '.swiper-button-prev',
                                    }}
                            >
                                {routes.routes.map((route, index) => (
                                    <SwiperSlide
                                        key={index}
                                    >
                                        <RouteCard
                                            id={route.id}
                                            title={`${route.fromRoute} - ${route.toRoute}`}
                                            route={`${route.fromRoute} - ${route.toRoute}`}
                                            size={route.car?.capacity}
                                            carrying={route.car?.carrying}
                                            carType={route.carBodyType?.name}
                                            dimensions={`${route.car?.height}/${route.car?.width}/${route.car?.length}`}
                                            date={(route.dateType === false) ? "постоянно" : 'единожды'}
                                            inProfile={false}
                                        />
                                    </SwiperSlide>
                                ))}
                                {cargos.cargos.map((cargo, index) => (
                                    <SwiperSlide
                                        key={index}
                                    >
                                        <CargoCard
                                            id={cargo.id}
                                            title={cargo?.type?.name}
                                            route={getRoute(cargo, true)}
                                            notesType={getNotesType(cargo?.items)}
                                            capacity={getGeneralCapacity(cargo?.items)}
                                            weight={getGeneralWeight(cargo?.items)}
                                        />
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-button-prev">
                                    <IoChevronBackSharp/>
                                </div>
                                <div className="swiper-button-next">
                                    <IoChevronForwardSharp/>
                                </div>
                                <div className="swiper-pagination"></div>
                            </Swiper>
                            : <div className='fs-11 text-center'>Актуальных объявлений нет</div>
                        : <div className='d-flex justify-content-center'><Loader color='#545454'/></div>
                    }
                </div>
                <div className='row row-cols-2 row-cols-md-3 row-cols-xxl-4 gx-2 gx-sm-4 justify-content-center fs-12'>
                    <div>
                        <NavLink
                            to='/search'
                            className='btn btn-2 text-uppercase w-100 px-2 px-sm-3'
                        >
                            Найти машину
                        </NavLink>
                    </div>
                    <div>
                        <NavLink
                            to='/search'
                            className='btn btn-2 text-uppercase w-100 px-2 px-sm-3'
                        >
                            Найти груз
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
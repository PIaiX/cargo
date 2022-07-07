import React from 'react';
import Card from '../components/Card';
import UserContacts from '../components/UserContacts';

import { RiFlag2Fill, RiChat4Fill } from "react-icons/ri";
import { IoChevronBackSharp, IoChevronForwardSharp, IoWarning, IoEllipsisVertical, IoCalendarOutline, IoTimeOutline, IoLocationSharp, IoCube, IoRepeat, IoSnow } from 'react-icons/io5';
import { IconContext } from "react-icons";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);


export default function CargoPage() {
    return (
        <main className="bg-white">
            <section id="sec-8" className="container py-4 py-sm-5">
                <div className="d-flex align-items-center justify-content-between mb-4 mb-sm-5">
                    <h1 className="mb-0">Груз № 356790 Гомзово — Набережные Челны</h1>
                    <div className="dropdown d-block d-md-none">
                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className="dropdown-toggle">
                            <IconContext.Provider value={{className: "green icon-20"}}>
                                <IoEllipsisVertical />
                            </IconContext.Provider>
                        </button>
                        <div className="dropdown-menu">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#report" className="gray-3 d-flex align-items-center">
                                <IconContext.Provider value={{className: "gray-4 icon"}}>
                                    <IoWarning />
                                </IconContext.Provider>
                                <span className="ms-2">Подать жалобу</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row flex-md-row-reverse">
                    <div className="col-md-5 col-xl-4 col-xxl-3 d-flex flex-column">
                        <div className="order-3 order-md-1 mb-4 mb-xxl-5">
                            <h5 className="mb-2 mb-lg-3">Маршрут</h5>
                            <div className="box p-3">
                                <div className="mb-2"><span className="green fw-5">452 км</span> Казань — Набережные Челны — Москва</div>
                                <div><span className="red fw-5">584 км</span> Альметьевск — Казань — Набережные Челны — Москва</div>
                            </div>
                        </div>
                        <div className="order-2 mb-4 mb-lg-5">
                            <h5 className="mb-2 mb-lg-3">Оплата</h5>
                            <div className="box p-3">
                                <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                                    <div>58 000 ₽ с НДС</div>
                                    <div>(80 ₽/км)</div>
                                </div>
                                <div className="d-flex justify-content-between fs-13 fw-5 mb-3">
                                    <div>50 000 ₽ без НДС</div>
                                    <div>(78 ₽/км)</div>
                                </div>
                                <div className="d-flex justify-content-between fs-13 fw-5">
                                    <div>Без торга</div>
                                </div>
                            </div>
                        </div>
                        <UserContacts className="order-1 order-md-3 mb-4 mb-md-0" type="cargo" img="/img/users/logo.png" title="ООО НТК" contacts={[{name: 'Анастасия', phone: '+7 (952) 65 89 61'}, {name: 'Иван', phone: '+7 (952) 65 89 62'}]} />
                        <button type="button" data-bs-toggle="modal" data-bs-target="#report" className="d-none d-md-block order-4 gray-3 mx-auto mt-3 fs-11 d-flex align-items-center">
                            <IconContext.Provider value={{className: "gray-4 icon"}}>
                                <IoWarning />
                            </IconContext.Provider>
                            <span className="ms-2">Подать жалобу</span>
                        </button>
                    </div>
                    <div className="col-md-7 col-xl-8 col-xxl-9">
                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <RiFlag2Fill />
                            </IconContext.Provider>
                            <h5 className="mb-0">Загрузка</h5>
                        </div>
                        <div className="box p-3 p-lg-4 mb-4 mb-lg-5">
                            <div className="d-flex flex-wrap align-items-center">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoCalendarOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Дата: </span>
                                <time>11.11.2021</time>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoTimeOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Время загрузки: </span>
                                <time>07:00–18:00</time>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoLocationSharp />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Место загрузки: </span>
                                <span>г. Казань, Четаева 89</span>
                                <button type="button" className="blue fs-09 ms-3">Показать на карте</button>
                            </div>
                        </div>

                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <RiFlag2Fill />
                            </IconContext.Provider>
                            <h5 className="mb-0">Загрузка 2</h5>
                        </div>
                        <div className="box p-3 p-lg-4 mb-4 mb-lg-5">
                            <div className="d-flex flex-wrap align-items-center">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoCalendarOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Дата: </span>
                                <time>11.11.2021</time>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoTimeOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Время загрузки: </span>
                                <time>07:00–18:00</time>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoLocationSharp />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Место загрузки: </span>
                                <span>г. Казань, Четаева 89</span>
                                <button type="button" className="blue fs-09 ms-3">Показать на карте</button>
                            </div>
                        </div>

                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <RiFlag2Fill />
                            </IconContext.Provider>
                            <h5 className="mb-0">Разгрузка</h5>
                        </div>
                        <div className="box p-3 p-lg-4 mb-4 mb-lg-5">
                            <div className="d-flex flex-wrap align-items-center">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoCalendarOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Дата: </span>
                                <time>11.11.2021</time>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoTimeOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Время разгрузки: </span>
                                <time>07:00–18:00</time>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <IconContext.Provider value={{className: "gray-4 icon me-2 me-sm-3"}}>
                                    <IoLocationSharp />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Место разгрузки: </span>
                                <span>г. Казань, Четаева 89</span>
                                <button type="button" className="blue fs-09 ms-3">Показать на карте</button>
                            </div>
                        </div>

                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <IoCube />
                            </IconContext.Provider>
                            <h5 className="mb-0">Груз</h5>
                        </div>
                        <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                            <div className="d-flex flex-wrap align-items-center">
                                <span className="fw-5 me-2">Тип груза: </span>
                                <span>Продукты</span>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <span className="fw-5 me-2">Объем: </span>
                                <span>10 м<sup>3</sup></span>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <span className="fw-5 me-2">Вес: </span>
                                <span>10 т</span>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <span className="fw-5 me-2">Габариты: </span>
                                <span>10/1/3 м</span>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <span className="fw-5 me-2">Упаковка: </span>
                                <span>Коробки 20шт</span>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <span className="fw-5 me-2">Особые пометки: </span>
                                <span>Холод</span>
                                <IconContext.Provider value={{className: "blue icon ms-2"}}>
                                    <IoSnow/>
                                </IconContext.Provider>
                            </div>
                            <div className="d-flex flex-wrap align-items-center mt-2 mt-sm-3">
                                <span className="fw-5 me-2">Требования к машине: </span>
                                <span>Изотермический, Рефрижератор 0-5°C</span>
                            </div>
                        </div>

                        <div className="d-flex mb-2 mb-lg-3">
                            <IconContext.Provider value={{className: "green icon me-2 me-sm-3"}}>
                                <RiChat4Fill />
                            </IconContext.Provider>
                            <h5 className="mb-0">Примечание</h5>
                        </div>
                        <div className="box p-3 px-sm-4 p-lg-4 px-xl-5 mb-4 mb-lg-5">
                            <div>Требуется мед. книжка и сан.обработка.</div>
                        </div>

                        <div className="d-flex flex-column flex-xl-row align-items-center align-items-md-stretch justify-content-end">
                            <button type="button" data-bs-toggle="offcanvas" data-bs-target="#warning" className="btn btn-1 fs-12">ОТКЛИКНУТЬСЯ</button>
                            <button type="button" className="btn btn-3 fs-12 px-1 px-sm-3 px-lg-4 mt-3 mt-xl-0 ms-xl-3">
                                <IconContext.Provider value={{className: "icon me-1 me-lg-3"}}>
                                    <IoRepeat />
                                </IconContext.Provider>
                                <span>Поиск грузов в обратном направлении</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sec-3 container mt-5 mb-6">
                <h2>Похожие объявления</h2>
                <div className="position-relative mb-4">
                <Swiper className="swiper-4"
                    spaceBetween={4}
                    slidesPerView={2}
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
                            slidesPerView: 3,
                            spaceBetween: 16,
                        },
                        1400: {
                            slidesPerView: 4,
                            spaceBetween: 20,
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
                    <SwiperSlide>
                        <Card 
                            type="cargo"
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="cold"
                            url="/cargo-page"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card 
                            type="cargo"
                            className=""
                            title="Оборудование" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="fragile"
                            url="/cargo-page"
                        />
                    </SwiperSlide>
                    <SwiperSlide>    
                        <Card 
                            type="cargo"
                            className=""
                            title="Стройматериалы" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="none"
                            url="/cargo-page"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card 
                            type="cargo"
                            className=""
                            title="Трубы" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="dimensional"
                            url="/cargo-page"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card 
                            type="cargo"
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="cold"
                            url="/cargo-page"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card 
                            type="cargo"
                            className=""
                            title="Оборудование" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="fragile"
                            url="/cargo-page"
                        />
                    </SwiperSlide>
                    <div className="swiper-button-prev">
                        <IoChevronBackSharp />
                    </div>
                    <div className="swiper-button-next">
                        <IoChevronForwardSharp />
                    </div>
                    <div className="swiper-pagination"></div>
                </Swiper>
                </div>
                <button type="button" className="btn btn-2 fs-12 text-uppercase mx-auto">Найти груз</button>
            </section>
        </main>
    )
}

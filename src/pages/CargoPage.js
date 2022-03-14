import React from 'react';

import Card from '../components/Card';

import { RiFlag2Fill, RiChat4Fill } from "react-icons/ri";
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { IoCalendarOutline, IoTimeOutline, IoLocationSharp, IoCube, IoRepeat, IoSnow } from "react-icons/io5";
import { IconContext } from "react-icons";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import UserContacts from '../components/UserContacts';
SwiperCore.use([Navigation, Pagination]);


export default function CargoPage() {
    return (
        <main className="bg-white">
            <section id="sec-8" className="container py-4 py-sm-5">
                <h1 className="mb-5">Груз № 356790 Гомзово — Набережные Челны</h1>
                <div className="row flex-md-row-reverse">
                    <div className="col-3">
                        <div className="order-1 mb-4">
                            <h5>Маршрут</h5>
                            <div className="border p-3">
                                <div className="mb-2"><span className="green fw-5">452 км</span> Казань — Набережные Челны — Москва</div>
                                <div><span className="red fw-5">584 км</span> Альметьевск — Казань — Набережные Челны — Москва</div>
                            </div>
                        </div>
                        <div className="order-2 mb-5">
                            <h5>Оплата</h5>
                            <div className="border p-3">
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
                        <UserContacts type="cargo" img="/cargo/img/users/logo.png" company="ООО НТК"/>
                    </div>
                    <div className="col-9">
                        <div className="d-flex">
                            <IconContext.Provider value={{className: "green icon me-3"}}>
                                <RiFlag2Fill />
                            </IconContext.Provider>
                            <h5>Загрузка</h5>
                        </div>
                        <div className="border p-3 mb-5">
                            <div className="d-flex">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoCalendarOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Дата: </span>
                                <time>11.11.2021</time>
                            </div>
                            <div className="d-flex mt-2">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoTimeOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Время загрузки: </span>
                                <time>07:00–18:00</time>
                            </div>
                            <div className="d-flex mt-2">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoLocationSharp />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Место загрузки: </span>
                                <span>г. Казань, Четаева 89</span>
                                <button type="button" className="blue fs-09 ms-3">Показать на карте</button>
                            </div>
                        </div>

                        <div className="d-flex">
                            <IconContext.Provider value={{className: "green icon me-3"}}>
                                <RiFlag2Fill />
                            </IconContext.Provider>
                            <h5>Загрузка 2</h5>
                        </div>
                        <div className="border p-3 mb-5">
                            <div className="d-flex">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoCalendarOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Дата: </span>
                                <time>11.11.2021</time>
                            </div>
                            <div className="d-flex mt-2">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoTimeOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Время загрузки: </span>
                                <time>07:00–18:00</time>
                            </div>
                            <div className="d-flex mt-2">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoLocationSharp />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Место загрузки: </span>
                                <span>г. Казань, Четаева 89</span>
                                <button type="button" className="blue fs-09 ms-3">Показать на карте</button>
                            </div>
                        </div>

                        <div className="d-flex">
                            <IconContext.Provider value={{className: "green icon me-3"}}>
                                <RiFlag2Fill />
                            </IconContext.Provider>
                            <h5>Разгрузка</h5>
                        </div>
                        <div className="border p-3 mb-5">
                            <div className="d-flex">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoCalendarOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Дата: </span>
                                <time>11.11.2021</time>
                            </div>
                            <div className="d-flex mt-2">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoTimeOutline />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Время разгрузки: </span>
                                <time>07:00–18:00</time>
                            </div>
                            <div className="d-flex mt-2">
                                <IconContext.Provider value={{className: "gray-4 icon me-3"}}>
                                    <IoLocationSharp />
                                </IconContext.Provider>
                                <span className="fw-5 me-2">Место разгрузки: </span>
                                <span>г. Казань, Четаева 89</span>
                                <button type="button" className="blue fs-09 ms-3">Показать на карте</button>
                            </div>
                        </div>

                        <div className="d-flex">
                            <IconContext.Provider value={{className: "green icon me-3"}}>
                                <IoCube />
                            </IconContext.Provider>
                            <h5>Груз</h5>
                        </div>
                        <div className="border p-3 mb-5">
                            <div className="d-flex">
                                <span className="fw-5 me-2">Тип груза: </span>
                                <span>Продукты</span>
                            </div>
                            <div className="d-flex mt-2">
                                <span className="fw-5 me-2">Объем: </span>
                                <span>10 м<sup>3</sup></span>
                            </div>
                            <div className="d-flex mt-2">
                                <span className="fw-5 me-2">Вес: </span>
                                <span>10 т</span>
                            </div>
                            <div className="d-flex mt-2">
                                <span className="fw-5 me-2">Габариты: </span>
                                <span>10/1/3 м</span>
                            </div>
                            <div className="d-flex mt-2">
                                <span className="fw-5 me-2">Упаковка: </span>
                                <span>Коробки 20шт</span>
                            </div>
                            <div className="d-flex mt-2">
                                <span className="fw-5 me-2">Особые пометки: </span>
                                <span>Холод</span>
                                <IconContext.Provider value={{className: "blue icon ms-2"}}>
                                    <IoSnow/>
                                </IconContext.Provider>
                            </div>
                            <div className="d-flex mt-2">
                                <span className="fw-5 me-2">Требования к машине: </span>
                                <span>Изотермический, Рефрижератор 0-5°C</span>
                            </div>
                        </div>

                        <div className="d-flex">
                            <IconContext.Provider value={{className: "green icon me-3"}}>
                                <RiChat4Fill />
                            </IconContext.Provider>
                            <h5>Примечание</h5>
                        </div>
                        <div className="border p-3 mb-5">
                            <div>Требуется мед. книжка и сан.обработка.</div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-1 fs-12">ОТКЛИКНУТЬСЯ</button>
                            <button type="button" className="btn btn-3 fs-12 ms-3">
                                <IconContext.Provider value={{className: "icon me-3"}}>
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

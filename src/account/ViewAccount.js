import React from 'react';
import Card from '../components/Card';
import { IconContext  } from "react-icons";
import { IoChevronBackSharp, IoChevronForwardSharp, IoEllipsisVertical } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

export default function ViewAccount() {
    return (
        <div className='box p-0'>
            <div className='p-3 p-md-4 d-flex align-items-center'>
                <h4 className='flex-1 text-center text-uppercase mb-0'>ООО НТК</h4>
                <div className="dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider value={{className: "icon-20 green", title: "Пожаловаться на пользователя" }}>
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu">
                        <li><button type='button'>Пожаловаться на пользователя</button></li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className='p-4 p-xl-5'>
                <div className='row flex-md-row-reverse'>
                    <div className='col-md-4'>
                        <div className='profile-picture mx-auto mb-4 mb-sm-5'>
                            <img src="/cargo/img/users/no-photo.png" alt="ООО НТК"/>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='row g-sm-4 fs-12'>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Тип аккаунта:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Грузовладелец-перевозчик</div>
                            </div>
                            
                            {/* Только для юр лиц start */}
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>ИНН:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>027363360430</div>
                            </div>
                            
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Имя:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Эльвира</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Фамилия:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Наумова</div>
                            </div>
                            {/* Только для юр лиц end */}

                            
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Email:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Email@mail</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Телефон:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>+ 7 969 152 36 95</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Город:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Казань</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-3 py-sm-4 p-lg-4 p-xl-5'>
                <h4 className='text-center text-uppercase mb-2 mb-sm-3 mb-lg-4'>объявления Пользователя</h4>
                <div className='position-relative mb-4 mb-lg-5'>
                    <div className='fs-11 text-center'>Актуальных объявлений нет</div>
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
                        <div className="swiper-button-prev">
                            <IoChevronBackSharp />
                        </div>
                        <div className="swiper-button-next">
                            <IoChevronForwardSharp />
                        </div>
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
                <div className='row row-cols-2 row-cols-md-3 row-cols-xxl-4 gx-2 gx-sm-4 justify-content-center fs-12'>
                    <div>
                    <button type='button' className='btn btn-2 text-uppercase w-100 px-2 px-sm-3'>Найти машину</button>
                    </div>
                    <div>
                    <button type='button' className='btn btn-2 text-uppercase w-100 px-2 px-sm-3'>Найти груз</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
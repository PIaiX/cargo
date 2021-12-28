import React from 'react';
import { Slider2 } from './Slider2';
import { Slider1 } from './Slider1';

export default function MainPage() {
    return (
        <main>
            <section id="sec-1" className="py-5">
                <div className="container">
                    <div className="row justify-content-center gx-3">
                        <div className="col-8 col-xxl-7">
                            <div id="slider-1" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#slider-1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#slider-1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#slider-1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="/img/img-slider.png" className="img" alt="слайд 1" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/img-slider.png" className="img" alt="слайд 2" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/img/img-slider.png" className="img" alt="слайд 3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-xxl-3 d-flex flex-column justify-content-between">
                            <div className="box text-center">
                                <div className="title-font dark-blue fw-9 fs-25 mb-2">2 512 359</div>
                                <div className="fs-12 mb-3">Грузов доставленно</div>
                                <button type="button" className="btn btn-1 fs-12 mx-auto">Добавить груз</button>
                            </div>
                            <div className="box text-center">
                                <div className="title-font dark-blue fw-9 fs-25 mb-2">12 359</div>
                                <div className="fs-12 mb-3">Машин на сайте</div>
                                <button type="button" className="btn btn-1 fs-12 mx-auto">Добавить машину</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sec-2">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div>Откуда</div>
                            <input placeholder="Казань" />
                        </div>
                        <div className="col-4">
                            <div>Куда</div>
                            <input placeholder="Город назначения" />
                        </div>
                        <div className="col-2">
                            <div>Дата</div>
                            <input placeholder="01.01.2021" />
                        </div>
                    </div>
                </div>
            </section>

            
        

            <section className="sec-4 container mb-6">
                <h3>Срочная продажа</h3>
                <div className="position-relative">
                    <Slider1 />
                </div>
                <div className="text-center mt-2">
                    <a href="/" className="fs-11 fw-5">Смотреть все</a>
                </div>
            </section>

            <section className="sec-4 container mb-6">
                <h3>Часто просматриваемые</h3>
                <div className="position-relative">
                    <Slider1 />
                </div>
                <div className="text-center mt-2">
                    <a href="/" className="fs-11 fw-5">Смотреть все</a>
                </div>
            </section>

            <section className="sec-4 container mb-6">
                <h3>Рекомендованные Вам</h3>
                <div className="position-relative">
                    <Slider1 />
                </div>
                <div className="text-center mt-2">
                    <a href="/" className="fs-11 fw-5">Смотреть все</a>
                </div>
            </section>

            <section id="sec-5">
                <div className="container pb-5">
                    <div className="row gx-xxl-5 mb-6">
                        <div className="col-lg-7 col-xl-8">
                            <img src="/real_estate/img/img4.jpg" alt="" className="w-100"/>
                        </div>
                        <div className="info col-lg-5 col-xl-4 pt-xxl-5 mt-4 mt-lg-0">
                            <h2>Продаете или покупаете недвижимость?</h2>
                            <div className="d-flex align-items-baseline mt-2 mt-sm-4">
                                <img src="/real_estate/img/icons/mark.svg" alt=""/>
                                <div className="color-2 fs-15 ms-2 ms-sm-3">Юридическая консультация</div>
                            </div>
                            <div className="d-flex align-items-baseline mt-2 mt-sm-4">
                                <img src="/real_estate/img/icons/mark.svg" alt=""/>
                                <div className="color-2 fs-15 ms-2 ms-sm-3">Сопровождение сделок</div>
                            </div>
                            <div className="d-flex align-items-baseline mt-2 mt-sm-4">
                                <img src="/real_estate/img/icons/mark.svg" alt=""/>
                                <div className="color-2 fs-15 ms-2 ms-sm-3">Оформление ипотеки на выгодных условиях</div>
                            </div>
                            <button type="button" className="btn btn-1 fs-15 mx-auto mt-4 mt-lg-5">Услуги риелтора</button>
                        </div>
                    </div>
                    <h3>Статьи</h3>
                    <div className="position-relative">
                        <Slider2 />
                    </div>
                </div>
            </section>
        </main>
    )
}

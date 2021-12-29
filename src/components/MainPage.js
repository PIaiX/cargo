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

            <section id="sec-2" className="mb-5">
                <div className="container py-5">
                    <form>
                        <div className="row g-4 justify-content-center">
                            <div className="col-4">
                                <div className="fs-15 fw-5 mb-3">Откуда</div>
                                <input placeholder="Казань" className="fs-15"/>
                            </div>
                            <div className="col-4">
                                <div className="fs-15 fw-5 mb-3">Куда</div>
                                <input placeholder="Город назначения" className="fs-15"/>
                            </div>
                            <div className="col-2">
                                <div className="fs-15 fw-5 mb-3">Дата</div>
                                <input placeholder="01.01.2021" className="fs-15"/>
                            </div>
                            <div className="col-10 d-flex justify-content-between fs-12">
                                <div className="d-flex">
                                    <button type="button" className="btn btn-1">Найти машину</button>
                                    <button type="button" className="btn btn-1 ms-4">Найти груз</button>
                                </div>
                                <button type="button" className="btn btn-2">Рассчитать расстояние</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <section className="sec-3 container mb-6">
                <h2>Грузы в вашем городе</h2>
                <div className="position-relative mb-4">
                    <Slider1 />
                </div>
                <button type="button" className="btn btn-2 fs-12 text-uppercase mx-auto">Найти груз</button>
            </section>

            <section className="sec-3 container mb-6">
                <h2>Машины в Вашем городе</h2>
                <div className="position-relative mb-4">
                    <Slider1 />
                </div>
                <button type="button" className="btn btn-2 fs-12 text-uppercase mx-auto">Найти МАШИНУ</button>
            </section>

            <section id="sec-4" className="mb-6">
                <div className="container h-100 d-flex align-items-center">
                    <div className="row">
                        <div className="col-6">
                            <img src="/img/img1.png" alt="" className="img-fluid" />
                        </div>
                        <div className="col-4 pt-4">
                            <h2 className="text-start">О сервисе</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <div className="mt-2">
                                <a href="#" className="green title-font fw-5 fs-12">Подробнее</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section id="sec-5" className="container mb-6">
                <h2>С нами удобно</h2>
            </section>

            <section id="sec-6" className="container mb-6">
                <h2>Новости ПОРТАЛА</h2>
                <div className="news-grid">
                    <article>
                        <figure>
                            <img src="/img/img2.png" alt=""/>
                            <figcaption>
                                <div className="title">Название новости</div>
                                <div className="text">
                                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</div>
                                </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article>
                        <figure>
                            <img src="/img/img2.png" alt=""/>
                            <figcaption>
                                <div className="title">Название новости Lorem ipsum dolor sit amet</div>
                                <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article>
                        <figure>
                            <img src="/img/img2.png" alt=""/>
                            <figcaption>
                                <div className="title">Название новости</div>
                                <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article>
                        <figure>
                            <img src="/img/img2.png" alt=""/>
                            <figcaption>
                                <div className="title">Название новости</div>
                                <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </div>
                            </figcaption>
                        </figure>
                    </article>
                    <article>
                        <figure>
                            <img src="/img/img2.png" alt=""/>
                            <figcaption>
                                <div className="title">Название новости</div>
                                <div className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </div>
                            </figcaption>
                        </figure>
                    </article>
                </div>
            </section>
        </main>
    )
}

import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Card from "../components/Card";
import ArticleCard from "../components/ArticleCard";
import {IoChevronBackSharp, IoChevronForwardSharp} from "react-icons/io5";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination} from "swiper";
import {useSelector} from "react-redux";
import SearchInput from "../components/utilities/SearchInput";
import {getCities} from "../API/cities";

SwiperCore.use([Navigation, Pagination]);

const homePageNewsLimit = 5;

export default function Home() {

    const news = useSelector((state) => state.news);
    const [data, setData] = useState([])
    const [selectFirstCity, setSelectFirstCity] = useState('')
    const [selectSecondCity, setSelectSecondCity] = useState('')

    useEffect(() => {
        getCities().then(res => {
            if (res.status === 200) {
                setData(res.body)
            }
        })
    }, [])

    return (
        <main>
            <section id="sec-1" className="py-4 py-sm-5">
                <div className="container">
                    <div className="row justify-content-center gx-3">
                        <div className="col-lg-8 col-xxl-7">
                            <div
                                id="slider-1"
                                className="carousel slide"
                                data-bs-ride="carousel"
                            >
                                <div className="carousel-indicators">
                                    <button
                                        type="button"
                                        data-bs-target="#slider-1"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#slider-1"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#slider-1"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                    ></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src="/img/img-slider.png"
                                            className="img"
                                            alt="?????????? 1"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="/img/img-slider.png"
                                            className="img"
                                            alt="?????????? 2"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="/img/img-slider.png"
                                            className="img"
                                            alt="?????????? 3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xxl-3 d-flex flex-lg-column justify-content-between mt-4 mt-lg-0">
                            <div className="box text-center">
                                <div className="title-font dark-blue fw-9 fs-25 mb-2">
                                    2 512 359
                                </div>
                                <div className="fs-12 mb-3">???????????? ??????????????????????</div>
                                <Link to="add-cargo" className="btn btn-1 fs-12 w-100 px-2">
                                    ???????????????? ????????
                                </Link>
                            </div>
                            <div className="box text-center">
                                <div className="title-font dark-blue fw-9 fs-25 mb-2">
                                    12 359
                                </div>
                                <div className="fs-12 mb-3">?????????? ???? ??????????</div>
                                <Link to="add-car" className="btn btn-1 fs-12 w-100 px-2">
                                    ???????????????? ????????????
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sec-2" className="mb-5">
                <div className="container py-4 py-sm-5">
                    <form>
                        <div className="row g-3 g-sm-4 justify-content-center">
                            <div className="col-md-4">
                                <div className="fs-15 fw-5 mb-1 mb-sm-3">????????????</div>
                                <SearchInput
                                    callback={(inputValue) => {
                                        setSelectFirstCity(inputValue)
                                    }}
                                    placeHolder={'?????????? ??????????????????????'}
                                    data={data}
                                />
                            </div>
                            <div className="col-md-4">
                                <div className="fs-15 fw-5 mb-1 mb-sm-3">????????</div>
                                <SearchInput
                                    callback={(inputValue) => {
                                        setSelectSecondCity(inputValue)
                                    }}
                                    placeHolder={'?????????? ????????????????????'}
                                    data={data}
                                />
                            </div>
                            <div className="col-md-4 col-xl-3 col-xxl-2">
                                <div className="fs-15 fw-5 mb-1 mb-sm-3">????????</div>
                                <input type="date" className="fs-15"/>
                            </div>
                            <div
                                className="col-12 col-xl-11 col-xxl-10 d-md-flex flex-md-row-reverse justify-content-between fs-12">
                                <button
                                    type="button"
                                    className="btn btn-2 mb-2 mb-sm-3 mb-md-0"
                                >
                                    ???????????????????? ????????????????????
                                </button>
                                <div className="d-flex">
                                    <button
                                        type="button"
                                        className="btn btn-1 px-2 px-md-4 px-lg-5"
                                    >
                                        ?????????? ????????????
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-1 ms-2 ms-sm-4 px-2 px-md-4 px-lg-5"
                                    >
                                        ?????????? ????????
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <section className="sec-3 container mb-6">
                <h2>?????????? ?? ?????????? ????????????</h2>
                <div className="position-relative mb-4">
                    <Swiper
                        className="swiper-4"
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
                            },
                        }}
                        pagination={{
                            el: ".swiper-pagination",
                            type: "bullets",
                            clickable: true,
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                    >
                        <SwiperSlide>
                            <Card
                                type="cargo"
                                className=""
                                title="???????????????? ??????????????"
                                route="????????????-????????????"
                                size="30"
                                weight="10 ??"
                                notes="cold"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="cargo"
                                className=""
                                title="????????????????????????"
                                route="????????????-????????????"
                                size="30"
                                weight="10 ??"
                                notes="fragile"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="cargo"
                                className=""
                                title="????????????????????????????"
                                route="????????????-????????????"
                                size="30"
                                weight="10 ??"
                                notes="none"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="cargo"
                                className=""
                                title="??????????"
                                route="????????????-????????????"
                                size="30"
                                weight="10 ??"
                                notes="dimensional"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="cargo"
                                className=""
                                title="???????????????? ??????????????"
                                route="????????????-????????????"
                                size="30"
                                weight="10 ??"
                                notes="cold"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="cargo"
                                className=""
                                title="????????????????????????"
                                route="????????????-????????????"
                                size="30"
                                weight="10 ??"
                                notes="fragile"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <div className="swiper-button-prev">
                            <IoChevronBackSharp/>
                        </div>
                        <div className="swiper-button-next">
                            <IoChevronForwardSharp/>
                        </div>
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
                <button
                    type="button"
                    className="btn btn-2 fs-12 text-uppercase mx-auto"
                >
                    ?????????? ????????
                </button>
            </section>

            <section className="sec-3 container mb-6">
                <h2>???????????? ?? ?????????? ????????????</h2>
                <div className="position-relative mb-4">
                    <Swiper
                        className="swiper-4"
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
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                            1400: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        pagination={{
                            el: ".swiper-pagination",
                            type: "bullets",
                            clickable: true,
                        }}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                    >
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????-????????????"
                                carType="????????"
                                verified={true}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????????? ????????????"
                                carType="??????????"
                                verified={true}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????????? ????????????"
                                carType="????????????????????????"
                                verified={false}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????-????????????"
                                carType="????????"
                                verified={false}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????-????????????"
                                carType="????????"
                                verified={true}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????????? ????????????"
                                carType="??????????"
                                verified={true}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????????? ????????????"
                                carType="????????????????????????"
                                verified={false}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Card
                                type="car"
                                className=""
                                route="????????????-????????????"
                                carType="????????"
                                verified={false}
                                date="??????????????????"
                                carrying="20"
                                size="30"
                                dimensions="13/2,45/2,45"
                                url="/cargo-page"
                            />
                        </SwiperSlide>
                        <div className="swiper-button-prev">
                            <IoChevronBackSharp/>
                        </div>
                        <div className="swiper-button-next">
                            <IoChevronForwardSharp/>
                        </div>
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
                <button
                    type="button"
                    className="btn btn-2 fs-12 text-uppercase mx-auto"
                >
                    ?????????? ????????????
                </button>
            </section>

            <section id="sec-4" className="mb-6">
                <div className="container h-100 d-flex align-items-center">
                    <div className="row flex-md-row-reverse justify-content-end">
                        <div className="col-md-6 col-lg-5 col-xl-4 pt-xxl-4">
                            <h2 className="text-md-start">?? ??????????????</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <div className="mt-2">
                                <a href="/" className="green title-font fw-5 fs-12">
                                    ??????????????????
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img src="/img/img1.png" alt="" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sec-5" className="container mb-6">
                <h2>?? ???????? ????????????</h2>
                <div className="d-none d-lg-flex row gx-4 gx-xxl-5">
                    <div className="col-1">
                        <div className="ribbon ribbon-left">????????????????????????????????</div>
                    </div>
                    <div className="col-3 d-flex flex-column justify-content-between py-4">
                        <div>
                            <div className="title title-left">
                                <span>1. ?????????????????? ???????? ???? ????????????????</span>
                            </div>
                            <div className="fs-11">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                        <div>
                            <div className="title title-left">
                                <span>3. ?????????????? ????????????</span>
                            </div>
                            <div className="fs-11">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud
                            </div>
                        </div>
                        <div>
                            <div className="title title-left">
                                <span>5. ???????????????? ????????????</span>
                            </div>
                            <div className="fs-11">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <img src="/img/scheme.png" alt="??????????" className="scheme"/>
                    </div>
                    <div className="col-3 d-flex flex-column justify-content-between py-4">
                        <div>
                            <div className="title title-right">
                                <span>2. ?????????? ????????</span>
                            </div>
                            <div className="fs-11">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                        <div>
                            <div className="title title-right">
                                <span>4. ???????????????? ????????????</span>
                            </div>
                            <div className="fs-11">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud
                            </div>
                        </div>
                        <div className="py-5">
                            <div className="title title-right">
                                <span>?????? ???????????? ?????? ??????????????????</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 d-flex justify-content-end">
                        <div className="ribbon ribbon-right">????????????????????</div>
                    </div>
                </div>
                <div className="d-block d-lg-none">
                    <div className="point">
                        <div className="icon">
                            <img
                                src="/img/icons/icon-1.svg"
                                alt="?????????????????? ???????? ???? ????????????????"
                            />
                        </div>
                        <div className="text">
                            <div className="title">
                                <span>1. ?????????????????? ???????? ???? ????????????????</span>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                        <div className="ribbon ribbon-left">????????????????????????????????</div>
                    </div>
                    <div className="point">
                        <div className="icon">
                            <img src="/img/icons/icon-2.svg" alt="?????????? ????????"/>
                        </div>
                        <div className="text">
                            <div className="title">
                                <span>2. ?????????? ????????</span>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                        <div className="ribbon ribbon-left">????????????????????</div>
                    </div>
                    <div className="point">
                        <div className="icon">
                            <img src="/img/icons/icon-3.svg" alt="?????????????? ????????????"/>
                        </div>
                        <div className="text">
                            <div className="title">
                                <span>3. ?????????????? ????????????</span>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                        <div className="ribbon ribbon-left">????????????????????????????????</div>
                    </div>
                    <div className="point">
                        <div className="icon">
                            <img src="/img/icons/icon-4.svg" alt="???????????????? ????????????"/>
                        </div>
                        <div className="text">
                            <div className="title">
                                <span>4. ???????????????? ????????????</span>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                        <div className="ribbon ribbon-left">????????????????????</div>
                    </div>
                    <div className="point">
                        <div className="icon">
                            <img src="/img/icons/icon-5.svg" alt="???????????????? ????????????"/>
                        </div>
                        <div className="text">
                            <div className="title">
                                <span>5. ???????????????? ????????????</span>
                            </div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud{" "}
                            </div>
                        </div>
                        <div className="ribbon ribbon-left">????????????????????????????????</div>
                    </div>
                    <div className="point">
                        <div className="icon">
                            <img
                                src="/img/icons/icon-6.svg"
                                alt="?????? ???????????? ?????? ??????????????????"
                            />
                        </div>
                        <div className="text">
                            <div className="title mb-0">
                                <span>?????? ???????????? ?????? ??????????????????</span>
                            </div>
                        </div>
                        <div className="ribbon ribbon-left">????????????????????</div>
                    </div>
                </div>
            </section>

            <section id="sec-6" className="container mb-5">
                <h2>?????????????? ??????????????</h2>
                {news.loading && "???????? ???????????????? ????????????????..."}
                {!news.loading && news.data.length > 0 && (
                    <div className="news-grid">
                        {news.data.slice(0, homePageNewsLimit).map((item, idx) => {
                            return (
                                <ArticleCard
                                    key={idx}
                                    url={`/news/${item.slug}`}
                                    title={item.title}
                                    img={item.img}
                                    text={item.body}
                                />
                            );
                        })}
                    </div>
                )}
                <Link
                    to="all-news"
                    className="btn btn-2 mx-auto mt-5 fs-12 text-uppercase"
                >
                    ?? ???????????? ????????????????
                </Link>
            </section>
        </main>
    );
}

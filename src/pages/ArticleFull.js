import React, {useState, useEffect} from "react";
import ArticleMini from "../components/ArticleMini";
import ForumWidget from "../components/ForumWidget";
import {IoChevronBackSharp, IoChevronForwardSharp} from "react-icons/io5";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination} from "swiper";
import {useParams} from "react-router-dom";
import {getRandomNews, getSingleNews} from '../API/news';
import Loader from '../components/Loader';

SwiperCore.use([Navigation, Pagination]);

export default function ArticleFull() {
    const {slug} = useParams()
    const [newsItem, setNewsItem] = useState({
        isLoading: false,
        error: null,
        item: null
    })
    const [swiperNews, setSwiperNews] = useState({
        isLoading: false,
        error: null,
        items: []
    })
    const articleDate = newsItem.item ? new Date(newsItem?.item?.createdAt) : null

    useEffect(() => {
        getSingleNews(slug)
            .then(item => setNewsItem(prev => ({...prev, isLoading: true, item})))
            .catch(error => setNewsItem(prev => ({...prev, isLoading: true, error})))

    }, [slug])

    useEffect(() => {
        getRandomNews(8)
            .then(items => setSwiperNews(prev => ({...prev, isLoading: true, items})))
            .catch(error => setSwiperNews(prev => ({...prev, isLoading: true, error})))
    }, [])

    useEffect(() => {
        console.log(newsItem)
    }, [newsItem])

    return (
        <main className="bg-white py-4 py-lg-5">
            <div className="container">
                <section className="mb-3 mb-sm-4 mb-lg-5">
                    {
                        newsItem.isLoading
                            ? newsItem.item
                                ? <div className="row">
                                    <div className="col-md-8 col-lg-9">
                                        <article className="full">
                                            <h1 className="dark-blue text-start text-uppercase">
                                                {newsItem?.item?.title}
                                            </h1>
                                            {/* pass value to dateTime attribute if needed */}
                                            <time
                                                className="d-block fs-11 gray-3 mb-2"
                                                dateTime="2021-12-13"
                                            >
                                                {articleDate && `${articleDate.getDate()}.${articleDate.getMonth() + 1}.${articleDate.getFullYear()}`}
                                            </time>
                                            <figure>
                                                <img src={newsItem?.item?.image} alt="Название новости"/>
                                                <figcaption>
                                                    <p>{newsItem?.item?.description}</p>
                                                </figcaption>
                                            </figure>
                                        </article>
                                    </div>
                                    <div className="d-none d-md-block col-4 col-lg-3">
                                        <ForumWidget/>
                                    </div>
                                </div>
                                : <h6 className="m-auto p-5 text-center">Новость не найдена</h6>
                            : <div className="d-flex justify-content-center"><Loader color="#545454"/></div>
                    }
                </section>
                {
                    swiperNews.isLoading
                        ? swiperNews?.items?.length
                            ? <section className="position-relative mb-3 mb-sm-4 mb-lg-5">
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
                                            slidesPerView: 4,
                                            spaceBetween: 8,
                                        },
                                        1200: {
                                            slidesPerView: 4,
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
                                    {
                                        swiperNews.items.map(item => (
                                            <SwiperSlide key={item.id}>
                                                <ArticleMini
                                                    key={item.id}
                                                    url={`/news/${item.slug}`}
                                                    title={item.title}
                                                    img={`${item.image}`}
                                                    text={item.description}
                                                    date={item.createdAt}
                                                />
                                            </SwiperSlide>
                                        ))
                                    }
                                    <div className="swiper-button-prev">
                                        <IoChevronBackSharp/>
                                    </div>
                                    <div className="swiper-button-next">
                                        <IoChevronForwardSharp/>
                                    </div>
                                    <div className="swiper-pagination"/>
                                </Swiper>
                            </section>
                            : null
                        : <div className="d-flex justify-content-center"><Loader color="#545454"/></div>
                }
            </div>
        </main>
    );
}

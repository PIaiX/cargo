import React, { useState, useEffect } from "react";
import ArticleMini from "../components/ArticleMini";
import ForumWidget from "../components/ForumWidget";
import news from "./../dummyData/news.json";

import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { useParams } from "react-router-dom";
SwiperCore.use([Navigation, Pagination]);

const articlesLimit = 8

export default function ArticleFull() {
  const [articleData, setArticleData] = useState({});
  const [articles, setArticles] = useState([]);
  const params = useParams();

  useEffect(() => {
    //Make an API call here fetching the actual article
    const item = news.find((item) => item.slug === params.slug);
    setArticleData(item);

    //Make an API call here fetching other articles below, limit the response to 8 articles
    const items = news.slice(0, articlesLimit);
    setArticles(items);
  }, [params]);

  return (
    <main className="bg-white py-4 py-lg-5">
      <div className="container">
        <section className="mb-3 mb-sm-4 mb-lg-5">
          <div className="row">
            <div className="col-md-8 col-lg-9">
              <article className="full">
                <h1 className="dark-blue text-start text-uppercase">
                  {articleData.title}
                </h1>
                <time
                  className="d-block fs-11 gray-3 mb-2"
                  dateTime="2021-12-13"
                >
                  {articleData.date}
                </time>
                <figure>
                  <img src={articleData.img} alt="Название новости" />
                  <figcaption>
                    <p>{articleData.body}</p>
                  </figcaption>
                </figure>
              </article>
            </div>
            <div className="d-none d-md-block col-4 col-lg-3">
              <ForumWidget />
            </div>
          </div>
        </section>
        <section className="position-relative mb-3 mb-sm-4 mb-lg-5">
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
            {articles.length > 0 &&
              articles.map((item, idx) => (
                <SwiperSlide>
                  <ArticleMini
                    key={idx}
                    url={`/news/${item.slug}`}
                    title={item.title}
                    img={`${item.img}`}
                    text={item.body}
                    date={item.date}
                  />
                </SwiperSlide>
              ))}
            <div className="swiper-button-prev">
              <IoChevronBackSharp />
            </div>
            <div className="swiper-button-next">
              <IoChevronForwardSharp />
            </div>
            <div className="swiper-pagination"></div>
          </Swiper>
        </section>
      </div>
    </main>
  );
}

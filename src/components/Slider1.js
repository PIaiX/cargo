import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Card from './Card';

SwiperCore.use([Navigation, Pagination]);

export const Slider1 = () => {
    return (
        <Swiper className="swiper-4"
            spaceBetween={10}
            slidesPerView={'auto'}
            freeMode={true}
            breakpoints={{
                576: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
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
                    className=""
                    title="Продукты питания" 
                    route="Казань-Москва"
                    size="30"
                    weight="10 т"
                    notes="Холод"
                />
            </SwiperSlide>
            <SwiperSlide>
                <Card 
                    className=""
                    title="Оборудование" 
                    route="Казань-Москва"
                    size="30"
                    weight="10 т"
                    notes="Хрупкое"
                />
            </SwiperSlide>
            <SwiperSlide>    
                <Card 
                    className=""
                    title="Продукты питания" 
                    route="Казань-Москва"
                    size="30"
                    weight="10 т"
                    notes="Холод"
                />
            </SwiperSlide>
            <SwiperSlide>
                <Card 
                    className=""
                    title="Оборудование" 
                    route="Казань-Москва"
                    size="30"
                    weight="10 т"
                    notes="Хрупкое"
                />
            </SwiperSlide>
            <SwiperSlide>    
                <Card 
                    className=""
                    title="Продукты питания" 
                    route="Казань-Москва"
                    size="30"
                    weight="10 т"
                    notes="Холод"
                />
            </SwiperSlide>
            <SwiperSlide>
                <Card 
                    className=""
                    title="Оборудование" 
                    route="Казань-Москва"
                    size="30"
                    weight="10 т"
                    notes="Хрупкое"
                />
            </SwiperSlide>

            <div className="swiper-button-prev">❮</div>
            <div className="swiper-button-next">❯</div>
            <div className="swiper-pagination"></div>
        </Swiper>
    )
}
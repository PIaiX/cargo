import React from 'react'
import ArticleMini from '../components/ArticleMini'
import ForumWidget from '../components/ForumWidget'

import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
SwiperCore.use([Navigation, Pagination])

export default function ArticleFull() {
    return (
        <main className="bg-white py-4 py-lg-5">
            <div className='container'>
                <section className='mb-3 mb-sm-4 mb-lg-5'>
                    <div className='row'>
                        <div className='col-md-8 col-lg-9'>
                            <article className='full'>
                                <h1 className="dark-blue text-start text-uppercase">Название новости</h1>
                                <time className='d-block fs-11 gray-3 mb-2' datetime="2021-12-13">13.12.2021</time>
                                <figure>
                                    <img src="/cargo/img/img3.png" alt="Название новости" />
                                    <figcaption>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor malesuada nulla faucibus massa ullamcorper dictum pellentesque eget tellus. Pulvinar neque, velit sit blandit pellentesque nibh semper amet duis. Laoreet aliquet faucibus orci ultricies. Maecenas donec sagittis, quam nisi venenatis diam pharetra. In nec, est netus nam ac nulla.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor malesuada nulla faucibus massa ullamcorper dictum pellentesque eget tellus. Pulvinar neque, velit sit blandit pellentesque nibh semper amet duis. Laoreet aliquet faucibus orci ultricies. Maecenas donec sagittis, quam nisi venenatis diam pharetra. In nec, est netus nam ac nulla. Netus platea in augue at amet, phasellus viverra venenatis. At nunc pretium purus enim nisi a. Lobortis donec pretium elit gravida mauris consectetur ullamcorper nunc. A, aliquet et donec tellus pulvinar massa nibh est. Morbi suspendisse urna, non nisi rutrum morbi odio vel ornare. Mattis dictum neque, libero vel purus cras sed egestas. Ac mauris, nisl vel cursus.</p>
                                        <p>Pellentesque scelerisque ornare arcu vitae scelerisque massa habitant leo. Amet, velit nisl, dignissim tempus volutpat. Commodo odio mauris scelerisque enim sit urna. Nisl sed dolor dolor velit rhoncus. Nisl aliquam a id et faucibus tortor tristique. Donec porta dolor eu quam.</p>
                                        <p>Egestas tristique ultrices sed at lectus purus ac lectus. Urna in morbi accumsan enim ultrices. Purus tincidunt vitae, egestas auctor porta lectus. Ut sapien ut varius vitae. Nisl, netus vivamus tortor consectetur mi, dui parturient.</p>
                                        <p>Egestas tortor, et morbi et cras ornare volutpat elementum. Lorem euismod pharetra sagittis vel posuere risus a. Mauris sodales nisl suspendisse semper felis ultrices sed vitae. Mollis urna elementum facilisis dictum. Odio morbi et et aliquam id eu, egestas montes, amet. A, vitae amet, viverra risus massa aenean id sociis. Scelerisque enim condimentum nunc nec iaculis eget. Consectetur donec vitae massa nulla vitae scelerisque vel feugiat.</p>
                                        <p>Nullam sapien urna, hendrerit elit tristique vestibulum congue. Eget amet cursus congue dui volutpat ut auctor. Fusce non lorem vitae ornare integer integer condimentum non. Ac et elementum adipiscing augue eget sapien turpis felis nullam. Viverra tempus, urna ipsum morbi. At quam nam duis nec, laoreet faucibus tristique in etiam. Tincidunt dolor enim, tempus, vestibulum pretium adipiscing orci, egestas. In enim felis magna fringilla arcu viverra sit. Et purus dolor sollicitudin fringilla sagittis, sociis at suspendisse tincidunt. Facilisis tellus nibh nunc, mauris elit vitae, duis. Blandit leo hendrerit egestas curabitur ut. Massa tristique feugiat sem justo arcu quam id consequat sit.</p>
                                        <p>Massa accumsan purus neque purus. Sed proin enim, tortor lobortis pulvinar tellus, cras. Nunc, tincidunt in scelerisque sodales egestas. Id at amet, odio ac. Dignissim ut amet sapien, orci elit et integer hendrerit purus. Nisl eu, massa morbi ut. Ultrices ipsum in sit sed arcu. Pellentesque nascetur dolor libero volutpat metus, lectus sollicitudin. Sapien id nunc mi risus erat diam proin ipsum massa. A accumsan sit quis sit lacus at amet massa.</p>
                                        <p>Nisl dui egestas lacus nascetur vulputate fermentum tellus dapibus vulputate. Libero donec etiam nisl odio elementum morbi. Ultricies nunc fames quam sociis egestas in. Purus iaculis orci sed interdum adipiscing etiam arcu. Eget eget auctor sed rhoncus. Sollicitudin nec donec sit ipsum. Accumsan pellentesque adipiscing cum ut purus. Magna enim malesuada odio aliquam libero in curabitur eu quam.</p>
                                        <p>auctor porta lectus. Ut sapien ut varius vitae. Nisl, netus vivamus tortor consectetur mi, dui parturient.</p>
                                    </figcaption>
                                </figure>
                            </article>
                        </div>
                        <div className='d-none d-md-block col-4 col-lg-3'>
                            <ForumWidget />
                        </div>
                    </div>
                </section>
                <section className='position-relative mb-3 mb-sm-4 mb-lg-5'>
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
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
                            />
                        </SwiperSlide>
                        <SwiperSlide>    
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
                            />
                        </SwiperSlide>
                        <SwiperSlide>    
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ArticleMini 
                                url="/news" 
                                title="Название новости" 
                                img="/cargo/img/img3.png" 
                                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor feugiat pharetra augue viverra potenti gravida in. Eget habitasse urna cursus vulputate aliquam sagittis. Sit id convallis parturient tellus pretium. Ultricies metus eget cras tincidunt leo velit. In imperdiet mi egestas purus, sed viverra."
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
                </section>
            </div>
        </main>
    )
}
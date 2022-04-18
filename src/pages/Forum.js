import React from 'react';
import ForumWidget from '../components/ForumWidget';
import ForumSection from '../components/ForumSection';
import CustomSelect from '../components/utilities/CustomSelect';
import { IconContext  } from "react-icons";
import { IoSearch, IoChevronBack, IoChevronForward, IoAddCircleSharp } from 'react-icons/io5';
import { BsFillInfoSquareFill, BsFillChatRightTextFill } from "react-icons/bs";


export default function Forum() {
    return (
        <main className='bg-white py-5'>
            <section className='container' id="sec-11">
                <nav aria-label="breadcrumb" className='mb-3'>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Разделы форума</a></li>
                    </ol>
                </nav>

                <h1 className='dark-blue text-uppercase'>Форум ПОРТАЛА</h1>

                <div className='row flex-lg-row-reverse'>
                    <div className='col-lg-3'>
                        <div className='d-flex justify-content-end align-items-center mb-3 fs-12'>
                            <IconContext.Provider value={{className: "icon-10 blue", title: "Мои темы" }}>
                                <BsFillChatRightTextFill />
                            </IconContext.Provider>
                            <span className='ms-2 blue'>Мои темы (2)</span>
                        </div>

                        <button type='button' data-bs-toggle="modal" data-bs-target="#new-topic" className='btn btn-2 w-100 mb-3 fs-12 px-3 py-2 d-flex'>
                            <IconContext.Provider value={{className: "icon-15 white", title: "Создать тему" }}>
                                <IoAddCircleSharp />
                            </IconContext.Provider>
                            <span className='flex-1'>Создать тему</span>
                        </button>

                        <form className='form-search mb-4'>
                            <input type="search" placeholder='Поиск по форуму'/>
                            <button>
                                <IconContext.Provider value={{className: "icon-15 green", title: "Поиск" }}>
                                    <IoSearch />
                                </IconContext.Provider>
                            </button>
                        </form>
                        <h5 class="d-none d-lg-block mb-1">Статистика портала</h5>
                        <div className='stat d-none d-lg-block title-font p-3 mb-4'>
                            <div className='d-flex justify-content-between mb-2 mb-xl-3'>
                                <div className='gray-3 fw-4 me-4'>Темы:</div>
                                <div className='fw-5'>213</div>
                            </div>
                            <div className='d-flex justify-content-between mb-2 mb-xl-3'>
                                <div className='gray-3 me-4'>Сообщения:</div>
                                <div className='fw-5'>12 213</div>
                            </div>
                            <div className='d-flex justify-content-between mb-2 mb-xl-3'>
                                <div className='gray-3 me-4'>Пользователи:</div>
                                <div className='fw-5'>813</div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='gray-3 me-4'>Новая тема:</div>
                                <div className='fw-5 flex-1 text-truncate blue'>Название темы Название темы Название темы</div>
                            </div>
                        </div>
                        <ForumWidget className="d-none d-lg-block" />
                    </div>
                    <div className='col-lg-9'>
                        <div className='d-flex justify-content-end mb-3'>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="/" aria-label="Previous">
                                            <IoChevronBack />
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link active" href="/">1</a></li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                    <li className="page-item">...</li>
                                    <li className="page-item"><a className="page-link" href="/">6</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="/" aria-label="Next">
                                            <IoChevronForward />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className='forum-header'>
                            <div className='icon'></div>
                            <div className='text'>Название раздела</div>
                            <div className='topics'>Тем</div>
                            <div className='messages'>Сообщений</div>
                            <div className='latest'>Последнее сообщение</div>
                        </div>

                        <ForumSection 
                            title="Недобросовестные партнеры Недобросовестные партнеры Недобросовестные партнеры" 
                            subsections={[{name: 'Название подраздела 1', url: '/forum-section'}, {name: 'Название подраздела 2', url: '/forum-section'}]} 
                            info="Информация о фирмах нарушающих договоренности и задерживающих оплату." 
                            topics={15} 
                            messages={205} 
                            latest="14.04.2022 16:00"
                        />
                        <ForumSection title="Недобросовестные партнеры" info="Информация о фирмах нарушающих договоренности и задерживающих оплату. Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" subsections={[{name: 'Название подраздела 1', url: '/forum-section'}, {name: 'Название подраздела 2', url: '/forum-section'}]} info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" subsections={[{name: 'Название подраздела 1', url: '/forum-section'}, {name: 'Название подраздела 2', url: '/forum-section'}]} info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" subsections={[{name: 'Название подраздела 1', url: '/forum-section'}, {name: 'Название подраздела 2', url: '/forum-section'}]} info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" subsections={[{name: 'Название подраздела 1', url: '/forum-section'}, {name: 'Название подраздела 2', url: '/forum-section'}]} info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>

                        <div className='d-flex align-items-center justify-content-between mt-4'>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="/" aria-label="Previous">
                                            <IoChevronBack />
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link active" href="/">1</a></li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                    <li className="page-item">...</li>
                                    <li className="page-item"><a className="page-link" href="/">6</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="/" aria-label="Next">
                                            <IoChevronForward />
                                        </a>
                                    </li>
                                </ul>
                            </nav>

                            <div className='d-flex align-items-center'>
                                <span className='d-none d-sm-block me-2'>показать</span>
                                <CustomSelect className="inp" name="items-count" checkedOpt={1} options={['10', '15', '20']} alignment="right"/>
                                <span className='ms-2 d-none d-md-block'>тем на странице</span>
                            </div>
                        </div>
                        
                        <hr className='mt-5 mb-3'/>
                        <div className='d-flex align-items-center fs-11 mb-3'>
                            <IconContext.Provider value={{className: "icon-10 blue", title: "Правила публикации" }}>
                                <BsFillInfoSquareFill />
                            </IconContext.Provider>
                            <span className='blue ms-2'>Правила публикации</span>
                        </div>
                        <p className='gray-3'>Администрация сайта не несет ответственности за информацию, публикуемую в форуме, и ее мнение может не совпадать с мнением авторов сообщений. Сообщения о незаконно размещенной информации на форуме присылайте на адрес:<a href='mailto:mail@gmail.com'>mail@gmail.com</a></p>
                    </div>
                </div>
            </section>
        </main>
    )
}
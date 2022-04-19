import React from 'react';
import CustomSelect from '../components/utilities/CustomSelect';
import { Link } from 'react-router-dom';
import { IconContext  } from "react-icons";
import { MdThumbUp, MdThumbDown, MdChatBubble } from "react-icons/md";
import { BsFillInfoSquareFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

export default function ForumTopicChat() {
    return (
        <main className='bg-white py-5'>
            
            <section className='container' id="sec-11">
                <nav aria-label="breadcrumb" className='mb-3'>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <Link to="/forum">Разделы форума</Link>
                        </li>
                        <li class="breadcrumb-item">
                            <Link to="/forum-section">Недобросовестные партнеры</Link>
                        </li>
                        <li class="breadcrumb-item">
                            <Link to="/forum-topic">Название темы</Link>
                        </li>
                    </ol>
                </nav>

                <div className='d-flex justify-content-between align-items-center'>
                    <h1 className='text-start dark-blue'>Название темы</h1>
                    <div className='title-font fs-12'>205 ответов. Последний сегодня в 13:45</div>
                </div>

                <div className='comment main'>
                    <div className='user'>
                        <img src="/cargo/img/users/photo.jpg" alt="слайд 1" />
                        <Link to="" className='blue text-decoration-underline d-block mb-2'>Имя пользователя</Link>
                        <div className='fw-5'>Автор</div>
                    </div>
                    <div className='text'>
                        <div className='gray-3 title-font d-flex align-items-center mb-2'>
                            <div>14:30</div>
                            <div className='ms-4'>12 января 22</div>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus.</p>
                            <p>Tellus sociis et tristique gravida molestie tempus volutpat enim gravida. Ut odio donec nibh congue tempus pulvinar. Velit, eget netus non pellentesque enim diam vitae at pharetra. Massa nisl porttitor morbi cras. Commodo at volutpat vitae quis sem non nec. Urna, diam vel nisl ullamcorper lobortis nulla aenean augue sed. Dictum nec turpis velit, dui viverra. Pulvinar sit neque, auctor condimentum quis fermentum. Nulla vitae lectus id in. Accumsan elementum non donec diam augue euismod massa feugiat nec. Potenti mauris at vel, mollis.</p>
                        </div>
                        <button type='button' className='btn btn-2 fs-11 ms-auto'>Ответить на публикацию</button>
                    </div>
                    <div className='btns'>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Нравится" }}>
                                <MdThumbUp />
                            </IconContext.Provider>
                            <span className='ms-2'>52</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Не нравится" }}>
                                <MdThumbDown />
                            </IconContext.Provider>
                            <span className='ms-2'>12</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 green", title: "Ответить" }}>
                                <MdChatBubble />
                            </IconContext.Provider>
                            <span className='ms-2'>Ответить</span>
                        </button>
                        <button type='button' className='d-flex align-items-center'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Пожаловаться" }}>
                                <BsFillExclamationTriangleFill />
                            </IconContext.Provider>
                            <span className='ms-2'>Пожаловаться</span>
                        </button>
                    </div>
                </div>

                <div className='d-flex justify-content-end my-4'>
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

                <div className='comment main'>
                    <div className='user'>
                        <img src="/cargo/img/users/photo.jpg" alt="слайд 1" />
                        <Link to="" className='blue text-decoration-underline d-block mb-2'>Имя пользователя</Link>
                        <div className='fw-5'>Автор</div>
                    </div>
                    <div className='text'>
                        <div className='gray-3 title-font d-flex align-items-center mb-2'>
                            <div>14:30</div>
                            <div className='ms-4'>12 января 22</div>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus.</p>
                            <p>Tellus sociis et tristique gravida molestie tempus volutpat enim gravida. Ut odio donec nibh congue tempus pulvinar. Velit, eget netus non pellentesque enim diam vitae at pharetra. Massa nisl porttitor morbi cras. Commodo at volutpat vitae quis sem non nec. Urna, diam vel nisl ullamcorper lobortis nulla aenean augue sed. Dictum nec turpis velit, dui viverra. Pulvinar sit neque, auctor condimentum quis fermentum. Nulla vitae lectus id in. Accumsan elementum non donec diam augue euismod massa feugiat nec. Potenti mauris at vel, mollis.</p>
                        </div>
                        <button type='button' className='btn btn-2 fs-11 ms-auto'>Ответить на публикацию</button>
                    </div>
                    <div className='btns'>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Нравится" }}>
                                <MdThumbUp />
                            </IconContext.Provider>
                            <span className='ms-2'>52</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Не нравится" }}>
                                <MdThumbDown />
                            </IconContext.Provider>
                            <span className='ms-2'>12</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 green", title: "Ответить" }}>
                                <MdChatBubble />
                            </IconContext.Provider>
                            <span className='ms-2'>Ответить</span>
                        </button>
                        <button type='button' className='d-flex align-items-center'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Пожаловаться" }}>
                                <BsFillExclamationTriangleFill />
                            </IconContext.Provider>
                            <span className='ms-2'>Пожаловаться</span>
                        </button>
                    </div>
                </div>
                <div className='comment main'>
                    <div className='user'>
                        <img src="/cargo/img/users/photo.jpg" alt="слайд 1" />
                        <Link to="" className='blue text-decoration-underline d-block mb-2'>Имя пользователя</Link>
                        <div className='fw-5'>Автор</div>
                    </div>
                    <div className='text'>
                        <div className='gray-3 title-font d-flex align-items-center mb-2'>
                            <div>14:30</div>
                            <div className='ms-4'>12 января 22</div>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus.</p>
                            <p>Tellus sociis et tristique gravida molestie tempus volutpat enim gravida. Ut odio donec nibh congue tempus pulvinar. Velit, eget netus non pellentesque enim diam vitae at pharetra. Massa nisl porttitor morbi cras. Commodo at volutpat vitae quis sem non nec. Urna, diam vel nisl ullamcorper lobortis nulla aenean augue sed. Dictum nec turpis velit, dui viverra. Pulvinar sit neque, auctor condimentum quis fermentum. Nulla vitae lectus id in. Accumsan elementum non donec diam augue euismod massa feugiat nec. Potenti mauris at vel, mollis.</p>
                        </div>
                        <button type='button' className='btn btn-2 fs-11 ms-auto'>Ответить на публикацию</button>
                    </div>
                    <div className='btns'>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Нравится" }}>
                                <MdThumbUp />
                            </IconContext.Provider>
                            <span className='ms-2'>52</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Не нравится" }}>
                                <MdThumbDown />
                            </IconContext.Provider>
                            <span className='ms-2'>12</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 green", title: "Ответить" }}>
                                <MdChatBubble />
                            </IconContext.Provider>
                            <span className='ms-2'>Ответить</span>
                        </button>
                        <button type='button' className='d-flex align-items-center'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Пожаловаться" }}>
                                <BsFillExclamationTriangleFill />
                            </IconContext.Provider>
                            <span className='ms-2'>Пожаловаться</span>
                        </button>
                    </div>
                </div>
                <div className='comment main'>
                    <div className='user'>
                        <img src="/cargo/img/users/photo.jpg" alt="слайд 1" />
                        <Link to="" className='blue text-decoration-underline d-block mb-2'>Имя пользователя</Link>
                        <div className='fw-5'>Автор</div>
                    </div>
                    <div className='text'>
                        <div className='gray-3 title-font d-flex align-items-center mb-2'>
                            <div>14:30</div>
                            <div className='ms-4'>12 января 22</div>
                        </div>
                        <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus.</p>
                            <p>Tellus sociis et tristique gravida molestie tempus volutpat enim gravida. Ut odio donec nibh congue tempus pulvinar. Velit, eget netus non pellentesque enim diam vitae at pharetra. Massa nisl porttitor morbi cras. Commodo at volutpat vitae quis sem non nec. Urna, diam vel nisl ullamcorper lobortis nulla aenean augue sed. Dictum nec turpis velit, dui viverra. Pulvinar sit neque, auctor condimentum quis fermentum. Nulla vitae lectus id in. Accumsan elementum non donec diam augue euismod massa feugiat nec. Potenti mauris at vel, mollis.</p>
                        </div>
                        <button type='button' className='btn btn-2 fs-11 ms-auto'>Ответить на публикацию</button>
                    </div>
                    <div className='btns'>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Нравится" }}>
                                <MdThumbUp />
                            </IconContext.Provider>
                            <span className='ms-2'>52</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Не нравится" }}>
                                <MdThumbDown />
                            </IconContext.Provider>
                            <span className='ms-2'>12</span>
                        </button>
                        <button type='button' className='d-flex align-items-center mb-3'>
                            <IconContext.Provider value={{className: "icon-15 green", title: "Ответить" }}>
                                <MdChatBubble />
                            </IconContext.Provider>
                            <span className='ms-2'>Ответить</span>
                        </button>
                        <button type='button' className='d-flex align-items-center'>
                            <IconContext.Provider value={{className: "icon-15 gray-4", title: "Пожаловаться" }}>
                                <BsFillExclamationTriangleFill />
                            </IconContext.Provider>
                            <span className='ms-2'>Пожаловаться</span>
                        </button>
                    </div>
                </div>

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

                <div className='row'>
                    <div className='col-lg-9'>
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
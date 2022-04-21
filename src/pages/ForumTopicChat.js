import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import CustomSelect from '../components/utilities/CustomSelect';
import ForumComment from '../components/ForumComment';

import { IconContext  } from "react-icons";
import { MdThumbUp, MdThumbDown, MdChatBubble, MdFormatQuote } from "react-icons/md";
import { BsFillInfoSquareFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import { IoChevronBack, IoChevronForward, IoCloseOutline } from 'react-icons/io5';

export default function ForumTopicChat() {
    const [answer, setAnswer] = useState(false);

    return (
        <>
        <main className='bg-white py-4 py-sm-5'>
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

                <div className='d-md-flex justify-content-between align-items-center mb-4'>
                    <h1 className='text-start dark-blue mb-md-0'>Название темы</h1>
                    <div className='title-font fs-12 text-md-end'>205 ответов. Последний сегодня в 13:45</div>
                </div>

                <div className='fixed-comment'>
                    <ForumComment 
                        author={{name: 'Имя пользователя', imgURL: '/cargo/img/users/photo.jpg', pageURL: '/personal-account/view-profile', post: 'Автор'}} 
                        date="12.01.2022" 
                        time="14:30" 
                        comment="Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus. Tellus sociis et tristique gravida molestie tempus volutpat enim gravida. Ut odio donec nibh congue tempus pulvinar. Velit, eget netus non pellentesque enim diam vitae at pharetra. Massa nisl porttitor morbi cras. Commodo at volutpat vitae quis sem non nec. Urna, diam vel nisl ullamcorper lobortis nulla aenean augue sed. Dictum nec turpis velit, dui viverra. Pulvinar sit neque, auctor condimentum quis fermentum. Nulla vitae lectus id in. Accumsan elementum non donec diam augue euismod massa feugiat nec. Potenti mauris at vel, mollis." 
                        likes={1000} 
                        dislikes={13}
                    />
                    <div className='answer-to-comment'>
                        {
                            (answer)?
                            <form>
                                <label for="answer-1" className='title-font fs-12 fw-5 mb-2'>Ваш ответ</label>
                                <textarea rows="6" placeholder='Текст' id="answer-1"></textarea>
                                <div className='d-sm-flex align-items-center justify-content-end mt-2 mt-sm-3'>
                                    <div className='text-end fs-09 me-sm-4 mb-2 mb-sm-0'>Нажимая на кнопку “Ответить”, вы<br/> соглашаетесь с <a href="/" className='blue'>правилами публикации</a></div>
                                    <button type='submit' onSubmit={() => setAnswer(false)} className='btn btn-2 fs-12 ms-auto ms-sm-0'>Ответить</button>
                                </div>
                            </form>
                            : <button type='button' onClick={() => setAnswer(true)} className='btn btn-2 fs-12 ms-auto'>Ответить на публикацию</button>
                        }
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

                <div className='answers-box'>
                    <ForumComment 
                        author={{name: 'Имя пользователя', imgURL: '/cargo/img/users/photo.jpg', pageURL: '/personal-account/view-profile', post: 'Модератор'}} 
                        date="12.01.2022" 
                        time="14:30" 
                        citation = {{name: 'Имя пользователя', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus.'}}
                        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus. Tellus sociis et tristique gravida molestie tempus volutpat enim gravida. Ut odio donec nibh congue tempus pulvinar. Velit, eget netus non pellentesque enim diam vitae at pharetra. Massa nisl porttitor morbi cras. Commodo at volutpat vitae quis sem non nec. Urna, diam vel nisl ullamcorper lobortis nulla aenean augue sed. Dictum nec turpis velit, dui viverra. Pulvinar sit neque, auctor condimentum quis fermentum. Nulla vitae lectus id in. Accumsan elementum non donec diam augue euismod massa feugiat nec. Potenti mauris at vel, mollis." 
                        likes={10} 
                        dislikes={3}
                    />
                    <ForumComment 
                        author={{name: 'Имя пользователя', imgURL: '/cargo/img/users/photo.jpg', pageURL: '/personal-account/view-profile'}} 
                        date="12.01.2022" 
                        time="14:30" 
                        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus." 
                        likes={52} 
                        dislikes={1}
                    />
                    <ForumComment 
                        author={{name: 'Имя пользователя', imgURL: '/cargo/img/users/photo.jpg', pageURL: '/personal-account/view-profile', post: 'Автор'}} 
                        date="12.01.2022" 
                        time="14:30" 
                        comment="Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus. Tellus sociis et tristique gravida molestie tempus volutpat enim gravida. Ut odio donec nibh congue tempus pulvinar. Velit, eget netus non pellentesque enim diam vitae at pharetra. Massa nisl porttitor morbi cras. Commodo at volutpat vitae quis sem non nec. Urna, diam vel nisl ullamcorper lobortis nulla aenean augue sed. Dictum nec turpis velit, dui viverra. Pulvinar sit neque, auctor condimentum quis fermentum. Nulla vitae lectus id in. Accumsan elementum non donec diam augue euismod massa feugiat nec. Potenti mauris at vel, mollis." 
                        likes={60} 
                        dislikes={0}
                    />
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

        <div className="modal fade" id="answer" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Добавить ответ</h3>
                        <form className='fs-12'>
                            <blockquote className='mb-4'>
                                <IconContext.Provider value={{className: "icon-20 green me-2", title: "Кавычка" }}>
                                    <MdFormatQuote />
                                </IconContext.Provider>
                                <div className='text'>
                                <div className='author blue text-decoration-underline me-2'>Имя пользователя:</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet ipsum nisl, amet, pharetra sagittis tincidunt mattis. Orci eu sagittis, aliquam libero cursus phasellus. Nullam eu laoreet at blandit vitae odio. Semper risus blandit aliquam sed nec. Justo ut nunc, nec id risus ut augue interdum vitae. Adipiscing vulputate ligula lectus lectus ut faucibus.</p>
                                </div>
                            </blockquote>

                            <label for="answer-2" className='mb-2'>Ваш ответ</label>
                            <textarea id="answer-2" rows="6" placeholder='Текст'></textarea>
                            <div className='row flex-sm-row-reverse mt-4'>
                                <div className='col-sm-5'>
                                    <button type='submit' className='btn btn-2 w-100'>Ответить</button>
                                </div>
                                <div className='col-sm-7 mt-2 mt-sm-0'>
                                    <div className='fs-09 text-end'>Нажимая на кнопку “Ответить”, вы соглашаетесь с <a className='blue' href="/">правилами публикации</a></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="report-on-comment" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Добавить ответ</h3>
                        <form className='fs-12'>
                            <label for="report" className='mb-2'>Опишите вашу жалобу</label>
                            <textarea id="report" rows="3" placeholder='Текст'></textarea>
                            <button type='submit' className='btn btn-2 w-100 mt-4'>Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
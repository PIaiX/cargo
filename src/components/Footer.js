import React from 'react';
import { IoCloseOutline, IoDocumentText } from 'react-icons/io5';
import { MdPerson } from 'react-icons/md';
import { IconContext  } from "react-icons";
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
    <>
        <footer>
            
        </footer>
        {/* Modal */}
        <div className="modal fade" id="report" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <form>
                            <textarea placeholder="Опишите вашу жалобу" rows="3" className="mb-4"></textarea>
                            <div className="row row-cols-2">
                                <div>
                                    <button type="button" data-bs-dismiss="modal" className="btn btn-1 w-100">Отменить</button>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-2 w-100">Подать жалобу</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="delete-ad" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <div className='p-lg-5'>
                            <div className='dark-blue fs-12 fw-7 title-font text-center'>Вы действительно хотите удалить объявление?</div>
                            <div className='row row-cols-sm-2 gx-2 gx-lg-4 mt-4 fs-12'>
                                <div><button type='button' className='btn btn-1 w-100 px-4 mb-3 mb-sm-0'>Удалить совсем</button></div>
                                <div><button type='button' className='btn btn-2 w-100 px-4'>Перенести в архив</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="delete-pattern" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <div className='fs-12 fw-7 title-font text-center dark-blue mb-4'>Вы действительно хотите удалить шаблон?</div>
                        <div className="row row-cols-sm-2 fs-12">
                            <div className='mb-3 mb-sm-0'>
                                <button type="button" data-bs-dismiss="modal" className="btn btn-1 w-100">Отмена</button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-2 w-100">Удалить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="rename-pattern" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Переименовать шаблон</h3>
                        <form className='fs-12'>
                            <label className='mb-2'>Название шаблона</label>
                            <input type="text" className='mb-3' placeholder='Название'/>
                            <label className='mb-2'>Примечание</label>
                            <input type="text" className='mb-3' placeholder='Примечание'/>
                            <div className='row row-cols-sm-2 mt-4'>
                                <div className='mb-3 mb-sm-0'>
                                    <button type='button' className='btn btn-1 w-100'>Отмена</button>
                                </div>
                                <div>
                                    <button type='button' className='btn btn-2 w-100'>Сохранить</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="docs-patterns" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Выберите шаблон</h3>
                        <div className='fs-12 mb-4'>Все шаблоны составлены профессиональными юристами. Вы можете быстро заполнить документы скачать или использовать, как печатные. <a href='/' className='blue text-decoration-underline'>Как выбрать шаблон</a></div>
                        <ul data-bs-dismiss="modal" className='docs-list fs-12 fw-7 title-font'>
                            <li>
                                <Link to='/document'>
                                    <IconContext.Provider value={{className: "icon-15 gray-3", title: "Заявка" }}>
                                        <IoDocumentText />
                                    </IconContext.Provider>
                                    <span>Заявка</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/document'>
                                    <IconContext.Provider value={{className: "icon-15 gray-3", title: "Доверенность на водителя" }}>
                                        <IoDocumentText />
                                    </IconContext.Provider>
                                    <span>Доверенность на водителя</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/document'>
                                    <IconContext.Provider value={{className: "icon-15 gray-3", title: "Договор" }}>
                                        <IoDocumentText />
                                    </IconContext.Provider>
                                    <span>Договор</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/document'>
                                    <IconContext.Provider value={{className: "icon-15 gray-3", title: "Счет на оплату" }}>
                                        <IoDocumentText />
                                    </IconContext.Provider>
                                    <span>Счет на оплату</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="account-exit" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Выход</h3>
                        <div className='fs-12 title-font text-center mb-4 mb-sm-5'>Вы действительно хотите выйти из личного кабинета?</div>
                        <div className="row row-cols-sm-2 fs-12">
                            <div className='mb-3 mb-sm-0'>
                                <button type="button" data-bs-dismiss="modal" className="btn btn-1 w-100">Отмена</button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-2 w-100">Выйти</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="save-doc" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Сохранить изменения?</h3>
                        <div className="row row-cols-sm-2 fs-12">
                            <div className='mb-3 mb-sm-0'>
                                <button type="button" data-bs-dismiss="modal" className="btn btn-1 w-100">Не сохранять</button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-2 w-100">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="save-as-pattern" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h3>Сохранить шаблон</h3>
                        <form className='fs-12'>
                            <label className='mb-2'>Название шаблона</label>
                            <input type="text" className='mb-3' placeholder='Название'/>
                            <label className='mb-2'>Примечание</label>
                            <input type="text" className='mb-3' placeholder='Примечание'/>
                            <div className='row row-cols-sm-2 mt-4'>
                                <div className='mb-3 mb-sm-0'>
                                    <button type='button' className='btn btn-1 w-100'>Отмена</button>
                                </div>
                                <div>
                                    <button type='button' className='btn btn-2 w-100'>Сохранить</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* Offcanvas */}
        <div className="offcanvas offcanvas-top" tabIndex="-1" id="warning">
            <div className="d-flex align-items-center justify-content-center">
                <IconContext.Provider value={{className: "icon-20"}}>
                    <MdPerson />
                </IconContext.Provider>
                <div className="fs-12 fw-7 title-font ms-4">Пожалуйста, <a href="/" className="bb-1">войдите</a> в аккаунт или <a href="/" className="bb-1">зарегистрируйтесь</a></div>
            </div>
        </div>
    </>
    )
}

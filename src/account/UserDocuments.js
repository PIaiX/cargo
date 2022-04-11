import React, {useState} from 'react';
import { IconContext  } from "react-icons";
import { IoAddCircleSharp, IoSearch, IoDownloadOutline, IoPrintOutline, IoTrashOutline, IoPencil } from 'react-icons/io5';
import { BsPencilSquare, BsPrinter, BsDownload, BsTrash } from "react-icons/bs";

import { Link } from 'react-router-dom';
import CustomSelect from '../components/utilities/CustomSelect';

import { IoEllipsisVertical } from 'react-icons/io5';

export default function UserDocuments() {
    const [tab, setTab] = useState('cars');

    return (
        <div className='box px-0 p-lg-4 p-xl-5'>
            <h1 className='dark-blue text-center d-lg-none'>Документы</h1>
            <div className='d-md-flex flex-row-reverse justify-content-between align-items-center mb-4 mb-xl-5'>
                <Link to="/" className='btn btn-2 fs-12 px-4 mb-4 mb-md-0'>
                    <IconContext.Provider value={{className: "icon-15 white", title: "Создать документ" }}>
                        <IoAddCircleSharp />
                    </IconContext.Provider>
                    <span className='ms-2'>Создать документ</span>
                </Link>
                <div className='d-flex align-items-center fs-12 fw-5 title-font'>
                    <button type='button' className={(tab === 'cars') ? 'active tab-btn' : 'tab-btn'} onClick={()=>setTab('cars')}>Мои документы</button>
                    <button type='button' className={(tab === 'cargo') ? 'active tab-btn ms-3 ms-sm-4 ms-xl-5' : 'tab-btn ms-3 ms-sm-4 ms-xl-5'} onClick={()=>setTab('cargo')}>Шаблоны документов </button>
                </div>
            </div>

            <div className='d-flex align-items-center fs-11'>
                <form className='form-search'>
                    <input type="search" placeholder='Поиск по контрагенту'/>
                    <button>
                        <IconContext.Provider value={{className: "icon-15 green", title: "Создать документ" }}>
                            <IoSearch />
                        </IconContext.Provider>
                    </button>
                </form>
                <div className='d-flex align-items-center ms-5'>
                    <span className='me-1'>Тип&nbsp;документов:</span>
                    <CustomSelect name="docs-type" checkedOpt={1} options={['Все', 'тип 1', 'тип 2']} alignment="left"/>
                </div>
                <div className='d-flex align-items-center ms-5'>
                    <span className='me-1'>Дата:</span>
                    <CustomSelect name="date-sort" options={['сначала новые', 'сначала старые']} alignment="left"/>
                </div>
            </div>

            <div className='docs-header mt-3'>
                <label>
                    <input type='checkbox' name='id1111'/>
                </label>
                <div className='title'>Документ</div>
                <div className='number'>Номер</div>
                <div className='date'>Дата создания</div>
                <div className='contractor'>Контрагент</div>
                <div className="dropdown">
                <button type='button'></button>
                </div>
            </div>

            <div className='docs-preview mt-3'>
                <label>
                    <input type='checkbox' name='id1111'/>
                </label>
                <div className='title'>Заявка</div>
                <div className='number'>№ 689065980-67 </div>
                <div className='date'>13.12.2021</div>
                <div className='contractor'>ООО НТК</div>
                <div className="dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider value={{className: "icon-20 gray-4", title: "Пожаловаться на пользователя" }}>
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li>
                            <button type='button'>
                                <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Редактировать" }}>
                                    <BsPencilSquare />
                                </IconContext.Provider>
                                <span className='ms-3'>Редактировать</span>
                            </button>
                        </li>
                        <li>
                            <button type='button'>
                                <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Скачать" }}>
                                    <BsDownload />
                                </IconContext.Provider>
                                <span className='ms-3'>Скачать</span>
                            </button>
                        </li>
                        <li>
                            <button type='button'>
                                <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Печать" }}>
                                    <BsPrinter />
                                </IconContext.Provider>
                                <span className='ms-3'>Печать</span>
                            </button>
                        </li>
                        <li>
                            <button type='button'>
                                <IconContext.Provider value={{className: "icon-10 fs-12 gray-4", title: "Удалить" }}>
                                    <BsTrash />
                                </IconContext.Provider>
                                <span className='ms-3'>Удалить</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='docs-preview mt-3'>
                <label>
                    <input type='checkbox' name='id1111'/>
                </label>
                <div className='title'>Заявка</div>
                <div className='number'>№ 689065980-67 </div>
                <div className='date'>13.12.2021</div>
                <div className='contractor'>ООО НТК</div>
                <div className="dropdown dropstart">
                    <button type='button' className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <IconContext.Provider value={{className: "icon-20 gray-4", title: "Пожаловаться на пользователя" }}>
                            <IoEllipsisVertical />
                        </IconContext.Provider>
                    </button>
                    <ul className="dropdown-menu py-2">
                        <li><button type='button'>Открыть</button></li>
                        <li><button type='button' data-bs-toggle="modal" data-bs-target="#rename-pattern">Переименовать</button></li>
                        <li><button type='button' data-bs-toggle="modal" data-bs-target="#delete-pattern">Удалить</button></li>
                    </ul>
                </div>
            </div>

            {
                (tab === 'cars')?
                <div>
                   
                </div>
                : <div>
                   
                </div>
            }
        </div>
    )
}
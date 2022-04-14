import React from 'react';
import { Link } from 'react-router-dom';
import ForumWidget from '../components/ForumWidget';
import { IconContext  } from "react-icons";
import { IoSearch, IoFolderOpen, IoFolderOpenOutline } from 'react-icons/io5';
import ForumSection from '../components/ForumSection';

export default function Forum() {
    return (
        <main className='bg-white py-5'>
            <section className='container' id="sec-11">
                <h1 className='text-center dark-blue'>Форум ПОРТАЛА</h1>
                <div className='row'>
                    <div className='col-9'>
                        <div>Разделы форума</div>
                        <div className='forum-header'>
                            <div className='icon'></div>
                            <div className='text'>Название раздела</div>
                            <div className='topics'>Тем</div>
                            <div className='messages'>Сообщений</div>
                            <div className='latest'>Последнее сообщение</div>
                        </div>
                        <ForumSection title="Недобросовестные партнеры" subsections={[{name: 'Название подраздела 1', url: '/'}, {name: 'Название подраздела 2', url: '/'}]} info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" subsections={[{name: 'Название подраздела 1', url: '/'}, {name: 'Название подраздела 2', url: '/'}]} info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        <ForumSection title="Недобросовестные партнеры" subsections={[{name: 'Название подраздела 1', url: '/'}, {name: 'Название подраздела 2', url: '/'}]} info="Информация о фирмах нарушающих договоренности и задерживающих оплату." topics={15} messages={205} latest="14.04.2022 16:00"/>
                        
                    </div>
                    <div className='col-3'>
                        <form className='form-search mb-4'>
                            <input type="search" placeholder='Поиск по форуму'/>
                            <button>
                                <IconContext.Provider value={{className: "icon-15 green", title: "Поиск" }}>
                                    <IoSearch />
                                </IconContext.Provider>
                            </button>
                        </form>
                        <h5 class="mb-1">Статистика портала</h5>
                        <div className='stat p-3 fs-11 mb-4'>
                            <div className='d-flex justify-content-between'>
                                <div className='gray-3'>Темы:</div>
                                <div className='fw-5'>213</div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='gray-3'>Сообщения:</div>
                                <div className='fw-5'>12 213</div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='gray-3'>Пользователи:</div>
                                <div className='fw-5'>813</div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='gray-3'>Новая тема:</div>
                                <div className='fw-5'>Название темы...</div>
                            </div>
                        </div>
                        <ForumWidget />
                    </div>
                </div>
            </section>
        </main>
    )
}
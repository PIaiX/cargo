import React from 'react';
import ForumWidget from '../components/ForumWidget';

export default function Forum() {
    return (
        <main className='bg-white py-5'>
            <section className='container' id="sec-11">
                <h1 className='text-center dark-blue'>Форум ПОРТАЛА</h1>
                <div className='row'>
                    <div className='col-9'>
                        <div>Разделы форума</div>
                    </div>
                    <div className='col-3'>
                        <input type="search" placeholder="Поиск по форуму" className='mb-4'/>
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
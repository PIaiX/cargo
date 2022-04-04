import React from 'react';
import { Link } from 'react-router-dom';
import InputPassword from '../components/utilities/InputPassword';

export default function Entrance() {
    return (
        <main className="bg-white position-relative">
            <img src="/cargo/img/bg/bg-entrance.jpg" className='entrance-bg' alt="грузоперевозки"/>
            <section id="sec-10" className='container py-3 py-sm-4 py-lg-5'>
                <Link to="/" className='fs-12'><span className='green fs-15 me-2'>⟵</span> Назад</Link>
                <div className='row gx-md-5 justify-content-between'>
                    <div className='col-md-6 col-lg-5 offset-lg-1'>
                        <h1 className='text-center dark-blue mt-3 mt-sm-4 mt-lg-5'>Вход</h1>
                        <form className='fs-12'>
                            <label>Email</label>
                            <input type="email" placeholder='Email' className='mt-2'/>
                            <label className='mt-3'>Пароль</label>
                            <InputPassword name="enter-pass" className="mt-2"/>
                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                <label>
                                    <input type="checkbox" className='me-2'/>
                                    <span className='blue'>Запомнить меня</span>
                                </label>
                                <Link to="/reset-password" className='blue'>Забыли пароль?</Link>
                            </div>
                            {/* <button type='submit' className='btn btn-2 fs-12 text-uppercase w-100 mt-3'>Войти</button> */}
                            <Link to="/personal-account" className='btn btn-2 fs-12 text-uppercase w-100 mt-3'>Войти</Link>
                            
                            <div className='text-center mt-3'>У Вас еще нет аккаунта? <Link to="/registration" className='blue'>Зарегистрироваться</Link></div>
                        </form>
                    </div>
                    <div className='d-none d-md-block col-6 col-lg-5 col-xxl-4 white'>
                        <h4 className='mb-5'>С личным кабинетом вы сможете:</h4>
                        <ul className='marked-list fs-12'>
                            <li>Видеть контакты  машин и грузов</li>
                            <li>Добавлять грузы и машины</li>
                            <li>Использовать электронные документы</li>
                            <li>Общаться на Форуме</li>
                        </ul>
                        <h4 className='mt-5'>Сейчас на сайте</h4>
                        <div className='d-flex justify-content-between'>
                            <div className='text-center'>
                                <div className="title-font fw-9 fs-25 mb-2">2 512 359</div>
                                <div className="fs-12">Грузов</div>
                            </div>
                            <div className='text-center'>
                                <div className="title-font fw-9 fs-25 mb-2">12 359</div>
                                <div className="fs-12">Машин</div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </main>
    );
}
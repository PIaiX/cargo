import React from 'react';
import { Link } from 'react-router-dom';
import InputPassword from '../components/utilities/InputPassword';

export default function ResetPassword2() {
    return (
        <main className="bg-white position-relative">
            <section id="sec-10" className='container py-3 py-sm-4 py-lg-5'>
                <Link to="/reset-password" className='fs-12'><span className='green fs-15 me-2'>⟵</span> Назад</Link>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-lg-5'>
                        <h1 className='text-center dark-blue mt-3 mt-sm-4 mt-lg-5'>Восстановление пароля</h1>
                        <form className='fs-12'>
                            <label className='mt-3'>Новый пароль</label>
                            <InputPassword name="enter-pass" className="mt-2"/>
                            <label className='mt-3'>
                                <input type="checkbox" className='me-2'/>
                                <span className='blue'>Запомнить пароль</span>
                            </label>
                            <button type='submit' className='btn btn-2 fs-12 text-uppercase w-100 mt-4'>Восстановить пароль</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
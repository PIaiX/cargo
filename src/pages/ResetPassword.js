import React from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
    return (
        <main className="bg-white position-relative">
            <section id="sec-10" className='container py-3 py-sm-4 py-lg-5'>
                <Link to="/entrance" className='fs-12'><span className='green fs-15 me-2'>⟵</span> Назад</Link>
                <div className='row justify-content-center'>
                    <div className='col-md-6 col-lg-5'>
                        <h1 className='text-center dark-blue mt-3 mt-sm-4 mt-lg-5'>Восстановление пароля</h1>
                        <form className='fs-12'>
                            <label>Email</label>
                            <input type="email" placeholder='Email' className='mt-2'/>
                            {/* <button type='submit' className='btn btn-2 fs-12 text-uppercase w-100 mt-4'>Восстановить пароль</button> */}
                            <Link className='btn btn-2 fs-12 text-uppercase w-100 mt-4' to="/reset-password-2">Восстановить пароль</Link>
                            <div className='text-center mt-3'><Link to="/entrance" className='blue bb-1'>Я вспомнил пароль</Link></div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
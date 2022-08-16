import React from 'react';
import {Link} from 'react-router-dom';
import {IoShieldCheckmarkSharp} from 'react-icons/io5';
import {MdModeEdit} from "react-icons/md";
import {useSelector} from "react-redux";

export default function UserProfile() {

    const currentUser = useSelector(state => state.currentUser.data.user)

    const uploadPhoto = () => currentUser.avatar && `https://api.eritrans.ru/uploads/./${currentUser.avatar}`

    return (
        <div className='box p-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span
                className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Мой профиль</h1>
            <div className='row flex-md-row-reverse'>
                <div className='col-md-4'>
                    <div className='profile-picture mx-auto mb-4 mb-sm-5'>
                        <img src={uploadPhoto() ?? "/img/users/no-photo.png"} alt="ООО НТК" style={{borderRadius: 50 + "%"}}/>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='row g-sm-4 fs-12'>
                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5'>Тип аккаунта:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <div>{currentUser.roleForUser}</div>
                        </div>

                        {/* Только для юр лиц start */}
                        {currentUser.subject &&
                            <>
                                <div className='col-sm-4 mb-1 mb-sm-0'>
                                    <div className='gray-2 title-font fw-5'>Название компании:</div>
                                </div>
                                <div className='col-sm-8 mb-3 mb-sm-0'>
                                    <div>{currentUser.companyName}</div>
                                </div>

                                <div className='col-sm-4 mb-1 mb-sm-0'>
                                    <div className='gray-2 title-font fw-5'>ИНН:</div>
                                </div>
                                <div className='col-sm-8 mb-3 mb-sm-0'>
                                    <div>{currentUser.taxIdentificationNumber}</div>
                                </div>
                            </>
                        }
                        {/* Только для юр лиц end */}

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5'>Имя:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <div>{currentUser.firstName}</div>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5'>Фамилия:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <div>{currentUser.lastName}</div>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5'>Email:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <div>{currentUser.email}</div>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5'>Телефон:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <div>{currentUser.phone}</div>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5'>Город:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <div>{currentUser.city}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className='d-flex flex-column flex-md-row align-items-center justify-content-end title-font blue fs-12 fw-5 mt-3 mt-sm-5'>
                <button type='button' className='d-flex align-items-center'>
                    <IoShieldCheckmarkSharp/>
                    <span className='ms-2'>Подтвердить профиль</span>
                </button>
                <Link to="edit" className='d-flex align-items-center mt-3 mt-md-0 ms-md-5'>
                    <MdModeEdit/>
                    <span className='ms-2'>Редактировать профиль</span>
                </Link>
            </div>
        </div>
    )
}
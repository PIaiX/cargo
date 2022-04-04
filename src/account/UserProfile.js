import React from 'react';
import { IoShieldCheckmarkSharp, IoPencilSharp } from 'react-icons/io5';

export default function UserProfile() {
    return (
        <div className='box p-5'>
            <div className='row'>
                <div className='col-8'>
                    <div className='row title-font fs-13 fw-5 mb-5'>
                        <div className='col-6'>
                            <label className="">
                                <input type="radio" name="entity" value="individual"/>
                                <span className='ms-2'>Физическое лицо</span>
                            </label>
                        </div>
                        <div className='col-6'>
                            <label className="">
                                <input type="radio" name="entity" value="legal-entity"/>
                                <span className='ms-2'>Юридическое лицо</span>
                            </label>
                        </div>
                    </div>
                    <div className='row g-4 fs-12'>
                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>Тип аккаунта:</div>
                        </div>
                        <div className='col-8'>
                            <div>Грузовладелец-перевозчик</div>
                        </div>

                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>Название компании:</div>
                        </div>
                        <div className='col-8'>
                            <div>ООО НТК</div>
                        </div>

                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>ИНН:</div>
                        </div>
                        <div className='col-8'>
                            <div>027363360430</div>
                        </div>

                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>Имя:</div>
                        </div>
                        <div className='col-8'>
                            <div>Эльвира</div>
                        </div>

                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>Фамилия:</div>
                        </div>
                        <div className='col-8'>
                            <div>Наумова</div>
                        </div>
                        
                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>Email:</div>
                        </div>
                        <div className='col-8'>
                            <div>Email@mail</div>
                        </div>

                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>Телефон:</div>
                        </div>
                        <div className='col-8'>
                            <div>+ 7 969 152 36 95</div>
                        </div>

                        <div className='col-4'>
                            <div className='gray-2 title-font fw-5'>Город:</div>
                        </div>
                        <div className='col-8'>
                            <div>Казань</div>
                        </div>
                    </div>
                </div>
                <div className='col-4'></div>
            </div>
            <div className='d-flex justify-content-end title-font blue fs-12 fw-5 mt-5'>
                <button type='button' className='d-flex align-items-center'>
                    <IoShieldCheckmarkSharp />
                    <span className='ms-2'>Подтвердить профиль</span>
                </button>
                <button type='button' className='d-flex align-items-center ms-5'>
                    <IoPencilSharp />  
                    <span className='ms-2'>Редактировать профиль</span>
                </button>
            </div>
        </div>
    )
}
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import CustomSelect from '../components/utilities/CustomSelect';

export default function ProfileEdit() {
    const [entity, setEntity] = useState('entity');

    const handleChange = e => {
        let val = e.target.value;
        setEntity(val);
    };

    return (
        <div className='box p-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Редакция профиля</h1>
            <form>
                <div className='row flex-md-row-reverse'>
                    <div className='col-md-4'>
                        <div className='profile-picture mx-auto mb-4 mb-sm-5'>
                            <img src="/cargo/img/users/no-photo.png" alt="ООО НТК"/>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <fieldset className='row row-cols-xxl-2 g-3 g-sm-4 mb-4 mb-sm-5'>
                            <div>
                                <label>
                                    <input type="radio" name="entity" value="individual" onChange={(e) => handleChange(e)}/>
                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Физическое лицо</span>
                                </label>
                            </div>
                            <div>
                                <label>
                                    <input type="radio" name="entity" defaultChecked={true} value="entity" onChange={(e) => handleChange(e)}/>
                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Юридическое лицо</span>
                                </label>
                            </div>
                        </fieldset>

                        <fieldset className='row g-sm-4 mb-sm-4'>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Тип аккаунта:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <CustomSelect className="inp w-100 fs-12" name="account-type" checkedOpt={1} options={['Грузовладелец', 'Перевозчик', 'Перевозчик-Грузовладелец']} alignment="left"/>
                            </div>
                        </fieldset>
                        {
                            /* Только для юр лиц */
                            (entity === 'entity') &&
                            <fieldset className='row g-sm-4 mb-sm-4'>
                                <div className='col-sm-4 mb-1 mb-sm-0'>
                                    <div className='gray-2 title-font fw-5 fs-12'>Название компании:</div>
                                </div>
                                <div className='col-sm-8 mb-3 mb-sm-0'>
                                    <input type="text" className='fs-12' placeholder='Название компании' defaultValue={'ООО НТК'}/>
                                </div>
                                <div className='col-sm-4 mb-1 mb-sm-0'>
                                    <div className='gray-2 title-font fw-5 fs-12'>ИНН:</div>
                                </div>
                                <div className='col-sm-8 mb-3 mb-sm-0'>
                                    <input type="text" className='fs-12' placeholder='ИНН' defaultValue={'027363360430'}/>
                                </div>
                            </fieldset>
                        }
                        <fieldset className='row g-sm-4'>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Имя:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input type="text" className='fs-12' placeholder='Имя' defaultValue={'Эльвира'}/>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Фамилия:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input type="text" className='fs-12' placeholder='Фамилия' defaultValue={'Наумова'}/>
                            </div>
                            
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Email:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input type="email" className='fs-12' placeholder='Email' defaultValue={'Email@mail'}/>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Телефон:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input type="tel" className='fs-12' placeholder='Телефон' defaultValue={'+ 7 969 152 36 95'}/>
                                <div className='fs-08 gray-4'>Этот номер будет виден другим пользователям сайта </div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Город:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input type="text" className='fs-12' placeholder='Город' defaultValue={'Казань'}/>
                            </div>
                        </fieldset>
                        
                        <div className='row row-cols-2 row-cols-xxl-3 gx-2 gx-sm-4 justify-content-end fs-12 mt-3 mt-sm-4'>
                            <div>
                                <button type='button' className='btn btn-1 w-100'>Отмена</button>
                            </div>
                            <div>
                                <button type='submit' className='btn btn-2 w-100'>Сохранить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form> 
        </div>
    )
}
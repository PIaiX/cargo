import React from 'react';
import Card from '../components/Card';

export default function ViewAccount() {
    return (
        <div className='box p-0'>
            <div className='p-4'>
                <h4 className='text-center text-uppercase mb-0'>ООО НТК</h4>
            </div>
            <hr />
            <div className='p-5'>
                <div className='row flex-md-row-reverse'>
                    <div className='col-md-4'>
                        <div className='profile-picture mx-auto mb-4 mb-sm-5'>
                            <img src="/cargo/img/users/no-photo.png" alt="ООО НТК"/>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='row g-sm-4 fs-12'>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Тип аккаунта:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Грузовладелец-перевозчик</div>
                            </div>
                            
                            {/* Только для юр лиц start */}
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Название компании:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>ООО НТК</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>ИНН:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>027363360430</div>
                            </div>
                            {/* Только для юр лиц end */}

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Имя:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Эльвира</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Фамилия:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Наумова</div>
                            </div>
                            
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Email:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Email@mail</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Телефон:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>+ 7 969 152 36 95</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5'>Город:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <div>Казань</div>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 className='text-center text-uppercase mt-5 mb-4'>объявления Пользователя</h4>
                <div className='row row-cols-3 mb-5'>
                    <div>
                        <Card 
                            type="cargo"
                            className=""
                            title="Продукты питания" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="cold"
                            url="/cargo-page"
                        />
                    </div>
                    <div>
                        <Card 
                            type="cargo"
                            className=""
                            title="Оборудование" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="fragile"
                            url="/cargo-page"
                        />
                    </div>
                    <div>
                        <Card 
                            type="cargo"
                            className=""
                            title="Стройматериалы" 
                            route="Казань-Москва"
                            size="30"
                            weight="10 т"
                            notes="none"
                            url="/cargo-page"
                        />
                    </div>
                </div>
                <div className='row row-cols-4 justify-content-center fs-12'>
                    <div>
                    <button type='button' className='btn btn-2 text-uppercase w-100'>Найти машину</button>
                    </div>
                    <div>
                    <button type='button' className='btn btn-2 text-uppercase w-100'>Найти груз</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import CustomSelect from '../components/utilities/CustomSelect';

import { IoAddCircle, IoCloseOutline } from 'react-icons/io5';
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";

export default function AddCargo() {
    return (
        <main className="bg-gray">
            <section id="sec-9" className="container py-5">
                <h1 className="dark-blue text-center text-uppercase">Добавление Груза</h1>
                <div className="row">
                    <div className="col-lg-8">
                        <h4 className="mb-3">Загрузка</h4>
                        <fieldset className="box">
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Дата*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-xl-7 mb-2 mb-xl-0">
                                            <div className="box p-3">
                                                <label className="mb-2 mb-xl-3">
                                                    <input type="radio" name="frequency" value="Единожды"/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Единожды</span>
                                                </label>
                                                <div className="d-flex fs-12 align-items-center">
                                                    <input type="date" className='flex-1'/>
                                                    <span className="mx-2 mx-xxl-3">+</span>
                                                    <CustomSelect className="inp" name="days" checkedOpt="0 дн." options={['0 дн.', '1 дн.']}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-5">
                                            <div className="box p-3">
                                                <label className="mb-2 mb-xl-3">
                                                    <input type="radio" name="frequency" value="Постоянно"/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Постоянно</span>
                                                </label>
                                                <CustomSelect className="inp w-100 fs-12" name="periodicity" checkedOpt="По рабочим дням" options={['По рабочим дням', 'По выходным']}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Время загрузки</div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex fs-12 align-items-center">
                                        <input type="time" />
                                        <span className="mx-3">—</span>
                                        <input type="time" />
                                    </div>
                                    <label className="mt-2">
                                        <input type="checkbox" name="frequency" value="Круглосуточно"/>
                                        <span className="ms-2 fs-09">Круглосуточно</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row fs-12">
                                        <div className="col-5">
                                            <input type="text" placeholder="Населеный пункт"/>
                                        </div>
                                        <div className="col-7">
                                            <input type="text" placeholder="Адрес"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                            <IconContext.Provider value={{className: "green icon-15"}}>
                                <IoAddCircle />
                            </IconContext.Provider>
                            <span className="ms-2">Добавить точку загрузки</span>
                        </button>

                        <h4 className="mt-5 mb-3">Разгрузка</h4>
                        <fieldset className="box">
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Дата</div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex fs-12 align-items-center">
                                        <input type="date"/>
                                        <span className="mx-3">—</span>
                                        <input type="date" />
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Время загрузки</div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex align-items-center fs-12">
                                        <input type="time" />
                                        <span className="mx-3">—</span>
                                        <input type="time" />
                                    </div>
                                    <label className="mt-2">
                                        <input type="checkbox" name="frequency" value="Круглосуточно"/>
                                        <span className="ms-2 fs-09">Круглосуточно</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row fs-12">
                                        <div className="col-5">
                                            <input type="text" placeholder="Населеный пункт"/>
                                        </div>
                                        <div className="col-7">
                                            <input type="text" placeholder="Адрес"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                            <IconContext.Provider value={{className: "green icon-15"}}>
                                <IoAddCircle />
                            </IconContext.Provider>
                            <span className="ms-2">Добавить точку разгрузки</span>
                        </button>

                        <h4 className="mt-5 mb-3">Груз</h4>
                        <fieldset className="box">
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Тип груза</div>
                                </div>
                                <div className="col-9">
                                    <CustomSelect className="inp w-100 fs-12" name="cargo-type"  options={['тип 1', 'тип 2']}/>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Вес*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-4">
                                            <input type="number" className="weight w-100 fs-12"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Объем*</div>
                                </div>
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-4">
                                            <input type="number" className="size w-100 fs-12"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Габариты</div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex fs-12">
                                        <div className='d-xxl-flex me-4'>
                                            <label className="me-2">Длина:</label>
                                            <input type="number" className="length"/>
                                        </div>
                                        <div className='d-xxl-flex me-4'>
                                            <label className="me-2">Ширина:</label>
                                            <input type="number" className="length"/>
                                        </div>
                                        <div className='d-xxl-flex'>
                                            <label className="me-2">Высота:</label>
                                            <input type="number" className="length"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Упаковка</div>
                                </div>
                                <div className="col-9 fs-12 d-flex align-items-center">
                                    <CustomSelect className="inp" name="package"  options={['упаковка 1', 'упаковка 2']}/>
                                    <IconContext.Provider value={{className: "icon-10 mx-3"}}>
                                        <VscChromeClose />
                                    </IconContext.Provider>
                                    <input type="number" className="pcs"/>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Особые пометки</div>
                                </div>
                                <div className="col-9">
                                    <CustomSelect className="inp w-100 fs-12" name="cargo-type" checkedOpt="Нет" options={['Нет', 'Холод', 'Хрупкое', 'Габаритное']}/>
                                </div>
                            </div>
                        </fieldset>
                        <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                            <IconContext.Provider value={{className: "green icon-15"}}>
                                <IoAddCircle />
                            </IconContext.Provider>
                            <span className="ms-2">Добавить груз</span>
                        </button>

                        <h4 className="mt-5 mb-3">Требовани я к машине</h4>
                        <fieldset className="box">
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Тип кузова</div>
                                </div>
                                <div className="col-9">
                                    <CustomSelect className="inp w-100 fs-12" name="carcase" options={['тип 1', 'тип 2', 'тип 3']}/>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Температура</div>
                                </div>
                                <div className="col-9 fs-12 d-flex align-items-center">
                                    <input type="number" placeholder="0" className="temp"/>
                                    <span className="mx-3">—</span>
                                    <input type="number" placeholder="0" className="temp"/>
                                </div>
                            </div>
                        </fieldset>

                        <h4 className="mt-5 mb-3">Оплата</h4>
                        <fieldset className="box">
                            <div className='row row-cols-2 row-cols-xxl-3 mb-3'>
                                <div>
                                    <label>
                                        <input type="radio" name="bargain" value="Возможен торг"/>
                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Возможен торг</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="bargain" value="Без торга"/>
                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Без торга</span>
                                    </label>
                                </div>
                            </div>
                            <div className='row row-cols-2 row-cols-xxl-3 mb-4'>
                                <div>
                                    <label>
                                        <input type="radio" name="payment-type" value="Наличный расчет"/>
                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Наличный расчет</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="radio" name="payment-type" value="Перевод по карте"/>
                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Перевод по карте</span>
                                    </label>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">С НДС</div>
                                </div>
                                <div className="col-9">
                                    <div className='row'>
                                        <div className='col-4'>
                                            <input type="number" className="price w-100 fs-12"/>
                                        </div>
                                        <div className='col-3'>
                                            <CustomSelect className="inp w-100 fs-12" name="carcase" checkedOpt="0" options={['₽', '₽/км']}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center mb-4">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">без НДС</div>
                                </div>
                                <div className="col-9">
                                    <div className='row'>
                                        <div className='col-4'>
                                            <input type="number" className="price w-100 fs-12"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Предоплата:</div>
                                </div>
                                <div className="col-9">
                                    <div className='row'>
                                        <div className='col-4'>
                                            <input type="number" className="percent w-100 fs-12"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <h4 className="mt-5 mb-3">Контакты</h4>
                        <fieldset className="box">
                            <div className="row align-items-center mb-3">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Телефон*</div>
                                </div>
                                <div className="col-9">
                                    <div className='row align-items-center'>
                                        <div className='col-7'>
                                            <input type="tel" placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                        </div>
                                        <div className='col-5'>
                                        <button type="button" className="green fw-5 fs-12 w-100">
                                            <IconContext.Provider value={{className: "green icon-15"}}>
                                                <IoAddCircle />
                                            </IconContext.Provider>
                                            <span className="ms-2">Добавить контакт</span>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Имя*</div>
                                </div>
                                <div className="col-9">
                                    <div className='row align-items-center'>
                                        <div className='col-7'>
                                            <input type="text" placeholder='Имя' className="w-100 fs-12"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <div className="title-font fs-12 fw-5">Примечание</div>
                                </div>
                                <div className="col-9">
                                    <textarea rows={3} placeholder='Укажите здесь дополнительную информацию '></textarea>
                                </div>
                            </div>
                        </fieldset>
                        <div className='title-font fs-09 fw-5 mt-3'>* Поля обязательные к заполнению</div>
                    </div>
                    <div className="col-lg-4 pt-lg-5 position-relative  d-none d-lg-block">
                        <aside className="box">
                            <nav className='contents'>
                                <ol>
                                    <li>
                                        <a className='active'>Загрузка</a>
                                        <div className='fs-09'>
                                            <div>11.11.2021, круглосуточно</div>
                                            <div>Казань, Четаева 89</div>
                                        </div>
                                    </li>
                                    <li>
                                        <a>Разгрузка</a>
                                    </li>
                                    <li>
                                        <a>Груз</a>
                                    </li>
                                    <li>
                                        <a>Требования к машине</a>
                                    </li>
                                    <li>
                                        <a>Оплата</a>
                                    </li>
                                    <li>
                                        <a>Контакты</a>
                                    </li>
                                </ol>
                            </nav>
                            <button type='button' className='btn btn-1 text-uppercase fs-15 mx-auto mt-4 mt-xl-5'>разместить груз</button>
                            <button type='button' className='fs-11 mx-auto mt-2 mt-xl-3 blue'>Сохранить шаблон</button>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    )
}

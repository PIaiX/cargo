import React, {useState} from 'react';
import CustomSelect from '../components/utilities/CustomSelect';

import { IoAddCircle, IoChevronBackOutline, IoChevronForwardOutline, IoCloseOutline, IoTrash, IoNewspaperOutline } from 'react-icons/io5';
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";

export default function AddCargo() {
    const [activeField, setActiveField] = useState(1); //для мобильных устройств

    return (
        <>
        <main className="bg-gray">
            <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
                <h1 className="dark-blue text-center text-uppercase">Добавление Груза</h1>
                <form className="row">
                    <div className="col-lg-8">
                        <div className='mobile-indicators d-flex d-lg-none'>
                            <div className={(activeField === 1) ? 'active' : ''}>1</div>
                            <div className={(activeField === 2) ? 'active' : ''}>2</div>
                            <div className={(activeField === 3) ? 'active' : ''}>3</div>
                            <div className={(activeField === 4) ? 'active' : ''}>4</div>
                            <div className={(activeField === 5) ? 'active' : ''}>5</div>
                            <div className={(activeField === 6) ? 'active' : ''}>6</div>
                        </div>
                        
                        <fieldset data-show={(activeField === 1) ? 'true' : 'false'}>
                            <div className='d-flex align-items-center justify-content-center justify-content-lg-between mb-4 mb-lg-3'>
                                <h4 className="text-center text-lg-start mb-0">Загрузка</h4>
                                <div className='d-none d-lg-flex align-items-center fs-09'>
                                    <button type='button' data-bs-toggle="modal" data-bs-target="#usePattern" className='btn btn-4 p-2'>
                                        <IconContext.Provider value={{className: "icon-15"}}>
                                            <IoNewspaperOutline/>
                                        </IconContext.Provider>
                                        <span className='ms-2'>Использовать шаблон</span>
                                    </button>
                                    <button type='reset' className='btn btn-4 p-2 ms-3'>
                                        <IconContext.Provider value={{className: "icon-15"}}>
                                            <VscChromeClose/>
                                        </IconContext.Provider>
                                        <span className='ms-2'>Очистить форму</span>
                                    </button>
                                </div>
                            </div>
                            <div className="box">
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Дата*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-7 mb-4 mb-lg-2 mb-xl-0">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input type="radio" defaultChecked={true} name="frequency" value="Единожды"/>
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Единожды</span>
                                                    </label>
                                                    <div className="d-flex fs-12 align-items-center">
                                                        <input type="date" value={'2021-11-11'} className='flex-1'/>
                                                        <span className="mx-2 mx-xxl-3">+</span>
                                                        <CustomSelect className="inp" name="days" checkedOpt={1} options={['0 дн.', '1 дн.']}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-5">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input type="radio" name="frequency" value="Постоянно"/>
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Постоянно</span>
                                                    </label>
                                                    <CustomSelect className="inp w-100 fs-12" name="periodicity" checkedOpt={1} options={['По рабочим дням', 'По выходным', 'Ежедневно', 'Через день']}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Время загрузки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="d-flex fs-12 align-items-center">
                                            <input type="time" />
                                            <span className="mx-3">—</span>
                                            <input type="time" />
                                        </div>
                                        <label className="mt-2">
                                            <input type="checkbox" defaultChecked={true} name="frequency" value="Круглосуточно"/>
                                            <span className="ms-2 fs-09">Круглосуточно</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row fs-12">
                                            <div className="col-sm-5 mb-2 mb-sm-0">
                                                <input type="text" placeholder="Населеный пункт" value={'Казань'}/>
                                            </div>
                                            <div className="col-sm-7">
                                                <input type="text" placeholder="Адрес" value={'Четаева 89'}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                                <IconContext.Provider value={{className: "green icon-15"}}>
                                    <IoAddCircle />
                                </IconContext.Provider>
                                <span className="ms-2">Добавить точку загрузки</span>
                            </button>

                            <div className='mobile-btns d-block d-lg-none'>
                                <div className='container'>
                                    <div className='d-flex align-items-center justify-content-between blue title-font fw-5 fs-11'>
                                        <button type='button'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Использовать шаблон</span>
                                        </button>
                                        <button type="reset">
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Очистить форму</span>
                                        </button>
                                    </div>
                                    <button type='button' onClick={() => setActiveField(2)}     className='btn btn-1 w-100 fs-11'>
                                        <span className='me-1 me-sm-3 text-uppercase'>Далее</span>
                                        <IconContext.Provider value={{className: "icon-15"}}>
                                            <IoChevronForwardOutline/>
                                        </IconContext.Provider>
                                    </button>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset data-show={(activeField === 2) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Разгрузка</h4>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Дата</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="d-flex fs-12 align-items-center">
                                            <input type="date"/>
                                            <span className="mx-3">—</span>
                                            <input type="date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Время загрузки</div>
                                    </div>
                                    <div className="col-md-9">
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
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row fs-12">
                                            <div className="col-sm-5 mb-2 mb-sm-0">
                                                <input type="text" placeholder="Населеный пункт"/>
                                            </div>
                                            <div className="col-sm-7">
                                                <input type="text" placeholder="Адрес"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                                <IconContext.Provider value={{className: "green icon-15"}}>
                                    <IoAddCircle />
                                </IconContext.Provider>
                                <span className="ms-2">Добавить точку разгрузки</span>
                            </button>

                            <div className='mobile-btns d-block d-lg-none'>
                                <div className='container'>
                                    <div className='d-flex align-items-center justify-content-between blue title-font fw-5 fs-11'>
                                        <button type='button'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Использовать шаблон</span>
                                        </button>
                                        <button type='reset'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Очистить форму</span>
                                        </button>
                                    </div>
                                    <div className='row row-cols-2 gx-2 gx-sm-4 title-font'>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(1)}     className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(3)}     className='btn btn-1 w-100 fs-11'>
                                                <span className='me-1 me-sm-3 text-uppercase'>Далее</span>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronForwardOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset data-show={(activeField === 3) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Груз</h4>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Тип груза</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect className="inp w-100 fs-12" name="cargo-type"  options={['тип 1', 'тип 2']}/>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-3">
                                        <div className="title-font fs-12 fw-5">Вес*</div>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-md-4">
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
                                            <div className="col-md-4">
                                                <input type="number" className="size w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Габариты</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row row-cols-sm-3 gx-3 gx-xxl-4 fs-12">
                                            <div className='mb-2 mb-sm-0'>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label for="length">Длина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name="length" id="length" className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-2 mb-sm-0'>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label for='width'>Ширина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='width' id='width' className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label for='height'>Высота:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='height' id='height' className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Упаковка</div>
                                    </div>
                                    <div className="col-md-9 fs-12 d-flex align-items-center">
                                        <CustomSelect className="inp" name="package"  options={['упаковка 1', 'упаковка 2']}/>
                                        <IconContext.Provider value={{className: "icon-10 mx-3"}}>
                                            <VscChromeClose />
                                        </IconContext.Provider>
                                        <input type="number" className="pcs"/>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Особые пометки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect className="inp w-100 fs-12" name="cargo-type" checkedOpt={1} options={['Нет', 'Холод', 'Хрупкое', 'Габаритное']}/>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="green fs-11 fw-5 mt-3 mx-auto d-flex align-items-center">
                                <IconContext.Provider value={{className: "green icon-15"}}>
                                    <IoAddCircle />
                                </IconContext.Provider>
                                <span className="ms-2">Добавить груз</span>
                            </button>

                            <div className='mobile-btns d-block d-lg-none'>
                                <div className='container'>
                                    <div className='d-flex align-items-center justify-content-between blue title-font fw-5 fs-11'>
                                        <button type='button'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Использовать шаблон</span>
                                        </button>
                                        <button type='reset'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Очистить форму</span>
                                        </button>
                                    </div>
                                    <div className='row row-cols-2 gx-2 gx-sm-4 title-font'>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(2)}     className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(4)}     className='btn btn-1 w-100 fs-11'>
                                                <span className='me-1 me-sm-3 text-uppercase'>Далее</span>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronForwardOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset data-show={(activeField === 4) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Требовани я к машине</h4>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Тип кузова</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect className="inp w-100 fs-12" name="carcase" options={['тип 1', 'тип 2', 'тип 3']}/>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Температура</div>
                                    </div>
                                    <div className="col-md-9 fs-12 d-flex align-items-center">
                                        <input type="number" placeholder="0" className="temp"/>
                                        <span className="mx-3">—</span>
                                        <input type="number" placeholder="0" className="temp"/>
                                    </div>
                                </div>
                            </div>

                            <div className='mobile-btns d-block d-lg-none'>
                                <div className='container'>
                                    <div className='d-flex align-items-center justify-content-between blue title-font fw-5 fs-11'>
                                        <button type='button'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Использовать шаблон</span>
                                        </button>
                                        <button type='reset'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Очистить форму</span>
                                        </button>
                                    </div>
                                    <div className='row row-cols-2 gx-2 gx-sm-4 title-font'>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(3)}     className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(5)}     className='btn btn-1 w-100 fs-11'>
                                                <span className='me-1 me-sm-3 text-uppercase'>Далее</span>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronForwardOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset data-show={(activeField === 5) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Оплата</h4>
                            <div className="box">
                                <div className='row row-cols-sm-2 row-cols-xxl-3 mb-3'>
                                    <div className='mb-2 mb-sm-0'>
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
                                <div className='row row-cols-sm-2 row-cols-xxl-3 mb-4'>
                                    <div className='mb-2 mb-sm-0'>
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
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5">С НДС</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row gx-2 gx-sm-4'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" className="price w-100 fs-12"/>
                                            </div>
                                            <div className='col-4 col-sm-4 col-xl-3'>
                                                <CustomSelect className="inp w-100 fs-12" name="carcase" checkedOpt={1} options={['₽', '₽/км']}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5">без НДС</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" className="price w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5">Предоплата:</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" className="percent w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mobile-btns d-block d-lg-none'>
                                <div className='container'>
                                    <div className='d-flex align-items-center justify-content-between blue title-font fw-5 fs-11'>
                                        <button type='button'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Использовать шаблон</span>
                                        </button>
                                        <button type='reset'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Очистить форму</span>
                                        </button>
                                    </div>
                                    <div className='row row-cols-2 gx-2 gx-sm-4 title-font'>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(4)}     className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' onClick={() => setActiveField(6)}     className='btn btn-1 w-100 fs-11'>
                                                <span className='me-1 me-sm-3 text-uppercase'>Далее</span>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronForwardOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset data-show={(activeField === 6) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Контакты</h4>
                            <div className="box">
                                <div className="row align-items-center mb-3">
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Телефон*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className='row align-items-center'>
                                            <div className='col-sm-7'>
                                                <input type="tel" placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                            </div>
                                            <div className='col-sm-5 mt-3 mt-sm-0'>
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
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Имя*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className='row align-items-center'>
                                            <div className='col-sm-7'>
                                                <input type="text" placeholder='Имя' className="w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Примечание</div>
                                    </div>
                                    <div className="col-md-9">
                                        <textarea rows={3} placeholder='Укажите здесь дополнительную информацию '></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className='mobile-btns d-block d-lg-none'>
                                <div className='container'>
                                    <div className='d-flex align-items-center justify-content-between blue title-font fw-5 fs-11'>
                                        <button type='button'>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className='ms-1'>Использовать шаблон</span>
                                        </button>
                                        <button type='button'>Сохранить шаблон</button>
                                    </div>
                                    <div className='row gx-2 gx-sm-4 title-font'>
                                        <div className='col-5 col-sm-6'>
                                            <button type='button' onClick={() => setActiveField(5)} className='btn btn-1 px-3 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div className='col-7 col-sm-6'>
                                            <button type='submit' className='btn btn-2 w-100 h-100 fs-11 text-uppercase px-3'>Разместить груз</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className='d-none d-lg-block title-font fs-09 fw-5 mt-3'>* Поля обязательные к заполнению</div>
                    </div>
                    <div className="col-lg-4 pt-lg-5 position-relative d-none d-lg-block">
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
                                        <a className='active'>Разгрузка</a>
                                        <div className='fs-09'>
                                            <div>11.11.2021, круглосуточно</div>
                                            <div>Казань, Четаева 89</div>
                                        </div>
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
                            <button type='button' data-bs-toggle="modal" data-bs-target="#savePattern" className='fs-11 mx-auto mt-2 mt-xl-3 blue'>Сохранить шаблон</button>
                        </aside>
                    </div>
                </form>
            </section>
        </main>

        {/* Modal */}

        <div className="modal fade" id="usePattern" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h2>Выберите шаблон</h2>
                        <div className='box patterns p-2 p-sm-4'>
                            <div className='d-flex align-items-center'>
                                <div className='flex-1'>
                                    <div className='title-font fs-12 fw-7'>Название шаблона 1</div>
                                    <div className='fs-11 mt-1'>Примечание 1</div>
                                </div>
                                <button type='button' className='btn btn-1 fs-09 px-2 px-sm-4 ms-2'>Выбрать</button>
                                <button type='button' className='ms-2 ms-sm-3'>
                                    <IconContext.Provider value={{className: "gray-4 icon-15"}}>
                                        <IoTrash />
                                    </IconContext.Provider>
                                </button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div className='flex-1'>
                                    <div className='title-font fs-12 fw-7'>Название шаблона 2</div>
                                </div>
                                <button type='button' className='btn btn-1 fs-09 px-2 px-sm-4 ms-2'>Выбрать</button>
                                <button type='button' className='ms-2 ms-sm-3'>
                                    <IconContext.Provider value={{className: "gray-4 icon-15"}}>
                                        <IoTrash />
                                    </IconContext.Provider>
                                </button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div className='flex-1'>
                                    <div className='title-font fs-12 fw-7'>Название шаблона 3</div>
                                </div>
                                <button type='button' className='btn btn-1 fs-09 px-2 px-sm-4 ms-2'>Выбрать</button>
                                <button type='button' className='ms-2 ms-sm-3'>
                                    <IconContext.Provider value={{className: "gray-4 icon-15"}}>
                                        <IoTrash />
                                    </IconContext.Provider>
                                </button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div className='flex-1'>
                                    <div className='title-font fs-12 fw-7'>Название шаблона 1</div>
                                    <div className='fs-11 mt-1'>Примечание 1</div>
                                </div>
                                <button type='button' className='btn btn-1 fs-09 px-2 px-sm-4 ms-2'>Выбрать</button>
                                <button type='button' className='ms-2 ms-sm-3'>
                                    <IconContext.Provider value={{className: "gray-4 icon-15"}}>
                                        <IoTrash />
                                    </IconContext.Provider>
                                </button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div className='flex-1'>
                                    <div className='title-font fs-12 fw-7'>Название шаблона 2</div>
                                </div>
                                <button type='button' className='btn btn-1 fs-09 px-2 px-sm-4 ms-2'>Выбрать</button>
                                <button type='button' className='ms-2 ms-sm-3'>
                                    <IconContext.Provider value={{className: "gray-4 icon-15"}}>
                                        <IoTrash />
                                    </IconContext.Provider>
                                </button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <div className='flex-1'>
                                    <div className='title-font fs-12 fw-7'>Название шаблона 3</div>
                                </div>
                                <button type='button' className='btn btn-1 fs-09 px-2 px-sm-4 ms-2'>Выбрать</button>
                                <button type='button' className='ms-2 ms-sm-3'>
                                    <IconContext.Provider value={{className: "gray-4 icon-15"}}>
                                        <IoTrash />
                                    </IconContext.Provider>
                                </button>
                            </div>
                        </div>

                        {/* если нет шаблонов */}

                        <h5 className='text-center'>У Вас нет сохраненных шаблонов</h5>
                        <p className='text-center fs-11'>Сохраняйте однотипные объявления в шаблоны <br /> для удобства и экономии времени</p>
                        <button type='button' data-bs-dismiss="modal" className='btn btn-1 fs-12 mx-auto mt-4'>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="savePattern" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-body">
                        <button type="button" className="btn-close" data-bs-dismiss="modal">
                            <IoCloseOutline />
                        </button>
                        <h2>Сохранить шаблон груза</h2>
                        <form className='fs-12'>
                            <label for='pattern-name' className='fw-5 title-font mb-2'>Название шаблона</label>
                            <input id='pattern-name' placeholder='Название' className='mb-4'/>
                            <label for='pattern-notes' className='fw-5 title-font mb-2'>Примечание</label>
                            <input id='pattern-notes' placeholder='Примечание' className='mb-4'/>
                            <div className='row row-cols-sm-2'>
                                <div className='mb-3 mb-sm-0'>
                                    <button type='reset' data-bs-dismiss="modal" className='btn btn-1 w-100'>Отмена</button>
                                </div>
                                <div>
                                    <button type='button' className='btn btn-2 w-100'>Сохранить</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

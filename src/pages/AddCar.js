import React, {useState, useEffect} from 'react';
import CustomSelect from '../components/utilities/CustomSelect';
import { Tooltip } from 'bootstrap';
import { IoAddCircle, IoChevronBackOutline, IoChevronForwardOutline, IoCloseOutline, IoTrash, IoHelpCircleOutline, IoNewspaperOutline } from 'react-icons/io5';
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";

import { Link, animateScroll as scroll } from 'react-scroll';
const scrollToTop = () => {
    scroll.scrollToTop();
};

export default function AddCar() {
    const [activeField, setActiveField] = useState(1); //для мобильных устройств

    let [data, setData] = useState([
        {
            fieldset: 'route',
            name: 'loading',
            value: '',
            required: true
        },
        {
            fieldset: 'route',
            name: 'loading-radius',
            value: '',
            required: false
        },
        {
            fieldset: 'route',
            name: 'unloading',
            value: '',
            required: true
        },
        {
            fieldset: 'route',
            name: 'unloading-radius',
            value: '',
            required: false
        },
        {
            fieldset: 'date',
            name: 'frequency',
            value: '',
            required: true
        },
        {
            fieldset: 'date',
            name: 'date',
            value: '',
            required: false
        },
        {
            fieldset: 'date',
            name: 'days',
            value: '',
            required: false
        },
        {
            fieldset: 'date',
            name: 'periodicity',
            value: '',
            required: false
        },
        {
            fieldset: 'about-car',
            name: 'car-type',
            value: '',
            required: true
        },
        {
            fieldset: 'about-car',
            name: 'additional-configuration',
            value: '',
            required: true
        },
        {
            fieldset: 'about-car',
            name: 'carrying',
            value: '',
            required: true
        },
        {
            fieldset: 'about-car',
            name: 'capacity',
            value: '',
            required: true
        },
        {
            fieldset: 'about-car',
            name: 'length',
            value: '',
            required: true
        },
        {
            fieldset: 'about-car',
            name: 'width',
            value: '',
            required: true
        },
        {
            fieldset: 'about-car',
            name: 'height',
            value: '',
            required: true
        },
        {
            fieldset: 'about-car',
            name: 'sts',
            value: '',
            required: false
        },
        {
            fieldset: 'about-car',
            name: 'vin',
            value: '',
            required: false
        },
        {
            fieldset: 'about-car',
            name: 'pts',
            value: '',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'bargain',
            value: '',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'payment-type',
            value: '',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'unit',
            value: '₽',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'price-vat',
            value: '',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'price-novat',
            value: '',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'prepay',
            value: '',
            required: false
        },
        {
            fieldset: 'contacts',
            name: 'contact-phone',
            value: '',
            required: true
        },
        {
            fieldset: 'contacts',
            name: 'contact-name',
            value: '',
            required: true
        },
        {
            fieldset: 'contacts',
            name: 'remark',
            value: '',
            required: false
        }
    ]);
    
    let checkFieldset = (fieldName) => {
        let newArr = data.filter(item => item.fieldset === fieldName && item.required === true);
        let result = newArr.every(elem => elem.value != '');
        return result;
    };

    let fillDataList = (e) => {
        let inputName = e.target.name;
        let inputVal = e.target.value.trim();
        console.log(inputName);

        setData(data.map(obj => {
            if (obj.name === inputName) {
               return {...obj, 'value': inputVal};
            } else {
               return obj;
            }
        }));
    };

    let changeFrequency = (e) => {
        //нужно прикрутить очистку инпутов и селекта
        let inputVal = e.target.value.trim();
        if(inputVal === 'Единожды') {
            setData(data.map(obj => {
                if(obj.name === 'frequency'){
                    return {...obj, 'value': inputVal};
                } else if (obj.name === 'date' || obj.name === 'days') {
                   return {...obj, 'required': true};
                } else if(obj.name === 'periodicity'){
                    return {...obj, 'required': false, 'value': ''};
                } else {
                   return obj;
                }
            }));
        } else {
            setData(data.map(obj => {
                if(obj.name === 'frequency'){
                    return {...obj, 'value': inputVal};
                } else if (obj.name === 'periodicity') {
                   return {...obj, 'required': true};
                } else if(obj.name === 'date' || obj.name === 'days'){
                    return {...obj, 'required': false, 'value': ''};
                } else {
                   return obj;
                }
            }));
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        let requiredArr = data.filter(obj => obj.required===true && obj);
        let verification = requiredArr.every(obj => obj.value!=='' && obj);
        let empty = requiredArr.filter(obj => obj.value==='' && obj);

        if(verification){
            let formInfo = data.map(obj => {
                return obj.name + ': ' + obj.value + '; ';
            })
            alert(formInfo);
        } else {
            alert('заполните форму!');
            Array.from(document.querySelectorAll('[data-label]')).forEach( item => item.dataset.warning = 'false' );
            empty.map(obj => {
                let label = obj.name;
                console.log('label name =' + obj.name);
                document.querySelector('[data-label='+label+']').dataset.warning = 'true';
                console.log('querySelector =' + document.querySelector('[data-label='+label+']'));
            })
        }
    };

    useEffect(() => {
        //init tooltip
        Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        .forEach(tooltipNode => new Tooltip(tooltipNode))
    });
    
    return (
        <>
        <main className="bg-gray">
            <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
                <h1 className="dark-blue text-center text-uppercase">Добавление Машины</h1>
                <form className="row" onSubmit={(e) => onSubmit(e)} noValidate>
                    <div className="col-lg-8">
                        <div className='mobile-indicators d-flex d-lg-none'>
                            <div className={(activeField === 1) ? 'active' : ''}>1</div>
                            <div className={(activeField === 2) ? 'active' : ''}>2</div>
                            <div className={(activeField === 3) ? 'active' : ''}>3</div>
                            <div className={(activeField === 4) ? 'active' : ''}>4</div>
                            <div className={(activeField === 5) ? 'active' : ''}>5</div>
                        </div>
                        
                        <fieldset name="route" data-show={(activeField === 1) ? 'true' : 'false'}>
                            <div className='d-flex align-items-center justify-content-center justify-content-lg-between mb-4 mb-lg-3'>
                                <h4 className="text-center text-lg-start mb-0">Маршрут</h4>
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
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label data-label='loading' data-warning='false' className="title-font fs-12 fw-5">Откуда*</label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <input type='text' name='loading' onChange={(e)=> fillDataList(e)} placeholder='Населенный пункт' className='fs-12'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label data-label='loading-radius' data-warning='false' className="title-font fs-12 fw-5">Радиус загрузки</label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-sm-6 col-xl-3">
                                                <input type='number' onChange={(e)=> fillDataList(e)} name='loading-radius' placeholder='0' className='w-100 fs-12 distance'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label data-label='unloading' data-warning='false' className="title-font fs-12 fw-5">Куда*</label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <input type='text' name='unloading' onChange={(e)=> fillDataList(e)} placeholder='Населенный пункт' className='fs-12'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label data-label='unloading-radius' data-warning='false' className="title-font fs-12 fw-5">Радиус разгрузки</label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-sm-6 col-xl-3">
                                                <input type='number' name='unloading-radius' onChange={(e)=> fillDataList(e)} placeholder='0' className='w-100 fs-12 distance'/>
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

                        <fieldset name="date" className='mt-lg-5' data-show={(activeField === 2) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">Дата</h4>
                            <div className="box">
                                <div className="row">
                                    <div className="col-md-2 mb-3 mb-md-0">
                                        <div data-label='frequency' data-warning='false' className="title-font fs-12 fw-5">Дата*</div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-xl-7 mb-4 mb-lg-2 mb-xl-0">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input type="radio" name="frequency" onChange={(e)=> changeFrequency(e)} value="Единожды"/>
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Единожды</span>
                                                    </label>
                                                    <div className={
                                                        data.filter(obj => obj.name === "frequency").map(obj => {
                                                            if(obj.value === 'Единожды'){
                                                                return 'd-flex fs-12 align-items-center'
                                                            } else {
                                                                return 'd-flex fs-12 align-items-center disabled'
                                                            }
                                                        })
                                                    }>
                                                        <label data-label='date' data-warning='false' className='flex-1'>
                                                            <input type="date" name='date' onChange={(e)=> fillDataList(e)} />
                                                        </label>
                                                        <span className="mx-2 mx-xxl-3">+</span>
                                                        <label style={{maxWidth:'100px'}} data-label='days' data-warning='false'>
                                                            <CustomSelect className="inp" name="days" onChange={(e)=> fillDataList(e)} options={['0 дн.', '1 дн.']}/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-5">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input type="radio" name="frequency" onChange={(e)=> changeFrequency(e)} value="Постоянно"/>
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Постоянно</span>
                                                    </label>
                                                    <div data-label='periodicity' data-warning='false' className={
                                                        data.filter(obj => obj.name === "frequency").map(obj => {
                                                            if(obj.value === 'Постоянно'){
                                                                return ''
                                                            } else {
                                                                return 'disabled'
                                                            }
                                                        })
                                                    }>
                                                        <CustomSelect className="inp w-100 fs-12" name="periodicity" onChange={(e)=> fillDataList(e)} options={['По рабочим дням', 'По выходным', 'Ежедневно', 'Через день']}/>
                                                    </div>
                                                </div>
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

                        <fieldset name="about-car" className='mt-lg-5' data-show={(activeField === 3) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">О Машине</h4>
                            <div className="box">
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='car-type' data-warning='false' className="title-font fs-12 fw-5">Тип машины*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect onChange={(e)=> fillDataList(e)} className="inp w-100 fs-12" name="car-type" options={['Тягач', 'Фура', 'Рефрижератор']}/>
                                        <div data-label='additional-configuration' data-warning='false' className='row row-cols-sm-3 mt-3'>
                                            <div className='mb-3 mb-sm-0'>
                                                <label>
                                                    <input type="radio" name="additional-configuration" value="Грузовик" onChange={(e)=> fillDataList(e)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Грузовик</span>
                                                </label>
                                            </div>
                                            <div className='mb-3 mb-sm-0'>
                                                <label>
                                                    <input type="radio" name="additional-configuration" value="Полуприцеп" onChange={(e)=> fillDataList(e)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Полуприцеп</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="radio" name="additional-configuration" value="Сцепка" onChange={(e)=> fillDataList(e)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Сцепка</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-5 col-md-3">
                                        <div data-label='carrying' data-warning='false' className="title-font fs-12 fw-5 mb-2 mb-sm-0">Грузоподъемность*</div>
                                    </div>
                                    <div className="col-sm-7 col-md-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input type="number" name='carrying' onChange={(e)=> fillDataList(e)} className="weight w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-5 col-md-3">
                                        <div data-label='capacity' data-warning='false' className="title-font fs-12 fw-5 mb-2 mb-sm-0">Объем*</div>
                                    </div>
                                    <div className="col-sm-7 col-md-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input type="number" name='capacity' onChange={(e)=> fillDataList(e)} className="size w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Габариты*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row row-cols-sm-3 gx-3 gx-xxl-4 fs-12">
                                            <div className='mb-2 mb-sm-0'>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='length' data-warning='false'>Длина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name="length" onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-2 mb-sm-0'>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='width' data-warning='false'>Ширина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='width' onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='height' data-warning='false'>Высота:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='height' onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5 d-flex align-items-center">
                                            <span data-label='sts' data-warning='false'>СТС</span>
                                            <button type="button" data-bs-toggle="tooltip" data-bs-placement="right" title="Свидетельство о регистрации транспортного средства">
                                                <IconContext.Provider value={{className: "ms-2 blue icon-15"}}>
                                                    <IoHelpCircleOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name='sts' onChange={(e)=> fillDataList(e)} placeholder='СТС' className="w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5 d-flex align-items-center">
                                            <span data-label='vin' data-warning='false'>VIN код</span>
                                            <button type="button" data-bs-toggle="tooltip" data-bs-placement="right" title="Индивидуальный шифр транспортного средства">
                                                <IconContext.Provider value={{className: "ms-2 blue icon-15"}}>
                                                    <IoHelpCircleOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name='vin' onChange={(e)=> fillDataList(e)} placeholder='VIN код' className="w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5 d-flex align-items-center">
                                            <span data-label='pts' data-warning='false'>ПТС</span>
                                            <button type="button" data-bs-toggle="tooltip" data-bs-placement="right" title="Паспорт транспортного средства">
                                                <IconContext.Provider value={{className: "ms-2 blue icon-15"}}>
                                                    <IoHelpCircleOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input type="text" name='pts' onChange={(e)=> fillDataList(e)} placeholder='ПТС' className="w-100 fs-12"/>
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

                        <fieldset name='payment' className='mt-lg-5' data-show={(activeField === 4) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">Оплата</h4>
                            <div className="box">
                                <div data-label='bargain' data-warning='false' className='row row-cols-sm-2 row-cols-xxl-3 mb-3'>
                                    <div className='mb-2 mb-sm-0'>
                                        <label>
                                            <input type="radio" name="bargain" onChange={(e)=> fillDataList(e)} value="Возможен торг"/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Возможен торг</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name="bargain" onChange={(e)=> fillDataList(e)} value="Без торга"/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Без торга</span>
                                        </label>
                                    </div>
                                </div>
                                <div data-label='payment-type' data-warning='false' className='row row-cols-sm-2 row-cols-xxl-3 mb-4'>
                                    <div className='mb-2 mb-sm-0'>
                                        <label>
                                            <input type="radio" name="payment-type" onChange={(e)=> fillDataList(e)} value="Наличный расчет"/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Наличный расчет</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name="payment-type" onChange={(e)=> fillDataList(e)} value="Перевод по карте"/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Перевод по карте</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div data-label='price-vat' data-warning='false' className="title-font fs-12 fw-5">С НДС</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row gx-2 gx-sm-4'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" name='price-vat' onChange={(e)=> fillDataList(e)} className={
                                                    data.filter(obj => obj.name === "unit").map(obj => {
                                                        if(obj.value === '₽'){
                                                            return 'price w-100 fs-12'
                                                        } else {
                                                            return 'price-per-km w-100 fs-12'
                                                        }
                                                    })
                                                }/>
                                            </div>
                                            <div className='col-4 col-sm-4 col-xl-3'>
                                                <CustomSelect className="inp w-100 fs-12" name="unit" onChange={(e)=> fillDataList(e)} checkedOpt={1} options={['₽', '₽/км']}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div data-label='price-novat' data-warning='false' className="title-font fs-12 fw-5">без НДС</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" name='price-novat' onChange={(e)=> fillDataList(e)} className={
                                                    data.filter(obj => obj.name === "unit").map(obj => {
                                                        if(obj.value === '₽'){
                                                            return 'price w-100 fs-12'
                                                        } else {
                                                            return 'price-per-km w-100 fs-12'
                                                        }
                                                    })
                                                }/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div data-label='prepay' data-warning='false' className="title-font fs-12 fw-5">Предоплата:</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" name="prepay" onChange={(e)=> fillDataList(e)} className="percent w-100 fs-12"/>
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

                        <fieldset name='contacts' className='mt-lg-5' data-show={(activeField === 5) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">Контакты</h4>
                            <div className="box">
                                <div className="row align-items-center mb-3">
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <div data-label='contact-phone' data-warning='false' className="title-font fs-12 fw-5">Телефон*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className='row align-items-center'>
                                            <div className='col-sm-7'>
                                                <input type="tel" name='contact-phone' onChange={(e)=> fillDataList(e)} placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
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
                                        <div data-label='contact-name' data-warning='false' className="title-font fs-12 fw-5">Имя*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className='row align-items-center'>
                                            <div className='col-sm-7'>
                                                <input type="text" name='contact-name' onChange={(e)=> fillDataList(e)} placeholder='Имя' className="w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <div data-label='remark' data-warning='false' className="title-font fs-12 fw-5">Примечание</div>
                                    </div>
                                    <div className="col-md-9">
                                        <textarea rows={3} name='remark' onChange={(e)=> fillDataList(e)} placeholder='Укажите здесь дополнительную информацию '></textarea>
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
                                            <button type='button' onClick={() => setActiveField(4)} className='btn btn-1 px-3 w-100 fs-11'>
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
                                        <Link activeClass="active" to="route" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('route')?'filled':''}>Маршрут</Link>
                                        <div className='fs-09'>
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'loading' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'loading-radius' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>+{obj.value}км</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'unloading' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>— {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'unloading-radius' && obj.value != '') {
                                                    return <span key={obj.name}>+{obj.value}км</span>;
                                                    } 
                                                })
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="date" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('date')?'filled':''}>Дата</Link>
                                        <div className='fs-09'>
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'frequency' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}:</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'date' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'days' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>+{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'periodicity' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="about-car" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('about-car')?'filled':''}>Информация о машине</Link>
                                        <div className='fs-09'>
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'car-type' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'additional-configuration' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'carrying' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}т</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'capacity' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}м<sup>3</sup></span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'length' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'width' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>/ {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'height' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>/ {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'sts' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'vin' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'pts' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="payment" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('payment')?'filled':''}>Оплата</Link>
                                        <div className='fs-09'>
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'bargain' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'payment-type' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'price-vat' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, с&nbsp;НДС {obj.value}{
                                                        data.filter(obj => obj.name === "unit").map(obj => {
                                                            return obj.value
                                                        })
                                                    }</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'price-novat' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, без&nbsp;НДС {obj.value}{
                                                        data.filter(obj => obj.name === "unit").map(obj => {
                                                            return obj.value
                                                        })
                                                    }</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'prepay' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, предоплата {obj.value}%</span>;
                                                    } 
                                                })
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="contacts" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('contacts')?'filled':''}>Контакты</Link>
                                        <div className='fs-09'>
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'contact-phone' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>{obj.value}</span>;
                                                    } 
                                                })
                                            }
                                            {
                                                data.map(obj => {
                                                    if (obj.name === 'contact-name' && obj.value != '') {
                                                    return <span key={obj.name} className='me-1'>, {obj.value}</span>;
                                                    } 
                                                })
                                            }
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <button type='submit' className='btn btn-1 text-uppercase fs-15 mx-auto mt-4 mt-xl-5'>разместить груз</button>
                            <div className='fs-09 text-center mt-2 mt-xl-3'>Объявление будет опубликованно до  1 января включительно, после чего удалится в архив</div>
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
                            <label htmlFor='pattern-name' className='fw-5 title-font mb-2'>Название шаблона</label>
                            <input id='pattern-name' placeholder='Название' className='mb-4'/>
                            <label htmlFor='pattern-notes' className='fw-5 title-font mb-2'>Примечание</label>
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

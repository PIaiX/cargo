import React, {useState, useEffect} from 'react';
import CustomSelect from '../components/utilities/CustomSelect';
import { Link } from 'react-scroll';
import { Tooltip } from 'bootstrap';
import { IoAddCircle, IoCloseCircle, IoChevronBackOutline, IoChevronForwardOutline, IoHelpCircleOutline, IoNewspaperOutline } from 'react-icons/io5';
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";

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
            name: 'loadingRadius',
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
            name: 'unloadingRadius',
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
            name: 'loadingPeriodType',
            value: '',
            required: false
        },
        {
            fieldset: 'aboutCar',
            name: 'carType',
            value: '',
            required: true
        },
        {
            fieldset: 'aboutCar',
            name: 'additionalConfiguration',
            value: '',
            required: true
        },
        {
            fieldset: 'aboutCar',
            name: 'carrying',
            value: '',
            required: true
        },
        {
            fieldset: 'aboutCar',
            name: 'capacity',
            value: '',
            required: true
        },
        {
            fieldset: 'aboutCar',
            name: 'length',
            value: '',
            required: true
        },
        {
            fieldset: 'aboutCar',
            name: 'width',
            value: '',
            required: true
        },
        {
            fieldset: 'aboutCar',
            name: 'height',
            value: '',
            required: true
        },
        {
            fieldset: 'aboutCar',
            name: 'sts',
            value: '',
            required: false
        },
        {
            fieldset: 'aboutCar',
            name: 'vin',
            value: '',
            required: false
        },
        {
            fieldset: 'aboutCar',
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
            name: 'paymentType',
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
            name: 'priceVat',
            value: '',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'priceNovat',
            value: '',
            required: false
        },
        {
            fieldset: 'payment',
            name: 'prepay',
            value: '',
            required: true
        },
        {
            fieldset: 'contacts',
            name: 'contactPhone0',
            value: '',
            required: true
        },
        {
            fieldset: 'contacts',
            name: 'contactName0',
            value: '',
            required: true
        },
        {
            fieldset: 'contacts',
            name: 'remark',
            value: '',
            required: false
        },
    ]);
    let [contacts, setContacts] = useState([]);
    
    let checkFieldset = (fieldName) => {
        let newArr = data.filter(item => item.fieldset === fieldName && item.required === true);
        let result = newArr.every(elem => elem.value !== '');
        return result;
    };

    let fillDataList = (e) => {
        console.log('target:' + e.target);
        let inputName = e.target.name;
        let inputVal = e.target.value.trim();

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
                } else if(obj.name === 'loadingPeriodType'){
                    return {...obj, 'required': false, 'value': ''};
                } else {
                   return obj;
                }
            }));
        } else {
            setData(data.map(obj => {
                if(obj.name === 'frequency'){
                    return {...obj, 'value': inputVal};
                } else if (obj.name === 'loadingPeriodType') {
                   return {...obj, 'required': true};
                } else if(obj.name === 'date' || obj.name === 'days'){
                    return {...obj, 'required': false, 'value': ''};
                } else {
                   return obj;
                }
            }));
        }
    };

    const findInState = (name) => {
        let val = '';
        data.forEach(obj => {
            if (obj.name === name && obj.value !== '') {
                val = obj.value
            //  <span key={obj.name} className='me-1'>{obj.value}</span>;
            } 
        })
        return val;
    };

    const onSubmit = e => {
        e.preventDefault();

        let requiredArr = data.filter(obj => obj.required===true);
        let verification = requiredArr.every(obj => obj.value!=='');
        let empty = requiredArr.filter(obj => obj.value==='');

        if(verification){
            let formInfo = data.map(obj => {
                return obj.name + ': ' + obj.value + '; ';
            })
            alert(formInfo);
        } else {
            alert('заполните форму!');
            Array.from(document.querySelectorAll('[data-label]')).forEach( item => item.dataset.warning = 'false' );
            empty.forEach(obj => {
                let label = obj.name;
                document.querySelector('[data-label='+label+']').dataset.warning = 'true';
            })
        }
    };

    const onReset = e => {
        setData(data.map(obj => {
            return {...obj, 'value': ''};
        }));
    };

    useEffect(() => {
        //init tooltip
        Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        .forEach(tooltipNode => new Tooltip(tooltipNode))
    });

    let deleteContacts = (i) => {
        setContacts(contacts.filter(obj => obj !== i));
        setData(data.filter(obj => obj.name !== 'contactPhone'+i || obj.name !== 'contactName'+i));
    };

    let addContacts = () => {
        let newNum = Number(contacts)+1;

        let phone = {
            fieldset: 'contacts',
            name: 'contactPhone'+ newNum,
            value: '',
            required: false
        };
        let userName = {
            fieldset: 'contacts',
            name: 'contactName'+ newNum,
            value: '',
            required: false
        };
        setData([...data, phone, userName]);
        
        setContacts([...contacts, newNum]);
    };
    
    return (
        <main className="bg-gray">
            <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
                <h1 className="dark-blue text-center text-uppercase">Добавление Машины</h1>
                <form className="row" onSubmit={(e) => onSubmit(e)} onReset={(e) => onReset(e)} noValidate>
                    <div className="col-lg-8">
                        <div className='mobile-indicators d-flex d-lg-none'>
                            <button type='button' className={(checkFieldset('route')) ? 'active' : ''} onClick={() => setActiveField(1)}>1</button>
                            <button type='button' className={(checkFieldset('date')) ? 'active' : ''} onClick={() => setActiveField(2)}>2</button>
                            <button type='button' className={(checkFieldset('aboutCar')) ? 'active' : ''} onClick={() => setActiveField(3)}>3</button>
                            <button type='button' className={(checkFieldset('payment')) ? 'active' : ''} onClick={() => setActiveField(4)}>4</button>
                            <button type='button' className={(checkFieldset('contacts')) ? 'active' : ''} onClick={() => setActiveField(5)}>5</button>
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
                                        <label data-label='loadingRadius' data-warning='false' className="title-font fs-12 fw-5">Радиус загрузки</label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-sm-6 col-xl-3">
                                                <input type='number' min="0.5" step="0.1" onChange={(e)=> fillDataList(e)} name='loadingRadius' placeholder='0,5' className='w-100 fs-12 distance'/>
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
                                        <label data-label='unloadingRadius' data-warning='false' className="title-font fs-12 fw-5">Радиус разгрузки</label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-sm-6 col-xl-3">
                                                <input type='number' min=".5" step="0.1" name='unloadingRadius' onChange={(e)=> fillDataList(e)} placeholder='0,5' className='w-100 fs-12 distance'/>
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
                                    <button type='button' disabled={(checkFieldset('route') ? false : true)} onClick={() => setActiveField(2)} className='btn btn-1 w-100 fs-11'>
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
                                                    <div data-label='loadingPeriodType' data-warning='false' className={
                                                        data.filter(obj => obj.name === "frequency").map(obj => {
                                                            if(obj.value === 'Постоянно'){
                                                                return ''
                                                            } else {
                                                                return 'disabled'
                                                            }
                                                        })
                                                    }>
                                                        <CustomSelect className="inp w-100 fs-12" name="loadingPeriodType" onChange={(e)=> fillDataList(e)} options={['По рабочим дням', 'По выходным', 'Ежедневно', 'Через день']}/>
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
                                            <button type='button' onClick={() => setActiveField(1)} className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' disabled={(checkFieldset('date') ? false : true)} onClick={() => setActiveField(3)} className='btn btn-1 w-100 fs-11'>
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

                        <fieldset name="aboutCar" className='mt-lg-5' data-show={(activeField === 3) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">О Машине</h4>
                            <div className="box">
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='carType' data-warning='false' className="title-font fs-12 fw-5">Тип машины*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect onChange={(e)=> fillDataList(e)} className="inp w-100 fs-12" name="carType" options={['Тягач', 'Фура', 'Рефрижератор']}/>
                                        <div data-label='additionalConfiguration' data-warning='false' className='row row-cols-sm-3 mt-3'>
                                            <div className='mb-3 mb-sm-0'>
                                                <label>
                                                    <input type="radio" name="additionalConfiguration" value="Грузовик" onChange={(e)=> fillDataList(e)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Грузовик</span>
                                                </label>
                                            </div>
                                            <div className='mb-3 mb-sm-0'>
                                                <label>
                                                    <input type="radio" name="additionalConfiguration" value="Полуприцеп" onChange={(e)=> fillDataList(e)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Полуприцеп</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="radio" name="additionalConfiguration" value="Сцепка" onChange={(e)=> fillDataList(e)}/>
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
                                                <input type="number" min="1" name='carrying' placeholder='0' onChange={(e)=> fillDataList(e)} className="weight w-100 fs-12"/>
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
                                                <input type="number" min="1" name='capacity' placeholder='0' onChange={(e)=> fillDataList(e)} className="size w-100 fs-12"/>
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
                                                        <input type="number" min="1" step="0.1" name="length" placeholder='0' onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-2 mb-sm-0'>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='width' data-warning='false'>Ширина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" min="1" step="0.1" name='width' placeholder='0' onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='height' data-warning='false'>Высота:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" min="1" step="0.1" name='height' placeholder='0' onChange={(e)=> fillDataList(e)} className="length"/>
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
                                            <button type='button' onClick={() => setActiveField(2)} className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' disabled={(checkFieldset('aboutCar') ? false : true)} onClick={() => setActiveField(4)} className='btn btn-1 w-100 fs-11'>
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
                                <div data-label='paymentType' data-warning='false' className='row row-cols-sm-2 row-cols-xxl-3 mb-4'>
                                    <div className='mb-2 mb-sm-0'>
                                        <label>
                                            <input type="radio" name="paymentType" onChange={(e)=> fillDataList(e)} value="Наличный расчет"/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Наличный расчет</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name="paymentType" onChange={(e)=> fillDataList(e)} value="Перевод по карте"/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Перевод по карте</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div data-label='priceVat' data-warning='false' className="title-font fs-12 fw-5">С НДС</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row gx-2 gx-sm-4'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" min="1" name='priceVat' placeholder='0' onChange={(e)=> fillDataList(e)} className={
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
                                        <div data-label='priceNovat' data-warning='false' className="title-font fs-12 fw-5">без НДС</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" min="1" name='priceNovat' placeholder='0' onChange={(e)=> fillDataList(e)} className={
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
                                        <div data-label='prepay' data-warning='false' className="title-font fs-12 fw-5">Предоплата*</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" min="0" max="100" name="prepay" placeholder='0' onChange={(e)=> fillDataList(e)} className="percent w-100 fs-12"/>
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
                                            <button type='button' onClick={() => setActiveField(3)} className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' disabled={(checkFieldset('payment') ? false : true)} onClick={() => setActiveField(5)} className='btn btn-1 w-100 fs-11'>
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
                                <div className='row gx-2 gx-sm-4 mb-4 mb-md-0'>
                                    <div className='col-md-9'>
                                        <div className="row align-items-center gy-2 gy-md-3">
                                            <div className="col-md-4">
                                                <div data-label='contactPhone0' data-warning='false' className="title-font fs-12 fw-5">Телефон*</div>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="tel" name='contactPhone0' onChange={(e)=> fillDataList(e)} placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                            </div>
                                            <div className="col-md-4">
                                                <div data-label='contactName0' data-warning='false' className="title-font fs-12 fw-5">Имя*</div>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" name='contactName0' onChange={(e)=> fillDataList(e)} placeholder='Имя' className="w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-3 mt-2 mt-md-0'>
                                        <button type="button" onClick={() => addContacts()} className="green fs-11 fw-5 text-start">
                                            <IconContext.Provider value={{className: "green icon-15"}}>
                                                <IoAddCircle />
                                            </IconContext.Provider>
                                            <span className="ms-2">Добавить контакт</span>
                                        </button>
                                    </div>
                                </div>
                                {
                                    contacts.map(obj => <div key={obj} className='row mt-3'>
                                        <div className='col-md-9'>
                                            <div className="row align-items-center gy-2 gy-md-3">
                                                <div className="col-md-4">
                                                    <div data-label={'contactPhone'+obj} data-warning='false' className="title-font fs-12 fw-5">Телефон</div>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="tel" name={'contactPhone'+obj} onChange={(e)=> fillDataList(e)} placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                                </div>
                                                <div className="col-md-4">
                                                    <div data-label={'contactName'+obj} data-warning='false' className="title-font fs-12 fw-5">Имя</div>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" name={'contactName'+obj} onChange={(e)=> fillDataList(e)} placeholder='Имя' className="w-100 fs-12"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3 mt-2 mt-md-0'>
                                            <button type="button" onClick={() => deleteContacts(obj)} className="red fs-11 fw-5">
                                                <IconContext.Provider value={{className: "red icon-15"}}>
                                                    <IoCloseCircle />
                                                </IconContext.Provider>
                                                <span className="ms-2">Удалить</span>
                                            </button>
                                        </div>
                                    </div>)
                                }
                                <div className="row mt-3">
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
                                                (findInState('loading')) &&
                                                <span className='me-1'>{findInState('loading')}</span>
                                            }
                                            {
                                                (findInState('loadingRadius')) &&
                                                <span className='me-1'>+{findInState('loadingRadius')}км</span>
                                            }
                                            {
                                                (findInState('unloading')) &&
                                                <span className='me-1'>— {findInState('unloading')}</span>
                                            }
                                            {
                                                (findInState('unloadingRadius')) &&
                                                <span>+{findInState('unloadingRadius')}км</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="date" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('date')?'filled':''}>Дата</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('frequency')) &&
                                                <span className='me-1'>{findInState('frequency')}:</span>
                                            }
                                            {
                                                (findInState('date')) &&
                                                <span className='me-1'>{findInState('date')}</span>
                                            }
                                            {
                                                (findInState('days')) &&
                                                <span>+ {findInState('days')}</span>
                                            }
                                            {
                                                (findInState('loadingPeriodType')) &&
                                                <span>{findInState('loadingPeriodType')}</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="aboutCar" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('aboutCar')?'filled':''}>Информация о машине</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('carType')) &&
                                                <span className='me-1'>{findInState('carType')}</span>
                                            }
                                            {
                                                (findInState('additionalConfiguration')) &&
                                                <span className='me-1'>, {findInState('additionalConfiguration')}</span>
                                            }
                                            {
                                                (findInState('carrying')) &&
                                                <span className='me-1'>, {findInState('carrying')}т</span>
                                            }
                                            {
                                                (findInState('capacity')) &&
                                                <span className='me-1'>, {findInState('capacity')}м<sup>3</sup></span>
                                            }
                                            {
                                                (findInState('length')) &&
                                                <span className='me-1'>, {findInState('length')}</span>
                                            }
                                            {
                                                (findInState('width')) &&
                                                <span className='me-1'>/ {findInState('width')}</span>
                                            }
                                            {
                                                (findInState('height')) &&
                                                <span className='me-1'>/ {findInState('height')}</span>
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {
                                                (findInState('sts')) &&
                                                <span className='me-1'>{findInState('sts')}</span>
                                            }
                                            {
                                                (findInState('vin')) &&
                                                <span className='me-1'>, {findInState('vin')}</span>
                                            }
                                            {
                                                (findInState('pts')) &&
                                                <span className='me-1'>, {findInState('pts')}</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="payment" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('payment')?'filled':''}>Оплата</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('bargain')) &&
                                                <span className='me-1'>{findInState('bargain')}</span>
                                            }
                                            {
                                                (findInState('paymentType')) &&
                                                <span className='me-1'>, {findInState('paymentType')}</span>
                                            }
                                            {
                                                (findInState('priceVat')) &&
                                                <span className='me-1'>, с&nbsp;НДС {findInState('priceVat')} {findInState('unit')}
                                                </span>
                                            }
                                            {
                                                (findInState('priceNovat')) &&
                                                <span className='me-1'>, без&nbsp;НДС {findInState('priceNovat')} {findInState('unit')}
                                                </span>
                                            }
                                            {
                                                (findInState('prepay')) &&
                                                <span>, предоплата {findInState('prepay')}%</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="contacts" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('contacts')?'filled':''}>Контакты</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('contactPhone0')) &&
                                                <span className='me-1'>{findInState('contactPhone0')}</span>
                                            }
                                            {
                                                (findInState('contactName0')) &&
                                                <span>, {findInState('contactName0')}</span>
                                            }
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <button type='submit' className='btn btn-1 text-uppercase fs-15 mx-auto mt-4 mt-xl-5'>добавить машину</button>
                            <div className='fs-09 text-center mt-2 mt-xl-3'>Объявление будет опубликованно до  1 января включительно, после чего удалится в архив</div>
                            <button type='button' data-bs-toggle="modal" data-bs-target="#savePattern" className='fs-11 mx-auto mt-2 mt-xl-3 blue'>Сохранить шаблон</button>
                        </aside>
                    </div>
                </form>
            </section>
        </main>
    )
}
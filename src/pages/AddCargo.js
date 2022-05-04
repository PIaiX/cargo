import React, {useState, useEffect, useRef} from 'react';
import CustomSelect from '../components/utilities/CustomSelect';
import { Link } from 'react-scroll';
import { Tooltip } from 'bootstrap';
import { IoAddCircle, IoCloseCircle, IoChevronBackOutline, IoChevronForwardOutline, IoNewspaperOutline } from 'react-icons/io5';
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";

export default function AddCargo() {
    const ref = useRef(null); // Form
    const [activeField, setActiveField] = useState(1); //для мобильных устройств

    let [data, setData] = useState([
        {
            fieldset: 'loading',
            name: 'frequency',
            value: '',
            required: true
        },
        {
            fieldset: 'loading',
            name: 'loading-date',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loading-days',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loading-periodicity',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loading-time-from',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loading-time-till',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loading-all-day',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loading-town',
            value: '',
            required: true
        },
        {
            fieldset: 'loading',
            name: 'loading-address',
            value: '',
            required: true
        },
        {
            fieldset: 'unloading',
            name: 'unloading-date-from',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloading-date-till',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloading-time-from',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloading-time-till',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloading-all-day',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloading-town',
            value: '',
            required: true
        },
        {
            fieldset: 'unloading',
            name: 'unloading-address',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'cargo-type',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'weight',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'capacity',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'length',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'width',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'height',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'package',
            value: '',
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'pcs',
            value: '',
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'notes',
            value: '',
            required: false
        },
        {
            fieldset: 'requirements',
            name: 'car-type',
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
            required: true
        },
        {
            fieldset: 'contacts',
            name: 'contact-phone-0',
            value: '',
            required: true
        },
        {
            fieldset: 'contacts',
            name: 'contact-name-0',
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

        if(e.target.type === 'checkbox'){
            if(e.target.checked === true) {
                setData(data.map(obj => {
                    if (obj.name === inputName) {
                       return {...obj, 'value': inputVal};
                    } else {
                       return obj;
                    }
                }));
            } else {
                setData(data.map(obj => {
                    if (obj.name === inputName) {
                       return {...obj, 'value': ''};
                    } else {
                       return obj;
                    }
                }));
            }
        } else {
            setData(data.map(obj => {
                if (obj.name === inputName) {
                   return {...obj, 'value': inputVal};
                } else {
                   return obj;
                }
            }));
        }

        
    };

    let clearInput = (item) => {
        console.log(document.getElementsByName(item));
        let arr = document.getElementsByName(item);
        arr.forEach(item => {
            if(item.type === 'text' || item.type === 'date' || item.type === 'number'){
                item.value = '';
                console.log(123);
            } else if(item.type === 'radio' || item.type === 'checkbox') {
                item.checked = false;
                console.log(4);
            }
        })
    };

    let toggleParams = (e) => {
        //нужно прикрутить очистку инпутов и селекта
        let inputVal = e.target.value.trim();
        let inputName = e.target.name;
        let addParams = e.target.dataset.add.split(' ');
        let delParams = e.target.dataset.del.split(' ');
        console.log('addParams: '+addParams);
        console.log('delParams: '+delParams);

        setData(
            data.map(obj => {
                if(obj.name === inputName){
                    return {...obj, 'value': inputVal};
                } else if (addParams.includes(obj.name)){
                    return {...obj, 'required': true};
                } else if (delParams.includes(obj.name)) {
                    delParams.map(item => {
                        clearInput(item);
                    });
                    return {...obj, 'required': false, 'value': ''};
                } else {
                    return obj; 
                }
            })
        )
    }
    // let changeFrequency = (e) => {
    //     let inputVal = e.target.value.trim();
    //     if(inputVal === 'Единожды') {
    //         setData(data.map(obj => {
    //             if(obj.name === 'frequency'){
    //                 return {...obj, 'value': inputVal};
    //             } else if (obj.name === 'loading-date' || obj.name === 'loading-days') {
    //                return {...obj, 'required': true};
    //             } else if(obj.name === 'loading-periodicity'){
    //                 return {...obj, 'required': false, 'value': ''};
    //             } else {
    //                return obj;
    //             }
    //         }));
    //     } else {
    //         setData(data.map(obj => {
    //             if(obj.name === 'frequency'){
    //                 return {...obj, 'value': inputVal};
    //             } else if (obj.name === 'loading-periodicity') {
    //                return {...obj, 'required': true};
    //             } else if(obj.name === 'loading-date' || obj.name === 'loading-days'){
    //                 return {...obj, 'required': false, 'value': ''};
    //             } else {
    //                return obj;
    //             }
    //         }));
    //     }
    // };

    const findInState = (name) => {
        let val = '';
        data.forEach(obj => {
            if (obj.name === name && obj.value !== '') {
                val = obj.value
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
        setData(data.filter(obj => obj.name !== 'contact-phone-'+i || obj.name !== 'contact-name-'+i));
    };

    let addContacts = () => {
        let newNum = Number(contacts)+1;

        let phone = {
            fieldset: 'contacts',
            name: 'contact-phone-'+ newNum,
            value: '',
            required: false
        };
        let userName = {
            fieldset: 'contacts',
            name: 'contact-name-'+ newNum,
            value: '',
            required: false
        };
        setData([...data, phone, userName]);
        
        setContacts([...contacts, newNum]);
    }

    return (
        <main className="bg-gray">
            <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
                <h1 className="dark-blue text-center text-uppercase">Добавление Груза</h1>
                <form ref={ref} className="row" onSubmit={(e) => onSubmit(e)} onReset={(e) => onReset(e)} noValidate>
                    <div className="col-lg-8">
                        <div className='mobile-indicators d-flex d-lg-none'>
                            <button type='button' className={(checkFieldset('loading')) ? 'active' : ''} onClick={() => setActiveField(1)}>1</button>
                            <button type='button' className={(checkFieldset('unloading')) ? 'active' : ''} onClick={() => setActiveField(2)}>2</button>
                            <button type='button' className={(checkFieldset('cargo')) ? 'active' : ''} onClick={() => setActiveField(3)}>3</button>
                            <button type='button' className={(checkFieldset('requirements')) ? 'active' : ''} onClick={() => setActiveField(4)}>4</button>
                            <button type='button' className={(checkFieldset('payment')) ? 'active' : ''} onClick={() => setActiveField(4)}>5</button>
                            <button type='button' className={(checkFieldset('contacts')) ? 'active' : ''} onClick={() => setActiveField(5)}>6</button>
                        </div>
                        
                        <fieldset name="loading" data-show={(activeField === 1) ? 'true' : 'false'}>
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
                                        <div data-label='frequency' data-warning='false' className="title-font fs-12 fw-5">Дата*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-7 mb-4 mb-lg-2 mb-xl-0">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input type="radio" name="frequency" onChange={(e)=> toggleParams(e)} value="Единожды" data-add="loading-date loading-days" data-del="loading-periodicity"/>
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
                                                        <label data-label='loading-date' data-warning='false' className='flex-1'>
                                                            <input type="date" name='loading-date' onChange={(e)=> fillDataList(e)}/>
                                                        </label>
                                                        <span className="mx-2 mx-xxl-3">+</span>
                                                        <label style={{maxWidth:'100px'}} data-label='days' data-warning='false'>
                                                            <CustomSelect className="inp" name="loading-days" onChange={(e)=> fillDataList(e)} options={['0 дн.', '1 дн.']}/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-5">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input type="radio" name="frequency" onChange={(e)=> toggleParams(e)} value="Постоянно" data-add="loading-periodicity" data-del="loading-date loading-days"/>
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Постоянно</span>
                                                    </label>
                                                    <div data-label='loading-periodicity' data-warning='false' className={
                                                        data.filter(obj => obj.name === "frequency").map(obj => {
                                                            if(obj.value === 'Постоянно'){
                                                                return ''
                                                            } else {
                                                                return 'disabled'
                                                            }
                                                        })
                                                    }>
                                                        <CustomSelect className="inp w-100 fs-12" name="loading-periodicity" onChange={(e)=> fillDataList(e)} options={['По рабочим дням', 'По выходным', 'Ежедневно', 'Через день']}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='loading-time-from loading-time-till' data-warning='false' className="title-font fs-12 fw-5">Время загрузки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="d-flex fs-12 align-items-center">
                                            <input type="time" name="loading-time-from" onChange={(e)=> fillDataList(e)}/>
                                            <span className="mx-3">—</span>
                                            <input type="time" name="loading-time-till" onChange={(e)=> fillDataList(e)}/>
                                        </div>
                                        <label className="mt-2">
                                            <input type="checkbox" name="loading-all-day" onChange={(e)=> fillDataList(e)} value="Круглосуточно"/>
                                            <span data-label='loading-all-day' data-warning='false' className="ms-2 fs-09">Круглосуточно</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row" data-label='loading-town' data-warning='false'>
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row fs-12">
                                            <div className="col-sm-5 mb-2 mb-sm-0">
                                                <input type="text" name="loading-town" onChange={(e)=> fillDataList(e)} placeholder="Населеный пункт"/>
                                            </div>
                                            <div className="col-sm-7" data-label='loading-address' data-warning='false'>
                                                <input type="text" name="loading-address" onChange={(e)=> fillDataList(e)} placeholder="Адрес"/>
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
                                    <button type='button' disabled={(checkFieldset('loading') ? false : true)} onClick={() => setActiveField(2)} className='btn btn-1 w-100 fs-11'>
                                        <span className='me-1 me-sm-3 text-uppercase'>Далее</span>
                                        <IconContext.Provider value={{className: "icon-15"}}>
                                            <IoChevronForwardOutline/>
                                        </IconContext.Provider>
                                    </button>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset name="unloading" data-show={(activeField === 2) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Разгрузка</h4>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='unloading-date-from unloading-date-till' data-warning='false' className="title-font fs-12 fw-5">Дата</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="d-flex fs-12 align-items-center">
                                            <input type="date" name="unloading-date-from" onChange={(e)=> fillDataList(e)}/>
                                            <span className="mx-3">—</span>
                                            <input type="date" name="unloading-date-till" onChange={(e)=> fillDataList(e)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='unloading-time-from unloading-time-till' data-warning='false' className="title-font fs-12 fw-5">Время разгрузки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="d-flex align-items-center fs-12">
                                            <input type="time" name="unloading-time-from" onChange={(e)=> fillDataList(e)}/>
                                            <span className="mx-3">—</span>
                                            <input type="time" name="unloading-time-till" onChange={(e)=> fillDataList(e)}/>
                                        </div>
                                        <label className="mt-2">
                                            <input type="checkbox" name="unloading-all-day" onChange={(e)=> fillDataList(e)} value="Круглосуточно"/>
                                            <span data-label='unloading-all-day' data-warning='false' className="ms-2 fs-09">Круглосуточно</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row" data-label='unloading-town' data-warning='false'>
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Место разгрузки*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row fs-12">
                                            <div className="col-sm-5 mb-2 mb-sm-0">
                                                <input type="text" name="unloading-town" onChange={(e)=> fillDataList(e)} placeholder="Населеный пункт"/>
                                            </div>
                                            <div className="col-sm-7" data-label='unloading-address' data-warning='false'>
                                                <input type="text" name="unloading-address" onChange={(e)=> fillDataList(e)} placeholder="Адрес"/>
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
                                            <button type='button' onClick={() => setActiveField(1)} className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' disabled={(checkFieldset('unloading') ? false : true)} onClick={() => setActiveField(3)} className='btn btn-1 w-100 fs-11'>
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

                        <fieldset name="cargo" data-show={(activeField === 3) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Груз</h4>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='cargo-type' data-warning='false' className="title-font fs-12 fw-5">Тип груза</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect className="inp w-100 fs-12" name="cargo-type" onChange={(e)=> fillDataList(e)} options={['тип 1', 'тип 2']}/>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-3">
                                        <div data-label='weight' data-warning='false' className="title-font fs-12 fw-5">Вес*</div>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input type="number" name="weight" min="1" placeholder='0' onChange={(e)=> fillDataList(e)} className="weight w-100 fs-12"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-3">
                                        <div data-label='capacity' data-warning='false' className="title-font fs-12 fw-5">Объем*</div>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input type="number" name="capacity" min="1" placeholder='0' onChange={(e)=> fillDataList(e)} className="size w-100 fs-12"/>
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
                                                        <label data-label='length' data-warning='false'>Длина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name="length" min="1" placeholder='0' onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-2 mb-sm-0'>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='width' data-warning='false'>Ширина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='width' min="1" placeholder='0' onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='height' data-warning='false'>Высота:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='height' min="1" placeholder='0' onChange={(e)=> fillDataList(e)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='package' data-warning='false' className="title-font fs-12 fw-5">Упаковка</div>
                                    </div>
                                    <div className="col-md-9 fs-12 d-flex align-items-center">
                                        <CustomSelect className="inp" name="package" onChange={(e)=> fillDataList(e)} options={['коробки', 'ящики']}/>
                                        <IconContext.Provider value={{className: "icon-10 mx-3"}}>
                                            <VscChromeClose />
                                        </IconContext.Provider>
                                        <input type="number" placeholder='0' min="0" name="pcs" onChange={(e)=> fillDataList(e)} className="pcs"/>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='notes' data-warning='false' className="title-font fs-12 fw-5">Особые пометки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect className="inp w-100 fs-12" name="notes" onChange={(e)=> fillDataList(e)} options={['Нет', 'Холод', 'Хрупкое', 'Габаритное']}/>
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
                                            <button type='button' onClick={() => setActiveField(2)} className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' disabled={(checkFieldset('cargo') ? false : true)} onClick={() => setActiveField(4)} className='btn btn-1 w-100 fs-11'>
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

                        <fieldset name="requirements" data-show={(activeField === 4) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Требования к машине</h4>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='car-type' data-warning='false' className="title-font fs-12 fw-5">Тип кузова</div>
                                    </div>
                                    <div className="col-md-9">
                                        <CustomSelect className="inp w-100 fs-12" name="car-type" onChange={(e)=> fillDataList(e)} options={['тип 1', 'тип 2', 'тип 3']}/>
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
                                            <button type='button' onClick={() => setActiveField(3)} className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' disabled={(checkFieldset('requirements') ? false : true)} onClick={() => setActiveField(5)} className='btn btn-1 w-100 fs-11'>
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

                        <fieldset name="payment" data-show={(activeField === 5) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Оплата</h4>
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
                                                <input type="number" min="1" name='price-vat' placeholder='0' onChange={(e)=> fillDataList(e)} className={
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
                                                <input type="number" min="1" name='price-novat' placeholder='0' onChange={(e)=> fillDataList(e)} className={
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
                                            <button type='button' onClick={() => setActiveField(4)} className='btn btn-1 w-100 fs-11'>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className='ms-1 ms-sm-3 text-uppercase'>Назад</span>
                                            </button>
                                        </div>
                                        <div>
                                            <button type='button' disabled={(checkFieldset('payment') ? false : true)} onClick={() => setActiveField(6)} className='btn btn-1 w-100 fs-11'>
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

                        <fieldset name="contacts" data-show={(activeField === 6) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Контакты</h4>
                            <div className="box">
                                <div className='row gx-2 gx-sm-4 mb-4 mb-md-0'>
                                    <div className='col-md-9'>
                                        <div className="row align-items-center gy-2 gy-md-3">
                                            <div className="col-md-4">
                                                <div data-label='contact-phone-0' data-warning='false' className="title-font fs-12 fw-5">Телефон*</div>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="tel" name='contact-phone-0' onChange={(e)=> fillDataList(e)} placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                            </div>
                                            <div className="col-md-4">
                                                <div data-label='contact-name-0' data-warning='false' className="title-font fs-12 fw-5">Имя*</div>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" name='contact-name-0' onChange={(e)=> fillDataList(e)} placeholder='Имя' className="w-100 fs-12"/>
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
                                                    <div data-label={'contact-phone-'+obj} data-warning='false' className="title-font fs-12 fw-5">Телефон</div>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="tel" name={'contact-phone-'+obj} onChange={(e)=> fillDataList(e)} placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                                </div>
                                                <div className="col-md-4">
                                                    <div data-label={'contact-name-'+obj} data-warning='false' className="title-font fs-12 fw-5">Имя</div>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" name={'contact-name-'+obj} onChange={(e)=> fillDataList(e)} placeholder='Имя' className="w-100 fs-12"/>
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
                                        <Link activeClass="active" to="loading" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('loading')?'filled':''}>Загрузка</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('frequency')) &&
                                                <span className='me-1'>{findInState('frequency')}:</span>
                                            }
                                            {
                                                (findInState('loading-date')) &&
                                                <span className='me-1'>{findInState('loading-date')}</span>
                                            }
                                            {
                                                (findInState('loading-days')) &&
                                                <span>+ {findInState('loading-days')}</span>
                                            }
                                            {
                                                (findInState('loading-periodicity')) &&
                                                <span>{findInState('loading-periodicity')}</span>
                                            }
                                            {
                                                (findInState('loading-time-till')) &&
                                                <span>, {findInState('loading-time-till')}</span>
                                            }
                                            {
                                                (findInState('loading-all-day')) &&
                                                <span>, {findInState('loading-all-day')}</span>
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {
                                                (findInState('loading-town')) &&
                                                <span className='me-1'>{findInState('loading-town')}</span>
                                            }
                                            {
                                                (findInState('loading-address')) &&
                                                <span>, {findInState('loading-address')}</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="unloading" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('unloading')?'filled':''}>Разгрузка</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('unloading-date-from')) &&
                                                <span className='me-1'>{findInState('unloading-date-from')}</span>
                                            }
                                            {
                                                (findInState('unloading-date-till')) &&
                                                <span className='me-1'>— {findInState('unloading-date-till')}</span>
                                            }
                                            {
                                                (findInState('unloading-time-from')) &&
                                                <span className='me-1'>, {findInState('unloading-time-from')}</span>
                                            }
                                            {
                                                (findInState('unloading-time-till')) &&
                                                <span>— {findInState('unloading-time-till')}</span>
                                            }
                                            {
                                                (findInState('unloading-all-day')) &&
                                                <span>, {findInState('unloading-all-day')}</span>
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {
                                                (findInState('unloading-town')) &&
                                                <span className='me-1'>{findInState('unloading-town')}</span>
                                            }
                                            {
                                                (findInState('unloading-address')) &&
                                                <span>, {findInState('unloading-address')}</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="cargo" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('cargo')?'filled':''}>Груз</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('cargo-type')) &&
                                                <span className='me-1'>{findInState('cargo-type')}</span>
                                            }
                                            {
                                                (findInState('package')) &&
                                                <span className='me-1'>, {findInState('package')}</span>
                                            }
                                            {
                                                (findInState('pcs')) &&
                                                <span>{findInState('pcs')} шт</span>
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {
                                                (findInState('weight')) &&
                                                <span className='me-1'>{findInState('weight')} т</span>
                                            }
                                            {
                                                (findInState('capacity')) &&
                                                <span className='me-1'>, {findInState('capacity')} м<sup>3</sup></span>
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
                                                <span className='me-1'>/ {findInState('height')} м</span>
                                            }
                                            {
                                                (findInState('height')) &&
                                                <span className='me-1'>, {findInState('notes')}</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="requirements" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset('requirements')?'filled':''}>Требования к машине</Link>
                                        <div className='fs-09'>
                                            {
                                                (findInState('car-type')) &&
                                                <span className='me-1'>{findInState('car-type')}</span>
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
                                                (findInState('payment-type')) &&
                                                <span className='me-1'>, {findInState('payment-type')}</span>
                                            }
                                            {
                                                (findInState('price-vat')) &&
                                                <span className='me-1'>, с&nbsp;НДС {findInState('price-vat')} {findInState('unit')}
                                                </span>
                                            }
                                            {
                                                (findInState('price-novat')) &&
                                                <span className='me-1'>, без&nbsp;НДС {findInState('price-novat')} {findInState('unit')}
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
                                                (findInState('contact-phone-0')) &&
                                                <span className='me-1'>{findInState('contact-phone-0')}</span>
                                            }
                                            {
                                                (findInState('contact-name-0')) &&
                                                <span>, {findInState('contact-name-0')}</span>
                                            }
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <button type='submit' className='btn btn-1 text-uppercase fs-15 mx-auto mt-4 mt-xl-5'>разместить груз</button>
                            <button type='button' data-bs-toggle="modal" data-bs-target="#savePattern" className='fs-11 mx-auto mt-2 mt-xl-3 blue'>Сохранить шаблон</button>
                        </aside>
                    </div>
                </form>
            </section>
        </main>
    )
}

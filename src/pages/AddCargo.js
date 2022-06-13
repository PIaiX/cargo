import React, {useState, useRef, useEffect} from 'react';
import { Link } from 'react-scroll';
import { IoAddCircle, IoCloseCircle, IoChevronBackOutline, IoChevronForwardOutline, IoNewspaperOutline } from 'react-icons/io5';
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";
import Select from 'react-select';
import { optionsLoading, optionsLoadingPeriodType, optionsPackageType, optionsCargoType, optionsDays, optionsNotes, optionsCarType, optionsTowns } from "../components/utilities/data";

export default function AddCargo() {
    const ref = useRef(null);
    const [activeField, setActiveField] = useState(1); //для мобильных устройств

    let [loading, setLoading] = useState(
        [
            {
                name: 'frequency',
                value: '',
                required: true
            },
            {
                name: 'loadingDate',
                value: '',
                required: false
            },
            {
                name: 'loadingDays',
                value: '',
                required: false
            },
            {
                name: 'loadingPeriodType',
                value: '',
                required: false
            },
            {
                name: 'loadingTimeFrom',
                value: '',
                required: false
            },
            {
                name: 'loadingTimeTo',
                value: '',
                required: false
            },
            {
                name: 'isLoadingAllDay',
                value: '',
                required: false
            },
            {
                name: 'loadingTown',
                value: optionsTowns[1].value,
                required: true
            },
            {
                name: 'loadingAddress',
                value: '',
                required: true
            },
            {
                name: 'transportationType',
                value: '',
                required: false
            },
            {
                name: 'loadingType',
                value: '',
                required: false
            }
        ]
    );
    let [unloading, setUnloading] = useState(
        [
            {
                name: 'unloadingDateFrom',
                value: '',
                required: false
            },
            {
                name: 'unloadingDateTo',
                value: '',
                required: false
            },
            {
                name: 'unloadingTimeFrom',
                value: '',
                required: false
            },
            {
                name: 'unloadingTimeTo',
                value: '',
                required: false
            },
            {
                name: 'isUnloadingAllDay',
                value: '',
                required: false
            },
            {
                name: 'unloadingTown',
                value: '',
                required: true
            },
            {
                name: 'unloadingAddress',
                value: '',
                required: true
            },
            {
                name: 'unloadingType',
                value: '',
                required: true
            }
        ]
    );
    let [cargo, setCargo] = useState(
        [
            {
                name: 'cargoType',
                value: '',
                required: true
            },
            {
                name: 'weight',
                value: '',
                required: true
            },
            {
                name: 'capacity',
                value: '',
                required: true
            },
            {
                name: 'length',
                value: '',
                required: true
            },
            {
                name: 'width',
                value: '',
                required: true
            },
            {
                name: 'height',
                value: '',
                required: true
            },
            {
                name: 'packageType',
                value: '',
                required: false
            },
            {
                name: 'packageCount',
                value: '',
                required: false
            },
            {
                name: 'notes',
                value: '',
                required: false
            },
            {
                name: 'ADR1',
                value: true,
                required: false
            },
            {
                name: 'ADR2',
                value: false,
                required: false
            },
            {
                name: 'ADR3',
                value: false,
                required: false
            },
            {
                name: 'ADR4',
                value: false,
                required: false
            },
            {
                name: 'ADR5',
                value: false,
                required: false
            },
            {
                name: 'ADR6',
                value: false,
                required: false
            },
            {
                name: 'ADR7',
                value: false,
                required: false
            },
            {
                name: 'ADR8',
                value: false,
                required: false
            },
            {
                name: 'ADR9',
                value: false,
                required: false
            },
            {
                name: 'TIR',
                value: false,
                required: false
            },
            {
                name: 'EKMT',
                value: false,
                required: false
            }
        ]
    );
    let [requirements, setRequirements] = useState(
        [
            {
                name: 'carType',
                value: optionsCarType[3].value,
                required: false
            },
            {
                name: 'tempFrom',
                value: '',
                required: false
            },
            {
                name: 'tempTo',
                value: '',
                required: false
            }
        ]
    );
    let [payment, setPayment] = useState(
        [
            {
                name: 'bargain',
                value: '',
                required: false
            },
            {
                name: 'paymentType',
                value: '',
                required: false
            },
            {
                name: 'cash',
                value: '',
                required: false
            },
            {
                name: 'priceVat',
                value: '',
                required: false
            },
            {
                name: 'priceNovat',
                value: '',
                required: false
            },
            {
                name: 'prepay',
                value: '',
                required: true
            }
        ]
    );
    let [contacts, setContacts] = useState([
        {
            phone: '',
            name: '',
        }
    ]);
    let [contactsField, setContactsField] = useState(
        [
            {
                name: 'contactsData',
                value: contacts,
                required: true
            },
            {
                name: 'remark',
                value: '',
                required: false
            }
        ]
    );
    

    let [total, setTotal] = useState([
        {
            fieldname: 'loading',
            value: loading,
        },
        {
            fieldname: 'unloading',
            value: unloading,
        },
        {
            fieldname: 'cargo',
            value: cargo,
        },
        {
            fieldname: 'requirements',
            value: requirements,
        },
        {
            fieldname: 'payment',
            value: payment,
        },
        {
            fieldname: 'contacts',
            value: contactsField,
        }
    ]);

    let [data, setData] = useState([
        {
            fieldset: 'loading',
            name: 'frequency',
            value: '',
            required: true
        },
        {
            fieldset: 'loading',
            name: 'loadingDate',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loadingDays',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loadingPeriodType',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loadingTimeFrom',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loadingTimeTo',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'isLoadingAllDay',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loadingTown',
            value: optionsTowns[1],
            required: true
        },
        {
            fieldset: 'loading',
            name: 'loadingAddress',
            value: '',
            required: true
        },
        {
            fieldset: 'loading',
            name: 'transportationType',
            value: '',
            required: false
        },
        {
            fieldset: 'loading',
            name: 'loadingType',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloadingDateFrom',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloadingDateTo',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloadingTimeFrom',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloadingTimeTo',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'isUnloadingAllDay',
            value: '',
            required: false
        },
        {
            fieldset: 'unloading',
            name: 'unloadingTown',
            value: '',
            required: true
        },
        {
            fieldset: 'unloading',
            name: 'unloadingAddress',
            value: '',
            required: true
        },
        {
            fieldset: 'unloading',
            name: 'unloadingType',
            value: '',
            required: true
        },
        {
            fieldset: 'cargo',
            name: 'cargoType',
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
            name: 'packageType',
            value: '',
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'packageCount',
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
            fieldset: 'cargo',
            name: 'ADR1',
            value: true,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR2',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR3',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR4',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR5',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR6',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR7',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR8',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'ADR9',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'TIR',
            value: false,
            required: false
        },
        {
            fieldset: 'cargo',
            name: 'EKMT',
            value: false,
            required: false
        },
        {
            fieldset: 'requirements',
            name: 'carType',
            value: '',
            required: false
        },
        {
            fieldset: 'requirements',
            name: 'tempFrom',
            value: '',
            required: false
        },
        {
            fieldset: 'requirements',
            name: 'tempTo',
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
            name: 'cash',
            value: '',
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

    

    //запись в data значений селектов (React-Select)
    let handleRSelect = (e, name, func, list) => {
        func(list.map(obj => {
            if (obj.name === name) {
               return {...obj, 'value': e.value};
            } else {
               return obj;
            }
        }));
    };
    //main input changes handler
    let fillData = (e, func, list) => {
        let inputName = e.target.name;
        let inputVal = e.target.value.trim();
        let clearState = e.target.dataset.clear;
        
        if(e.target.type === 'checkbox'){
            console.log(e.target.value);
            if(e.target.checked == true) {
                if (clearState!==null && clearState!==undefined && clearState!==''){
                    
                    let clearStateArr = clearState.split(' ');
                    
                    clearStateArr.forEach(item => clearInput(item));

                    func(list.map(obj => {
                        if (obj.name === inputName) {
                           return {...obj, 'value': true};//write the value of the checkbox to the State
                        } else if(clearStateArr.includes(obj.name)) {
                            return {...obj, 'value': ''};//delete values of inputs from State
                        } else {
                           return obj; //skip the rest
                        }
                    }));
                } else {
                    func(list.map(obj => {
                        if (obj.name === inputName) {
                           return {...obj, 'value': true};
                        } else {
                           return obj;
                        }
                    }));
                }
            } else {
                func(list.map(obj => {
                    if (obj.name === inputName) {
                       return {...obj, 'value': false};
                    } else {
                       return obj;
                    }
                }));
            }
        } else {
            func(list.map(obj => {
                if (obj.name === inputName) {
                   return {...obj, 'value': inputVal};
                } else {
                   return obj;
                }
            }));
        }
    };
    //очищение значений инпутов
    let clearInput = (item) => {
        let input = document.querySelector('[name="'+item+'"]'); //clear input's value by name
        if(input.type === 'radio' || input.type === 'checkbox'){
            input.checked = false;
        } else {
            input.value = '';
        }
    };
    //переключение обязательных для заполнения полей через radiobutton
    let toggleParams = (e, func, list) => {
        //нужно прикрутить очистку инпутов и селекта
        let inputVal = e.target.value;
        let inputName = e.target.name;
        let addParams = e.target.dataset.add.split(' ');
        let delParams = e.target.dataset.del.split(' ');

        func(
            list.map(obj => {
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
    //проверка fieldset на заполнение
    let checkFieldset = (state) => {
        let newArr = state.filter(item => item.required === true);
        let result = newArr.every(elem => elem.value!==null && elem.value!==undefined && elem.value!=='');
        return result;
    };
    //очищение data при событии reset - ПРОВЕРИТЬ (не очищать стейт у радиокнопок и чекбоксов)
    const onReset = e => {
        setLoading(loading.map(obj => {
            return {...obj, 'value': ''};
        }));
        setUnloading(unloading.map(obj => {
            return {...obj, 'value': ''};
        }));
        setCargo(cargo.map(obj => {
            return {...obj, 'value': ''};
        }));
        setRequirements(requirements.map(obj => {
            return {...obj, 'value': ''};
        }));
        setPayment(payment.map(obj => {
            return {...obj, 'value': ''};
        }));
        setContactsField(contactsField.map(obj => {
            return {...obj, 'value': ''};
        }));
    };


    /* DELETE */
    //поиск значения полей в data 
    const findInState = (name) => {
        let val = '';
        data.forEach(obj => {
            if (obj.name === name && obj.value !== '') {
                val = obj.value
            } 
        })
        return val;
    };

    /* На изменение */
    //финальная проверка на заполнение и отправка формы
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

    
    //удаление полей контактов и их стирание из data - ДОПИЛИТЬ
    let deleteContacts = (i) => {
        setContacts(contacts.filter(obj => obj !== i));
        setData(data.filter(obj => obj.name !== 'contactPhone'+i || obj.name !== 'contactName'+i));
    };

    //добавление полей контактов и их запись в data - ДОПИЛИТЬ
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
    }

    //поиск значения полей в массиве
    const getObj = (opt, state, param) => {
        if(opt.find(obj=>obj.value==state.find(obj => obj.name == param).value)){
            return opt.find(obj=>obj.value==state.find(obj => obj.name == param).value);
        } else { return '';}
    }
    const getObjLabel = (opt, state, param) => {
        if(opt.find(obj=>obj.value==state.find(obj => obj.name == param).value)){
            return opt.find(obj=>obj.value==state.find(obj => obj.name == param).value).label;
        } else { return '';}
    }
    const getVal = (state, param) => {
        let val = state.find(obj => obj.name == param).value;
        if(val!==null && val!==undefined && val!==''){
            return state.find(obj => obj.name == param).value;
        } else { return '';}
    }


    return (
        <main className="bg-gray">
            <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
                <Link to="/" className='fs-12 fw-5 d-block mb-3 mb-sm-5'><span className='green fs-15 me-2'>⟵</span> Назад</Link>
                <h1 className="dark-blue text-center text-uppercase">Добавление Груза</h1>
                <form ref={ref} name='myForm' id='myForm' className="row" onSubmit={(e) => onSubmit(e)} onReset={(e) => onReset(e)} noValidate>
                    <div className="col-lg-8">
                        <div className='mobile-indicators d-flex d-lg-none'>
                            <button type='button' className={(checkFieldset(loading)) ? 'active' : ''} onClick={() => setActiveField(1)}>1</button>
                            <button type='button' className={(checkFieldset(unloading)) ? 'active' : ''} onClick={() => setActiveField(2)}>2</button>
                            <button type='button' className={(checkFieldset(cargo)) ? 'active' : ''} onClick={() => setActiveField(3)}>3</button>
                            <button type='button' className={(checkFieldset(requirements)) ? 'active' : ''} onClick={() => setActiveField(4)}>4</button>
                            <button type='button' className={(checkFieldset(payment)) ? 'active' : ''} onClick={() => setActiveField(4)}>5</button>
                            <button type='button' className={(checkFieldset(contactsField)) ? 'active' : ''} onClick={() => setActiveField(5)}>6</button>
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
                                                        <input type="radio" name="frequency" onChange={(e)=> toggleParams(e, setLoading, loading)} value={0} checked={getVal(loading, "frequency") == '0'} data-add="loadingDate loadingDays" data-del="loadingPeriodType"/>
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Груз готов</span>
                                                    </label>
                                                    <div className={(loading.find(obj => obj.name === "frequency").value === '0') ? 'd-flex fs-12 align-items-center' : 'd-flex fs-12 align-items-center disabled'}>
                                                        <label data-label='loadingDate' data-warning='false' className='flex-1 min-150'>
                                                            <input type="date" name='loadingDate' value={getVal(loading, 'loadingDate')} onChange={(e)=> fillData(e, setLoading, loading)}/>
                                                        </label>
                                                        <span className="mx-2 mx-xxl-3">+</span>
                                                        <label style={{maxWidth:'100px'}} data-label='loadingDays' data-warning='false'>
                                                            <Select className="w-100" classNamePrefix="react-select" placeholder={'Выберите...'} value={getObj(optionsDays, loading, 'loadingDays')} onChange={(e) => handleRSelect(e, 'loadingDays', setLoading, loading)} options={optionsDays} name="loadingDays" isSearchable={true}/>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-5">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input type="radio" name="frequency" onChange={(e)=> toggleParams(e, setLoading, loading)} value={1} checked={getVal(loading, "frequency") == '1'} data-add="loadingPeriodType" data-del="loadingDate loadingDays"/>
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Постоянно</span>
                                                    </label>
                                                    <div data-label='loadingPeriodType' data-warning='false' className={(loading.find(obj => obj.name === "frequency").value == '1') ? '' : 'disabled'}>
                                                        <Select className="fs-12" classNamePrefix="react-select" placeholder={'Выберите...'} options={optionsLoadingPeriodType} name="loadingPeriodType" isSearchable={true} value={getObj(optionsLoadingPeriodType, loading, 'loadingPeriodType')} onChange={(e) => handleRSelect(e, 'loadingPeriodType', setLoading, loading)}/>
                                                    </div>
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
                                        <div className={(loading.find(obj => obj.name === "isLoadingAllDay").value) ? 'd-flex fs-12 align-items-center disabled' : 'd-flex fs-12 align-items-center'}>
                                            <label className='flex-1' data-label='loadingTimeFrom' data-warning='false'>
                                                <input type="time" value={getVal(loading, 'loadingTimeFrom')} name="loadingTimeFrom" onChange={(e)=> fillData(e, setLoading, loading)}/>
                                            </label>
                                            <span className="mx-3">—</span>
                                            <label className='flex-1' data-label='loadingTimeTo' data-warning='false'>
                                                <input type="time" value={getVal(loading, 'loadingTimeTo')} name="loadingTimeTo" onChange={(e)=> fillData(e, setLoading, loading)}/>
                                            </label>
                                        </div>
                                        <label className="mt-2">
                                            <input type="checkbox" value={getVal(loading, 'isLoadingAllDay')} name="isLoadingAllDay" checked={getVal(loading, "isLoadingAllDay")} onChange={(e)=> fillData(e, setLoading, loading)} data-clear="loadingTimeFrom loadingTimeTo"/>
                                            <span data-label='isLoadingAllDay' data-warning='false' className="ms-2 fs-09">Круглосуточно</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row mb-4" data-label='loadingTown' data-warning='false'>
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Место загрузки*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row fs-12">
                                            <div className="col-sm-5 mb-2 mb-sm-0">
                                                <Select classNamePrefix="react-select" placeholder={'Выберите...'} name="loadingTown" value={getObj(optionsTowns, loading, 'loadingTown')} onChange={(e) => handleRSelect(e, 'loadingTown', setLoading, loading)} options={optionsTowns} isSearchable={true}/>
                                            </div>
                                            <div className="col-sm-7" data-label='loadingAddress' data-warning='false'>
                                                <input type="text" name="loadingAddress" value={getVal(loading, 'loadingAddress')} onChange={(e)=> fillData(e, setLoading, loading)} placeholder="Адрес"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='transportationType' data-warning='false' className="title-font fs-12 fw-5">Тип перевозки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <label className="mb-2 mb-xl-3">
                                            <input type="radio" name="transportationType" value="FTL" checked={getVal(loading, "transportationType") === 'FTL'} onChange={(e)=> fillData(e, setLoading, loading)}/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">отдельной машиной (FTL)</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="transportationType" value="FTL/LTL" checked={getVal(loading, "transportationType") === 'FTL/LTL'} onChange={(e)=> fillData(e, setLoading, loading)}/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">отдельной машиной или догрузом (FTL или LTL)</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='loadingType' data-warning='false' className="title-font fs-12 fw-5">Тип загрузки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <Select className="fs-12" classNamePrefix="react-select" placeholder={'Выберите...'} name="loadingType" value={getObj(optionsLoading, loading, 'loadingType')} onChange={(e) => handleRSelect(e, 'loadingType', setLoading, loading)} options={optionsLoading}  isSearchable={true}/>
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
                                    <button type='button' disabled={(checkFieldset(loading) ? false : true)} onClick={() => setActiveField(2)} className='btn btn-1 w-100 fs-11'>
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
                                        <div data-label='unloadingDateFrom unloadingDateTo' data-warning='false' className="title-font fs-12 fw-5">Дата</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="d-flex fs-12 align-items-center">
                                            <input type="date" name="unloadingDateFrom" value={getVal(unloading, 'unloadingDateFrom')} onChange={(e)=> fillData(e, setUnloading, unloading)}/>
                                            <span className="mx-3">—</span>
                                            <input type="date" name="unloadingDateTo" value={getVal(unloading, 'unloadingDateTo')} onChange={(e)=> fillData(e, setUnloading, unloading)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Время разгрузки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className={(unloading.find(obj => obj.name === "isUnloadingAllDay").value) ? 'd-flex fs-12 align-items-center disabled' : 'd-flex fs-12 align-items-center'}>
                                            <label className='flex-1' data-label='unloadingTimeFrom' data-warning='false'>
                                                <input type="time" name="unloadingTimeFrom" value={getVal(unloading, 'unloadingTimeFrom')} onChange={(e)=> fillData(e, setUnloading, unloading)}/>
                                            </label>
                                            <span className="mx-3">—</span>
                                            <label className='flex-1' data-label='unloadingTimeTo' data-warning='false'>
                                                <input type="time" name="unloadingTimeTo" value={getVal(unloading, 'unloadingTimeTo')} onChange={(e)=> fillData(e, setUnloading, unloading)}/>
                                            </label>
                                        </div>
                                        <label className="mt-2">
                                            <input type="checkbox" name="isUnloadingAllDay" value={getVal(unloading, 'isUnloadingAllDay')} checked={getVal(unloading, "isUnloadingAllDay")} onChange={(e)=> fillData(e, setUnloading, unloading)} data-clear="unloadingTimeFrom unloadingTimeTo"/>
                                            <span data-label='isUnloadingAllDay' data-warning='false' className="ms-2 fs-09">Круглосуточно</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row mb-4" data-label='unloadingTown' data-warning='false'>
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Место разгрузки*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row fs-12">
                                            <div className="col-sm-5 mb-2 mb-sm-0">
                                                <Select classNamePrefix="react-select" placeholder={'Выберите...'} name="unloadingTown" value={getObj(optionsTowns, unloading, 'unloadingTown')} onChange={(e) => handleRSelect(e, 'unloadingTown', setUnloading, unloading)} options={optionsTowns} isSearchable={true}/>
                                            </div>
                                            <div className="col-sm-7" data-label='unloadingAddress' data-warning='false'>
                                                <input type="text" name="unloadingAddress" value={getVal(unloading, 'unloadingAddress')} onChange={(e)=> fillData(e, setUnloading, unloading)} placeholder="Адрес"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='unloadingType' data-warning='false' className="title-font fs-12 fw-5">Тип разгрузки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <Select className="fs-12" classNamePrefix="react-select" placeholder={'Выберите...'} name="unloadingType" value={getObj(optionsLoading, unloading, 'unloadingType')} onChange={(e) => handleRSelect(e, 'unloadingType', setUnloading, unloading)} options={optionsLoading} isSearchable={true}/>
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
                                            <button type='button' disabled={(checkFieldset(unloading) ? false : true)} onClick={() => setActiveField(3)} className='btn btn-1 w-100 fs-11'>
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
                                <div className="row align-items-center fs-12 mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='cargoType' data-warning='false' className="title-font fw-5">Название груза</div>
                                    </div>
                                    <div className="col-md-9">
                                        <Select className='w-100' classNamePrefix="react-select" placeholder={'Выберите...'} name="cargoType" value={getObj(optionsCargoType, cargo, 'cargoType')} onChange={(e) => handleRSelect(e, 'cargoType', setCargo, cargo)} options={optionsCargoType} isSearchable={true}/>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-3">
                                        <div data-label='weight' data-warning='false' className="title-font fs-12 fw-5">Вес*</div>
                                    </div>
                                    <div className="col-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input className="weight w-100 fs-12" type="number" name="weight" min="1" placeholder='0' value={getVal(cargo, 'weight')} onChange={(e)=> fillData(e, setCargo, cargo)}/>
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
                                                <input className="size w-100 fs-12" type="number" name="capacity" min="1" placeholder='0' value={getVal(cargo, 'capacity')} onChange={(e)=> fillData(e, setCargo, cargo)}/>
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
                                                        <input type="number" name="length" min="1" placeholder='0' value={getVal(cargo, 'length')} onChange={(e)=> fillData(e, setCargo, cargo)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-2 mb-sm-0'>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='width' data-warning='false'>Ширина:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='width' min="1" placeholder='0' value={getVal(cargo, 'width')} onChange={(e)=> fillData(e, setCargo, cargo)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='row gx-2 align-items-center'>
                                                    <div className='col-3 col-sm-5'>
                                                        <label data-label='height' data-warning='false'>Высота:</label>
                                                    </div>
                                                    <div className='col-9 col-sm-7'>
                                                        <input type="number" name='height' min="1" placeholder='0' value={getVal(cargo, 'height')} onChange={(e)=> fillData(e, setCargo, cargo)} className="length"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='packageType' data-warning='false' className="title-font fs-12 fw-5">Упаковка</div>
                                    </div>
                                    <div className="col-md-9 fs-12 d-flex align-items-center">
                                        <Select classNamePrefix="react-select" name="packageType" placeholder={'Выберите...'} value={getObj(optionsPackageType, cargo, 'packageType')} onChange={(e) => handleRSelect(e, 'packageType', setCargo, cargo)} options={optionsPackageType} isSearchable={true}/>
                                        <IconContext.Provider value={{className: "icon-10 mx-3"}}>
                                            <VscChromeClose />
                                        </IconContext.Provider>
                                        <input type="number" placeholder='0' min="0" name="packageCount" value={getVal(cargo, 'packageCount')} onChange={(e)=> fillData(e, setCargo, cargo)} className="packageCount pcs"/>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='notes' data-warning='false' className="title-font fs-12 fw-5">Особые пометки</div>
                                    </div>
                                    <div className="col-md-9">
                                        <Select className="w-100 fs-12" classNamePrefix="react-select" name="notes" placeholder={'Выберите...'} value={getObj(optionsNotes, cargo, 'notes')} onChange={(e) => handleRSelect(e, 'notes', setCargo, cargo)} options={optionsNotes} isSearchable={true}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div data-label='permissions' data-warning='false' className="title-font fs-12 fw-5">Разрешения</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className='mb-2'>опасные грузы, ADR:</div>
                                        <div className='row row-cols-3 g-3 mb-4'>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR1" value={getVal(cargo, 'ADR1')} checked={getVal(cargo, "ADR1")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR1</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR2" value={getVal(cargo, 'ADR2')} checked={getVal(cargo, "ADR2")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR2</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR3" value={getVal(cargo, 'ADR3')} checked={getVal(cargo, "ADR3")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR3</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR4" value={getVal(cargo, 'ADR4')} checked={getVal(cargo, "ADR4")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR4</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR5" value={getVal(cargo, 'ADR5')} checked={getVal(cargo, "ADR5")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR5</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR6" value={getVal(cargo, 'ADR6')} checked={getVal(cargo, "ADR6")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR6</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR7" value={getVal(cargo, 'ADR7')} checked={getVal(cargo, "ADR7")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR7</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR8" value={getVal(cargo, 'ADR8')} checked={getVal(cargo, "ADR8")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR8</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="ADR9" value={getVal(cargo, 'ADR9')} checked={getVal(cargo, "ADR9")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">ADR9</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className='row row-cols-2 g-3'>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="TIR" value={getVal(cargo, 'TIR')} checked={getVal(cargo, "TIR")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">TIR</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <input type="checkbox" name="EKMT" value={getVal(cargo, 'EKMT')} checked={getVal(cargo, "EKMT")} onChange={(e)=> fillData(e, setCargo, cargo)}/>
                                                    <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">EKMT</span>
                                                </label>
                                            </div>
                                        </div>
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
                                            <button type='button' disabled={(checkFieldset(cargo) ? false : true)} onClick={() => setActiveField(4)} className='btn btn-1 w-100 fs-11'>
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
                                        <div data-label='carType' data-warning='false' className="title-font fs-12 fw-5">Тип кузова</div>
                                    </div>
                                    <div className="col-md-9">
                                        <Select className="fs-12 w-100" classNamePrefix="react-select" placeholder={'Выберите...'} name="carType" value={getObj(optionsCarType, requirements, 'carType')} onChange={(e) => handleRSelect(e, 'carType', setRequirements, requirements)} options={optionsCarType} isSearchable={true}/>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Температура</div>
                                    </div>
                                    <div className="col-md-9 fs-12 d-flex align-items-center">
                                        <label data-label='tempFrom' data-warning='false'>
                                            <input type="number" name="tempFrom" placeholder="0" className="temp" value={getVal(requirements, 'tempFrom')} onChange={(e)=> fillData(e, setRequirements, requirements)}/>
                                        </label>
                                        <span className="mx-3">—</span>
                                        <label data-label='tempTo' data-warning='false'>
                                            <input type="number" name="tempTo" placeholder="0" className="temp" value={getVal(requirements, 'tempTo')} onChange={(e)=> fillData(e, setRequirements, requirements)}/>
                                        </label>
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
                                            <button type='button' disabled={(checkFieldset(requirements) ? false : true)} onClick={() => setActiveField(5)} className='btn btn-1 w-100 fs-11'>
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
                                            <input type="radio" name="bargain" value={0} checked={getVal(payment, "bargain") == '0'} onChange={(e)=> fillData(e, setPayment, payment)}/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Возможен торг</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name="bargain" value={1} checked={getVal(payment, "bargain") == '1'} onChange={(e)=> fillData(e, setPayment, payment)}/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Без торга</span>
                                        </label>
                                    </div>
                                </div>
                                <div data-label='paymentType' data-warning='false' className='row row-cols-sm-2 row-cols-xxl-3 mb-4'>
                                    <div className='mb-2 mb-sm-0'>
                                        <label>
                                            <input type="radio" name="paymentType" value={0} checked={getVal(payment, "paymentType") == '0'} onChange={(e)=> fillData(e, setPayment, payment)}/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Наличный расчет</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name="paymentType" value={1} checked={getVal(payment, "paymentType") == '1'} onChange={(e)=> fillData(e, setPayment, payment)}/>
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Перевод по карте</span>
                                        </label>
                                    </div>
                                </div>
                                {
                                    (getVal(payment, 'paymentType') == '0') &&
                                    <div className="row align-items-center mb-4">
                                        <div className="col-sm-3 mb-2 mb-sm-0">
                                            <div data-label='cash' data-warning='false' className="title-font fs-12 fw-5">Наличными</div>
                                        </div>
                                        <div className="col-sm-9">
                                            <div className='row gx-2 gx-sm-4'>
                                                <div className='col-8 col-sm-5 col-xl-4'>
                                                    <input type="number" min="1" name='cash' placeholder='0' value={getVal(payment, 'cash')} onChange={(e)=> fillData(e, setPayment, payment)} className='price-per-km w-100 fs-12'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div data-label='priceVat' data-warning='false' className="title-font fs-12 fw-5">С НДС</div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className='row gx-2 gx-sm-4'>
                                            <div className='col-8 col-sm-5 col-xl-4'>
                                                <input type="number" min="1" name='priceVat' placeholder='0' value={getVal(payment, 'priceVat')} onChange={(e)=> fillData(e, setPayment, payment)} className='price-per-km w-100 fs-12'/>
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
                                                <input type="number" min="1" name='priceNovat' placeholder='0' value={getVal(payment, 'priceNovat')} onChange={(e)=> fillData(e, setPayment, payment)} className='price-per-km w-100 fs-12'/>
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
                                                <input type="number" min="0" max="100" name="prepay" placeholder='0' value={getVal(payment, 'prepay')} onChange={(e)=> fillData(e, setPayment, payment)} className="percent w-100 fs-12"/>
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
                                            <button type='button' disabled={(checkFieldset(payment) ? false : true)} onClick={() => setActiveField(6)} className='btn btn-1 w-100 fs-11'>
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

                        <fieldset name="contactsField" data-show={(activeField === 6) ? 'true' : 'false'}>
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">Контакты</h4>
                            <div className="box">
                                <div className='row gx-2 gx-sm-4 mb-4 mb-md-0'>
                                    <div className='col-md-9'>
                                        <div className="row align-items-center gy-2 gy-md-3">
                                            <div className="col-md-4">
                                                <div data-label='phone' data-warning='false' className="title-font fs-12 fw-5">Телефон*</div>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="tel" name='phone' onChange={(e)=> fillData(e, setContacts, contacts)} placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                            </div>
                                            <div className="col-md-4">
                                                <div data-label='name' data-warning='false' className="title-font fs-12 fw-5">Имя*</div>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" name='name' onChange={(e)=> fillData(e, setContacts, contacts)} placeholder='Имя' className="w-100 fs-12"/>
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
                                                    <input type="tel" name={'contactPhone'+obj} onChange={(e)=> fillData(e)} placeholder='+ 7 (962) 458 65 79' className="w-100 fs-12"/>
                                                </div>
                                                <div className="col-md-4">
                                                    <div data-label={'contactName'+obj} data-warning='false' className="title-font fs-12 fw-5">Имя</div>
                                                </div>
                                                <div className="col-md-8">
                                                    <input type="text" name={'contactName'+obj} onChange={(e)=> fillData(e)} placeholder='Имя' className="w-100 fs-12"/>
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
                                        <textarea rows={3} name='remark' placeholder='Укажите здесь дополнительную информацию' value={getVal(contactsField, 'remark')} onChange={(e)=> fillData(e, setContactsField, contactsField)}></textarea>
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
                                        <Link activeClass="active" to="loading" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset(loading)?'filled':''}>Загрузка</Link>
                                        <div className='fs-09'>
                                            {/* {
                                                (loading.find(obj=>obj.name==='frequency').value) &&
                                                <span className='me-1'>{(loading.find(obj=>obj.name==='frequency').value == 0) ? 'Груз готов' : 'Постоянно'}:</span>
                                            } */}
                                            {
                                                (getVal(loading, 'frequency')) &&
                                                <span className='me-1'>{(getVal(loading, 'frequency').value == 0) ? 'Груз готов' : 'Постоянно'}:</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingDate').value) &&
                                                <span className='me-1'>{loading.find(obj=>obj.name==='loadingDate').value}</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingDate')) &&
                                                <span className='me-1'>{getVal(loading, 'loadingDate')}</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingDays').value) &&
                                                <span className='me-1'>+ {loading.find(obj=>obj.name==='loadingDays').value} дня</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingDays')) &&
                                                <span className='me-1'>+ {getVal(loading, 'loadingDays')} дня</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingPeriodType').value) &&
                                                <span>{getObjLabel(optionsLoadingPeriodType, loading, 'loadingPeriodType')}</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingPeriodType')) &&
                                                <span className='me-1'>{getObjLabel(optionsLoadingPeriodType, loading, 'loadingPeriodType')}</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingTimeFrom').value) &&
                                                <span className='me-1'>, {loading.find(obj=>obj.name==='loadingTimeFrom').value}</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingTimeFrom')) &&
                                                <span className='me-1'>, {getVal(loading, 'loadingTimeFrom')}</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingTimeTo').value) &&
                                                <span className='me-1'>– {loading.find(obj=>obj.name==='loadingTimeTo').value}</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingTimeTo')) &&
                                                <span className='me-1'>– {getVal(loading, 'loadingTimeTo')}</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='isLoadingAllDay').value) &&
                                                <span className='me-1'>, Круглосуточно</span>
                                            } */}
                                            {
                                                (getVal(loading, 'isLoadingAllDay')) &&
                                                <span className='me-1'>, Круглосуточно</span>
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingTown').value) &&
                                                <span className='me-1'>{getObjLabel(optionsTowns, loading, 'loadingTown')}</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingTown')) &&
                                                <span className='me-1'>{getObjLabel(optionsTowns, loading, 'loadingTown')}</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingAddress').value) &&
                                                <span className='me-1'>, {loading.find(obj=>obj.name==='loadingAddress').value}</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingAddress')) &&
                                                <span className='me-1'>, {getVal(loading, 'loadingAddress')}</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='transportationType').value) &&
                                                <span className='me-1'>, {loading.find(obj=>obj.name==='transportationType').value}</span> 
                                            } */}
                                            {
                                                (getVal(loading, 'transportationType')) &&
                                                <span className='me-1'>, {getVal(loading, 'transportationType')}</span>
                                            }
                                            {/* {
                                                (loading.find(obj=>obj.name==='loadingType').value) &&
                                                <span>, {getObjLabel(optionsLoading, loading, 'loadingType')}</span>
                                            } */}
                                            {
                                                (getVal(loading, 'loadingType')) &&
                                                <span className='me-1'>, {getObjLabel(optionsLoading, loading, 'loadingType')}</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="unloading" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset(unloading)?'filled':''}>Разгрузка</Link>
                                        <div className='fs-09'>
                                            {
                                                (getVal(unloading, 'unloadingDateFrom')) &&
                                                <span className='me-1'>{getVal(unloading, 'unloadingDateFrom')}</span>
                                            }
                                            {
                                                (getVal(unloading, 'unloadingDateTo')) &&
                                                <span className='me-1'>— {getVal(unloading, 'unloadingDateTo')}</span>
                                            }
                                            {
                                                (getVal(unloading, 'unloadingTimeFrom')) &&
                                                <span className='me-1'>, {getVal(unloading, 'unloadingTimeFrom')}</span>
                                            }
                                            {
                                                (getVal(unloading, 'unloadingTimeTo')) &&
                                                <span className='me-1'>— {getVal(unloading, 'unloadingTimeTo')}</span>
                                            }
                                            {
                                                (getVal(unloading, 'isUnloadingAllDay')) &&
                                                <span className='me-1'>, Круглосуточно</span>
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {
                                                (getVal(unloading, 'unloadingTown')) &&
                                                <span className='me-1'>{getObjLabel(optionsTowns, unloading, 'unloadingTown')}</span>
                                            }
                                            {
                                                (getVal(unloading, 'unloadingAddress')) &&
                                                <span className='me-1'>, {getVal(unloading, 'unloadingAddress')}</span>
                                            }
                                            {
                                                (getVal(unloading, 'unloadingType')) &&
                                                <span className='me-1'>, {getObjLabel(optionsLoading, unloading, 'unloadingType')}</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="cargo" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset(cargo)?'filled':''}>Груз</Link>
                                        <div className='fs-09'>
                                            {
                                                (getVal(cargo, 'cargoType')) &&
                                                <span className='me-1'>{getObjLabel(optionsCargoType, cargo, 'cargoType')}</span>
                                            }
                                            {
                                                (getVal(cargo, 'packageType')) &&
                                                <span className='me-1'>, {getObjLabel(optionsPackageType, cargo, 'packageType')}</span>
                                            }
                                            {
                                                (getVal(cargo, 'packageCount')) &&
                                                <span className='me-1'>{getVal(cargo, 'packageCount')} шт</span>
                                            }
                                            {
                                                (getVal(cargo, 'weight')) &&
                                                <span className='me-1'>, {getVal(cargo, 'weight')} т</span>
                                            }
                                            {
                                                (getVal(cargo, 'capacity')) &&
                                                <span className='me-1'>, {getVal(cargo, 'capacity')} м<sup>3</sup></span>
                                            }
                                        </div>
                                        <div className='fs-09'>
                                            {
                                                (getVal(cargo, 'length')) &&
                                                <span className='me-1'>{getVal(cargo, 'length')}</span>
                                            }
                                            {
                                                (getVal(cargo, 'width')) &&
                                                <span className='me-1'>/ {getVal(cargo, 'width')}</span>
                                            }
                                            {
                                                (getVal(cargo, 'height')) &&
                                                <span className='me-1'>/ {getVal(cargo, 'height')}</span>
                                            }
                                            {
                                                (getVal(cargo, 'notes')) &&
                                                <span className='me-1'>, {getObjLabel(optionsNotes, cargo, 'notes')}</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR1')) &&
                                                <span className='me-1'>, ADR1</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR2')) &&
                                                <span className='me-1'>, ADR2</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR3')) &&
                                                <span className='me-1'>, ADR3</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR4')) &&
                                                <span className='me-1'>, ADR4</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR5')) &&
                                                <span className='me-1'>, ADR5</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR6')) &&
                                                <span className='me-1'>, ADR6</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR7')) &&
                                                <span className='me-1'>, ADR7</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR8')) &&
                                                <span className='me-1'>, ADR8</span>
                                            }
                                            {
                                                (getVal(cargo, 'ADR9')) &&
                                                <span className='me-1'>, ADR9</span>
                                            }
                                            {
                                                (getVal(cargo, 'TIR')) &&
                                                <span className='me-1'>, TIR</span>
                                            }
                                            {
                                                (getVal(cargo, 'EKMT')) &&
                                                <span className='me-1'>, EKMT</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="requirements" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset(requirements)?'filled':''}>Требования к машине</Link>
                                        <div className='fs-09'>
                                            {
                                                (getVal(requirements, 'carType')) &&
                                                <span className='me-1'>{getObjLabel(optionsCarType, requirements, 'carType')}</span>
                                            }
                                            {
                                                (getVal(requirements, 'tempFrom')) &&
                                                <span className='me-1'>, {getVal(requirements, 'tempFrom')}</span>
                                            }
                                            {
                                                (getVal(requirements, 'tempTo')) &&
                                                <span className='me-1'>- {getVal(requirements, 'tempTo')}°C</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="payment" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset(payment)?'filled':''}>Оплата</Link>
                                        <div className='fs-09'>
                                            {
                                                (getVal(payment, 'bargain')) &&
                                                <span className='me-1'>{(getVal(payment, 'bargain') == 0) ? 'Возможен торг' : 'Без торга'}</span>
                                            }
                                            {
                                                (getVal(payment, 'paymentType')) &&
                                                <span className='me-1'>, {(getVal(payment, 'paymentType') == 0) ? 'Наличный расчет' : 'Перевод по карте'}</span>
                                            }
                                            {
                                                (getVal(payment, 'cash')) &&
                                                <span className='me-1'>, наличными&nbsp;{getVal(payment, 'cash')}&nbsp;р/км</span>
                                            }
                                            {
                                                (getVal(payment, 'priceVat')) &&
                                                <span className='me-1'>, с&nbsp;НДС {getVal(payment, 'priceVat')}&nbsp;р/км</span>
                                            }
                                            {
                                                (getVal(payment, 'priceNovat')) &&
                                                <span className='me-1'>, без&nbsp;НДС {getVal(payment, 'priceNovat')}&nbsp;р/км</span>
                                            }
                                            {
                                                (getVal(payment, 'prepay')) &&
                                                <span className='me-1'>, предоплата&nbsp;{getVal(payment, 'prepay')}%</span>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link activeClass="active" to="contacts" spy={true} smooth={true} hashSpy={true} offset={-80} duration={300} isDynamic={true} className={checkFieldset(contactsField)?'filled':''}>Контакты</Link>
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
                            <button type='submit' className='btn btn-1 text-uppercase fs-15 mx-auto mt-4 mt-xl-5'>разместить груз</button>
                            <button type='button' data-bs-toggle="modal" data-bs-target="#savePattern" className='fs-11 mx-auto mt-2 mt-xl-3 blue'>Сохранить шаблон</button>
                        </aside>
                    </div>
                </form>
            </section>
        </main>
    )
}

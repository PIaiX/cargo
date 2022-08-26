import React, {useEffect, useState} from "react";
import {Link} from "react-scroll";
import {IoChevronBackOutline, IoChevronForwardOutline, IoNewspaperOutline, IoTrash,} from "react-icons/io5";
import {VscChromeClose} from "react-icons/vsc";
import {IconContext} from "react-icons";
import {optionsLoadingDays, optionsLoadingPeriodType,} from "../components/utilities/data";
import {useSelector} from "react-redux";
import useAxiosPrivate from "../hooks/axiosPrivate";
import {createRoute, deleteTemplate, getTemplates, saveTemplateRoute} from "../API/route";
import {onInputHandler, onRadioHandler} from "../helpers/collectForms";
import {NavLink, useNavigate} from "react-router-dom";
import CustomModal from "../components/utilities/CustomModal";
import AsyncSelect from "react-select/async";
import {Alert} from "react-bootstrap";
import {getCars} from '../API/car';
import {getCities} from "../API/cities";
import SearchInput from "../components/utilities/SearchInput";


export default function AddRoute() {

    const navigate = useNavigate()
    const [activeField, setActiveField] = useState(1); //для мобильных устройств
    const axiosPrivate = useAxiosPrivate()
    const currentUser = useSelector(state => state.currentUser.data.user)
    const [contactsInfo, setContactsInfo] = useState(
        {
            phone: '',
            firstName: '',
        }
    )
    const [contactsArray, setContactsArray] = useState([]);
    const [showModalSave, setShowModalSave] = useState(false)
    const [btnRadioDate, setBtnRadioDate] = useState(0)
    const [btnRadioBargain, setBtnRadioBargain] = useState(0)
    const [btnRadioCalculate, setBtnRadioCalculate] = useState(0)
    const [data, setData] = useState(
        {
            userId: currentUser.id,
            bargainType: 0,
            calculateType: 0,
            contacts: [contactsInfo],
            dateType: 0,
        }
    );

    const [citys, setCitys] = useState([])

    const fields = {
        isInValidFromRoute: false,
        isInValidToRoute: false,
        isInValidDateType: false,
        isInValidCar: false,
        isInValidPrepayment: false,
        isInValidPhone: false,
        isInValidFirstName: false,
        isInValidNameTemplate: false,
        isInValidForSave: false
    }

    const [valid, setValid] = useState(fields);

    const isInValidFromRoute = data?.fromRoute === undefined || data?.fromRoute?.length < 2 || data?.fromRoute?.length > 50;
    const isInValidToRoute = data?.toRoute === undefined || data?.toRoute?.length < 2 || data?.toRoute?.length > 50;
    const isInValidDateType = data?.dateType === undefined;
    const isInValidCar = data?.carId === undefined;
    const isInValidPrepayment = data?.prepayment === undefined || data?.prepayment > 100 || data?.prepayment < 0;
    const isInValidPhone =
        (data?.contacts?.map(i => i.phone)[0].replace(/\s/g, '').length > 12)
        || !(data?.contacts?.map(i => i.phone)[0].replace(/\s/g, '').includes('+7'))
        || (data?.contacts?.map(i => i.phone)[0].replace(/\s/g, '').length <= 11)
    const isInValidFirstName = (data?.contacts?.map(i => i.firstName)[0].replace(/\s/g, '').length > 50) || (data?.contacts?.map(i => i.firstName)[0].replace(/\s/g, '').length < 2)


    const onSubmit = (e) => {
        e.preventDefault()

        if (isInValidFromRoute) {
            setValid({...valid, isInValidFromRoute: true})
        } else if (isInValidToRoute) {
            setValid({...valid, isInValidToRoute: true})
        } else if (isInValidDateType) {
            setValid({...valid, isInValidDateType: true})
        } else if (isInValidCar) {
            setValid({...valid, isInValidCar: true})
        } else if (isInValidPrepayment) {
            setValid({...valid, isInValidPrepayment: true})
        } else if (isInValidPhone) {
            setValid({...valid, isInValidPhone: true})
        } else if (isInValidFirstName) {
            setValid({...valid, isInValidFirstName: true})
        } else {
            try {
                if (data?.dateType === 1) {
                    delete data?.date
                    delete data?.dateDays
                } else {
                    delete data?.datePeriodType
                }
                const response = createRoute(data, axiosPrivate)
                    .then(() => {
                        navigate('/personal-account/user-routes')
                    })
                    .catch(() => {
                        setShowModalValidation(true)
                        setIsShowAlert(true)
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const resetFieldVal = (newState, field) => {
        setValid({...valid, [field]: false})
    }

    const onReset = () => {
        setData({
            userId: currentUser?.id,
            dateType: 0,
            bargainType: 0,
            calculateType: 0,
        })
        setContactsArray([]);
    };

    let deleteContacts = (i) => {
        setContactsArray(contactsArray.filter((obj) => obj !== i));
    };

    const [cars, setCars] = useState([])

    useEffect(() => {
        getCars(axiosPrivate, currentUser?.id, 1)
            .then(res => setCars(res?.data?.map(i => ({value: i.id, label: i.name}))))
            .catch(error => console.log(error))
    }, [currentUser])

    const getDate = (dateMe) => {
        const newDate = new Date(dateMe)
        const re = newDate.toLocaleDateString()
        setData(prevState => ({
            ...prevState,
            'date': re
        }))
        return re
    }

    const findCar = (carId) => {
        const find = cars?.find(i => i.value === carId)
        return <span>{find?.label}</span>
    }

    useEffect(() => {
        setData(prevState => ({...prevState, contacts: [contactsInfo]}))
    }, [contactsInfo])

    const addContacts = () => {
        setContactsArray(prevState => ([...prevState, contactsInfo]))
    }

    const [dataTemplate, setDataTemplate] = useState({})

    const saveTemplate = () => {

        const isInValidNameTemplate = dataTemplate?.templateName === undefined || dataTemplate?.templateName?.length < 2 || dataTemplate?.templateName?.length > 50

        if (isInValidNameTemplate) {
            setValid({...valid, isInValidNameTemplate: true})
        } else if (isInValidFromRoute) {
            setValid({...valid, isInValidFromRoute: true})
            setShowModalSave(false)
        } else if (isInValidToRoute) {
            setValid({...valid, isInValidToRoute: true})
            setShowModalSave(false)
        } else if (isInValidDateType) {
            setValid({...valid, isInValidDateType: true})
            setShowModalSave(false)
        } else if (isInValidCar) {
            setValid({...valid, isInValidCar: true})
            setShowModalSave(false)
        } else if (isInValidPrepayment) {
            setValid({...valid, isInValidPrepayment: true})
            setShowModalSave(false)
        } else if (isInValidPhone) {
            setValid({...valid, isInValidPhone: true})
            setShowModalSave(false)
        } else if (isInValidFirstName) {
            setValid({...valid, isInValidFirstName: true})
            setShowModalSave(false)
        } else {
            try {
                if (data?.dateType === 1) {
                    delete data?.date
                    delete data?.dateDays
                } else {
                    delete data?.datePeriodType
                }
                saveTemplateRoute(data, dataTemplate, axiosPrivate)
                    .then(() => {
                        setIsShowAlert(true)
                        setAlertForSavePattern(true)
                        getTemplates(axiosPrivate, currentUser.id, 1)
                            .then(r => setTemplates(r.data?.body?.data))
                            .catch(error => console.log(error))
                    })
                    .catch(() => {
                        setAlertForSavePattern(false)
                        setIsShowAlert(true)
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    const [templates, setTemplates] = useState([])

    useEffect(() => {
        getTemplates(axiosPrivate, currentUser?.id, 1)
            .then(r => setTemplates(r.data?.body?.data))
            .catch(error => console.log(error))
    }, [currentUser])

    const [showUseTemplate, setShowUseTemplate] = useState(false)

    const onDeleteTemplate = async (id) => {
        await deleteTemplate(id, axiosPrivate)
        await getTemplates(axiosPrivate, currentUser?.id, 1)
            .then(r => setTemplates(r.data?.body?.data))
            .catch(error => console.log(error))
    }

    const [selectCar, setSelectCar] = useState(null)

    useEffect(() => {
        setSelectCar({value: data?.carId, label: data?.carName})
    }, [data])

    const loadOptions = async (searchKey) => {
        const defaultValue = data?.carId
        setSelectCar(cars?.find(item => item.value === defaultValue))

        if (!searchKey) {
            return await cars;
        } else {
            return await cars?.filter(item => item.label.includes(searchKey));
        }
    }

    const [selectPeriodType, setSelectPeriodType] = useState(null)

    useEffect(() => {
        setSelectPeriodType({
            value: data?.datePeriodType,
            label: data?.datePeriodTypeForUser
        })
    }, [data?.datePeriodType, data?.datePeriodTypeForUser])

    const loadOptions2 = async (searchKey) => {

        const defaultValue = data?.datePeriodType
        setSelectPeriodType(optionsLoadingPeriodType?.find(item => item.value === defaultValue))

        if (!searchKey) {
            return await optionsLoadingPeriodType;
        } else {
            return await optionsLoadingPeriodType?.filter(item => item.label.includes(searchKey));
        }
    }

    const [selectDays, setSelectDays] = useState(null)

    useEffect(() => {
        setSelectDays({
            value: data?.dateDays,
            label: `${data?.dateDays} дн.`
        })
    }, [data])

    const loadOptions3 = async (searchKey) => {

        const defaultValue = data?.dateDays
        setSelectDays(optionsLoadingDays?.find(item => item.value === defaultValue))

        if (!searchKey) {
            return await optionsLoadingDays;
        } else {
            return await optionsLoadingDays?.filter(item => item.label.includes(searchKey));
        }
    }

    const [isShowAlert, setIsShowAlert] = useState(false)
    const [alertForSavePattern, setAlertForSavePattern] = useState(false)

    useEffect(() => {
        if (isShowAlert) {
            setTimeout(() => setIsShowAlert(false), 1500)
        }
    }, [isShowAlert])

    const currentDate = () => {
        return new Date().toISOString().slice(0, 10)
    }

    useEffect(() => {
        (data?.date === 'Invalid Date') && delete data?.date
    }, [data?.date])

    useEffect(() => {
        getDate(data?.dateForInput)
    }, [data?.dateForInput])

    const [showModalValidation, setShowModalValidation] = useState(false)

    useEffect(() => {
        getCities().then(res => setCitys(res.body))
    }, [])

    return (
        <main className="bg-gray">
            <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
                <NavLink
                    to='/personal-account/user-routes'
                    className="fs-12 fw-5 d-block mb-3 mb-sm-5"
                >
                    <span className="green fs-15 me-2">⟵</span> Назад
                </NavLink>
                <h1 className="dark-blue text-center text-uppercase">
                    Добавление Маршрута
                </h1>
                <form
                    className="row"
                    onSubmit={onSubmit}
                    onReset={(e) => onReset(e)}
                    noValidate
                >
                    <div className="col-lg-8">
                        <div className="mobile-indicators d-flex d-lg-none">
                            <button
                                type="button"
                                style={{background: (data?.toRoute && data?.fromRoute) && '#01BFC4'}}
                                onClick={() => setActiveField(1)}
                            >
                                1
                            </button>
                            <button
                                type="button"
                                style={{background: (data?.date || data?.datePeriodType) && '#01BFC4'}}
                                onClick={() => setActiveField(2)}
                            >
                                2
                            </button>
                            <button
                                type="button"
                                style={{background: (data?.carId) && '#01BFC4'}}
                                onClick={() => setActiveField(3)}
                            >
                                3
                            </button>
                            <button
                                type="button"
                                style={{background: (data?.prepayment) && '#01BFC4'}}
                                onClick={() => setActiveField(4)}
                            >
                                4
                            </button>
                            <button
                                type="button"
                                style={{background: (data?.contacts?.find(i => i.phone && i.firstName)) && '#01BFC4'}}
                                onClick={() => setActiveField(5)}
                            >
                                5
                            </button>
                        </div>

                        <fieldset
                            name="route"
                            data-show={activeField === 1 ? "true" : "false"}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center justify-content-lg-between mb-4 mb-lg-3">
                                <h4 className="text-center text-lg-start mb-0">Маршрут</h4>
                                <div className="d-none d-lg-flex align-items-center fs-09">
                                    <button
                                        type="button"
                                        onClick={() => setShowUseTemplate(true)}
                                        className="btn btn-4 p-2"
                                    >
                                        <IconContext.Provider value={{className: "icon-15"}}>
                                            <IoNewspaperOutline/>
                                        </IconContext.Provider>
                                        <span className="ms-2">Использовать шаблон</span>
                                    </button>
                                    <button
                                        type="reset"
                                        className="btn btn-4 p-2 ms-3"
                                        onClick={() => onReset()}
                                    >
                                        <IconContext.Provider value={{className: "icon-15"}}>
                                            <VscChromeClose/>
                                        </IconContext.Provider>
                                        <span className="ms-2">Очистить форму</span>
                                    </button>
                                </div>
                            </div>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label
                                            data-label="loading"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                            style={{color: valid.isInValidFromRoute && 'red'}}
                                        >
                                            Откуда*
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <SearchInput
                                                    data={citys}
                                                    placeHolder={'Населенный пункт'}
                                                    value={data?.fromRoute}
                                                    callback={(value, e) => {
                                                        setData(prevState => ({...prevState, fromRoute: value}))
                                                        resetFieldVal(e, 'isInValidFromRoute')
                                                    }}
                                                />
                                                {valid.isInValidFromRoute &&
                                                    <span className='position-absolute' style={{color: 'red'}}>Поле обязательно для заполнения</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label
                                            data-label="loadingRadius"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                        >
                                            Радиус загрузки
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-sm-6 col-xl-3">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={data?.loadingRadius || ''}
                                                    onChange={e => onInputHandler(e, setData)}
                                                    name="loadingRadius"
                                                    placeholder="1"
                                                    className="w-100 fs-12 distance"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label
                                            data-label="unloading"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                            style={{color: valid.isInValidToRoute && 'red'}}
                                        >
                                            Куда*
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <SearchInput
                                                    data={citys}
                                                    placeHolder={'Населенный пункт'}
                                                    value={data?.toRoute}
                                                    callback={(value, e) => {
                                                        setData(prevState => ({...prevState, toRoute: value}))
                                                        resetFieldVal(e, 'isInValidToRoute')
                                                    }}
                                                />
                                                {valid.isInValidToRoute &&
                                                    <span className='position-absolute' style={{color: 'red'}}>Поле обязательно для заполнения</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <label
                                            data-label="unloadingRadius"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                        >
                                            Радиус разгрузки
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-sm-6 col-xl-3">
                                                <input
                                                    type="number"
                                                    name="unloadingRadius"
                                                    min='1'
                                                    value={data?.unloadingRadius || ''}
                                                    onChange={e => onInputHandler(e, setData)}
                                                    placeholder="1"
                                                    className="w-100 fs-12 distance"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-btns d-block d-lg-none">
                                <div className="container">
                                    <div
                                        className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                                        <button
                                            type="button"
                                            onClick={() => setShowUseTemplate(true)}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Использовать шаблон</span>
                                        </button>
                                        <button
                                            type="reset"
                                            onClick={() => onReset()}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Очистить форму</span>
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        /*disabled={!checkFieldset("route")}*/
                                        onClick={() => setActiveField(2)}
                                        className="btn btn-1 w-100 fs-11"
                                    >
                                        <span className="me-1 me-sm-3 text-uppercase">Далее</span>
                                        <IconContext.Provider value={{className: "icon-15"}}>
                                            <IoChevronForwardOutline/>
                                        </IconContext.Provider>
                                    </button>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset
                            name="date"
                            className="mt-lg-5"
                            data-show={activeField === 2 ? "true" : "false"}
                        >
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">Дата</h4>
                            <div className="box">
                                <div className="row">
                                    <div className="col-md-2 mb-3 mb-md-0">
                                        <div
                                            data-label="frequency"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                            style={{color: valid.isInValidDateType && 'red'}}
                                        >
                                            Дата*
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-xl-7 mb-4 mb-lg-2 mb-xl-0">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input
                                                            type="radio"
                                                            name="dateType"
                                                            checked={btnRadioDate === 0}
                                                            value={0}
                                                            onChange={e => {
                                                                onRadioHandler(e, setData, true)
                                                                resetFieldVal(e, 'isInValidDateType')
                                                            }}
                                                            onClick={e => setBtnRadioDate(Number(e.target.value))}
                                                        />
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                    Единожды
                    </span>
                                                    </label>
                                                    <div
                                                        className={
                                                            `d-flex align-items-center
                                                            ${data.dateType !== 1
                                                                ? ''
                                                                : "disabled"
                                                            }`
                                                        }
                                                    >
                                                        <label
                                                            data-label="date"
                                                            data-warning="false"
                                                            className="flex-1"
                                                        >
                                                            <input
                                                                type="date"
                                                                name="date"
                                                                style={{height: 38 + 'px'}}
                                                                min={currentDate()}
                                                                defaultValue={data?.dateForInput}
                                                                onChange={e => {
                                                                    getDate(e.target.value)
                                                                }}
                                                            />
                                                        </label>
                                                        <span className="mx-2 mx-xxl-3">+</span>
                                                        <label
                                                            style={{maxWidth: "100px"}}
                                                            data-label="dateDays"
                                                            data-warning="false"
                                                        >
                                                            <AsyncSelect
                                                                className="w-100"
                                                                classNamePrefix="react-select"
                                                                placeholder={"Выберите..."}
                                                                loadOptions={loadOptions3}
                                                                defaultOptions={optionsLoadingDays}
                                                                value={selectDays && optionsLoadingDays?.find(item => item.value === selectDays.value)}
                                                                onChange={val => {
                                                                    setSelectDays({value: val.value, label: val.label})
                                                                    setData(prevState => ({
                                                                        ...prevState,
                                                                        dateDays: val.value
                                                                    }))
                                                                }}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xl-5">
                                                <div className="box p-lg-3">
                                                    <label className="mb-2 mb-xl-3">
                                                        <input
                                                            type="radio"
                                                            name="dateType"
                                                            checked={btnRadioDate === 1}
                                                            value={1}
                                                            onChange={e => {
                                                                onRadioHandler(e, setData, true)
                                                                resetFieldVal(e, 'isInValidDateType')
                                                            }}
                                                            onClick={e => setBtnRadioDate(Number(e.target.value))}
                                                        />
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                                                            Постоянно
                                                        </span>
                                                    </label>
                                                    <div
                                                        data-warning="false"
                                                        className={`${data.dateType !== 0 ? '' : 'disabled'} `}
                                                    >
                                                        <AsyncSelect
                                                            className="w-100"
                                                            classNamePrefix="react-select"
                                                            placeholder={"Выберите..."}
                                                            loadOptions={loadOptions2}
                                                            defaultOptions={optionsLoadingPeriodType}
                                                            value={selectPeriodType && optionsLoadingPeriodType?.find(item => item.value === selectPeriodType.value)}
                                                            onChange={val => {
                                                                setSelectPeriodType({
                                                                    value: val.value,
                                                                    label: val.label
                                                                })
                                                                setData(prevState => ({
                                                                    ...prevState,
                                                                    datePeriodType: val.value
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-btns d-block d-lg-none">
                                <div className="container">
                                    <div
                                        className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                                        <button
                                            type="button"
                                            onClick={() => setShowUseTemplate(true)}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Использовать шаблон</span>
                                        </button>
                                        <button
                                            type="reset"
                                            onClick={() => onReset()}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Очистить форму</span>
                                        </button>
                                    </div>
                                    <div className="row row-cols-2 gx-2 gx-sm-4 title-font">
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setActiveField(1)}
                                                className="btn btn-1 w-100 fs-11"
                                            >
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className="ms-1 ms-sm-3 text-uppercase">
                    Назад
                    </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                /*disabled={checkFieldset("date") ? false : true}*/
                                                onClick={() => setActiveField(3)}
                                                className="btn btn-1 w-100 fs-11"
                                            >
                    <span className="me-1 me-sm-3 text-uppercase">
                    Далее
                    </span>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronForwardOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset
                            name="aboutCar"
                            data-show={activeField === 3 ? "true" : "false"}
                        >
                            <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">
                                Машина
                            </h4>
                            <div className="box">
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div
                                            data-label="carName"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                            style={{color: valid.isInValidCar && 'red'}}
                                        >
                                            Выбор машины*
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <AsyncSelect
                                            className="fs-12 w-100"
                                            classNamePrefix="react-select"
                                            placeholder={"Выберите..."}
                                            loadOptions={loadOptions}
                                            defaultOptions={cars}
                                            value={selectCar && cars?.find(item => item.value === selectCar.value)}
                                            onChange={(val, e) => {
                                                setSelectCar({value: val.value, label: val.label})
                                                setData(prevState => ({...prevState, carId: val.value}))
                                                resetFieldVal(e, 'isInValidCar')
                                            }}
                                        />
                                        {
                                            valid.isInValidCar &&
                                            <span
                                                className='position-absolute'
                                                style={{color: valid.isInValidCar && 'red'}}
                                            >
                    Выберите машину
                    </span>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-btns d-block d-lg-none">
                                <div className="container">
                                    <div
                                        className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                                        <button
                                            type="button"
                                            onClick={() => setShowUseTemplate(true)}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Использовать шаблон</span>
                                        </button>
                                        <button
                                            type="reset"
                                            onClick={() => onReset()}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Очистить форму</span>
                                        </button>
                                    </div>
                                    <div className="row row-cols-2 gx-2 gx-sm-4 title-font">
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setActiveField(2)}
                                                className="btn btn-1 w-100 fs-11"
                                            >
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className="ms-1 ms-sm-3 text-uppercase">
                    Назад
                    </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                /*disabled={checkFieldset("aboutCar") ? false : true}*/
                                                onClick={() => setActiveField(4)}
                                                className="btn btn-1 w-100 fs-11"
                                            >
                    <span className="me-1 me-sm-3 text-uppercase">
                    Далее
                    </span>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronForwardOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset
                            name="payment"
                            className="mt-lg-5"
                            data-show={activeField === 4 ? "true" : "false"}
                        >
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">Оплата</h4>
                            <div className="box">
                                <div
                                    data-label="bargain"
                                    data-warning="false"
                                    className="row row-cols-sm-2 row-cols-xxl-3 mb-3"
                                >
                                    <div className="mb-2 mb-sm-0">
                                        <label>
                                            <input
                                                type="radio"
                                                name="bargainType"
                                                checked={btnRadioBargain === 0}
                                                onClick={e => setBtnRadioBargain(Number(e.target.value))}
                                                value={0}
                                                onChange={e => onRadioHandler(e, setData, true)}
                                            />
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                    Возможен торг
                    </span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="bargainType"
                                                checked={btnRadioBargain === 1}
                                                onClick={e => setBtnRadioBargain(Number(e.target.value))}
                                                onChange={e => onRadioHandler(e, setData, true)}
                                                value={1}
                                            />
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                    Без торга
                    </span>
                                        </label>
                                    </div>
                                </div>
                                <div
                                    data-label="paymentType"
                                    data-warning="false"
                                    className="row row-cols-sm-2 row-cols-xxl-3 mb-4"
                                >
                                    <div className="mb-2 mb-sm-0">
                                        <label>
                                            <input
                                                type="radio"
                                                checked={btnRadioCalculate === 0}
                                                onClick={e => setBtnRadioCalculate(Number(e.target.value))}
                                                name="calculateType"
                                                onChange={e => onRadioHandler(e, setData, true)}
                                                value={0}
                                            />
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                    Наличный расчет
                    </span>
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="calculateType"
                                                checked={btnRadioCalculate === 1}
                                                onClick={e => setBtnRadioCalculate(Number(e.target.value))}
                                                onChange={e => onRadioHandler(e, setData, true)}
                                                value={1}
                                            />
                                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                    Перевод по карте
                    </span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div
                                            data-label="priceVat"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                        >
                                            С НДС
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row gx-2 gx-sm-4">
                                            <div className="col-8 col-sm-5 col-xl-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={data?.vatPrice || ''}
                                                    name="vatPrice"
                                                    placeholder="0"
                                                    onChange={e => onInputHandler(e, setData)}
                                                    className="price-per-km w-100 fs-12"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div
                                            data-label="priceNovat"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                        >
                                            без НДС
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-8 col-sm-5 col-xl-4">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={data?.noVatPrice || ''}
                                                    name="noVatPrice"
                                                    placeholder="0"
                                                    onChange={e => onInputHandler(e, setData)}
                                                    className="price-per-km w-100 fs-12"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div
                                            data-label="prepay"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                        >
                                            Предоплата*
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-8 col-sm-5 col-xl-4">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={data?.prepayment || ''}
                                                    style={{borderColor: valid.isInValidPrepayment && 'red'}}
                                                    name="prepayment"
                                                    placeholder="0"
                                                    onChange={e => {
                                                        onInputHandler(e, setData)
                                                        resetFieldVal(e, 'isInValidPrepayment')
                                                    }}
                                                    className="percent w-100 fs-12"
                                                />
                                                {valid.isInValidPrepayment && <span className='position-absolute'
                                                                                    style={{color: valid.isInValidPrepayment && 'red'}}>Поле обязательно для заполнения</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-btns d-block d-lg-none">
                                <div className="container">
                                    <div
                                        className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                                        <button
                                            type="button"
                                            onClick={() => setShowUseTemplate(true)}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Использовать шаблон</span>
                                        </button>
                                        <button
                                            type="reset"
                                            onClick={() => onReset()}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Очистить форму</span>
                                        </button>
                                    </div>
                                    <div className="row row-cols-2 gx-2 gx-sm-4 title-font">
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => setActiveField(3)}
                                                className="btn btn-1 w-100 fs-11"
                                            >
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className="ms-1 ms-sm-3 text-uppercase">
                    Назад
                    </span>
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                /*disabled={checkFieldset("payment") ? false : true}*/
                                                onClick={() => setActiveField(5)}
                                                className="btn btn-1 w-100 fs-11"
                                            >
                    <span className="me-1 me-sm-3 text-uppercase">
                    Далее
                    </span>
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronForwardOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset
                            name="contacts"
                            className="mt-lg-5"
                            data-show={activeField === 5 ? "true" : "false"}
                        >
                            <h4 className="text-center text-lg-start mb-4 mb-lg-3">
                                Контакты
                            </h4>
                            <div className="box">
                                <div className="row mt-3">
                                    <div className="col-md-9">
                                        <div className="row align-items-center gy-2 gy-md-3">
                                            <div className="col-md-4">
                                                <div
                                                    data-label={"contactPhone"}
                                                    data-warning="false"
                                                    className="title-font fs-12 fw-5"
                                                >
                                                    Телефон*
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <input
                                                    type="tel"
                                                    name='phone'
                                                    value={data?.contacts?.map(i => i.phone) || ''}
                                                    onChange={e => {
                                                        setContactsInfo(prevState => ({
                                                            ...prevState,
                                                            phone: e.target.value
                                                        }))
                                                        resetFieldVal(e, 'isInValidPhone')
                                                    }}
                                                    style={{borderColor: valid.isInValidPhone && 'red'}}
                                                    placeholder="+ 79624586579"
                                                    className="w-100 fs-12"
                                                />
                                                {valid.isInValidPhone && <span className='position-absolute'
                                                                               style={{color: valid.isInValidPhone && 'red'}}>Поле пустое или введены неверные данные</span>}
                                            </div>
                                            <div className="col-md-4">
                                                <div
                                                    data-label={`contactName`}
                                                    data-warning="false"
                                                    className="title-font fs-12 fw-5"
                                                >
                                                    Имя*
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <input
                                                    type="text"
                                                    name='firstName'
                                                    value={data?.contacts?.map(i => i.firstName) || ''}
                                                    onChange={e => {
                                                        setContactsInfo(prevState => ({
                                                            ...prevState,
                                                            firstName: e.target.value
                                                        }))
                                                        resetFieldVal(e, 'isInValidFirstName')
                                                    }}
                                                    style={{borderColor: valid.isInValidFirstName && 'red'}}
                                                    placeholder="Имя"
                                                    className="w-100 fs-12"
                                                />
                                                {valid.isInValidFirstName && <span className='position-absolute'
                                                                                   style={{color: valid.isInValidFirstName && 'red'}}>Поле пустое или введены неверные данные</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-3 mb-2 mb-md-0">
                                        <div
                                            data-label="note"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                        >
                                            Примечание
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                    <textarea
                        rows={3}
                        name="note"
                        value={data?.note || ''}
                        onChange={e => onInputHandler(e, setData)}
                        placeholder="Укажите здесь дополнительную информацию или дополнительные контакты"
                    />
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-btns d-block d-lg-none">
                                <div className="container">
                                    <div
                                        className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                                        <button
                                            type="button"
                                            onClick={() => setShowUseTemplate(true)}
                                        >
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <IoNewspaperOutline/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Использовать шаблон</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="fs-11 mx-auto mt-2 mt-xl-3 blue"
                                            onClick={() => setShowModalSave(true)}
                                        >
                                            Сохранить шаблон
                                        </button>

                                    </div>
                                    <div className="row gx-2 gx-sm-4 title-font">
                                        <div className="col-5 col-sm-6">
                                            <button
                                                type="button"
                                                onClick={() => setActiveField(4)}
                                                className="btn btn-1 px-3 w-100 fs-11"
                                            >
                                                <IconContext.Provider value={{className: "icon-15"}}>
                                                    <IoChevronBackOutline/>
                                                </IconContext.Provider>
                                                <span className="ms-1 ms-sm-3 text-uppercase">
                    Назад
                    </span>
                                            </button>
                                        </div>
                                        <div className="col-7 col-sm-6">
                                            <button
                                                type="submit"
                                                className="btn btn-2 w-100 h-100 fs-11 text-uppercase px-3"
                                                onClick={() => (
                                                    isInValidFromRoute ||
                                                    isInValidToRoute ||
                                                    isInValidDateType ||
                                                    isInValidCar ||
                                                    isInValidPrepayment ||
                                                    isInValidPhone ||
                                                    isInValidFirstName
                                                ) && setShowModalValidation(true)}
                                            >
                                                Разместить маршрут
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="d-none d-lg-block title-font fs-09 fw-5 mt-3">
                            * Поля обязательные к заполнению
                        </div>
                    </div>
                    <div className="col-lg-4 pt-lg-5 position-relative d-none d-lg-block">
                        <aside className="box">
                            <nav className="contents">
                                <ol>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="route"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-80}
                                            duration={300}
                                            isDynamic={true}
                                            className={(data?.fromRoute && data?.toRoute) ? "filled" : ""}
                                        >
                                            Маршрут
                                        </Link>
                                        <div className="fs-09">
                                            <span className="me-1">{data?.fromRoute}</span>
                                            {data?.loadingRadius &&
                                                <span className="me-1">+{data?.loadingRadius}км</span>}
                                            {data?.toRoute && <span className="me-1">— {data?.toRoute}</span>}
                                            {data?.unloadingRadius && <span>+{data?.unloadingRadius}км</span>}
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="date"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-80}
                                            duration={300}
                                            isDynamic={true}
                                            className={(data?.date || data?.datePeriodType || data?.datePeriodType === 0) ? "filled" : ""}
                                        >
                                            Дата
                                        </Link>
                                        <div className="fs-09">
                                            {data?.dateType
                                                ?
                                                <>
                                                    <span>Постоянно: {(data?.datePeriodType === 0) && "по рабочим дням"}{data?.datePeriodType === 1 && 'ежедневно'}{data?.datePeriodType === 2 && "через день"}</span>
                                                </>
                                                :
                                                <>
                                                    <span className="me-1">Единожды:</span>
                                                    <span
                                                        className="me-1">{(data?.date === 'Invalid Date') ? '' : data?.date}</span>
                                                    <span>{data?.days ? `+ ${data?.days} дней` : ''}</span>
                                                </>
                                            }
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="aboutCar"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-80}
                                            duration={300}
                                            isDynamic={true}
                                            className={data?.carId ? "filled" : ""}
                                        >
                                            Информация о машине
                                        </Link>
                                        <div className="fs-09">
                                            {findCar(data?.carId)}
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="payment"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-80}
                                            duration={300}
                                            isDynamic={true}
                                            className={(data?.prepayment) ? "filled" : ""}
                                        >
                                            Оплата
                                        </Link>
                                        <div className="fs-09">
                                            {data?.bargainType === 0
                                                ? <span className="me-1">Возможен торг</span>
                                                : <span className='me-1'>Без торга</span>
                                            }
                                            {data?.calculateType === 0
                                                ? <span className="me-1">, наличный расчет</span>
                                                : <span className='me-1'>, перевод по карте</span>
                                            }
                                            {data?.priceVat &&
                                                <span className="me-1">, с&nbsp;НДС {data?.priceVat} ₽/км</span>}
                                            {data?.priceNovat &&
                                                <span className="me-1">, без&nbsp;НДС {data?.priceNovat} ₽/км</span>}
                                            {data?.prepay && <span>, предоплата {data?.prepay} %</span>}
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            activeClass="active"
                                            to="contacts"
                                            spy={true}
                                            smooth={true}
                                            hashSpy={true}
                                            offset={-80}
                                            duration={300}
                                            isDynamic={true}
                                            className={data?.contacts?.find(i => i.phone && i.firstName) ? "filled" : ""}
                                        >
                                            Контакты
                                        </Link>
                                        <div className="fs-09">
                                            {
                                                data?.contacts?.map((i, index) => (
                                                    <div key={index}>
                                                        <span className="me-1">{i.firstName}</span>
                                                        {i.phone && <span className="me-1">,{i.phone}</span>}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </li>
                                </ol>
                            </nav>
                            <button
                                type="submit"
                                className="btn btn-1 text-uppercase fs-15 mx-auto mt-4 mt-xl-5"
                            >
                                добавить маршрут
                            </button>
                            <div className="fs-09 text-center mt-2 mt-xl-3">
                                Объявление будет опубликованно до 1 января включительно, после
                                чего удалится в архив
                            </div>
                            <button
                                type="button"
                                className="fs-11 mx-auto mt-2 mt-xl-3 blue"
                                onClick={() => setShowModalSave(true)}

                            >
                                Сохранить шаблон
                            </button>
                        </aside>
                    </div>
                </form>
            </section>
            <CustomModal
                className='modal__savePattern'
                isShow={showModalSave}
                setIsShow={setShowModalSave}
                centered={false}
                size={'lg'}
                closeButton={true}
            >
                <div>
                    <div>
                        <div>
                            {alertForSavePattern &&
                                <div className='d-flex justify-content-center'>
                                    <Alert
                                        show={isShowAlert}
                                        className='end-0 m-0 p-2'
                                        variant='success'
                                    >
                                        <span>Сохранено</span>
                                    </Alert>
                                </div>
                            }
                            {alertForSavePattern === false &&
                                <div className='d-flex justify-content-center'><Alert
                                    show={isShowAlert}
                                    className='end-0 m-0 p-2'
                                    variant='danger'
                                >
                                    <span>Ошибка</span>
                                </Alert>
                                </div>
                            }
                            <h3>Сохранить шаблон маршрута</h3>
                            <form className="fs-12">
                                <label className="mb-2">Название шаблона</label>
                                <input
                                    type="text"
                                    className="mb-3"
                                    placeholder="Название"
                                    style={{borderColor: valid.isInValidNameTemplate && 'red'}}
                                    onChange={(e) => {
                                        setDataTemplate(prevState => ({
                                            ...prevState,
                                            templateName: e.target.value
                                        }))
                                        resetFieldVal(e, 'isInValidNameTemplate')
                                    }}
                                />
                                {valid.isInValidNameTemplate &&
                                    <span
                                        style={{color: valid.isInValidNameTemplate && 'red'}}
                                    >
                                                    Введите название шаблона
                                                </span>
                                }
                                <label className="mb-2">Примечание</label>
                                <input
                                    type="text"
                                    className="mb-3"
                                    placeholder="Примечание"
                                    onChange={e => setDataTemplate(prevState => ({
                                        ...prevState,
                                        note: e.target.value
                                    }))}
                                />
                                <div className="row row-cols-sm-2 mt-4">
                                    <div className="mb-3 mb-sm-0">
                                        <button
                                            type="button"
                                            className="btn btn-1 w-100"
                                            onClick={() => setShowUseTemplate(false)}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-2 w-100"
                                            onClick={(e) => {
                                                saveTemplate()
                                            }}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </CustomModal>
            <CustomModal
                className='modal__patternRoute'
                isShow={showUseTemplate}
                setIsShow={setShowUseTemplate}
                centered={false}
                closeButton={true}
                size={'lg'}
            >
                <div className={`${templates?.length > 0 ? 'items' : ''}`}>
                    <div className="d-flex align-items-center">
                        <div className="flex-1">
                            {templates?.length > 0 && <h2>Выберите шаблон</h2>}
                            {templates.map((item, index) => (
                                <div key={index} className="box patterns p-2 p-sm-4">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-1">
                                            <div className="title-font fs-12 fw-7">{item.name}</div>
                                            {item.note && <div className="fs-11 mt-1">{item.note}</div>}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-1 fs-09 px-2 px-sm-4 ms-2"
                                            onClick={() => {
                                                setData(
                                                    {
                                                        userId: currentUser.id,
                                                        fromRoute: item?.route?.fromRoute,
                                                        loadingRadius: item?.route?.loadingRadius,
                                                        toRoute: item?.route?.toRoute,
                                                        unloadingRadius: item?.route?.unloadingRadius,
                                                        dateForInput: item?.route?.date,
                                                        carId: item?.route?.carId,
                                                        carName: item?.route?.car?.name,
                                                        dateDays: item?.route?.dateDays,
                                                        dateType: Number(item?.route?.dateType),
                                                        datePeriodType: +item?.route?.datePeriodType,
                                                        datePeriodTypeForUser: item?.route?.datePeriodTypeForUser,
                                                        bargainType: item?.route?.bargainType,
                                                        calculateType: item?.route?.calculateType,
                                                        vatPrice: item?.route?.vatPrice,
                                                        noVatPrice: item?.route?.noVatPrice,
                                                        prepayment: item?.route?.prepayment,
                                                        contacts: item?.route?.contacts,
                                                        note: item?.route?.note,
                                                    })
                                                setBtnRadioDate(Number(item?.route?.dateType))
                                                setBtnRadioCalculate(Number(item?.route?.calculateType))
                                                setBtnRadioBargain(Number(item?.route?.bargainType))
                                            }}
                                        >
                                            Выбрать
                                        </button>
                                        <button
                                            type="button"
                                            className="ms-2 ms-sm-3"
                                            onClick={() => onDeleteTemplate(item.id)}
                                        >
                                            <IconContext.Provider value={{className: "gray-4 icon-15"}}>
                                                <IoTrash/>
                                            </IconContext.Provider>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {!templates.length && (
                                <h5 className="text-center">У Вас нет сохраненных шаблонов</h5>
                            )}
                            <p className="text-center fs-11">
                                Сохраняйте однотипные объявления в шаблоны <br/> для удобства
                                и экономии времени
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowUseTemplate(false)}
                                className="btn btn-1 fs-12 mx-auto mt-4"
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </CustomModal>
            <CustomModal
                className='modal__routeErrorValid'
                isShow={showModalValidation}
                setIsShow={setShowModalValidation}
                closeButton={true}
                size={'lg'}
            >
                <div>
                    <div className='text-center'>
                                    <span className='fs-12'>
                                        Для размещения объявления заполните все обязательные поля
                                    </span>
                        <div className='mt-4'>
                            <button
                                className='btn btn-2 w-100 h-100 fs-11 text-uppercase px-3'
                                type='button'
                                onClick={() => setShowModalValidation(false)}
                            >
                                ПОНЯТНО
                            </button>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </main>
    );
}

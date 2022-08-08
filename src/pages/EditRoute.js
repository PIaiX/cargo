import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {IconContext} from "react-icons";
import {IoChevronBackOutline, IoChevronForwardOutline, IoNewspaperOutline, IoTrash} from "react-icons/io5";
import {VscChromeClose} from "react-icons/vsc";
import {onInputHandler, onRadioHandler} from "../helpers/collectForms";
import Select from "react-select";
import {optionsLoadingDays, optionsLoadingPeriodType} from "../components/utilities/data";
import {Link} from "react-scroll";
import {useSelector} from "react-redux";
import useAxiosPrivate from "../hooks/axiosPrivate";
import {deleteTemplate, getRoutePage, getTemplates, saveTemplateRoute, updateRoute} from "../API/route";
import CustomModal from "../components/utilities/CustomModal";
import {getCars} from '../API/car';

const EditRoute = () => {

    const {id} = useParams()
    const [activeField, setActiveField] = useState(1); //для мобильных устройств
    const axiosPrivate = useAxiosPrivate()
    const currentUser = useSelector(state => state.currentUser.data.user)
    const [contactsInfo, setContactsInfo] = useState(
        {
            id: '',
            phone: '',
            firstName: '',
        }
    )
    const [contactsArray, setContactsArray] = useState([]);

    const [curRoute, setCurRoute] = useState()

    useEffect(() => {
        getRoutePage(id, axiosPrivate)
            .then(res => setCurRoute(res?.data?.body))
            .catch(error => console.log(error))
    }, [id])

    let [data, setData] = useState(
        {
            userId: currentUser.id,
        }
    );

    useEffect(() => {
        setData(prevState => ({...prevState,
            userId: currentUser.id,
            fromRoute: curRoute?.fromRoute,
            loadingRadius: curRoute?.loadingRadius,
            toRoute: curRoute?.toRoute,
            unloadingRadius: curRoute?.unloadingRadius,
            date: curRoute?.date,
            dateDays: curRoute?.dateDays,
            dateType: curRoute?.dateType,
            datePeriodType: curRoute?.dateType,
            bargainType: curRoute?.bargainType,
            calculateType: curRoute?.calculateType,
            vatPrice: curRoute?.vatPrice,
            noVatPrice: curRoute?.noVatPrice,
            prepayment: curRoute?.prepayment,
            contacts: curRoute?.contacts,
            note: curRoute?.note,

        }))
    }, [contactsInfo, curRoute, currentUser])

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

    const onSubmit = (e) => {
        e.preventDefault()

        const isInValidFromRoute = data?.fromRoute === undefined || data?.fromRoute?.length < 2 || data?.fromRoute?.length > 50
        const isInValidToRoute = data?.toRoute === undefined || data?.toRoute?.length < 2 || data?.toRoute?.length > 50
        const isInValidDateType = data?.dateType === undefined
        const isInValidCar = data?.carId === undefined
        const isInValidPrepayment = data?.prepayment === undefined || data?.prepayment > 100 || data?.prepayment < 0
        const isInValidPhone =
            (data?.contacts?.map(i => i.phone)[0].replace(/\s/g, '').length > 12)
            || !(data?.contacts?.map(i => i.phone)[0].replace(/\s/g, '').includes('+7'))
            || (data?.contacts?.map(i => i.phone)[0].replace(/\s/g, '').length <= 11)
        const isInValidFirstName = (data?.contacts?.map(i => i.firstName)[0].replace(/\s/g, '').length > 50) || (data?.contacts?.map(i => i.firstName)[0].replace(/\s/g, '').length < 2)

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
                const response = updateRoute(id,data, axiosPrivate)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const onReset = (e) => {
        setData({})
        setContactsArray([]);
    };

    useEffect(() => {
        if (data.dateType === 1) {
            delete data.date;
            delete data.dateDays
        } else {
            delete data.datePeriodType
        }
    }, [data])

    const [cars, setCars] = useState({
        cars: [],
        forSelect: []
    })

    useEffect(() => {
        getCars(axiosPrivate, currentUser?.id, 1)
            .then(res => setCars(prevState => (
                {
                    ...prevState,
                    cars: res?.data?.body?.data,
                    forSelect: res?.data?.body?.data?.map(i => ({value: i.id, label: i.name}))
                })))
            .catch(error => console.log(error))
    }, [currentUser])

    const getDate = (dateMe) => {
        const newDate = new Date(dateMe)
        setData(prevState => ({
            ...prevState,
            'date': `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`
        }))
    }

    const findCar = (carId) => {
        const find = cars?.forSelect?.find(i => i.value === carId)
        return <span>{find?.label}</span>
    }

    useEffect(() => {
        setData(prevState => ({...prevState, contacts: [contactsInfo]}))
    }, [contactsInfo])

    const resetFieldVal = (newState, field) => {
        setValid({...valid, [field]: false})
    }

    const [dataTemplate, setDataTemplate] = useState({})

    const saveTemplate = () => {

        const isInValidNameTemplate = dataTemplate?.templateName === undefined || dataTemplate?.templateName?.length < 2 || dataTemplate?.templateName?.length > 50

        if (isInValidNameTemplate) {
            setValid({...valid, isInValidNameTemplate: true})
        } else {
            try {
                saveTemplateRoute(data, dataTemplate, axiosPrivate)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const [showModalSave, setShowModalSave] = useState(false)

    const [templates, setTemplates] = useState([])

    useEffect(() => {
        getTemplates(axiosPrivate, currentUser?.id,1 )
            .then(r => setTemplates(r.data?.body?.data))
            .catch(error => console.log(error))
    }, [currentUser])

    const [showUseTemplate, setShowUseTemplate] = useState(false)

    const onDeleteTemplate = async (id) => {
        await deleteTemplate(id, axiosPrivate)
        await getTemplates( axiosPrivate, currentUser?.id,1)
            .then(r => setTemplates(r.data?.body?.data))
            .catch(error => console.log(error))
    }

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
                    Редактирование Маршрута
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
                                /*className={checkFieldset("route") ? "active" : ""}*/
                                onClick={() => setActiveField(1)}
                            >
                                1
                            </button>
                            <button
                                type="button"
                                /*className={checkFieldset("date") ? "active" : ""}*/
                                onClick={() => setActiveField(2)}
                            >
                                2
                            </button>
                            <button
                                type="button"
                                /*className={checkFieldset("aboutCar") ? "active" : ""}*/
                                onClick={() => setActiveField(3)}
                            >
                                3
                            </button>
                            <button
                                type="button"
                                /*className={checkFieldset("payment") ? "active" : ""}*/
                                onClick={() => setActiveField(4)}
                            >
                                4
                            </button>
                            <button
                                type="button"
                                /*className={checkFieldset("contacts") ? "active" : ""}*/
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
                                    <button type="reset" className="btn btn-4 p-2 ms-3">
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
                                        >
                                            Откуда*
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <input
                                                    type="text"
                                                    name="fromRoute"
                                                    value={data?.fromRoute || ''}
                                                    style={{borderColor: valid.isInValidFromRoute && 'red'}}
                                                    onChange={e => {
                                                        onInputHandler(e, setData)
                                                        resetFieldVal(e, 'isInValidFromRoute')
                                                    }}
                                                    placeholder="Населенный пункт"
                                                    className="fs-12"
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
                                        >
                                            Куда*
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-xl-6">
                                                <input
                                                    style={{borderColor: valid.isInValidToRoute && 'red'}}
                                                    type="text"
                                                    name="toRoute"
                                                    value={data?.toRoute || ''}
                                                    onChange={e => {
                                                        onInputHandler(e, setData)
                                                        resetFieldVal(e, 'isInValidToRoute')
                                                    }}
                                                    placeholder="Населенный пункт"
                                                    className="fs-12"
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
                                        <button type="reset">
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
                                                            defaultChecked={!(data?.dateType)}
                                                            value={0}
                                                            onChange={e => {
                                                                onRadioHandler(e, setData, true)
                                                                resetFieldVal(e, 'isInValidDateType')
                                                            }}
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
                                                                value={data?.date || ''}
                                                                onChange={e => getDate(e.target.value)}
                                                            />
                                                        </label>
                                                        <span className="mx-2 mx-xxl-3">+</span>
                                                        <label
                                                            style={{maxWidth: "100px"}}
                                                            data-label="dateDays"
                                                            data-warning="false"
                                                        >
                                                            <Select
                                                                className="fs-12"
                                                                classNamePrefix="react-select"
                                                                placeholder="Дней"
                                                                options={optionsLoadingDays}
                                                                name="dateDays"
                                                                isSearchable={false}
                                                                defaultValue={data?.dateDays || ''}
                                                                onChange={e => {
                                                                    setData(prevState => ({
                                                                        ...prevState,
                                                                        'dateDays': e.value
                                                                    }))
                                                                }}
                                                                /*value={getSelectValue("days")}
                                                                onChange={(e) => handleRSelect(e, "days")}*/
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
                                                            defaultChecked={data?.dateType || false}
                                                            value={1}
                                                            onChange={e => {
                                                                onRadioHandler(e, setData, true)
                                                                resetFieldVal(e, 'isInValidDateType')
                                                            }}
                                                        />
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                                                            Постоянно
                                                        </span>
                                                    </label>
                                                    <div
                                                        data-label="loadingPeriodType"
                                                        data-warning="false"
                                                        className={`${data.dateType !== 0 ? '' : 'disabled'} `}
                                                    >

                                                        <Select
                                                            className="fs-12"
                                                            classNamePrefix="react-select"
                                                            placeholder="Выберите..."
                                                            options={optionsLoadingPeriodType}
                                                            name="datePeriodType"
                                                            isSearchable={false}
                                                            onChange={e => setData(prevState => ({
                                                                ...prevState,
                                                                'datePeriodType': e.value
                                                            }))}
                                                            /*value={getSelectValue("loadingPeriodType")}
                                                            onChange={(e) =>
                                                              handleRSelect(e, "loadingPeriodType")
                                                            }*/
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
                                        <button type="reset">
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
                                        <Select
                                            className="fs-12 w-100"
                                            classNamePrefix="react-select"
                                            placeholder={"Выберите..."}
                                            options={cars.forSelect}
                                            name="carName"
                                            isSearchable={true}
                                            onChange={e => {
                                                setData(prevState => ({...prevState, 'carId': e.value}))
                                            }}
                                        />
                                        {valid.isInValidCar && <span className='position-absolute'
                                                                     style={{color: valid.isInValidCar && 'red'}}>Выберете машину</span>}
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
                                        <button type="reset">
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
                                                defaultChecked={!(data?.bargainType) || true}
                                                value={0}
                                                onChange={e => onRadioHandler(e, setData)}
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
                                                defaultChecked={data?.bargainType || false}
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
                                                defaultChecked={!(data?.calculateType) || true}
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
                                                defaultChecked={data?.calculateType || false}
                                                onChange={e => onRadioHandler(e, setData)}
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
                                        <button type="reset">
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
                                {/*<div className="row gx-2 gx-sm-4 mb-4 mb-md-0">
                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="button"
                                            onClick={() => addContacts()}
                                            className="green fs-11 fw-5 text-start"
                                        >
                                            <IconContext.Provider
                                                value={{className: "green icon-15"}}
                                            >
                                                <IoAddCircle/>
                                            </IconContext.Provider>
                                            <span className="ms-2">Добавить контакт</span>
                                        </button>
                                    </div>
                                </div>*/}
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
                                                    placeholder="+ 7 (962) 458 65 79"
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
                                {/*{contactsArray.map((obj, idx) => (
                                <div className="row mt-3">
                                    <div className="col-md-9">
                                        <div className="row align-items-center gy-2 gy-md-3">
                                            <div className="col-md-4">
                                                <div
                                                    data-label={"contactPhone"}
                                                    data-warning="false"
                                                    className="title-font fs-12 fw-5"
                                                >
                                                    Телефон
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <input
                                                    type="tel"
                                                    name='phone'
                                                    onChange={e => setContactsInfo(prevState => ({...prevState, phone: e.target.value}))}
                                                    placeholder="+ 7 (962) 458 65 79"
                                                    className="w-100 fs-12"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <div
                                                    data-label={`contactName`}
                                                    data-warning="false"
                                                    className="title-font fs-12 fw-5"
                                                >
                                                    Имя
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <input
                                                    type="text"
                                                    name='firstName'
                                                    onChange={e => setContactsInfo(prevState => ({...prevState, firstName: e.target.value}))}
                                                    placeholder="Имя"
                                                    className="w-100 fs-12"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {contactsArray?.length > 1 &&
                                            <div className="col-md-3 mt-2 mt-md-0">
                                                <button
                                                    type="button"
                                                    onClick={() => deleteContacts(obj)}
                                                    className="red fs-11 fw-5"
                                                >
                                                    <IconContext.Provider
                                                        value={{className: "red icon-15"}}
                                                    >
                                                        <IoCloseCircle/>
                                                    </IconContext.Provider>
                                                    <span className="ms-2">Удалить</span>
                                                </button>
                                            </div>
                                        }
                                </div>
                                )).reverse()}*/}
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
                                            >
                                                Разместить груз
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
                                            className={(data?.dateType !== undefined) ? "filled" : ""}
                                        >
                                            Дата
                                        </Link>
                                        <div className="fs-09">
                                            {data?.dateType === 0
                                                ?
                                                <>
                                                    <span className="me-1">Единожды:</span>
                                                    <span className="me-1">{data?.date}</span>
                                                    <span>+ {data?.days} дней</span>
                                                </>
                                                :
                                                <>
                                                    <span>Постоянно</span>
                                                    {data?.loadingPeriodType === '0' && <span> По рабочим дням</span>}
                                                    {data?.loadingPeriodType === '1' && <span> По выходным</span>}
                                                    {data?.loadingPeriodType === '2' && <span> Ежедневно</span>}
                                                    {data?.loadingPeriodType === '3' && <span> Через день</span>}
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
                                Редактировать
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
                        <CustomModal
                            isShow={showModalSave}
                            setIsShow={setShowModalSave}
                            centered={false}
                            size={'lg'}
                            closeButton={true}
                        >
                            <div>
                                <div>
                                    <div>
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
                            isShow={showUseTemplate}
                            setIsShow={setShowUseTemplate}
                            centered={false}
                            closeButton={true}
                            size={'lg'}
                        >
                            <div>
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
                                                        onClick={() =>
                                                            setData(prevState => (
                                                                {
                                                                    ...prevState,
                                                                    userId: currentUser.id,
                                                                    fromRoute: item?.route?.fromRoute,
                                                                    loadingRadius: item?.route?.loadingRadius,
                                                                    toRoute: item?.route?.toRoute,
                                                                    unloadingRadius: item?.route?.unloadingRadius,
                                                                    date: item?.route?.date,

                                                                    dateDays: item?.route?.dateDays,
                                                                    dateType: item?.route?.dateType,
                                                                    datePeriodType: item?.route?.dateType,
                                                                    bargainType: item?.route?.bargainType,
                                                                    calculateType: item?.route?.calculateType,
                                                                    vatPrice: item?.route?.vatPrice,
                                                                    noVatPrice: item?.route?.noVatPrice,
                                                                    prepayment: item?.route?.prepayment,
                                                                    contacts: item?.route?.contacts,
                                                                    note: item?.route?.note,
                                                                }))}
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
                    </div>
                </form>
            </section>
        </main>
    );
};

export default EditRoute;
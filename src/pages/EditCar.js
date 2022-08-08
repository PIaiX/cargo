import React, {useEffect, useState} from "react";
import {Tooltip} from "bootstrap";
import {IoHelpCircleOutline} from "react-icons/io5";
import {VscChromeClose} from "react-icons/vsc";
import {IconContext} from "react-icons";
import AsyncSelect from 'react-select/async';
import {getCar, getCarTypes, updateCar} from '../API/car';
import useAxiosPrivate from '../hooks/axiosPrivate';
import {Controller, useForm} from 'react-hook-form';
import ValidateWrapper from '../components/utilities/ValidateWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function EditCar() {
    const {id} = useParams()
    const userId = useSelector(state => state?.currentUser?.data?.user?.id)
    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const [carTypes, setCarTypes] = useState([])
    const [selectValue, setSelectValue] = useState(null)
    const [radioBtnState, setRadioBtnState] = useState(null)

    const {
        register,
        formState: {errors},
        handleSubmit,
        control,
        reset,
        getValues
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })
    const [formData, setFormData] = useState(null)

    useEffect(() => getCar(axiosPrivate, id).then(result => {
        reset({
            id: result?.id,
            name: result?.name,
            additionalConfiguration: result?.additionalConfiguration,
            carrying: result?.carrying,
            capacity: result?.capacity,
            width: result?.width,
            height: result?.height,
            length: result?.length,
            sts: result?.sts,
            vin: result?.vin,
            pts: result?.pts,
            carBodyTypeId: result?.carBodyTypeId,
        })

        setSelectValue({value: result?.bodyType?.id, label: result?.bodyType?.name})
        setRadioBtnState(result?.additionalConfiguration)
    }), [id, reset])

    useEffect(() => {
        getCarTypes(axiosPrivate)
            .then(items => items && setCarTypes(items.map(item => ({value: item.id, label: item.name}))))
            .catch(() => setCarTypes([]))
    }, [])

    useEffect(() => (formData && userId) && updateCar(axiosPrivate, formData, userId), [formData, userId])

    const onSubmit = (data) => setFormData(prev => ({...prev, ...data}))
    
    const resetForm = () => {
        reset({
            id,
            name: '',
            additionalConfiguration: '',
            carrying: '',
            capacity: '',
            width: '',
            height: '',
            length: '',
            sts: '',
            vin: '',
            pts: '',
            carBodyTypeId: '',
        })
        setFormData(null)
    }

    const loadOptions = async (searchKey) => {
        const defaultValue = getValues('carBodyTypeId')
        defaultValue && setSelectValue(carTypes.find(item => item.value === defaultValue))

        if (!searchKey) {
            return await carTypes
        } else {
            return await carTypes.filter(item => item.label.includes(searchKey))
        }
    }

    useEffect(() => {
        //init tooltip
        Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
            (tooltipNode) => new Tooltip(tooltipNode)
        );
    });

    return (
        <main className="bg-gray">
            <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
                <button
                    onClick={() => navigate("/")}
                    className="fs-12 fw-5 d-block mb-3 mb-sm-5"
                >
                    <span className="green fs-15 me-2">⟵</span> Назад
                </button>
                <h1 className="dark-blue text-center text-uppercase">
                    Редактирование Машины
                </h1>
                <form
                    className="row"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="col-lg-8">
                        <fieldset name="aboutCar" className="mt-lg-5">
                            <div
                                className="d-flex align-items-center justify-content-center justify-content-lg-between mb-4 mb-lg-3">
                                <h4 className="text-center text-lg-start mb-0">О Машине</h4>
                                <div className="d-none d-lg-flex align-items-center fs-09">
                                    <button
                                        type="reset"
                                        className="btn btn-4 p-2 ms-3"
                                        onClick={() => {
                                            resetForm()
                                            setSelectValue(null)
                                            setRadioBtnState(null)
                                        }}
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
                                    <div className="col-sm-5 col-md-3">
                                        <div
                                            data-label="name"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5 mb-2 mb-sm-0"
                                        >
                                            Марка машины*
                                        </div>
                                    </div>
                                    <div className="col-sm-7 col-md-9">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ValidateWrapper error={errors?.name}>
                                                    <input
                                                        placeholder="Укажите марку машины..."
                                                        className="weight w-100 fs-12"
                                                        {...register('name', {
                                                            required: 'поле обязательно к заполнению'
                                                        })}
                                                    />
                                                </ValidateWrapper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div
                                            data-label="carType"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5"
                                        >
                                            Тип машины*
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <ValidateWrapper error={errors?.carBodyTypeId}>
                                            <Controller
                                                control={control}
                                                name="carBodyTypeId"
                                                render={({field}) => (
                                                    (carTypes.length !== 0) && (
                                                        <AsyncSelect
                                                            className="fs-12 w-100"
                                                            classNamePrefix="react-select"
                                                            placeholder={"Выберите..."}
                                                            loadOptions={loadOptions}
                                                            defaultOptions
                                                            value={selectValue && carTypes.find(item => item.value === selectValue.value)}
                                                            onChange={val => {
                                                                setSelectValue({value: val.value, label: val.label})
                                                                field.onChange(val.value)
                                                            }}
                                                        />
                                                    )
                                                )}
                                                rules={{required: 'выберите тип машины'}}
                                            />
                                        </ValidateWrapper>
                                        <ValidateWrapper error={errors?.additionalConfiguration} className="mt-3">
                                            <div
                                                data-label="additionalConfiguration"
                                                data-warning="false"
                                                className="row row-cols-sm-3 mt-3"
                                            >
                                                <div className="mb-3 mb-sm-0">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value={0}
                                                            {...register('additionalConfiguration', {
                                                                required: 'поле обязательно к заполнению'
                                                            })}
                                                            checked={radioBtnState === 0}
                                                            onClick={e => setRadioBtnState(Number(e.target.value))}
                                                        />
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                                                        Грузовик
                                                    </span>
                                                    </label>
                                                </div>
                                                <div className="mb-3 mb-sm-0">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value={1}
                                                            {...register('additionalConfiguration', {
                                                                required: 'поле обязательно к заполнению'
                                                            })}
                                                            checked={radioBtnState === 1}
                                                            onClick={e => setRadioBtnState(Number(e.target.value))}
                                                        />
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                                                        Полуприцеп
                                                    </span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            value={2}
                                                            {...register('additionalConfiguration', {
                                                                required: 'поле обязательно к заполнению'
                                                            })}
                                                            checked={radioBtnState === 2}
                                                            onClick={e => setRadioBtnState(Number(e.target.value))}
                                                        />
                                                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                                                        Сцепка
                                                    </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </ValidateWrapper>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-5 col-md-3">
                                        <div
                                            data-label="carrying"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5 mb-2 mb-sm-0"
                                        >
                                            Грузоподъемность*
                                        </div>
                                    </div>
                                    <div className="col-sm-7 col-md-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <ValidateWrapper error={errors?.carrying}>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        placeholder="0"
                                                        className="weight w-100 fs-12"
                                                        {...register('carrying', {
                                                            required: 'поле обязательно к заполнению'
                                                        })}
                                                    />
                                                </ValidateWrapper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-5 col-md-3">
                                        <div
                                            data-label="capacity"
                                            data-warning="false"
                                            className="title-font fs-12 fw-5 mb-2 mb-sm-0"
                                        >
                                            Объем*
                                        </div>
                                    </div>
                                    <div className="col-sm-7 col-md-9">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <ValidateWrapper error={errors?.capacity}>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        placeholder="0"
                                                        className="size w-100 fs-12"
                                                        {...register('capacity', {
                                                            required: 'поле обязательно к заполнению'
                                                        })}
                                                    />
                                                </ValidateWrapper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-3 mb-3 mb-md-0">
                                        <div className="title-font fs-12 fw-5">Габариты*</div>
                                    </div>
                                    <div className="col-md-9">
                                        <div
                                            className={`row row-cols-sm-3 gx-3 gx-xxl-4 fs-12 ${(errors?.length || errors?.width || errors?.height) ? 'dimensions-validation' : ''}`}>
                                            <div className="mb-2 mb-sm-0">
                                                <ValidateWrapper error={errors?.length}>
                                                    <div className="row gx-2 align-items-center">
                                                        <div
                                                            className={(errors?.length || errors?.width || errors?.height) ? 'col-2' : "col-3 col-sm-5"}>
                                                            <label data-label="length" data-warning="false">
                                                                Длина:
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={(errors?.length || errors?.width || errors?.height) ? 'col-10' : "col-9 col-sm-7"}>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                step="0.1"
                                                                placeholder="0"
                                                                className="length"
                                                                {...register('length', {
                                                                    required: 'поле обязательно к заполнению'
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </ValidateWrapper>
                                            </div>
                                            <div className="mb-2 mb-sm-0">
                                                <ValidateWrapper error={errors?.width}>
                                                    <div className="row gx-2 align-items-center">
                                                        <div
                                                            className={(errors?.length || errors?.width || errors?.height) ? 'col-2' : "col-3 col-sm-5"}>
                                                            <label data-label="width" data-warning="false">
                                                                Ширина:
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={(errors?.length || errors?.width || errors?.height) ? 'col-10' : "col-9 col-sm-7"}>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                step="0.1"
                                                                placeholder="0"
                                                                className="length"
                                                                {...register('width', {
                                                                    required: 'поле обязательно к заполнению'
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </ValidateWrapper>
                                            </div>
                                            <div className="mb-2 mb-sm-0">
                                                <ValidateWrapper error={errors?.height}>
                                                    <div className="row gx-2 align-items-center">
                                                        <div
                                                            className={(errors?.length || errors?.width || errors?.height) ? 'col-2' : "col-3 col-sm-5"}>
                                                            <label data-label="height" data-warning="false">
                                                                Высота:
                                                            </label>
                                                        </div>
                                                        <div
                                                            className={(errors?.length || errors?.width || errors?.height) ? 'col-10' : "col-9 col-sm-7"}>
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                step="0.1"
                                                                placeholder="0"
                                                                className="length"
                                                                {...register('height', {
                                                                    required: 'поле обязательно к заполнению'
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                </ValidateWrapper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5 d-flex align-items-center">
                                            <span data-label="sts" data-warning="false">
                                                СТС
                                            </span>
                                            <button
                                                type="button"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="right"
                                                title="внесенные сведения ТС не подлежат разглашению третьим лицам"
                                            >
                                                <IconContext.Provider
                                                    value={{className: "ms-2 blue icon-15"}}
                                                >
                                                    <IoHelpCircleOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ValidateWrapper error={errors?.sts}>
                                                    <input
                                                        type="text"
                                                        placeholder="sts"
                                                        className="w-100 fs-12"
                                                        {...register('sts', {
                                                            required: 'поле обязательно к заполнению'
                                                        })}
                                                    />
                                                </ValidateWrapper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5 d-flex align-items-center">
                                            <span data-label="vin" data-warning="false">
                                                VIN код
                                            </span>
                                            <button
                                                type="button"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="right"
                                                title="внесенные сведения ТС не подлежат разглашению третьим лицам"
                                            >
                                                <IconContext.Provider
                                                    value={{className: "ms-2 blue icon-15"}}
                                                >
                                                    <IoHelpCircleOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ValidateWrapper error={errors?.vin}>
                                                    <input
                                                        type="text"
                                                        placeholder="VIN код"
                                                        className="w-100 fs-12"
                                                        {...register('vin', {
                                                            required: 'поле обязательно к заполнению'
                                                        })}
                                                    />
                                                </ValidateWrapper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-sm-3 mb-2 mb-sm-0">
                                        <div className="title-font fs-12 fw-5 d-flex align-items-center">
                                            <span data-label="pts" data-warning="false">
                                                ПТС
                                            </span>
                                            <button
                                                type="button"
                                                data-bs-toggle="tooltip"
                                                data-bs-placement="right"
                                                title="внесенные сведения ТС не подлежат разглашению третьим лицам"
                                            >
                                                <IconContext.Provider
                                                    value={{className: "ms-2 blue icon-15"}}
                                                >
                                                    <IoHelpCircleOutline/>
                                                </IconContext.Provider>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ValidateWrapper error={errors?.pts}>
                                                    <input
                                                        type="text"
                                                        placeholder="ПТС"
                                                        className="w-100 fs-12"
                                                        {...register('pts', {
                                                            required: 'поле обязательно к заполнению'
                                                        })}
                                                    />
                                                </ValidateWrapper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mobile-btns d-block d-lg-none">
                                <div className="container d-flex align-items-center justify-content-center">
                                    <div
                                        className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                                        <button type="reset" onClick={() => {
                                            resetForm()
                                            setSelectValue(null)
                                            setRadioBtnState(null)
                                        }}>
                                            <IconContext.Provider value={{className: "icon-15"}}>
                                                <VscChromeClose/>
                                            </IconContext.Provider>
                                            <span className="ms-1">Очистить форму</span>
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-1 text-uppercase fs-15 mx-auto mt-2"
                                    >
                                        сохранить изменения
                                    </button>
                                </div>
                            </div>
                        </fieldset>

                        <div className="d-none d-lg-block title-font fs-09 fw-5 mt-3">
                            * Поля обязательные к заполнению
                        </div>
                    </div>
                    <div className="col-lg-4 pt-lg-5 position-relative d-none d-lg-block">
                        <aside className="box">
                            <button
                                type="submit"
                                className="btn btn-1 text-uppercase fs-15 mx-auto"
                            >
                                сохранить изменения
                            </button>
                        </aside>
                    </div>
                </form>
            </section>
        </main>
    );
}

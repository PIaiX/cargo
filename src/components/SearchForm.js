import React, {useEffect, useState} from 'react';
import SearchInput from './utilities/SearchInput';
import {IconContext} from 'react-icons';
import {IoChevronDownSharp, IoSwapHorizontalSharp} from 'react-icons/io5';
import Select from 'react-select'
import useMatchMedia from '../hooks/matchMedia';
import {getCities} from '../API/cities';
import {Controller, useForm} from 'react-hook-form';
import {getDateUI} from '../helpers/formatingDate';
import {getItemTypes} from '../API/cargo';
import useAxiosPrivate from '../hooks/axiosPrivate';
import {getCarTypes} from '../API/car';
import {icons} from '../helpers/cargo';

const SearchForm = ({type, submitHandler}) => {
    const axiosPrivate = useAxiosPrivate()
    const {state: isCollapsedForm, setState: setIsCollapsedForm} = useMatchMedia(false, '(max-width: 767px)')
    const [cities, setCities] = useState([])

    const [cargoTypes, setCargoTypes] = useState([])
    const [carTypes, setCarTypes] = useState([])
    const [selectType, setSelectType] = useState(null)
    const [selectNote, setSelectNote] = useState(null)

    const {
        register,
        formState: {errors},
        handleSubmit,
        control,
        reset,
        getValues,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        getCities().then(res => setCities(res?.body))
        getItemTypes(axiosPrivate)
            .then(res => res?.length && setCargoTypes(res.map(item => ({value: item.id, label: item.name}))))
            .catch(() => setCargoTypes([]))
        getCarTypes(axiosPrivate)
            .then(res => res?.length && setCarTypes(res.map(item => ({value: item.id, label: item.name}))))
            .catch(() => setCarTypes([]))
    }, [])


    useEffect(() => resetForm(), [type])

    useEffect(() => {
        submitHandler && submitHandler(formData)
    }, [formData])

    const onSumbit = (data) => {
        console.log(data)
        const tempObject = {}
        for (const key in data) {
            if ((data[key] !== '') && (data[key] !== undefined)) {
                tempObject[key] = data[key]
            }
        }
        if (data?.date) {
            tempObject.date = getDateUI(data.date)
        }

        setFormData(tempObject)
    }

    const resetForm = () => {
        reset({
            fromRoute: '',
            toRoute: '',
            date: '',
            width: '',
            length: '',
            height: '',
            minVolume: '',
            maxVolume: '',
            minWeight: '',
            maxWeight: '',
        })
        setSelectType(null)
        setSelectNote(null)
        setFormData(null)
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSumbit)}
        >
            <div className="row g-3 g-sm-4 g-xl-5">
                <div className="col-lg-8 d-sm-flex align-items-end">
                    <div className="flex-1 mb-3 mb-sm-0">
                        <label className="title-font mb-2 mb-xl-3">Откуда</label>
                        <Controller
                            control={control}
                            name="fromRoute"
                            render={({field}) => (
                                <SearchInput
                                    data={cities}
                                    placeHolder={'Город отправления'}
                                    value={field.value}
                                    callback={value => field.onChange(value)}
                                />
                            )
                            }
                        />
                    </div>
                    <IconContext.Provider value={{className: "green icon d-none d-sm-block mx-2 mx-md-3 mb-1 mb-md-2"}}>
                        <IoSwapHorizontalSharp/>
                    </IconContext.Provider>
                    <div className="flex-1">
                        <label className="title-font mb-2 mb-xl-3">Куда</label>
                        <Controller
                            control={control}
                            name="toRoute"
                            render={({field}) => (
                                <SearchInput
                                    data={cities}
                                    placeHolder={'Город назначения'}
                                    value={field.value}
                                    callback={value => field.onChange(value)}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="col-md-5 col-lg-4">
                    <label className="title-font mb-2 mb-xl-3">Дата</label>
                    <Controller
                        control={control}
                        name="date"
                        render={({field}) => (
                            <input
                                type="date"
                                placeholder="С сегодняшнего дня"
                                value={getValues('date') || ''}
                                onChange={e => field.onChange(e.target.value)}
                            />
                        )}
                    />
                </div>
                {isCollapsedForm && (
                    <>
                        <div className="col-md-7 col-lg-5 col-xxl-4">
                            <div className="row row-cols-sm-2">
                                <div className="mb-3 mb-sm-0">
                                    <label className="title-font mb-2 mb-xl-3">
                                        Объем, м3
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            placeholder="От"
                                            {...register('minVolume')}
                                        />
                                        <span className="fs-15 mx-1 mx-xl-2">—</span>
                                        <input
                                            type="number"
                                            placeholder="До"
                                            {...register('maxVolume')}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="title-font mb-2 mb-xl-3">
                                        Вес, т
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            placeholder="От"
                                            {...register('minWeight')}
                                        />
                                        <span className="fs-15 mx-1 mx-xl-2">—</span>
                                        <input
                                            type="number"
                                            placeholder="До"
                                            {...register('maxWeight')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-xxl-8">
                            <label className="title-font mb-2 mb-xl-3">
                                Максимальное значение габаритов груза, м
                            </label>
                            <div className="d-sm-flex align-items-center">
                                <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                                    <label className="me-2">Длина:</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        {...register('length')}
                                    />
                                </div>
                                <div className="d-flex align-items-center mb-3 mb-sm-0 me-sm-4 me-xl-5">
                                    <label className="me-2">Ширина:</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        {...register('width')}
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <label className="me-2">Высота:</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        {...register('height')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 type-select">
                            <div className="type-select__inner">
                                <label
                                    className="title-font mb-2 mb-xl-3">
                                    {type === 'cargo' ? 'Тип груза' : 'Тип машины'}
                                </label>
                                <Controller
                                    control={control}
                                    name={type === 'cargo' ? 'cargoBodyTypeId' : 'carBodyTypeId'}
                                    render={({field}) => (
                                        (type === 'cargo' ? (cargoTypes.length !== 0) : (carTypes.length !== 0)) && (
                                            <Select
                                                className="fs-12 w-100"
                                                classNamePrefix="react-select"
                                                placeholder="Выберите..."
                                                options={type === 'cargo' ? cargoTypes : carTypes}
                                                value={selectType}
                                                onChange={val => {
                                                    setSelectType({value: val.value, label: val.label})
                                                    field.onChange(val.value)
                                                }}
                                            />
                                        )
                                    )}
                                />
                            </div>
                            {type === 'car' && <div className="type-select__checkbox">
                                <label className="title-font mb-2 mb-xl-3">
                                    <input
                                        type="checkbox"
                                        {...register('onlyVerified')}
                                    />
                                    Проверенный автомобиль
                                </label>
                            </div>}
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <label className="title-font mb-2 mb-xl-3">
                                Особые пометки
                            </label>
                            <Controller
                                control={control}
                                name='noteType'
                                render={({field}) => (
                                    <Select
                                        className="fs-12 w-100"
                                        classNamePrefix="react-select"
                                        placeholder={"Выберите..."}
                                        options={icons.map(item => ({value: item.id, label: item.text}))}
                                        value={selectNote}
                                        onChange={val => {
                                            setSelectNote({value: val.value, label: val.label})
                                            field.onChange(val.value)
                                        }}
                                    />
                                )}
                            />
                        </div>
                    </>
                )}
                <div className="col-md-4 d-md-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center d-md-none mx-auto mb-4">
                        {isCollapsedForm ? (
                            <button type="button" onClick={() => setIsCollapsedForm(false)}>
                                <span className="blue me-2">Свернуть поиск</span>
                                <IconContext.Provider
                                    value={{className: "blue rotate-180", size: "1.25em"}}
                                >
                                    <IoChevronDownSharp/>
                                </IconContext.Provider>
                            </button>
                        ) : (
                            <button type="button" onClick={() => setIsCollapsedForm(true)}>
                                <span className="blue me-2">Расширенный поиск</span>
                                <IconContext.Provider
                                    value={{className: "blue", size: "1.25em"}}
                                >
                                    <IoChevronDownSharp/>
                                </IconContext.Provider>
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-2 fs-15 w-100 px-3"
                    >
                        Найти грузы
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;
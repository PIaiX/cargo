import React, {useEffect, useState} from 'react';
import ImageUploading from "react-images-uploading";
import CustomSelect from "./utilities/CustomSelect";
import ValidateWrapper from "./utilities/ValidateWrapper";
import NumberFormat from "react-number-format";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

const accountType = ['Грузовладелец', 'Перевозчик', 'Перевозчик-Грузовладелец']

const EditProfileForm = () => {

    const [images, setImages] = useState([{data_url: '/img/users/no-photo.png'}]);
    const [entity, setEntity] = useState('entity');
    const [typeInitialForm, setTypeInitialForm] = useState(
        {
            entity: '1',
            nameOfCompany: '',
            INN: '',
            accTypeValue: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
        }
    )
    const maxNumber = 1;
    const handleChange = e => {
        let val = e.target.value;
        setEntity(val);
    };

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList)
    };
    
    useEffect(() => {
        (images?.length === 0) && setImages([{data_url: '/img/users/no-photo.png'}])
    }, [images?.length])

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            ...typeInitialForm
        }
    })

    useEffect(() => {
        (entity === 'entity')
            ? setTypeInitialForm({
                entity: '1',
                nameOfCompany: '',
                INN: '',
                accTypeValue: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                city: '',
            })
            : setTypeInitialForm({
                entity: '0',
                accTypeValue: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                city: '',
            })
    }, [entity])

    const submitForm = () => {
        const formData = new FormData()
        const request = {...typeInitialForm, images}
        for (const key in request) {
            formData.append(key, request[key])
        }
        try {
            // request code
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            className="form-profile"
            onSubmit={handleSubmit(submitForm)}
        >
            <div className='row flex-md-row-reverse'>
                <div className='col-md-4'>
                    <div className='profile-picture mx-auto mb-4 mb-sm-5'>
                        <ImageUploading
                            value={images}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                                  imageList,
                                  onImageUpload,
                                  onImageRemoveAll,
                                  onImageUpdate,
                                  onImageRemove,
                                  isDragging,
                                  dragProps,
                              }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <div className="imgs-box">
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image['data_url']} alt="" width="100"/>
                                                <div className="image-item__btn-wrapper">
                                                    <button
                                                        type="button"
                                                        onClick={() => onImageUpdate(index)}
                                                    >
                                                        <img
                                                            src="/img/icons/add_photo_in_userprofile.svg"
                                                            style={{width: 21 + "%"}}
                                                            alt=''
                                                        />
                                                        Загрузить фото
                                                    </button>
                                                    <button
                                                        onClick={() => onImageRemove(index)}
                                                    >
                                                        <img
                                                            src="/img/icons/delete_photo_in_userprofile.svg"
                                                            alt=""
                                                            style={{width: 21 + "%"}}
                                                        />
                                                        Удалить фото
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                </div>
                <div className='col-md-8'>
                    <fieldset className='row row-cols-xxl-2 g-3 g-sm-4 mb-4 mb-sm-5'>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="entity"
                                    value="individual"
                                    onChange={(e) => {
                                        handleChange(e)
                                        setTypeInitialForm(prevState => ({...prevState, entity: '0'}))
                                    }}
                                />
                                <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Физическое лицо</span>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="entity"
                                    defaultChecked={true}
                                    value="entity"
                                    onChange={(e) => {
                                        handleChange(e)
                                        setTypeInitialForm(prevState => ({...prevState, entity: '1'}))
                                    }}
                                />
                                <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Юридическое лицо</span>
                            </label>
                        </div>
                    </fieldset>

                    <fieldset className='row g-sm-4 mb-sm-4'>
                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5 fs-12'>Тип аккаунта:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <CustomSelect
                                className="inp w-100 fs-12"
                                name="account-type"
                                checkedOptions={[typeInitialForm?.accTypeText]}
                                options={accountType}
                                align="left"
                                callback={({title, value}) => {
                                    setTypeInitialForm(prevState => {
                                        return {
                                            ...prevState,
                                            'accTypeText': title,
                                            'accTypeValue': value
                                        }
                                    })
                                }}
                            />
                        </div>
                    </fieldset>
                    {
                        /* Только для юр лиц */
                        (entity === 'entity') &&
                        <fieldset className='row g-sm-4 mb-sm-4'>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Название компании:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <ValidateWrapper error={errors?.nameOfCompany}>
                                    <input
                                        type="text"
                                        className='fs-12'
                                        placeholder='Название компании'
                                        value={typeInitialForm?.nameOfCompany}
                                        {...register('nameOfCompany', {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: {
                                                value: 1,
                                                message: 'Минимальная длина 1 символ'
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "Максимальная длина 50 символов"
                                            }
                                        })}
                                        onChange={(e) =>
                                            setTypeInitialForm(prevState =>
                                                ({...prevState, 'nameOfCompany': e.target.value}))
                                        }
                                    />
                                </ValidateWrapper>
                            </div>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>ИНН:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <ValidateWrapper error={errors?.INN}>
                                    <input
                                        type="number"
                                        className='fs-12'
                                        placeholder='ИНН'
                                        value={typeInitialForm?.INN}
                                        {...register('INN', {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: {
                                                value: 1,
                                                message: 'Минимум 10 цифр'
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: 'Максимум 10 цифр'
                                            },

                                        })}
                                        onChange={(e) => {
                                            setTypeInitialForm(prevState =>
                                                ({...prevState, 'INN': e.target.value}))
                                        }}
                                    />
                                </ValidateWrapper>
                            </div>
                        </fieldset>
                    }
                    <fieldset className='row g-sm-4'>
                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5 fs-12'>Имя:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <ValidateWrapper error={errors?.firstName}>
                                <input
                                    type="text"
                                    className='fs-12'
                                    placeholder='Имя'
                                    value={typeInitialForm?.firstName}
                                    {...register('firstName', {
                                        required: "Поле обязательно к заполнению",
                                        minLength: {
                                            value: 2,
                                            message: 'Минимальная длина поля 2 символа'
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина поля 50 символов'
                                        }
                                    })}
                                    onChange={(e) => {
                                        setTypeInitialForm(prevState =>
                                            ({...prevState, 'firstName': e.target.value})
                                        )
                                    }}
                                />
                            </ValidateWrapper>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5 fs-12'>Фамилия:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <ValidateWrapper error={errors?.lastName}>
                                <input
                                    type="text"
                                    className='fs-12'
                                    placeholder='Фамилия'
                                    value={typeInitialForm?.lastName}
                                    {...register('lastName', {
                                        required: 'Поле обязательно к заполнению',
                                        minLength: {
                                            value: 1,
                                            message: 'Минимальная длина поля 2 символа'
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина поля 50 символов'
                                        }
                                    })}
                                    onChange={(e) => {
                                        setTypeInitialForm(prevState => ({...prevState, 'lastName': e.target.value}))
                                    }}
                                />
                            </ValidateWrapper>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5 fs-12'>Email:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <ValidateWrapper error={errors?.email}>
                                <input
                                    type="email"
                                    className='fs-12'
                                    placeholder='Email'
                                    value={typeInitialForm?.email}
                                    {...register('email', {
                                        required: 'Поле обязательно к заполнению',
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'укажите правильный формат электронной почты'
                                        }
                                    })}
                                    onChange={(e) => {
                                        setTypeInitialForm(prevState => ({...prevState, 'email': e.target.value}))
                                    }}
                                />
                            </ValidateWrapper>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5 fs-12'>Телефон:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <ValidateWrapper error={errors?.phone}>
                                <NumberFormat
                                    placeholder="Телефон"
                                    format="+ 7 ### ### ## ## "
                                    className='fs-12'
                                    value={typeInitialForm?.phone}
                                    onValueChange={(e) => {
                                        setTypeInitialForm(prevState => ({...prevState, 'phone': e.value}))
                                    }}
                                />
                            </ValidateWrapper>
                            <div className='fs-08 gray-4'>Этот номер будет виден другим пользователям сайта</div>
                        </div>

                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5 fs-12'>Город:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <ValidateWrapper error={errors?.city}>
                                <input
                                    type="text"
                                    className='fs-12'
                                    placeholder='Город'
                                    value={typeInitialForm?.city}
                                    {...register('city', {
                                        required: 'Поле обязательно для заполнения',
                                        minLength: {
                                            value: 2,
                                            message: 'Минимум 2 символа'
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимум 50 символов'
                                        }
                                    })}
                                    onChange={(e) => {
                                        setTypeInitialForm(prevState => ({...prevState, 'city': e.target.value}))
                                    }}
                                />
                            </ValidateWrapper>
                        </div>
                    </fieldset>

                    <div
                        className='row row-cols-2 row-cols-xxl-3 gx-2 gx-sm-4 justify-content-end fs-12 mt-3 mt-sm-4'>
                        <div>
                            <NavLink to="/personal-account/profile" className='btn btn-1 w-100'>Отмена</NavLink>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-2 w-100'>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditProfileForm;
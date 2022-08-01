import React, {useEffect, useState} from 'react';
import ImageUploading from "react-images-uploading";
import CustomSelect from "./utilities/CustomSelect";
import ValidateWrapper from "./utilities/ValidateWrapper";
import NumberFormat from "react-number-format";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {deleteUserAvatar, getAccountType} from "../API/profile";
import {updateUserInfo} from "../API/profile";
import useAxiosPrivate from "../hooks/axiosPrivate";
import {useSelector} from "react-redux";

const EditProfileForm = () => {

    const currentUser = useSelector(state => state.currentUser.data.user)
    const axiosPrivate = useAxiosPrivate()
    const [images, setImages] = useState([{data_url: '/img/users/no-photo.png'}]);
    const [entity, setEntity] = useState('entity');
    const [accType, setAccType] = useState({
        data: [],
        arrayType: [],
    })
    const [typeInitialForm, setTypeInitialForm] = useState(
        {

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


    useEffect(() => {
        getAccountType()
            .then(info => setAccType(prevState =>
                ({...prevState, data: info, arrayType: info.map(i => i.name)})))
            .catch(error => console.log(error))
    }, [])


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
                subject: true,
                companyName: currentUser.companyName || '',
                taxIdentificationNumber: currentUser.taxIdentificationNumber || '',
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                city: currentUser.city || '',
            })
            : setTypeInitialForm({
                subject: false,
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                city: currentUser.city || '',
            })
    }, [entity, currentUser])

    const submitForm = () => {
        const formData = new FormData()
        const avatar = images[0]?.file
        const request = (avatar === undefined) ? {...typeInitialForm} : {...typeInitialForm, avatar}

        for (const key in request) {
            formData.append(key, request[key])
        }
        try {
           const response = updateUserInfo(37, formData, axiosPrivate)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAvatar = () => {
        try{
            const response = deleteUserAvatar(37, axiosPrivate)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadPhoto = () => {
        return currentUser.avatar && `https://eritrans.ru/uploads/./${currentUser.avatar}`
    }

    console.log(typeInitialForm)

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
                                                <img src={uploadPhoto() || image['data_url']} alt="" width="100"/>
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
                                                        onClick={() => {
                                                            onImageRemove(index)
                                                            deleteAvatar()
                                                        }}
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
                    {currentUser &&
                        <fieldset className='row row-cols-xxl-2 g-3 g-sm-4 mb-4 mb-sm-5'>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="entity"
                                    value="individual"
                                    defaultChecked={!currentUser.subject}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setTypeInitialForm(prevState => ({...prevState, subject: false}))
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
                                    value="entity"
                                    defaultChecked={currentUser.subject}
                                    onChange={(e) => {
                                        handleChange(e)
                                        setTypeInitialForm(prevState => ({...prevState, subject: true}))
                                    }}
                                />
                                <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">Юридическое лицо</span>
                            </label>
                        </div>
                    </fieldset>
                    }

                    <fieldset className='row g-sm-4 mb-sm-4'>
                        <div className='col-sm-4 mb-1 mb-sm-0'>
                            <div className='gray-2 title-font fw-5 fs-12'>Тип аккаунта:</div>
                        </div>
                        <div className='col-sm-8 mb-3 mb-sm-0'>
                            <CustomSelect
                                className="inp w-100 fs-12"
                                name="account-type"
                                checkedOptions={[typeInitialForm?.accTypeText || currentUser.roleForUser]}
                                options={accType?.arrayType}
                                align="left"
                                callback={({title, value}) => {
                                    setTypeInitialForm(prevState => {
                                        return {
                                            ...prevState,
                                            'accTypeText': title,
                                            'roleId': value + 2
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
                                <ValidateWrapper error={errors?.companyName}>
                                    <input
                                        type="text"
                                        className='fs-12'
                                        placeholder='Название компании'
                                        value={typeInitialForm?.companyName}
                                        {...register('companyName', {
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
                                                ({...prevState, 'companyName': e.target.value}))
                                        }
                                    />
                                </ValidateWrapper>
                            </div>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>ИНН:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <ValidateWrapper error={errors?.taxIdentificationNumber}>
                                    <input
                                        type="number"
                                        className='fs-12'
                                        placeholder='ИНН'
                                        value={typeInitialForm?.taxIdentificationNumber}
                                        {...register('taxIdentificationNumber', {
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
                                                ({...prevState, 'taxIdentificationNumber': e.target.value}))
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
                                    format="+7##########"
                                    className='fs-12'
                                    value={typeInitialForm?.phone}
                                    onValueChange={(values) => {
                                        const {formattedValue, value} = values
                                        setTypeInitialForm(prevState => ({...prevState, 'phone': formattedValue}))
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
                            <button
                                type='submit'
                                className='btn btn-2 w-100'

                            >
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditProfileForm;
import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import CustomSelect from '../../components/utilities/CustomSelect';
import ImageUploading from "react-images-uploading";
import NumberFormat from "react-number-format";

const accountType = ['Грузовладелец', 'Перевозчик', 'Перевозчик-Грузовладелец']

export default function ProfileEdit() {

    const [images, setImages] = useState([{data_url: '/img/users/no-photo.png'}]);
    const [entity, setEntity] = useState('entity');
    const [formInfo, setFormInfo] = useState({
        INN: '',
        city: '',
        email: '',
        firstName: '',
        lastName: '',
        nameOfCompany: '',
        phone: '',
        accTypeValue: ''
    })
    const maxNumber = 1;

    const handleChange = e => {
        let val = e.target.value;
        setEntity(val);
    };

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const submitForm = () => {
        const formData = new FormData()
        const request = {...formInfo, images}
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
        <div className='box p-4 p-xl-5'>
            <Link to="/personal-account" className='fs-12 fw-5 d-block d-lg-none mb-3 mb-sm-5'><span
                className='green fs-15 me-2'>⟵</span> Назад</Link>
            <h1 className='dark-blue text-center d-lg-none'>Редакция профиля</h1>
            <form className="form-profile">
                <div className='row flex-md-row-reverse'>
                    <div className='col-md-4'>
                        <div className='profile-picture mx-auto mb-4 mb-sm-5'>
                                <ImageUploading
                                    multiple
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
                                                        <img src={image['data_url'] } alt="" width="100"/>
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
                                        onChange={(e) => handleChange(e)}
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
                                        onChange={(e) => handleChange(e)}
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
                                    checkedOptions={[formInfo.accTypeText]}
                                    options={accountType}
                                    align="left"
                                    callback={({title, value}) => {
                                        setFormInfo(prevState => {
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
                                    <input
                                        type="text"
                                        className='fs-12'
                                        placeholder='Название компании'
                                        value={formInfo.nameOfCompany}
                                        onChange={(e) =>
                                            setFormInfo(prevState => {
                                            return {
                                                ...prevState,
                                                'nameOfCompany': e.target.value
                                            }}
                                        )}
                                    />
                                </div>
                                <div className='col-sm-4 mb-1 mb-sm-0'>
                                    <div className='gray-2 title-font fw-5 fs-12'>ИНН:</div>
                                </div>
                                <div className='col-sm-8 mb-3 mb-sm-0'>
                                    <input
                                        type="text"
                                        className='fs-12'
                                        placeholder='ИНН'
                                        value={formInfo.INN}
                                        onChange={(e) => {
                                            setFormInfo(prevState => {
                                                return {
                                                    ...prevState,
                                                    'INN': e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </fieldset>
                        }
                        <fieldset className='row g-sm-4'>
                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Имя:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input
                                    type="text"
                                    className='fs-12'
                                    placeholder='Имя'
                                    value={formInfo['firstName']}
                                    onChange={(e) => {
                                        setFormInfo( prevState => {
                                            return {
                                                ...prevState,
                                                'firstName': e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Фамилия:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input
                                    type="text"
                                    className='fs-12'
                                    placeholder='Фамилия'
                                    value={formInfo['lastName']}
                                    onChange={(e) => {
                                        setFormInfo(prevState => {
                                            return {
                                                ...prevState,
                                                'lastName': e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Email:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input
                                    type="email"
                                    className='fs-12'
                                    placeholder='Email'
                                    value={formInfo.email}
                                    onChange={(e) => {
                                        setFormInfo(prevState => {
                                            return {
                                                ...prevState,
                                                'email': e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Телефон:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <NumberFormat
                                    placeholder="Телефон"
                                    format="+ 7 ### ### ## ## "
                                    className='fs-12'
                                    value={formInfo.phone}
                                    onValueChange={(e) => {
                                        setFormInfo(prevState => {
                                            return {
                                                ...prevState,
                                                'phone': e.value
                                            }
                                        })
                                    }}
                                />
                                <div className='fs-08 gray-4'>Этот номер будет виден другим пользователям сайта</div>
                            </div>

                            <div className='col-sm-4 mb-1 mb-sm-0'>
                                <div className='gray-2 title-font fw-5 fs-12'>Город:</div>
                            </div>
                            <div className='col-sm-8 mb-3 mb-sm-0'>
                                <input
                                    type="text"
                                    className='fs-12'
                                    placeholder='Город'
                                    value={formInfo['city']}
                                    onChange={(e) => {
                                        setFormInfo(prevState => {
                                            return {
                                                ...prevState,
                                                'city': e.target.value
                                            }
                                        })
                                    }}
                                />
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
        </div>
    )
}
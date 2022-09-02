import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import NumberFormat from "react-number-format";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteUserAvatar, getAccountType } from "../API/profile";
import { updateUserInfo } from "../API/profile";
import useAxiosPrivate from "../hooks/axiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { onInputHandler, onRadioHandler } from "../helpers/collectForms";
import CustomModal from "./utilities/CustomModal";
import { setCurrentUser } from "../store/reducers/currentUser";
import PhoneInput from "react-phone-input-2";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.data.user);
  const currentToken = useSelector((state) => state.currentUser.data.token);
  const axiosPrivate = useAxiosPrivate();
  const [images, setImages] = useState([
    { data_url: "/img/users/no-photo.png" },
  ]);
  const [selectAccType, setSelectAccType] = useState(null);
  const [errorsValid, setErrorsValid] = useState(null)
  const [btnSubjectType, setBtnSubjectType] = useState(0);
  const [accType, setAccType] = useState({
    data: [],
    forSelect: [],
  });
  const [data, setData] = useState({
    avatar: "",
    city: "",
    companyName: "",
    email: "",
    firstName: "",
    fullName: "",
    lastName: "",
    phone: "",
    roleId: "",
    subject: "",
    taxIdentificationNumber: "",
  });

  useEffect(() => {
    setData({
      avatar: currentUser?.avatar,
      city: currentUser?.city,
      companyName: currentUser?.companyName,
      email: currentUser?.email,
      firstName: currentUser?.firstName,
      fullName: currentUser?.fullName,
      lastName: currentUser?.lastName,
      phone: currentUser?.phone,
      roleId: currentUser?.roleId,
      subject: currentUser?.subject,
      taxIdentificationNumber: currentUser?.taxIdentificationNumber,
    });
    setBtnSubjectType(Number(currentUser?.subject));
    setSelectAccType({
      value: currentUser?.roleId,
      label: currentUser?.roleForUser,
    });
    setImages(
      currentUser?.avatar !== null || undefined
        ? [{ data_url: uploadPhoto() }]
        : [{ data_url: "/img/users/no-photo.png" }]
    );
  }, [currentUser]);

  useEffect(() => {
    getAccountType()
      .then((info) =>
        setAccType((prevState) => ({
          ...prevState,
          data: info,
          forSelect: info.map((i) => ({ label: i.name, value: i.id })),
        }))
      )
      .catch((error) => console.log(error));
  }, []);

  const maxNumber = 1;
  const handleChange = (e) => {
    let val = e.target.value;
    setBtnSubjectType(Number(val));
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  useEffect(() => {
    images?.length === 0 &&
      setImages([{ data_url: "/img/users/no-photo.png" }]);
  }, [images?.length]);

  const submitForm = (e) => {
    e.preventDefault();

    const avatar = images[0]?.file;
    const req = { ...data, avatar };
    avatar === undefined && delete req?.avatar;
    const formData = new FormData();

    for (const key in req) {
      formData.append(key, req[key]);
    }
    updateUserInfo(axiosPrivate, currentUser?.id, formData)
      .then((res, rej) => {
        setShowCompleteFix({
          show: true,
          complete: true,
        });
        const payload = {
          user: res?.data?.body,
          token: currentToken,
        };
        dispatch(setCurrentUser(payload));
        setTimeout(() => {
          setShowCompleteFix({
            show: false,
            complete: null,
          });
          navigate("/personal-account/profile");
        }, 1400);
      })
      .catch((errors) => {
        setShowCompleteFix({
          show: true,
          complete: false,
        });
        const arrErrors = errors?.response?.data?.errors?.errors
        arrErrors.forEach(
            error => setErrorsValid(prev => ({
              ...prev,
              [error.field]: {
                message: error.message
              }
            }))
        )
      });
  };

  useEffect(() => {
    if (btnSubjectType === 0 || Number(currentUser.subject) === 0) {
      delete data?.companyName;
      delete data?.taxIdentificationNumber;
    } else if (btnSubjectType === 1 || Number(currentUser.subject) === 1) {
      setData((prevState) => ({
        ...prevState,
        companyName: currentUser.companyName,
        taxIdentificationNumber: currentUser.taxIdentificationNumber,
      }));
    }
  }, [btnSubjectType, currentUser]);

  const deleteAvatar = (e) => {
    e.preventDefault();
    try {
      deleteUserAvatar(axiosPrivate, currentUser?.id);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhoto = () => {
    return (
      currentUser?.avatar &&
      `https://api.eritrans.ru/uploads/./${currentUser.avatar}`
    );
  };

  const loadOptions = async (searchKey) => {
    const defaultValue = data?.roleId;
    setSelectAccType(
      accType?.forSelect?.find((item) => item.value === defaultValue)
    );

    if (!searchKey) {
      return await accType?.forSelect;
    } else {
      return await accType?.forSelect?.filter((item) =>
        item.label.includes(searchKey)
      );
    }
  };

  const [showCompleteFix, setShowCompleteFix] = useState({
    show: false,
    complete: null,
  });


  return (
    <form className="form-profile" onSubmit={submitForm}>
      <div className="row flex-md-row-reverse">
        <div className="col-md-4">
          <div className="profile-picture mx-auto mb-4 mb-sm-5 text-center">
            <ImageUploading
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              maxFileSize={1000000}
              fileSizeError=" file size is too big"
              acceptType={["JPG", "JPEG", "PNG"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors,
              }) => (
                <>
                <div className="upload__image-wrapper">
                  <div className="imgs-box">
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image["data_url"]} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <button
                            type="button"
                            onClick={() => onImageUpdate(index)}
                          >
                            <img
                              src="/img/icons/add_photo_in_userprofile.svg"
                              style={{ width: 21 + "%" }}
                              alt=""
                            />
                            Загрузить фото
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              onImageRemove(index);
                              deleteAvatar(e);
                            }}
                          >
                            <img
                              src="/img/icons/delete_photo_in_userprofile.svg"
                              alt=""
                              style={{ width: 21 + "%" }}
                            />
                            Удалить фото
                          </button>
                        </div>
                      </div>
                    ))}
                    
                  </div>
                </div>
                <span className="text-danger">{errors?.maxFileSize && "Максимальный размер файла 1 мб"}</span>
                <span className="text-danger">{errors?.acceptType && "Поддерживаемые форматы файла: JPEG, JPG, PNG"}</span>
                </>
              )}
            </ImageUploading>
          </div>
        </div>
        <div className="col-md-8">
          {currentUser && (
            <fieldset className="row row-cols-xxl-2 g-3 g-sm-4 mb-4 mb-sm-5">
              <div>
                <label>
                  <input
                    type="radio"
                    name="subject"
                    value={0}
                    checked={btnSubjectType === 0}
                    onChange={(e) => {
                      onRadioHandler(e, setData, true);
                    }}
                    onClick={(e) => handleChange(e)}
                  />
                  <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                    Физическое лицо
                  </span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="subject"
                    value={1}
                    checked={btnSubjectType === 1}
                    onChange={(e) => {
                      onRadioHandler(e, setData, true);
                    }}
                    onClick={(e) => handleChange(e)}
                  />
                  <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                    Юридическое лицо
                  </span>
                </label>
              </div>
            </fieldset>
          )}

          <fieldset className="row g-sm-4 mb-sm-4">
            <div className="col-sm-4 mb-1 mb-sm-0">
              <div
                  className="gray-2 title-font fw-5 fs-12"
              >
                Тип аккаунта:
              </div>
            </div>
            <div className="col-sm-8 mb-3 mb-sm-0">
              <AsyncSelect
                className="fs-12 w-100"
                classNamePrefix="react-select"
                placeholder={"Выберите..."}
                loadOptions={loadOptions}
                defaultOptions={accType.forSelect}
                value={
                  selectAccType &&
                  accType.forSelect?.find(
                    (item) => item.value === selectAccType.value
                  )
                }
                onChange={(val) => {
                  setSelectAccType({ value: val.value, label: val.label });
                  setData((prevState) => ({
                    ...prevState,
                    roleId: val.value,
                  }));
                }}
              />
            </div>
          </fieldset>
          {
            /* Только для юр лиц */
            btnSubjectType === 1 && (
              <fieldset className="row g-sm-4 mb-sm-4">
                <div className="col-sm-4 mb-1 mb-sm-0">
                  <div
                      className="gray-2 title-font fw-5 fs-12"
                  >
                    Название компании:
                  </div>
                </div>
                <div className="col-sm-8 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="fs-12"
                    name="companyName"
                    placeholder="Название компании"
                    value={data?.companyName || ''}
                    onChange={(e) => {
                      onInputHandler(e, setData)
                    }}
                  />
                </div>
                <div className="col-sm-4 mb-1 mb-sm-0">
                  <div
                      className="gray-2 title-font fw-5 fs-12"
                      style={{color: (errorsValid?.taxIdentificationNumber) && 'red'}}
                  >
                    ИНН:
                  </div>
                </div>
                <div className="col-sm-8 mb-3 mb-sm-0">
                  <input
                    type="number"
                    className="fs-12"
                    placeholder="ИНН"
                    name="taxIdentificationNumber"
                    value={data?.taxIdentificationNumber || ''}
                    onChange={(e) => {
                      onInputHandler(e, setData)
                      setErrorsValid(prev => ({...prev, taxIdentificationNumber: null}))
                    }}
                  />
                  {(errorsValid?.taxIdentificationNumber) && <span style={{color: 'red'}}>Не верный формат или ИНН занят!</span>}
                </div>
              </fieldset>
            )
          }
          <fieldset className="row g-sm-4">
            <div className="col-sm-4 mb-1 mb-sm-0">
              <div className="gray-2 title-font fw-5 fs-12">Имя:</div>
            </div>
            <div className="col-sm-8 mb-3 mb-sm-0">
              <input
                type="text"
                className="fs-12"
                placeholder="Имя"
                name="firstName"
                value={data?.firstName}
                onChange={(e) => onInputHandler(e, setData)}
              />
            </div>

            <div className="col-sm-4 mb-1 mb-sm-0">
              <div className="gray-2 title-font fw-5 fs-12">Фамилия:</div>
            </div>
            <div className="col-sm-8 mb-3 mb-sm-0">
              <input
                type="text"
                className="fs-12"
                placeholder="Фамилия"
                name="lastName"
                value={data?.lastName}
                onChange={(e) => onInputHandler(e, setData)}
              />
            </div>

            <div className="col-sm-4 mb-1 mb-sm-0">
              <div
                  className="gray-2 title-font fw-5 fs-12"
                  style={{color: (errorsValid?.email) && 'red'}}
              >
                Email:
              </div>
            </div>
            <div className="col-sm-8 mb-3 mb-sm-0">
              <input
                type="email"
                className="fs-12"
                placeholder="Email"
                name="email"
                value={data?.email}
                onChange={(e) => {
                  onInputHandler(e, setData)
                  setErrorsValid(prev => ({...prev, email: null}))
                }}
              />
              {(errorsValid?.email) && <span style={{color: 'red'}}>Не верный формат или email занят!</span>}
            </div>

            <div className="col-sm-4 mb-1 mb-sm-0">
              <div
                  className="gray-2 title-font fw-5 fs-12"
                  style={{color: (errorsValid?.phone) && 'red'}}
              >
                Телефон:
              </div>
            </div>
            <div className="col-sm-8 mb-3 mb-sm-0">
              <PhoneInput
                  inputClass='form-control'
                  inputStyle={{fontSize: 1.2 + 'em'}}
                  specialLabel={''}
                  country={'ru'}
                  countryCodeEditable={false}
                  disableDropdown={true}
                  value={data?.phone}
                  onChange={(phone) => {
                    setData(prevState => ({...prevState, phone: `+${phone}`}))
                    setErrorsValid(prev => ({...prev, phone: null}))
                  }}
              />
              {(errorsValid?.phone) && <span style={{color: 'red'}}>Не верный формат или номер занят!</span>}
              <div className="fs-08 gray-4">
                Этот номер будет виден другим пользователям сайта
              </div>
            </div>

            <div className="col-sm-4 mb-1 mb-sm-0">
              <div className="gray-2 title-font fw-5 fs-12">Город:</div>
            </div>
            <div className="col-sm-8 mb-3 mb-sm-0">
              <input
                type="text"
                className="fs-12"
                placeholder="Город"
                name="city"
                value={data?.city}
                onChange={(e) => onInputHandler(e, setData)}
              />
            </div>
          </fieldset>

          <div className="row row-cols-2 row-cols-xxl-3 gx-2 gx-sm-4 justify-content-end fs-12 mt-3 mt-sm-4">
            <div>
              <NavLink
                to="/personal-account/profile"
                className="btn btn-1 w-100"
              >
                Отмена
              </NavLink>
            </div>
            <div>
              <button type="submit" className="btn btn-2 w-100">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        className="modal__inUserProfile"
        isShow={showCompleteFix.show}
        setIsShow={setShowCompleteFix}
        closeButton={false}
        size={"sm"}
      >
        {showCompleteFix.complete === true && (
          <div className="text-center">
            <span className="fs-12">
              Изменения успешно применены переход на страницу профиля
            </span>
          </div>
        )}
        {showCompleteFix.complete === false && (
          <div className="text-center">
            <span className="fs-12">
              Введены не верные данные или произошла ошибка
            </span>
          </div>
        )}
      </CustomModal>
    </form>
  );
};

export default EditProfileForm;

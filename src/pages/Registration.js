import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CustomSelect from "../components/utilities/CustomSelect";
import InputPassword from "../components/utilities/InputPassword";
import FormErrorMessage from "../components/utilities/FormErrorMessage";
import Joi from "joi";
import axiosPrivate from "../API/axiosPrivate";
import apiRoutes from "../API/config/apiRoutes";
import apiResponseMessages from "../API/config/apiResponseMessages";
import { useDispatch } from "react-redux/es/exports";
import { setCurrentUser } from "../store/reducers/currentUser";
import { useNavigate } from "react-router-dom";
import { handleRemeberMe } from "../API/auth";
import AlertCustom from "../components/utilities/AlertCustom";

const formValueDefault = {
    accountType: undefined,
    email: "",
    verifyCode: "",
    password: "",
    passwordConfirm: "",
};

const formErrorDefault = {
    email: "",
    password: "",
    passwordConfirm: "",
    verifyCode: "",
};

const emailSchemaOptions = Joi.string()
    .email({tlds: {allow: false}})
    .min(4)
    .required()
    .messages({
        "string.empty": "Email адрес не может быть пустым",
        "string.min": `Email адрес не может быть короче 4 символов`,
        "string.max": `Email адрес не может быть длиннее 20 символов`,
        "string.email": `Введите Email адрес корректного формата`,
    });

const emailSchema = Joi.object({
    email: emailSchemaOptions,
});

const schema = Joi.object({
    email: emailSchemaOptions,
    verifyCode: Joi.string()
        .required()
        .min(6)
        .max(6)
        .messages({
            "string.empty": "Код не может быть пустым",
            "string.min": `Код не может быть короче 6 символов`,
            "string.max": `Код не может быть длиннее 6 символов`,
        }),
    password: Joi.string()
        .pattern(/.*[A-Z].*/)
        .pattern(/.*[0-9].*/)
        .min(8)
        .required()
        .messages({
            "string.empty": "Пароль не может быть пустым",
            "string.pattern.base":
                "Пароль должен содержать одну заглавную букву и одну цифру",
            "string.min": `Пароль не может быть короче 8 символов`,
            "string.max": `Пароль не может быть длиннее 20 символов`,
        }),
    passwordConfirm: Joi.string().required().messages({
        "string.empty": "Подтверждение пароля не может быть пустым",
    }),
    accountType: Joi.number(),
});

export default function Registration() {
  const [formValue, setFormValue] = useState(formValueDefault);
  const [formErrors, setFormErrors] = useState(formErrorDefault);
  const [rememberMe, setRememberMe] = useState(false);
  const [accountTypes, setAccountTypes] = useState([]);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState();
  const [alertMessage, setAlertMessage] = useState("");

  const customSelectOptions = accountTypes.map((item) => item?.name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
        const getAccountTypes = async () => {
            try {
                const response = await axiosPrivate.get(`${apiRoutes.ACCOUNT_TYPES}`);
                setAccountTypes(response.data.body);
            } catch (error) {
                console.log(error);
            }
        };

        getAccountTypes();
    }, []);

    const handleSelectChange = ({value}) => {
        let accountType = (value === 1) ? 2 : value

  const handleFormChange = (e) => {
    setFormValue((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
    setFormErrors((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
  };

  const handleSelectChange = (item) => {
    const itemIdx = item.value;
    const accountType = accountTypes[itemIdx];

    setFormValue((prev) => {
      return { ...prev, accountType: accountType };
    });
    setFormErrors((prev) => {
      return { ...prev, accountType: "" };
    });
  };

  const handleEmailVerify = async () => {
    const result = emailSchema.validate({ email: formValue.email });
    if (result.error) {
      const errorMessage = result.error.details[0].message;
      setFormErrors((prev) => ({ ...prev, email: errorMessage }));
      return;
    }
    try {
      const response = await axiosPrivate.post(`${apiRoutes.EMAIL_VERIFY}`, {
        email: formValue.email,
      });
      if (response.data?.status === 200) {
        setAlertStatus("success");
        setAlertMessage("Код подтверждения отправлен на почту");
        setShowAlert(true);
        setIsEmailVerified(true)
      }
    } catch (error) {
      if (error.response.data.code === "VALIDATION_ERROR") {
        setFormErrors((prev) => {
          return { ...prev, email: apiResponseMessages.VALIDATION_ERROR };
        });
        return
      }
      if (error.response.data.code === "VERIFY_CODE_EXISTS") {
        setFormErrors((prev) => {
          return { ...prev, email: apiResponseMessages.VERIFY_CODE_EXISTS };
        });
        return
      }
      setAlertStatus("error");
      setAlertMessage("Попробуйте снова");
      setShowAlert(true);
    }
  };

  const handleFormSubmit = async () => {
    if(!isEmailVerified){
      setAlertStatus("error");
      setAlertMessage("Подтвердите адрес эл.почты");
      setShowAlert(true);
      return
    }
    let hasError = false;
    if (!formValue.accountType) {
      setFormErrors((prev) => {
        return { ...prev, accountType: "Выберите тип аккаунта" };
      });
      hasError = true;
    }

    let newFormValue = {
      ...formValue,
      accountType: formValue?.accountType?.id,
    };

    const result = schema.validate(newFormValue, { abortEarly: false });
    if (result.error) {
      handleFormErrors(result.error.details);
      hasError = true;
    }

    if (formValue.password !== formValue.passwordConfirm) {
      setFormErrors((prev) => {
        return { ...prev, passwordConfirm: "Пароли не совпадают" };
      });
      hasError = true;
    }

    if (hasError) return;

    try {
      newFormValue = { ...newFormValue, roleId: formValue.accountType.id };
      delete newFormValue.accountType;
      const response = await axiosPrivate.post(
        `${apiRoutes.REGISTER}`,
        newFormValue
      );

      const { token, user } = response.data.body;
      const payload = {
        token,
        user,
      };
      handleRemeberMe(rememberMe);

      dispatch(setCurrentUser(payload));
      navigate("/");
      return;
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {

        setFormValue((prev) => {
            return {...prev, accountType: accountType};
        });
        return;
      }
    }
    };

    // return (
  //   <main className="bg-white position-relative">
  //     <AlertCustom
  //       open={showAlert}
  //       variant={alertStatus}
  //       onClick={() => setShowAlert(false)}
  //     >
  //       {alertMessage}
  //     </AlertCustom>
  //     <img
  //       src="/img/bg/bg-entrance.jpg"
  //       className="entrance-bg"
  //       alt="грузоперевозки"
  //     />
  //     <section id="sec-10" className="container py-3 py-sm-4 py-lg-5">
  //       <Link to="/" className="fs-12">
  //         <span className="green fs-15 me-2">⟵</span> Назад
  //       </Link>

  //       <div className="row gx-md-5 justify-content-between">
  //         <div className="col-md-6 col-lg-5 offset-lg-1">
  //           <h1 className="text-center dark-blue mt-3 mt-sm-4 mt-lg-5">
  //             Регистрация
  //           </h1>
  //           <form className="fs-12 form-registration">
  //             <label>Тип аккаунта</label>
  //             <CustomSelect
  //               name="account-type"
  //               className="inp w-100 mt-2"
  //               multy={false}
  //               options={customSelectOptions}
  //               alignment="left"
  //               callback={handleSelectChange}
  //               checkedOptions={[formValue.accountType?.name]}
  //             />
  //             <FormErrorMessage>{formErrors.accountType}</FormErrorMessage>
  //             <label className="mt-3 email-registration">
  //               Email
  //               <input
  //                 type="email"
  //                 className="mt-2"
  //                 name="email"
  //                 value={formValue.email}
  //                 onChange={handleFormChange}
  //               />
  //               <button
  //                 type="button"
  //                 className="button-registration text-uppercase"
  //                 onClick={handleEmailVerify}
  //               >
  //                 Подтвердить
  //               </button>
  //             </label>
  //             <FormErrorMessage>{formErrors.email}</FormErrorMessage>
  //             {isEmailVerified && (
  //               <div>
  //                 <label className="mt-3">Введите код</label>
  //                 <input
  //                   type="number"
  //                   name="verifyCode"
  //                   className="mt-2"
  //                   value={formValue.verifyCode}
  //                   onChange={handleFormChange}
  //                 />
  //               </div>
  //             )}
  //             {isEmailVerified && <FormErrorMessage>{formErrors.verifyCode}</FormErrorMessage>}
  //             <label className="mt-3">Пароль</label>
  //             <InputPassword
  //               name="password"
  //               className="mt-2"
  //               value={formValue.password}
  //               onChange={handleFormChange}
  //             />
  //             <FormErrorMessage>{formErrors.password}</FormErrorMessage>
  //             <label className="mt-3">Подтверждение пароля</label>
  //             <InputPassword
  //               name="passwordConfirm"
  //               className="mt-2"
  //               value={formValue.passwordConfirm}
  //               onChange={handleFormChange}
  //             />
  //             <FormErrorMessage>{formErrors.passwordConfirm}</FormErrorMessage>
  //             <label className="mt-3">
  //               <input
  //                 type="checkbox"
  //                 name="remember"
  //                 className="me-2"
  //                 defaultChecked={formValue.remember}
  //                 value={rememberMe}
  //                 onChange={() => setRememberMe((prev) => !prev)}
  //               />
  //               <span className="blue">Запомнить меня</span>
  //             </label>
  //             <button
  //               type="button"
  //               className="btn btn-2 fs-12 text-uppercase w-100 mt-3"
  //               onClick={handleFormSubmit}
  //             >
  //               Зарегистрироваться
  //             </button>
  //             <div className="fs-075 text-center gray-3 mt-2">
  //               Нажимая на кнопку “Зарегистрироваться”, вы принимаете условия
  //               пользовательского соглашения
  //             </div>
  //             <div className="text-center mt-3">
  //               У Вас уже аккаунт?{" "}
  //               <Link to="/login" className="blue">
  //                 Войти
    

        setFormErrors(formErrorDefault);
        setFormValue(formValueDefault);
    };

    const handleFormErrors = (errors) => {
        errors.forEach((formField) => {
            setFormErrors((prev) => {
                return {...prev, [formField.path[0]]: formField.message};
            });
        });
    };

    useEffect(() => {
        console.log(formValue)
    }, [formValue])

    return (
        <main className="bg-white position-relative">
            <img
                src="/img/bg/bg-entrance.jpg"
                className="entrance-bg"
                alt="грузоперевозки"
            />
            <section id="sec-10" className="container py-3 py-sm-4 py-lg-5">
                <Link to="/" className="fs-12">
                    <span className="green fs-15 me-2">⟵</span> Назад
                </Link>
                <div className="row gx-md-5 justify-content-between">
                    <div className="col-md-6 col-lg-5 offset-lg-1">
                        <h1 className="text-center dark-blue mt-3 mt-sm-4 mt-lg-5">
                            Регистрация
                        </h1>
                        <form className="fs-12 form-registration">
                            <div className="fs-075 text-center gray-3 mt-2">
                                Нажимая на кнопку “Зарегистрироваться”, вы принимаете условия
                                пользовательского соглашения
                            </div>
                            <div className="text-center mt-3">
                                У Вас уже аккаунт?{" "}
                                <Link to="/login" className="blue">
                                    Войти
                                </Link>
                            </div>
                        </form>
                    </div>
                    <div className="d-none d-md-block col-6 col-lg-5 col-xxl-4 white">
                        <h4 className="mb-5">С личным кабинетом вы сможете:</h4>
                        <ul className="marked-list fs-12">
                            <li>Видеть контакты машин и грузов</li>
                            <li>Добавлять грузы и машины</li>
                            <li>Использовать электронные документы</li>
                            <li>Общаться на Форуме</li>
                        </ul>
                        <h4 className="mt-5">Сейчас на сайте</h4>
                        <div className="d-flex justify-content-between">
                            <div className="text-center">
                                <div className="title-font fw-9 fs-25 mb-2">2 512 359</div>
                                <div className="fs-12">Грузов</div>
                            </div>
                            <div className="text-center">
                                <div className="title-font fw-9 fs-25 mb-2">12 359</div>
                                <div className="fs-12">Машин</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

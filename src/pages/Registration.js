import React, {useState} from "react";
import {Link} from "react-router-dom";
import CustomSelect from "../components/utilities/CustomSelect";
import InputPassword from "../components/utilities/InputPassword";
import FormErrorMessage from "../components/utilities/FormErrorMessage";
import Joi from "joi";

const formValueDefault = {
    accountType: undefined,
    email: "",
    password: "",
    passwordConfirm: "",
    remember: false,
};

const formErrorDefault = {
    email: "",
    password: "",
    passwordConfirm: "",
};

const schema = Joi.object({
    email: Joi.string()
        .email({tlds: {allow: false}})
        .min(4)
        .required()
        .messages({
            "string.empty": "Email адрес не может быть пустым",
            "string.min": `Email адрес не может быть короче 4 символов`,
            "string.max": `Email адрес не может быть длиннее 20 символов`,
            "string.email": `Введите Email адрес корректного формата`,
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
    remember: Joi.boolean(),
});

export default function Registration() {
    const [formValue, setFormValue] = useState(formValueDefault);
    const [formErrors, setFormErrors] = useState(formErrorDefault);

    const handleFormChange = (e) => {
        setFormValue((prev) => {
            return {
                ...prev,
                [e.target.name]:
                    e.target.type === "checkbox" ? e.target.checked : e.target.value,
            };
        });
        setFormErrors((prev) => {
            return {...prev, [e.target.name]: ""};
        });
    };

    const handleSelectChange = (value) => {
        setFormValue((prev) => {
            return {...prev, accountType: value}
        })
        setFormErrors((prev) => {
            return {...prev, accountType: ""};
        });
    }

    const handleFormSubmit = async () => {
        let hasError = false
        if (!formValue.accountType) {
            setFormErrors((prev) => {
                return {...prev, accountType: "Выберите тип аккаунта"}
            })
            hasError = true
        }

        const result = schema.validate(formValue, {abortEarly: false});
        if (result.error) {
            handleFormErrors(result.error.details);
            hasError = true
        }

        if (formValue.password !== formValue.passwordConfirm) {
            setFormErrors((prev) => {
                return {...prev, passwordConfirm: "Пароли не совпадают"};
            });
            hasError = true
        }

        if (hasError) return

        // TODO: Make an API call in the future
        // try {
        //   const response = await axios.post(`${baseUrl}/api/auth/register`, {
        //     ...formValue
        //   });
        // } catch (error) {
        //   console.log(error.message)
        // }

        alert(JSON.stringify(formValue))
        setFormErrors(formErrorDefault)
        setFormValue(formValueDefault)
    };

    const handleFormErrors = (errors) => {
        errors.forEach((formField) => {
            setFormErrors((prev) => {
                return {...prev, [formField.path[0]]: formField.message};
            });
        });
    };

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
                            <label>Тип аккаунта</label>
                            <CustomSelect
                                name="account-type"
                                className="inp w-100 mt-2"
                                multy={false}
                                onSelectChange={handleSelectChange}
                                options={[
                                    "Грузовладелец",
                                    "Перевозчик",
                                    "Перевозчик-Грузовладелец",
                                ]}
                                alignment="left"
                            />
                            <FormErrorMessage>{formErrors.accountType}</FormErrorMessage>
                            <label className="mt-3 email-registration">
                                Email
                            <input
                                type="email"
                                placeholder="Email"
                                className="mt-2"
                                name="email"
                                value={formValue.email}
                                onChange={handleFormChange}
                            />
                            <button type="button" className="button-registration text-uppercase">Подтвердить</button>
                            </label>
                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                            <label className="mt-3">Введите код</label>
                            <input
                                type="number"
                                className="mt-2"
                                value=""
                            />
                            <label className="mt-3">Пароль</label>
                            <InputPassword
                                name="password"
                                className="mt-2"
                                value={formValue.password}
                                onChange={handleFormChange}
                            />
                            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
                            <label className="mt-3">Подтверждение пароля</label>
                            <InputPassword
                                name="passwordConfirm"
                                className="mt-2"
                                value={formValue.passwordConfirm}
                                onChange={handleFormChange}
                            />
                            <FormErrorMessage>{formErrors.passwordConfirm}</FormErrorMessage>
                            <label className="mt-3">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    className="me-2"
                                    defaultChecked={formValue.remember}
                                    value={formValue.remember}
                                    onChange={handleFormChange}
                                />
                                <span className="blue">Запомнить меня</span>
                            </label>
                            <button
                                type="button"
                                className="btn btn-2 fs-12 text-uppercase w-100 mt-3"
                                onClick={handleFormSubmit}
                            >
                                Зарегистрироваться
                            </button>
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

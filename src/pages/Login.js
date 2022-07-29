import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputPassword from "../components/utilities/InputPassword";
import FormErrorMessage from "../components/utilities/FormErrorMessage";
import Joi from "joi";
import axiosPrivate from "../API/axiosPrivate";
import apiRoutes from "../API/config/apiRoutes";
import apiResponseMessages from "../API/config/apiResponseMessages";
import { useDispatch } from "react-redux/es/exports";
import {setCurrentUser} from "../store/reducers/currentUser"
import { useNavigate } from "react-router-dom";

const formValueDefault = {
  email: "",
  password: ""
};

const formErrorDefault = {
  email: "",
  password: "",
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
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
});

export default function Login() {
  const [formValue, setFormValue] = useState(formValueDefault);
  const [formErrors, setFormErrors] = useState(formErrorDefault);
  const [rememberMe, setRememberMe] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFormChange = (e) => {
    setFormValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    setFormErrors((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    const result = schema.validate(formValue, { abortEarly: false });
    if (result.error) {
      handleFormErrors(result.error.details);
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axiosPrivate.post(`${apiRoutes.LOGIN}`, formValue);
      const accessToken = response.data.body.token

      const payload = {
        token: accessToken,
        rememberMe
      }
      dispatch(setCurrentUser(payload))
      navigate("/")
    } catch (error) {
      if(error.response.data.status === 400) {
        setFormErrors({
          email: apiResponseMessages.USER_NOT_FOUND,
          password: apiResponseMessages.USER_NOT_FOUND
        })
        return
      }
    }

    setFormErrors(formErrorDefault);
    setFormValue(formValueDefault);
  };

  const handleFormErrors = (errors) => {
    errors.forEach((formField) => {
      setFormErrors((prev) => {
        return { ...prev, [formField.path[0]]: formField.message };
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
            <h1 className="text-center dark-blue mt-3 mt-sm-4 mt-lg-5">Вход</h1>
            <form className="fs-12">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="mt-2"
                name="email"
                value={formValue.email}
                onChange={handleFormChange}
              />
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
              <label className="mt-3">Пароль</label>
              <InputPassword
                name="password"
                className="mt-2"
                value={formValue.password}
                onChange={handleFormChange}
              />
              <FormErrorMessage>{formErrors.password}</FormErrorMessage>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    className="me-2"
                    defaultChecked={formValue.remember}
                    value={formValue.remember}
                    onChange={() => setRememberMe((prev) => !prev)}
                  />
                  <span className="blue">Запомнить меня</span>
                </label>
                <Link to="/reset-password" className="blue">
                  Забыли пароль?
                </Link>
              </div>
              {/* <button type='submit' className='btn btn-2 fs-12 text-uppercase w-100 mt-3'>Войти</button> */}
              <button
                className="btn btn-2 fs-12 text-uppercase w-100 mt-3"
                onClick={handleFormSubmit}
              >
                Войти
              </button>

              <div className="text-center mt-3">
                У Вас еще нет аккаунта?{" "}
                <Link to="/registration" className="blue">
                  Зарегистрироваться
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

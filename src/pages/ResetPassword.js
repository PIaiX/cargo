import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormErrorMessage from "../components/utilities/FormErrorMessage";
import Joi from "joi";
import axiosPrivate from "../API/axiosPrivate";
import apiRoutes from "../API/config/apiRoutes";
import apiResponseMessages from "../API/config/apiResponseMessages";

const emailSchema = Joi.object({
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
});

const fullSchema = Joi.object({
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
  smsCode: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "Код не может быть пустым",
      "string.empty": "Введите код подтверждения",
      "string.length": "Код должен состоять из 6 цифр",
      "string.pattern.base": "Код должен состоять только из цифр",
    }),
});

export default function ResetPassword() {
  const [formValue, setFormValue] = useState({ email: "", smsCode: "" });
  const [formError, setFormError] = useState({ email: "", smsCode: "" });
  const [smsCodeActive, setSmsCodeActive] = useState(false);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setFormError((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let result;

    if (!smsCodeActive) {
      result = emailSchema.validate(
        { email: formValue.email },
        { abortEarly: false }
      );
    }

    if (smsCodeActive) {
      result = fullSchema.validate(formValue, { abortEarly: false });
    }

    if (result.error) {
      handleFormErrors(result.error.details);
      return;
    }

    if (!smsCodeActive) {
      try {
        const response = await axiosPrivate.post(
          `${apiRoutes.FORGOT_PASSWORD_VERIFY_EMAIL}`,
          { email: formValue.email }
        );
        console.log(response.data);
      } catch (error) {
        if (error.response.data.status === 400) {
          setFormError((prev) => {
            return {
              ...prev,
              email: apiResponseMessages.FORGOT_PASSWORD_EMAIL_NOT_FOUND,
            };
          });
        }
      }
    }

    if (!smsCodeActive) {
      return setSmsCodeActive(true);
    }

    if(smsCodeActive){
      try {
        const response = await axiosPrivate.post(`${apiRoutes.FORGOT_PASSWORD_CODE_VERIFY}`, {
          email: formValue.email,
          verifyCode: formValue.smsCode
        })
        console.log("first step", response.data)
      } catch (error) {
        if(error.response.data.status === 400){
          setFormError((prev) => {
            return {...prev, smsCode: apiResponseMessages.WRONG_VERIFY_CODE}
          })
        }
        return
      }
    }

    setFormError({ email: "" });
    setFormValue({ email: "" });

    //if all good, navigate to the /reset-password-2 which is the second step in the process
    if (smsCodeActive){
      navigate("/reset-password-2", {state: {
        email: formValue.email,
        verifyCode: formValue.smsCode
      }})
    };
  } 

  const handleFormErrors = (errors) => {
    errors.forEach((formField) => {
      setFormError((prev) => {
        return { ...prev, [formField.path[0]]: formField.message };
      });
    });
  };

  return (
    <main className="bg-white position-relative">
      <section id="sec-10" className="container py-3 py-sm-4 py-lg-5">
        <Link to="/login" className="fs-12">
          <span className="green fs-15 me-2">⟵</span> Назад
        </Link>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <h1 className="text-center dark-blue mt-3 mt-sm-4 mt-lg-5">
              Восстановление пароля
            </h1>
            <form className="fs-12">
              <label>Email</label>
              <input
                type="email"
                placeholder="Введите адрес эл.почты"
                className="mt-2"
                name="email"
                value={formValue.email}
                onChange={handleFormChange}
              />
              <FormErrorMessage>{formError.email}</FormErrorMessage>
              {smsCodeActive && (
                <>
                  <label className="mt-2">Код</label>
                  <input
                    type="text"
                    placeholder="Введите код из СМС"
                    className="mt-2"
                    name="smsCode"
                    value={formValue.smsCode}
                    onChange={handleFormChange}
                  />
                  <FormErrorMessage>{formError.smsCode}</FormErrorMessage>
                </>
              )}
              {/* <button type='submit' className='btn btn-2 fs-12 text-uppercase w-100 mt-4'>Восстановить пароль</button> */}
              <button
                className="btn btn-2 fs-12 text-uppercase w-100 mt-4"
                onClick={handleFormSubmit}
              >
                Восстановить пароль
              </button>
              <div className="text-center mt-3">
                <Link to="/login" className="blue bb-1">
                  Я вспомнил пароль
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

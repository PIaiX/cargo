import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputPassword from "../components/utilities/InputPassword";
import FormErrorMessage from "../components/utilities/FormErrorMessage";
import Joi from "joi";
import axiosPrivate from "../API/axiosPrivate";
import apiRoutes from "../API/config/apiRoutes";
import apiResponseMessages from "../API/config/apiResponseMessages";
import { useLocation, useNavigate } from "react-router-dom";
import { handleRemeberMe } from "../API/auth";

const formValueDefault = {
  password: "",
};

const formErrorDefault = {
  password: "",
};

const schema = Joi.object({
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
    })
});

export default function ResetPassword2() {
  const [formValue, setFormValue] = useState(formValueDefault);
  const [formErrors, setFormErrors] = useState(formErrorDefault);
  const [rememberMe, setRememberMe] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!location.state) return navigate("/")

    const {email, verifyCode} = location?.state
    if(email && verifyCode){
      setFormValue((prev) => {
        return {...prev, email, verifyCode}
      })
    }
  }, [location])

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

    const result = schema.validate({password: formValue.password}, { abortEarly: false });
    if (result.error) {
      handleFormErrors(result.error.details);
      return
    }

    try {
      const response = await axiosPrivate.post(`${apiRoutes.FORGOT_PASSWORD}`, formValue)
      handleRemeberMe(rememberMe)
      console.log(response.data)
      return navigate("/")
    } catch (error) {
      console.log(error.response)
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
      <section id="sec-10" className="container py-3 py-sm-4 py-lg-5">
        <Link to="/reset-password" className="fs-12">
          <span className="green fs-15 me-2">⟵</span> Назад
        </Link>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <h1 className="text-center dark-blue mt-3 mt-sm-4 mt-lg-5">
              Восстановление пароля
            </h1>
            <form className="fs-12">
              <label className="mt-3">Новый пароль</label>
              <InputPassword
                name="password"
                className="mt-2"
                value={formValue.password}
                onChange={handleFormChange}
              />
              <FormErrorMessage>{formErrors.password}</FormErrorMessage>
              <label className="mt-3">
                <input
                  type="checkbox"
                  name="remember"
                  className="me-2"
                  defaultChecked={rememberMe}
                  value={rememberMe}
                  onChange={() => setRememberMe((prev) => !prev)}
                />
                <span className="blue">Запомнить пароль</span>
              </label>
              <button
                type="submit"
                className="btn btn-2 fs-12 text-uppercase w-100 mt-4"
                onClick={handleFormSubmit}
              >
                Восстановить пароль
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

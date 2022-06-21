import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputPassword from "../components/utilities/InputPassword";
import FormErrorMessage from "../components/utilities/FormErrorMessage";
import Joi from "joi";

const formValueDefault = {
  password: "",
  remember: false,
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
    }),
    remember: Joi.boolean()
});

export default function ResetPassword2() {
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
      return { ...prev, [e.target.name]: "" };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const result = schema.validate(formValue, { abortEarly: false });
    if (result.error) {
      handleFormErrors(result.error.details);
      return
    }

    // TODO: Make an API call in the future

    // try {
    //   const response = await axios.post(`${baseUrl}/api/auth/login`, {
    //     ...formValue
    //   });
    // } catch (error) {
    //   console.log(error.message)
    // }

    alert(JSON.stringify(formValue));
    setFormErrors(formErrorDefault);
    setFormValue(formValueDefault);

    //TODO: Add additional logic at the, after the successful response from the API
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
                  defaultChecked={formValue.remember}
                  value={formValue.remember}
                  onChange={handleFormChange}
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

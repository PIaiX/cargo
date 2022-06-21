import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormErrorMessage from "../components/utilities/FormErrorMessage";
import Joi from "joi";

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
});

export default function ResetPassword() {
  const [formValue, setFormValue] = useState({ email: "" });
  const [formError, setFormError] = useState({ email: "" });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormValue({ email: e.target.value });
    setFormError({ email: "" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const result = schema.validate(formValue, { abortEarly: false });
    if (result.error) {
      handleFormErrors(result.error.details);
      return;
    }

    // TODO: Make an API call in the future

    // try {
    //   const response = await axios.post(`${baseUrl}/api/auth/resetPassword`, {
    //     ...formValue
    //   });
    // } catch (error) {
    //   console.log(error.message)
    // }

    alert(JSON.stringify(formValue));
    setFormError({ email: "" });
    setFormValue({ email: "" });

    //if all good, navigate to the /reset-password-2 which is the second step in the process
    navigate("/reset-password-2");
  };

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
                placeholder="Email"
                className="mt-2"
                name="email"
                value={formValue.email}
                onChange={handleFormChange}
              />
              <FormErrorMessage>{formError.email}</FormErrorMessage>
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

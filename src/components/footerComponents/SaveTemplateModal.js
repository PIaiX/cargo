import React, { useState } from "react";
import FormErrorMessage from "./../utilities/FormErrorMessage";

const initialFormValue = {
  name: "",
  remark: "",
};

export default function SaveTemplateModal({ type, setIsShow, onSubmit }) {
  const [formValue, setFormValue] = useState(initialFormValue);
  const [formError, setFormError] = useState("");

  const handleFormChange = (e) => {
    setFormError("");
    setFormValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = () => {
    if (!formValue.name.trim()) {
      setFormError("Название шаблона не может быть пустым");
      return;
    }
    if (formValue.remark !== "" && formValue.remark.length < 2) {
      setFormError("Примечание не может быть короче 2 символов");
      return;
    }
    setFormValue(initialFormValue);
    setFormError("");
    onSubmit(formValue);
    setIsShow(false);
  };

  return (
    <>
      <h2>Сохранить шаблон {type === "Cargo" ? "груза" : "маршрута"}</h2>
      <form className="fs-12">
        <label htmlFor="pattern-name" className="fw-5 title-font mb-2">
          Название шаблона
        </label>
        <input
          id="pattern-name"
          placeholder="Название"
          className="mb-4"
          name="name"
          value={formValue.name}
          onChange={handleFormChange}
        />
        <label htmlFor="pattern-notes" className="fw-5 title-font mb-2">
          Примечание
        </label>
        <input
          id="pattern-notes"
          placeholder="Примечание"
          className="mb-4"
          name="remark"
          value={formValue.remark}
          onChange={handleFormChange}
        />
        {formError && (
          <div className="mb-3">
            <FormErrorMessage>{formError}</FormErrorMessage>
          </div>
        )}
        <div className="row row-cols-sm-2">
          <div className="mb-3 mb-sm-0">
            <button
              type="reset"
              data-bs-dismiss="modal"
              className="btn btn-1 w-100"
              onClick={() => {
                setFormValue(initialFormValue);
                setFormError("");
                setIsShow(false);
              }}
            >
              Отмена
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-2 w-100"
              data-bs-dismiss={`${!formValue.name ? "" : "modal"}`}
              onClick={handleFormSubmit}
            >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

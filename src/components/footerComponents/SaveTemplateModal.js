import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux/es/exports";
import { saveTemplate } from "../../store/reducers/savedCargoTemplates";

const initialFormValue = {
  name: "",
  remark: "",
};

export default function SaveTemplateModal({ type }) {
  const [formValue, setFormValue] = useState(initialFormValue);

  const dispatch = useDispatch()

  const handleFormChange = (e) => {
    setFormValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = () => {
    setFormValue(initialFormValue)
    dispatch(saveTemplate(formValue))
  }
  
  return (
    <div
      className="modal fade"
      id={`savePattern${type}`}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close" data-bs-dismiss="modal">
              <IoCloseOutline />
            </button>
            <h2>Сохранить шаблон {type === "Cargo" ? "груза" : "машины"}</h2>
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
              <div className="row row-cols-sm-2">
                <div className="mb-3 mb-sm-0">
                  <button
                    type="reset"
                    data-bs-dismiss="modal"
                    className="btn btn-1 w-100"
                    onClick={() => setFormValue(initialFormValue)}
                  >
                    Отмена
                  </button>
                </div>
                <div>
                  <button type="button" className="btn btn-2 w-100" onClick={handleFormSubmit}>
                    Сохранить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

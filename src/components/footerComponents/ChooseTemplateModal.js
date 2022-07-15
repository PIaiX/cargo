import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux/es/exports";
import SavedTemplate from "./SavedTemplate";

export default function ChooseTemplateModal({ type }) {
  const templates = useSelector((state) =>
    type === "Cargo"
      ? state.savedCargoTemplates.allTemplates
      : state.savedRouteTemplates.allTemplates
  );
  return (
    <div
      className="modal fade"
      id={`usePattern${type}`}
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close" data-bs-dismiss="modal">
              <IoCloseOutline />
            </button>
            {templates.length > 0 && <h2>Выберите шаблон</h2>}
            {templates.map((item) => (
              <SavedTemplate
                name={item.name}
                remark={item.remark}
                key={item.id}
                id={item.id}
                type={type}
              />
            ))}
            {!templates.length && (
              <h5 className="text-center">У Вас нет сохраненных шаблонов</h5>
            )}
            <p className="text-center fs-11">
              Сохраняйте однотипные объявления в шаблоны <br /> для удобства
              и экономии времени
            </p>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-1 fs-12 mx-auto mt-4"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

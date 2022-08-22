import React from "react";
import SavedTemplate from "./SavedTemplate";

export default function ChooseTemplateModal({
  templates = [],
  setIsShow,
  setCurrentTemplate,
  handleDeleteTemplate,
}) {
  const handleSetCurrentTemplate = (id) => {
    const template = templates.find((item) => item.id === id);
    setCurrentTemplate(template);
  };

  return (
    <div>
      {templates.length > 0 && <h2>Выберите шаблон</h2>}
      <div style={{ maxHeight: "350px", overflow: "auto" }}>
        {templates.map((item) => (
          <SavedTemplate
            name={item.name}
            remark={item.note}
            key={item.id}
            id={item.id}
            setCurrentTemplate={handleSetCurrentTemplate}
            setIsShow={setIsShow}
            onDelete={handleDeleteTemplate}
          />
        ))}
      </div>
      {!templates.length && (
        <h5 className="text-center">У Вас нет сохраненных шаблонов</h5>
      )}
      <p className="text-center fs-11 mt-2">
        Сохраняйте однотипные объявления в шаблоны <br /> для удобства
        и экономии времени
      </p>
      <button
        type="button"
        data-bs-dismiss="modal"
        className="btn btn-1 fs-12 mx-auto mt-3"
        onClick={() => setIsShow(false)}
      >
        Закрыть
      </button>
    </div>
  );
}

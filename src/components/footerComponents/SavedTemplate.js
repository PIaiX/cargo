import React from "react";
import { IconContext } from "react-icons";
import { IoTrash } from "react-icons/io5";

export default function SavedTemplate({
  name,
  remark,
  id,
  setCurrentTemplate,
  setIsShow,
  onDelete,
}) {
  const handleSetCurrentTemplate = () => {
    setCurrentTemplate(id);
    setIsShow(false);
  };

  return (
    <div className="box patterns p-2 p-sm-4">
      <div className="d-flex align-items-center">
        <div className="flex-1">
          <div className="title-font fs-12 fw-7">{name}</div>
          {remark && <div className="fs-11 mt-1">{remark}</div>}
        </div>
        <button
          type="button"
          className="btn btn-1 fs-09 px-2 px-sm-4 ms-2"
          onClick={handleSetCurrentTemplate}
          data-bs-dismiss="modal"
        >
          Выбрать
        </button>
        <button
          type="button"
          className="ms-2 ms-sm-3"
          onClick={() => onDelete(id)}
        >
          <IconContext.Provider value={{ className: "gray-4 icon-15" }}>
            <IoTrash />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

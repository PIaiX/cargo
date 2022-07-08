import React, { useState, useEffect } from "react";
import { Tooltip } from "bootstrap";
import { IoHelpCircleOutline } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";
import Select from "react-select";
import { optionsCarType } from "../components/utilities/data";
import { useNavigate } from "react-router-dom";

const initialData = [
  {
    name: "name",
    value: "",
    required: true
  },
  {
    name: "carType",
    value: "",
    label: "",
    required: true,
  },
  {
    name: "additionalConfiguration",
    value: "",
    required: true,
  },
  {
    name: "carrying",
    value: "",
    required: true,
  },
  {
    name: "capacity",
    value: "",
    required: true,
  },
  {
    name: "length",
    value: "",
    required: true,
  },
  {
    name: "width",
    value: "",
    required: true,
  },
  {
    name: "height",
    value: "",
    required: true,
  },
  {
    name: "sts",
    value: "",
    required: false,
  },
  {
    name: "vin",
    value: "",
    required: false,
  },
  {
    name: "pts",
    value: "",
    required: false,
  },
];

export default function AddCar() {
  let [data, setData] = useState(initialData);

  const navigate = useNavigate();

  let checkFieldset = (fieldName) => {
    let newArr = data.filter(
      (item) => item.fieldset === fieldName && item.required === true
    );
    let result = newArr.every((elem) => elem.value !== "");
    return result;
  };

  let handleRSelect = (e, name) => {
    let inputVal = e.value;
    let inputLabel = e.label;
    setData(
      data.map((obj) => {
        if (obj.name === name) {
          return { ...obj, value: inputVal, label: inputLabel };
        } else {
          return obj;
        }
      })
    );
  };

  const getSelectValue = () => {
    const object = data.find((obj) => obj.name === "carType");
    if(!object.value) return null;
    return { value: object.value, label: object.label };
  };

  let fillDataList = (e) => {
    let inputName = e.target.name;
    let inputVal = e.target.value

    setData(
      data.map((obj) => {
        if (obj.name === inputName) {
          return { ...obj, value: inputVal };
        } else {
          return obj;
        }
      })
    );
  };

  const findInState = (name) => {
    let val = "";
    data.forEach((obj) => {
      if (obj.name === name) {
        val = obj.value;
        //  <span key={obj.name} className='me-1'>{obj.value}</span>;
      }
    });
    return val;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let requiredArr = data.filter((obj) => obj.required === true);
    let verification = requiredArr.every((obj) => obj.value !== "");

    if (verification) {
      let formInfo = data.map((obj) => {
        return obj.name + ": " + obj.value + "; ";
      });
      alert(formInfo);
      console.log(data);
    } else {
      alert("заполните форму!");
    }
  };

  const onReset = (e) => {
    setData(
      data.map((obj) => {
        const newObj = { ...obj, value: "" };
        if (obj.label) newObj.label = "";
        return newObj;
      })
    );
  };

  useEffect(() => {
    //init tooltip
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      (tooltipNode) => new Tooltip(tooltipNode)
    );
  });

  return (
    <main className="bg-gray">
      <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
        <button
          onClick={() => navigate("/")}
          className="fs-12 fw-5 d-block mb-3 mb-sm-5"
        >
          <span className="green fs-15 me-2">⟵</span> Назад
        </button>
        <h1 className="dark-blue text-center text-uppercase">
          Добавление Машины
        </h1>
        <form
          className="row"
          onSubmit={(e) => onSubmit(e)}
          onReset={(e) => onReset(e)}
          noValidate
        >
          <div className="col-lg-8">
            <fieldset name="aboutCar" className="mt-lg-5">
              <div className="d-flex align-items-center justify-content-center justify-content-lg-between mb-4 mb-lg-3">
                <h4 className="text-center text-lg-start mb-0">О Машине</h4>
                <div className="d-none d-lg-flex align-items-center fs-09">
                  <button type="reset" className="btn btn-4 p-2 ms-3">
                    <IconContext.Provider value={{ className: "icon-15" }}>
                      <VscChromeClose />
                    </IconContext.Provider>
                    <span className="ms-2">Очистить форму</span>
                  </button>
                </div>
              </div>
              <div className="box">
              <div className="row align-items-center mb-4">
                  <div className="col-sm-5 col-md-3">
                    <div
                      data-label="name"
                      data-warning="false"
                      className="title-font fs-12 fw-5 mb-2 mb-sm-0"
                    >
                      Марка машины*
                    </div>
                  </div>
                  <div className="col-sm-7 col-md-9">
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          name="name"
                          placeholder="Укажите марку машины..."
                          value={findInState("name")}
                          onChange={(e) => fillDataList(e)}
                          className="weight w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div
                      data-label="carType"
                      data-warning="false"
                      className="title-font fs-12 fw-5"
                    >
                      Тип машины*
                    </div>
                  </div>
                  <div className="col-md-9">
                    <Select
                      className="fs-12 w-100"
                      classNamePrefix="react-select"
                      placeholder={"Выберите..."}
                      onChange={(e) => handleRSelect(e, "carType")}
                      options={optionsCarType}
                      name="carType"
                      isSearchable={true}
                      value={getSelectValue()}
                    />
                    <div
                      data-label="additionalConfiguration"
                      data-warning="false"
                      className="row row-cols-sm-3 mt-3"
                    >
                      <div className="mb-3 mb-sm-0">
                        <label>
                          <input
                            type="radio"
                            name="additionalConfiguration"
                            value="Грузовик"
                            onChange={(e) => fillDataList(e)}
                          />
                          <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                            Грузовик
                          </span>
                        </label>
                      </div>
                      <div className="mb-3 mb-sm-0">
                        <label>
                          <input
                            type="radio"
                            name="additionalConfiguration"
                            value="Полуприцеп"
                            onChange={(e) => fillDataList(e)}
                          />
                          <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                            Полуприцеп
                          </span>
                        </label>
                      </div>
                      <div>
                        <label>
                          <input
                            type="radio"
                            name="additionalConfiguration"
                            value="Сцепка"
                            onChange={(e) => fillDataList(e)}
                          />
                          <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                            Сцепка
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-sm-5 col-md-3">
                    <div
                      data-label="carrying"
                      data-warning="false"
                      className="title-font fs-12 fw-5 mb-2 mb-sm-0"
                    >
                      Грузоподъемность*
                    </div>
                  </div>
                  <div className="col-sm-7 col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <input
                          type="number"
                          min="1"
                          name="carrying"
                          placeholder="0"
                          value={findInState("carrying")}
                          onChange={(e) => fillDataList(e)}
                          className="weight w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-sm-5 col-md-3">
                    <div
                      data-label="capacity"
                      data-warning="false"
                      className="title-font fs-12 fw-5 mb-2 mb-sm-0"
                    >
                      Объем*
                    </div>
                  </div>
                  <div className="col-sm-7 col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <input
                          type="number"
                          min="1"
                          name="capacity"
                          placeholder="0"
                          value={findInState("capacity")}
                          onChange={(e) => fillDataList(e)}
                          className="size w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div className="title-font fs-12 fw-5">Габариты*</div>
                  </div>
                  <div className="col-md-9">
                    <div className="row row-cols-sm-3 gx-3 gx-xxl-4 fs-12">
                      <div className="mb-2 mb-sm-0">
                        <div className="row gx-2 align-items-center">
                          <div className="col-3 col-sm-5">
                            <label data-label="length" data-warning="false">
                              Длина:
                            </label>
                          </div>
                          <div className="col-9 col-sm-7">
                            <input
                              type="number"
                              min="1"
                              step="0.1"
                              name="length"
                              placeholder="0"
                              value={findInState("length")}
                              onChange={(e) => fillDataList(e)}
                              className="length"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-2 mb-sm-0">
                        <div className="row gx-2 align-items-center">
                          <div className="col-3 col-sm-5">
                            <label data-label="width" data-warning="false">
                              Ширина:
                            </label>
                          </div>
                          <div className="col-9 col-sm-7">
                            <input
                              type="number"
                              min="1"
                              step="0.1"
                              name="width"
                              placeholder="0"
                              value={findInState("width")}
                              onChange={(e) => fillDataList(e)}
                              className="length"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="row gx-2 align-items-center">
                          <div className="col-3 col-sm-5">
                            <label data-label="height" data-warning="false">
                              Высота:
                            </label>
                          </div>
                          <div className="col-9 col-sm-7">
                            <input
                              type="number"
                              min="1"
                              step="0.1"
                              name="height"
                              placeholder="0"
                              value={findInState("height")}
                              onChange={(e) => fillDataList(e)}
                              className="length"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="title-font fs-12 fw-5 d-flex align-items-center">
                      <span data-label="sts" data-warning="false">
                        СТС
                      </span>
                      <button
                        type="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="внесенные сведения ТС не подлежат разглашению третьим лицам"
                      >
                        <IconContext.Provider
                          value={{ className: "ms-2 blue icon-15" }}
                        >
                          <IoHelpCircleOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="sts"
                          value={findInState("sts")}
                          onChange={(e) => fillDataList(e)}
                          placeholder="СТС"
                          className="w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="title-font fs-12 fw-5 d-flex align-items-center">
                      <span data-label="vin" data-warning="false">
                        VIN код
                      </span>
                      <button
                        type="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="внесенные сведения ТС не подлежат разглашению третьим лицам"
                      >
                        <IconContext.Provider
                          value={{ className: "ms-2 blue icon-15" }}
                        >
                          <IoHelpCircleOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="vin"
                          value={findInState("vin")}
                          onChange={(e) => fillDataList(e)}
                          placeholder="VIN код"
                          className="w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div className="title-font fs-12 fw-5 d-flex align-items-center">
                      <span data-label="pts" data-warning="false">
                        ПТС
                      </span>
                      <button
                        type="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="right"
                        title="внесенные сведения ТС не подлежат разглашению третьим лицам"
                      >
                        <IconContext.Provider
                          value={{ className: "ms-2 blue icon-15" }}
                        >
                          <IoHelpCircleOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="pts"
                          value={findInState("pts")}
                          onChange={(e) => fillDataList(e)}
                          placeholder="ПТС"
                          className="w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mobile-btns d-block d-lg-none">
                <div className="container d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                    <button type="reset">
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <VscChromeClose />
                      </IconContext.Provider>
                      <span className="ms-1">Очистить форму</span>
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-1 text-uppercase fs-15 mx-auto mt-2"
                  >
                    добавить машину
                  </button>
                </div>
              </div>
            </fieldset>

            <div className="d-none d-lg-block title-font fs-09 fw-5 mt-3">
              * Поля обязательные к заполнению
            </div>
          </div>
          <div className="col-lg-4 pt-lg-5 position-relative d-none d-lg-block">
            <aside className="box">
              <button
                type="submit"
                className="btn btn-1 text-uppercase fs-15 mx-auto"
              >
                добавить машину
              </button>
            </aside>
          </div>
        </form>
      </section>
    </main>
  );
}

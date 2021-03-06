import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import {
  IoAddCircle,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseCircle,
  IoNewspaperOutline,
} from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import { IconContext } from "react-icons";
import Select from "react-select";
import {
  optionsCargoType,
  optionsCarType,
  optionsDays,
  optionsLoading,
  optionsLoadingPeriodType,
  optionsNotes,
  optionsPackageType,
  optionsTowns,
} from "../components/utilities/data";
import { useDispatch, useSelector } from "react-redux";
import {
  setCargoFormData,
  setCurrentCargoTemplate,
} from "../store/reducers/savedCargoTemplates";

const initialLoading = [
  [
    {
      name: "frequency",
      value: "",
      required: true,
    },
    {
      name: "loadingDate",
      value: "",
      required: false,
    },
    {
      name: "loadingDays",
      value: "",
      required: false,
    },
    {
      name: "loadingPeriodType",
      value: "",
      required: false,
    },
    {
      name: "loadingTimeFrom",
      value: "",
      required: false,
    },
    {
      name: "loadingTimeTo",
      value: "",
      required: false,
    },
    {
      name: "isLoadingAllDay",
      value: "",
      required: false,
    },
    {
      name: "loadingTown",
      value: optionsTowns[1].value,
      required: true,
    },
    {
      name: "loadingAddress",
      value: "",
      required: true,
    },
    {
      name: "transportationType",
      value: "",
      required: false,
    },
    {
      name: "loadingType",
      value: "",
      required: false,
    },
  ],
];

const initialUnloading = [
  [
    {
      name: "unloadingDateFrom",
      value: "",
      required: false,
    },
    {
      name: "unloadingDateTo",
      value: "",
      required: false,
    },
    {
      name: "unloadingTimeFrom",
      value: "",
      required: false,
    },
    {
      name: "unloadingTimeTo",
      value: "",
      required: false,
    },
    {
      name: "isUnloadingAllDay",
      value: "",
      required: false,
    },
    {
      name: "unloadingTown",
      value: "",
      required: true,
    },
    {
      name: "unloadingAddress",
      value: "",
      required: true,
    },
    {
      name: "unloadingType",
      value: "",
      required: false,
    },
  ],
];

const initialCargo = [
  [
    {
      name: "cargoType",
      value: "",
      required: false,
    },
    {
      name: "weight",
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
      required: false,
    },
    {
      name: "width",
      value: "",
      required: false,
    },
    {
      name: "height",
      value: "",
      required: false,
    },
    {
      name: "packageType",
      value: "",
      required: false,
    },
    {
      name: "packageCount",
      value: "",
      required: false,
    },
    {
      name: "notes",
      value: "",
      required: false,
    },
    {
      name: "ADR1",
      value: true,
      required: false,
    },
    {
      name: "ADR2",
      value: false,
      required: false,
    },
    {
      name: "ADR3",
      value: false,
      required: false,
    },
    {
      name: "ADR4",
      value: false,
      required: false,
    },
    {
      name: "ADR5",
      value: false,
      required: false,
    },
    {
      name: "ADR6",
      value: false,
      required: false,
    },
    {
      name: "ADR7",
      value: false,
      required: false,
    },
    {
      name: "ADR8",
      value: false,
      required: false,
    },
    {
      name: "ADR9",
      value: false,
      required: false,
    },
    {
      name: "TIR",
      value: false,
      required: false,
    },
    {
      name: "EKMT",
      value: false,
      required: false,
    },
  ],
];

const initialRequirements = [
  {
    name: "carType",
    value: "",
    required: true,
  },
  {
    name: "tempFrom",
    value: "",
    required: false,
  },
  {
    name: "tempTo",
    value: "",
    required: false,
  },
];

const initialPayment = [
  {
    name: "bargain",
    value: "",
    required: false,
  },
  {
    name: "paymentType",
    value: "",
    required: false,
  },
  {
    name: "cash",
    value: "",
    required: false,
  },
  {
    name: "priceVat",
    value: "",
    required: false,
  },
  {
    name: "priceNovat",
    value: "",
    required: false,
  },
  {
    name: "prepay",
    value: "",
    required: true,
  },
];

const initialContacts = [
  {
    index: 0,
    phone: "",
    name: "",
    required: true,
  },
];

const initialContactsField = [
  {
    name: "contactsData",
    value: initialContacts,
  },
  {
    name: "remark",
    value: "",
    required: false,
  },
];

export default function AddCargo() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [activeField, setActiveField] = useState(1); //?????? ?????????????????? ??????????????????

  const [loading, setLoading] = useState(initialLoading);
  const [unloading, setUnloading] = useState(initialUnloading);
  const [cargo, setCargo] = useState(initialCargo);
  const [requirements, setRequirements] = useState(initialRequirements);
  const [payment, setPayment] = useState(initialPayment);
  const [contacts, setContacts] = useState(initialContacts);
  const [contactsField, setContactsField] = useState(initialContactsField);

  const currentTemplate = useSelector(
    (state) => state.savedCargoTemplates.currentTemplate
  );

  const getEntireFormValue = () => {
    const newContactsField = [
      {
        name: "contactsData",
        value: contacts,
      },
      {
        ...contactsField[1],
      },
    ];
    return {
      loading,
      unloading,
      cargo,
      requirements,
      payment,
      contacts,
      contactsField: newContactsField,
    };
  };

  useEffect(() => {
    if (currentTemplate) {
      setLoading(currentTemplate.data.loading);
      setUnloading(currentTemplate.data.unloading);
      setCargo(currentTemplate.data.cargo);
      setRequirements(currentTemplate.data.requirements);
      setPayment(currentTemplate.data.payment);
      setContacts(currentTemplate.data.contacts);
    }
  }, [currentTemplate]);

  //???????????? ?? data ???????????????? ???????????????? (React-Select)
  let handleRSelect = (e, name, func, list, i) => {
    if (i !== undefined) {
      func(
        list.map((arr, index) => {
          if (index === i) {
            return arr.map((obj) => {
              if (obj.name === name) {
                return { ...obj, value: e.value };
              } else {
                return obj;
              }
            });
          } else {
            return arr;
          }
        })
      );
    } else {
      func(
        list.map((obj) => {
          if (obj.name === name) {
            return { ...obj, value: e.value };
          } else {
            return obj;
          }
        })
      );
    }
  };
  //main input changes handler
  let fillData = (e, func, list) => {
    let inputName = e.target.name;
    let inputVal =
      e.target.name === "remark" ? e.target.value : e.target.value.trim();
    let clearState = e.target.dataset.clear;

    if (e.target.type === "checkbox") {
      if (e.target.checked === true) {
        if (
          clearState !== null &&
          clearState !== undefined &&
          clearState !== ""
        ) {
          let clearStateArr = clearState.split(" ");

          clearStateArr.forEach((item) => clearInput(item));

          func(
            list.map((obj) => {
              if (obj.name === inputName) {
                return { ...obj, value: true }; //write the value of the checkbox to the State
              } else if (clearStateArr.includes(obj.name)) {
                return { ...obj, value: "" }; //delete values of inputs from State
              } else {
                return obj; //skip the rest
              }
            })
          );
        } else {
          func(
            list.map((obj) => {
              if (obj.name === inputName) {
                return { ...obj, value: true };
              } else {
                return obj;
              }
            })
          );
        }
      } else {
        func(
          list.map((obj) => {
            if (obj.name === inputName) {
              return { ...obj, value: false };
            } else {
              return obj;
            }
          })
        );
      }
    } else {
      func(
        list.map((obj) => {
          if (obj.name === inputName) {
            return { ...obj, value: inputVal };
          } else {
            return obj;
          }
        })
      );
    }
  };
  let fillDataArr = (e, func, list, i) => {
    let inputName = e.target.name;
    let inputVal = e.target.value.trim();
    let clearState = e.target.dataset.clear;

    if (e.target.type === "checkbox") {
      if (e.target.checked === true) {
        if (
          clearState !== null &&
          clearState !== undefined &&
          clearState !== ""
        ) {
          let clearStateArr = clearState.split(" ");
          clearStateArr.forEach((item) => clearInput(item));
          func(
            list.map((arr, index) => {
              if (index === i) {
                return arr.map((obj) => {
                  if (obj.name === inputName) {
                    return { ...obj, value: true }; //write the value of the checkbox to the State
                  } else if (clearStateArr.includes(obj.name)) {
                    return { ...obj, value: "" }; //delete values of inputs from State
                  } else {
                    return obj; //skip the rest
                  }
                });
              } else {
                return arr;
              }
            })
          );
        } else {
          func(
            list.map((arr, index) => {
              if (index === i) {
                return arr.map((obj) => {
                  if (obj.name === inputName) {
                    return { ...obj, value: true };
                  } else {
                    return obj;
                  }
                });
              } else {
                return arr;
              }
            })
          );
        }
      } else {
        func(
          list.map((arr, index) => {
            if (index === i) {
              return arr.map((obj) => {
                if (obj.name === inputName) {
                  return { ...obj, value: false };
                } else {
                  return obj;
                }
              });
            } else {
              return arr;
            }
          })
        );
      }
    } else {
      func(
        list.map((arr, index) => {
          if (index === i) {
            return arr.map((obj) => {
              if (obj.name === inputName) {
                return { ...obj, value: inputVal };
              } else {
                return obj;
              }
            });
          } else {
            return arr;
          }
        })
      );
    }
  };
  //???????????????? ???????????????? ??????????????
  let clearInput = (item) => {
    let input = document.querySelector('[name="' + item + '"]'); //clear input's value by name
    if (input.type === "radio" || input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  };
  //???????????????????????? ???????????????????????? ?????? ???????????????????? ?????????? ?????????? radiobutton
  let toggleParams = (e, func, list, i) => {
    //?????????? ???????????????????? ?????????????? ?????????????? ?? ??????????????
    let inputVal = e.target.value;
    let inputName = e.target.name;
    let addParams = e.target.dataset.add.split(" ");
    let delParams = e.target.dataset.del.split(" ");

    func(
      list.map((arr, index) => {
        if (index === i) {
          return arr.map((obj) => {
            if (obj.name === inputName) {
              return { ...obj, value: inputVal };
            } else if (addParams.includes(obj.name)) {
              return { ...obj, required: true };
            } else if (delParams.includes(obj.name)) {
              delParams.map((item) => clearInput(item));
              return { ...obj, required: false, value: "" };
            } else {
              return obj;
            }
          });
        } else {
          return arr;
        }
      })
    );
  };

  //?????????? ???????????????? ?????????? ?? ??????????????
  const getObj = (opt, state, param, i) => {
    if (i !== undefined) {
      if (
        opt.find(
          (obj) =>
            obj.value === state[i].find((obj) => obj.name === param).value
        )
      ) {
        return opt.find(
          (obj) =>
            obj.value === state[i].find((obj) => obj.name === param).value
        );
      } else {
        return "";
      }
    } else {
      if (
        opt.find(
          (obj) => obj.value === state.find((obj) => obj.name === param).value
        )
      ) {
        return opt.find(
          (obj) => obj.value === state.find((obj) => obj.name === param).value
        );
      } else {
        return "";
      }
    }
  };
  const getObjLabel = (opt, state, param) => {
    if (
      opt.find(
        (obj) => obj.value === state.find((obj) => obj.name === param).value
      )
    ) {
      return opt.find(
        (obj) => obj.value === state.find((obj) => obj.name === param).value
      ).label;
    } else {
      return "";
    }
  };
  const getVal = (state, param) => {
    let val = state.find((obj) => obj.name === param).value;
    if (val !== null && val !== undefined && val !== "") {
      return val;
    } else {
      return "";
    }
  };
  const getValArr = (state, i, param) => {
    let val = state[i].find((obj) => obj.name === param).value;
    if (val !== null && val !== undefined && val !== "") {
      return val;
    } else {
      return "";
    }
  };
  //???????????????? ???????????????? ?????????? ?????????????????? ?? data
  let fillContacts = (e, i) => {
    let inputName = e.target.name;
    let inputVal = e.target.value.trim();
    setContacts(
      contacts.map((obj, idx) => {
        if (idx === i) {
          if (inputName === "name") {
            return { ...obj, name: inputVal };
          } else {
            return { ...obj, phone: inputVal };
          }
        } else {
          return obj;
        }
      })
    );
  };
  //?????????????????? ???????????????? ?????????? ?????????????????? ???? data
  const getContact = (param, i) => {
    let val;
    if (param === "name") {
      const result = contacts.find((obj) => obj.index === i);
      if (result) val = result.name;
    } else if (param === "phone") {
      const result = contacts.find((obj) => obj.index === i);
      if (result) val = result.phone;
    } else {
      val = undefined;
    }
    if (val !== null && val !== undefined && val !== "") {
      return val;
    } else {
      return "";
    }
  };

  //???????????????? ?????????? ?????????????????? ?? ???? ???????????????? ???? data
  let deleteContacts = (i) => {
    setContacts(contacts.filter((obj) => obj.index !== i));
  };
  //???????????????????? ?????????? ?????????????????? ?? ???? ???????????? ?? data
  let addContacts = () => {
    let newNum = Number(contacts.length);
    let newObj = {
      index: newNum,
      phone: "",
      name: "",
    };
    setContacts([...contacts, newObj]);
  };

  //???????????????????? fieldset
  let addState = (state, func) => {
    let arr = state[0];
    let clearedArr = arr.map((obj) => {
      return { ...obj, value: "" };
    });
    func([...state, clearedArr]);
  };
  //???????????????? fieldset
  let delState = (state, func, index) => {
    const newArray = [...state];
    let arr = newArray.splice(index, 1);
    func(newArray.filter((obj) => obj !== arr));
  };

  //???????????????? fieldset ???? ????????????????????
  let checkFieldset = (state) => {
    let requiredArr = state.filter((item) => item.required === true);
    return requiredArr.every(
      (elem) =>
        elem.value !== null && elem.value !== undefined && elem.value !== ""
    );
  };
  let checkFieldsetArr = (state) => {
    let requiredArr = state.flatMap((arr) =>
      arr.filter((item) => item.required === true)
    );
    return requiredArr.every(
      (elem) =>
        elem.value !== null && elem.value !== undefined && elem.value !== ""
    );
  };
  let checkAllProps = (state) => {
    let requiredProps = state.flatMap((obj) => {
      let arr = [];
      for (let key in obj) {
        if (key !== "index") {
          arr.push(obj[key]);
        }
      }
      return arr;
    });
    return requiredProps.every(
      (elem) => elem !== null && elem !== undefined && elem !== ""
    );
  };

  // ????????????????!!!
  //???????????????? data ?????? ?????????????? reset - ?????????????????? (???? ?????????????? ?????????? ?? ?????????????????????? ?? ??????????????????)
  const onReset = (e) => {
    setLoading(initialLoading);
    setUnloading(initialUnloading);
    setCargo(initialCargo);
    setRequirements(initialRequirements);
    setPayment(initialPayment);
    setContacts(initialContacts);
    setContactsField(initialContactsField);

    dispatch(setCurrentCargoTemplate(null));
  };

  //?????????????????? ???????????????? ???? ???????????????????? ?? ???????????????? ??????????
  const onSubmit = (e) => {
    e.preventDefault();

    const isValidForm = checkAllRequiredFields();
    if (!isValidForm) return alert("?????????????????? ?????? ???????????????????????? ????????");

    //Make an API call in the future sending the data to the server
    console.log(getEntireFormValue());
  };

  const handleSaveTemplate = () => {
    const data = getEntireFormValue();
    dispatch(setCargoFormData(data));
  };

  //This works, but the code needs refactoring
  const checkAllRequiredFields = () => {
    let isValid = undefined;
    isValid = checkFieldsetArr(loading);
    if (!isValid) return false;
    isValid = checkFieldsetArr(unloading);
    if (!isValid) return false;
    isValid = checkFieldsetArr(cargo);
    if (!isValid) return false;
    isValid = checkFieldset(requirements);
    if (!isValid) return false;
    isValid = checkFieldset(payment);
    if (!isValid) return false;
    isValid = checkAllProps(contacts);
    return isValid;
  };

  return (
    <main className="bg-gray">
      <section id="sec-9" className="container pt-4 pt-sm-5 py-lg-5">
        <Link to="/" className="fs-12 fw-5 d-block mb-3 mb-sm-5">
          <span className="green fs-15 me-2">???</span> ??????????
        </Link>

        <form
          ref={ref}
          name="myForm"
          id="myForm"
          className="row"
          onSubmit={(e) => onSubmit(e)}
          onReset={(e) => onReset(e)}
          noValidate
        >
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h1 className="dark-blue text-center text-uppercase mb-0">
              ???????????????????? ??????????
            </h1>
            <div className="d-none d-lg-flex align-items-center fs-09">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#usePatternCargo"
                className="btn btn-4 p-2"
              >
                <IconContext.Provider value={{ className: "icon-15" }}>
                  <IoNewspaperOutline />
                </IconContext.Provider>
                <span className="ms-2">???????????????????????? ????????????</span>
              </button>
              <button type="reset" className="btn btn-4 p-2 ms-3">
                <IconContext.Provider value={{ className: "icon-15" }}>
                  <VscChromeClose />
                </IconContext.Provider>
                <span className="ms-2">???????????????? ??????????</span>
              </button>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="mobile-indicators d-flex d-lg-none">
              <button
                type="button"
                className={checkFieldsetArr(loading) ? "active" : ""}
                onClick={() => setActiveField(1)}
              >
                1
              </button>
              <button
                type="button"
                className={checkFieldsetArr(unloading) ? "active" : ""}
                onClick={() => setActiveField(2)}
              >
                2
              </button>
              <button
                type="button"
                className={checkFieldsetArr(cargo) ? "active" : ""}
                onClick={() => setActiveField(3)}
              >
                3
              </button>
              <button
                type="button"
                className={checkFieldset(requirements) ? "active" : ""}
                onClick={() => setActiveField(4)}
              >
                4
              </button>
              <button
                type="button"
                className={checkFieldset(payment) ? "active" : ""}
                onClick={() => setActiveField(4)}
              >
                5
              </button>
              <button
                type="button"
                className={checkAllProps(contacts) ? "active" : ""}
                onClick={() => setActiveField(5)}
              >
                6
              </button>
            </div>

            <fieldset
              name="loading"
              data-show={activeField === 1 ? "true" : "false"}
            >
              <h4 className="text-center text-lg-start mb-4 mb-lg-3">
                ????????????????
              </h4>
              {loading.map((arr, index) => (
                <div key={index} className="box mb-3">
                  {index !== 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="black fw-5">
                        ?????????? ???????????????? ??? {index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => delState(loading, setLoading, index)}
                        className="red fw-5"
                      >
                        ??????????????
                      </button>
                    </div>
                  )}
                  <div className="row mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="frequency"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ????????*
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row">
                        <div className="col-xl-7 mb-4 mb-lg-2 mb-xl-0">
                          <div className="box p-lg-3">
                            <label className="mb-2 mb-xl-3">
                              <input
                                type="radio"
                                name="frequency"
                                onChange={(e) =>
                                  toggleParams(e, setLoading, loading, index)
                                }
                                value={"0"}
                                checked={
                                  getValArr(loading, index, "frequency") === "0"
                                }
                                data-add="loadingDate loadingDays"
                                data-del="loadingPeriodType"
                              />
                              <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                                ???????? ??????????
                              </span>
                            </label>
                            <div
                              className={
                                getValArr(loading, index, "frequency") === "0"
                                  ? "d-flex fs-12 align-items-center"
                                  : "d-flex fs-12 align-items-center disabled"
                              }
                            >
                              <label
                                data-label="loadingDate"
                                data-warning="false"
                                className="flex-1 min-150"
                              >
                                <input
                                  type="date"
                                  name="loadingDate"
                                  value={getValArr(
                                    loading,
                                    index,
                                    "loadingDate"
                                  )}
                                  onChange={(e) =>
                                    fillDataArr(e, setLoading, loading, index)
                                  }
                                />
                              </label>
                              <span className="mx-2 mx-xxl-3">+</span>
                              <label
                                style={{ maxWidth: "100px" }}
                                data-label="loadingDays"
                                data-warning="false"
                              >
                                <Select
                                  className="w-100"
                                  classNamePrefix="react-select"
                                  placeholder={"????????????????..."}
                                  value={getObj(
                                    optionsDays,
                                    loading,
                                    "loadingDays",
                                    index
                                  )}
                                  onChange={(e) =>
                                    handleRSelect(
                                      e,
                                      "loadingDays",
                                      setLoading,
                                      loading,
                                      index
                                    )
                                  }
                                  options={optionsDays}
                                  name="loadingDays"
                                  isSearchable={true}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-5">
                          <div className="box p-lg-3">
                            <label className="mb-2 mb-xl-3">
                              <input
                                type="radio"
                                name="frequency"
                                onChange={(e) =>
                                  toggleParams(e, setLoading, loading, index)
                                }
                                value={"1"}
                                checked={
                                  getValArr(loading, index, "frequency") === "1"
                                }
                                data-add="loadingPeriodType"
                                data-del="loadingDate loadingDays"
                              />
                              <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                                ??????????????????
                              </span>
                            </label>
                            <div
                              data-label="loadingPeriodType"
                              data-warning="false"
                              className={
                                getValArr(loading, index, "frequency") === "1"
                                  ? ""
                                  : "disabled"
                              }
                            >
                              <Select
                                className="fs-12"
                                classNamePrefix="react-select"
                                placeholder={"????????????????..."}
                                options={optionsLoadingPeriodType}
                                name="loadingPeriodType"
                                isSearchable={true}
                                value={getObj(
                                  optionsLoadingPeriodType,
                                  loading,
                                  "loadingPeriodType",
                                  index
                                )}
                                onChange={(e) =>
                                  handleRSelect(
                                    e,
                                    "loadingPeriodType",
                                    setLoading,
                                    loading,
                                    index
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div className="title-font fs-12 fw-5">
                        ?????????? ????????????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div
                        className={
                          getValArr(loading, index, "isLoadingAllDay")
                            ? "d-flex fs-12 align-items-center disabled"
                            : "d-flex fs-12 align-items-center"
                        }
                      >
                        <label
                          className="flex-1"
                          data-label="loadingTimeFrom"
                          data-warning="false"
                        >
                          <input
                            type="time"
                            value={getValArr(loading, index, "loadingTimeFrom")}
                            name="loadingTimeFrom"
                            onChange={(e) =>
                              fillDataArr(e, setLoading, loading, index)
                            }
                          />
                        </label>
                        <span className="mx-3">???</span>
                        <label
                          className="flex-1"
                          data-label="loadingTimeTo"
                          data-warning="false"
                        >
                          <input
                            type="time"
                            value={getValArr(loading, index, "loadingTimeTo")}
                            name="loadingTimeTo"
                            onChange={(e) =>
                              fillDataArr(e, setLoading, loading, index)
                            }
                          />
                        </label>
                      </div>
                      <label className="mt-2">
                        <input
                          type="checkbox"
                          value={getValArr(loading, index, "isLoadingAllDay")}
                          name="isLoadingAllDay"
                          checked={getValArr(loading, index, "isLoadingAllDay")}
                          onChange={(e) =>
                            fillDataArr(e, setLoading, loading, index)
                          }
                          data-clear="loadingTimeFrom loadingTimeTo"
                        />
                        <span
                          data-label="isLoadingAllDay"
                          data-warning="false"
                          className="ms-2 fs-09"
                        >
                          ??????????????????????????
                        </span>
                      </label>
                    </div>
                  </div>
                  <div
                    className="row mb-4"
                    data-label="loadingTown"
                    data-warning="false"
                  >
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div className="title-font fs-12 fw-5">
                        ?????????? ????????????????*
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row fs-12">
                        <div className="col-sm-5 mb-2 mb-sm-0">
                          <Select
                            classNamePrefix="react-select"
                            placeholder={"????????????????..."}
                            name="loadingTown"
                            value={getObj(
                              optionsTowns,
                              loading,
                              "loadingTown",
                              index
                            )}
                            onChange={(e) =>
                              handleRSelect(
                                e,
                                "loadingTown",
                                setLoading,
                                loading,
                                index
                              )
                            }
                            options={optionsTowns}
                            isSearchable={true}
                          />
                        </div>
                        <div
                          className="col-sm-7"
                          data-label="loadingAddress"
                          data-warning="false"
                        >
                          <input
                            type="text"
                            name="loadingAddress"
                            value={getValArr(loading, index, "loadingAddress")}
                            onChange={(e) =>
                              fillDataArr(e, setLoading, loading, index)
                            }
                            placeholder="??????????"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="transportationType"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ?????? ??????????????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <label className="mb-2 mb-xl-3">
                        <input
                          type="radio"
                          name="transportationType"
                          value="FTL"
                          checked={
                            getValArr(loading, index, "transportationType") ===
                            "FTL"
                          }
                          onChange={(e) =>
                            fillDataArr(e, setLoading, loading, index)
                          }
                        />
                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                          ?????????????????? ?????????????? (FTL)
                        </span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="transportationType"
                          value="FTL/LTL"
                          checked={
                            getValArr(loading, index, "transportationType") ===
                            "FTL/LTL"
                          }
                          onChange={(e) =>
                            fillDataArr(e, setLoading, loading, index)
                          }
                        />
                        <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                          ?????????????????? ?????????????? ?????? ???????????????? (FTL ?????? LTL)
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="loadingType"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ?????? ????????????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Select
                        className="fs-12"
                        classNamePrefix="react-select"
                        placeholder={"????????????????..."}
                        name="loadingType"
                        value={getObj(
                          optionsLoading,
                          loading,
                          "loadingType",
                          index
                        )}
                        onChange={(e) =>
                          handleRSelect(
                            e,
                            "loadingType",
                            setLoading,
                            loading,
                            index
                          )
                        }
                        options={optionsLoading}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addState(loading, setLoading)}
                className="green fs-11 fw-5 mx-auto d-flex align-items-center"
              >
                <IconContext.Provider value={{ className: "green icon-15" }}>
                  <IoAddCircle />
                </IconContext.Provider>
                <span className="ms-2">???????????????? ?????????? ????????????????</span>
              </button>

              <div className="mobile-btns d-block d-lg-none">
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#usePatternCargo"
                    >
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <IoNewspaperOutline />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????????????? ????????????</span>
                    </button>
                    <button type="reset">
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <VscChromeClose />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????? ??????????</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={checkFieldset(loading) ? false : true}
                    onClick={() => setActiveField(2)}
                    className="btn btn-1 w-100 fs-11"
                  >
                    <span className="me-1 me-sm-3 text-uppercase">??????????</span>
                    <IconContext.Provider value={{ className: "icon-15" }}>
                      <IoChevronForwardOutline />
                    </IconContext.Provider>
                  </button>
                </div>
              </div>
            </fieldset>

            <fieldset
              name="unloading"
              data-show={activeField === 2 ? "true" : "false"}
            >
              <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">
                ??????????????????
              </h4>
              {unloading.map((arr, index) => (
                <div key={index} className="box mb-3">
                  {index !== 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="black fw-5">
                        ?????????? ?????????????????? ??? {index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => delState(unloading, setUnloading, index)}
                        className="red fw-5"
                      >
                        ??????????????
                      </button>
                    </div>
                  )}
                  <div className="row align-items-center mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="unloadingDateFrom unloadingDateTo"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="d-flex fs-12 align-items-center">
                        <input
                          type="date"
                          name="unloadingDateFrom"
                          value={getValArr(
                            unloading,
                            index,
                            "unloadingDateFrom"
                          )}
                          onChange={(e) =>
                            fillDataArr(e, setUnloading, unloading, index)
                          }
                        />
                        <span className="mx-3">???</span>
                        <input
                          type="date"
                          name="unloadingDateTo"
                          value={getValArr(unloading, index, "unloadingDateTo")}
                          onChange={(e) =>
                            fillDataArr(e, setUnloading, unloading, index)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div className="title-font fs-12 fw-5">
                        ?????????? ??????????????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div
                        className={
                          getValArr(unloading, index, "isUnloadingAllDay")
                            ? "d-flex fs-12 align-items-center disabled"
                            : "d-flex fs-12 align-items-center"
                        }
                      >
                        <label
                          className="flex-1"
                          data-label="unloadingTimeFrom"
                          data-warning="false"
                        >
                          <input
                            type="time"
                            name="unloadingTimeFrom"
                            value={getValArr(
                              unloading,
                              index,
                              "unloadingTimeFrom"
                            )}
                            onChange={(e) =>
                              fillDataArr(e, setUnloading, unloading, index)
                            }
                          />
                        </label>
                        <span className="mx-3">???</span>
                        <label
                          className="flex-1"
                          data-label="unloadingTimeTo"
                          data-warning="false"
                        >
                          <input
                            type="time"
                            name="unloadingTimeTo"
                            value={getValArr(
                              unloading,
                              index,
                              "unloadingTimeTo"
                            )}
                            onChange={(e) =>
                              fillDataArr(e, setUnloading, unloading, index)
                            }
                          />
                        </label>
                      </div>
                      <label className="mt-2">
                        <input
                          type="checkbox"
                          name="isUnloadingAllDay"
                          value={getValArr(
                            unloading,
                            index,
                            "isUnloadingAllDay"
                          )}
                          checked={getValArr(
                            unloading,
                            index,
                            "isUnloadingAllDay"
                          )}
                          onChange={(e) =>
                            fillDataArr(e, setUnloading, unloading, index)
                          }
                          data-clear="unloadingTimeFrom unloadingTimeTo"
                        />
                        <span
                          data-label="isUnloadingAllDay"
                          data-warning="false"
                          className="ms-2 fs-09"
                        >
                          ??????????????????????????
                        </span>
                      </label>
                    </div>
                  </div>
                  <div
                    className="row mb-4"
                    data-label="unloadingTown"
                    data-warning="false"
                  >
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div className="title-font fs-12 fw-5">
                        ?????????? ??????????????????*
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="row fs-12">
                        <div className="col-sm-5 mb-2 mb-sm-0">
                          <Select
                            classNamePrefix="react-select"
                            placeholder={"????????????????..."}
                            name="unloadingTown"
                            value={getObj(
                              optionsTowns,
                              unloading,
                              "unloadingTown",
                              index
                            )}
                            onChange={(e) =>
                              handleRSelect(
                                e,
                                "unloadingTown",
                                setUnloading,
                                unloading,
                                index
                              )
                            }
                            options={optionsTowns}
                            isSearchable={true}
                          />
                        </div>
                        <div
                          className="col-sm-7"
                          data-label="unloadingAddress"
                          data-warning="false"
                        >
                          <input
                            type="text"
                            name="unloadingAddress"
                            value={getValArr(
                              unloading,
                              index,
                              "unloadingAddress"
                            )}
                            onChange={(e) =>
                              fillDataArr(e, setUnloading, unloading, index)
                            }
                            placeholder="??????????"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="unloadingType"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ?????? ??????????????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Select
                        className="fs-12"
                        classNamePrefix="react-select"
                        placeholder={"????????????????..."}
                        name="unloadingType"
                        value={getObj(
                          optionsLoading,
                          unloading,
                          "unloadingType",
                          index
                        )}
                        onChange={(e) =>
                          handleRSelect(
                            e,
                            "unloadingType",
                            setUnloading,
                            unloading,
                            index
                          )
                        }
                        options={optionsLoading}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addState(unloading, setUnloading)}
                className="green fs-11 fw-5 mx-auto d-flex align-items-center"
              >
                <IconContext.Provider value={{ className: "green icon-15" }}>
                  <IoAddCircle />
                </IconContext.Provider>
                <span className="ms-2">???????????????? ?????????? ??????????????????</span>
              </button>

              <div className="mobile-btns d-block d-lg-none">
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#usePatternCargo"
                    >
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <IoNewspaperOutline />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????????????? ????????????</span>
                    </button>
                    <button type="reset">
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <VscChromeClose />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????? ??????????</span>
                    </button>
                  </div>
                  <div className="row row-cols-2 gx-2 gx-sm-4 title-font">
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveField(1)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronBackOutline />
                        </IconContext.Provider>
                        <span className="ms-1 ms-sm-3 text-uppercase">
                          ??????????
                        </span>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        disabled={checkFieldset(unloading) ? false : true}
                        onClick={() => setActiveField(3)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <span className="me-1 me-sm-3 text-uppercase">
                          ??????????
                        </span>
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronForwardOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset
              name="cargo"
              data-show={activeField === 3 ? "true" : "false"}
            >
              <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">
                ????????
              </h4>
              {cargo.map((arr, index) => (
                <div key={index} className="box mb-3">
                  {index !== 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div className="black fw-5">???????? ??? {index + 1}</div>
                      <button
                        type="button"
                        onClick={() => delState(cargo, setCargo, index)}
                        className="red fw-5"
                      >
                        ??????????????
                      </button>
                    </div>
                  )}
                  <div className="row align-items-center fs-12 mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="cargoType"
                        data-warning="false"
                        className="title-font fw-5"
                      >
                        ???????????????? ??????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Select
                        className="w-100"
                        classNamePrefix="react-select"
                        placeholder={"????????????????..."}
                        name="cargoType"
                        value={getObj(
                          optionsCargoType,
                          cargo,
                          "cargoType",
                          index
                        )}
                        onChange={(e) =>
                          handleRSelect(e, "cargoType", setCargo, cargo, index)
                        }
                        options={optionsCargoType}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-3">
                      <div
                        data-label="weight"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ??????*
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            className="weight w-100 fs-12"
                            type="number"
                            name="weight"
                            min="1"
                            placeholder="0"
                            value={getValArr(cargo, index, "weight")}
                            onChange={(e) =>
                              fillDataArr(e, setCargo, cargo, index)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-3">
                      <div
                        data-label="capacity"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ??????????*
                      </div>
                    </div>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            className="size w-100 fs-12"
                            type="number"
                            name="capacity"
                            min="1"
                            placeholder="0"
                            value={getValArr(cargo, index, "capacity")}
                            onChange={(e) =>
                              fillDataArr(e, setCargo, cargo, index)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div className="title-font fs-12 fw-5">????????????????</div>
                    </div>
                    <div className="col-md-9">
                      <div className="row row-cols-sm-3 gx-3 gx-xxl-4 fs-12">
                        <div className="mb-2 mb-sm-0">
                          <div className="row gx-2 align-items-center">
                            <div className="col-3 col-sm-5">
                              <label data-label="length" data-warning="false">
                                ??????????:
                              </label>
                            </div>
                            <div className="col-9 col-sm-7">
                              <input
                                type="number"
                                name="length"
                                min="1"
                                placeholder="0"
                                value={getValArr(cargo, index, "length")}
                                onChange={(e) =>
                                  fillDataArr(e, setCargo, cargo, index)
                                }
                                className="length"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-2 mb-sm-0">
                          <div className="row gx-2 align-items-center">
                            <div className="col-3 col-sm-5">
                              <label data-label="width" data-warning="false">
                                ????????????:
                              </label>
                            </div>
                            <div className="col-9 col-sm-7">
                              <input
                                type="number"
                                name="width"
                                min="1"
                                placeholder="0"
                                value={getValArr(cargo, index, "width")}
                                onChange={(e) =>
                                  fillDataArr(e, setCargo, cargo, index)
                                }
                                className="length"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="row gx-2 align-items-center">
                            <div className="col-3 col-sm-5">
                              <label data-label="height" data-warning="false">
                                ????????????:
                              </label>
                            </div>
                            <div className="col-9 col-sm-7">
                              <input
                                type="number"
                                name="height"
                                min="1"
                                placeholder="0"
                                value={getValArr(cargo, index, "height")}
                                onChange={(e) =>
                                  fillDataArr(e, setCargo, cargo, index)
                                }
                                className="length"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="packageType"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ????????????????
                      </div>
                    </div>
                    <div className="col-md-9 fs-12 d-flex align-items-center">
                      <Select
                        classNamePrefix="react-select"
                        name="packageType"
                        placeholder={"????????????????..."}
                        value={getObj(
                          optionsPackageType,
                          cargo,
                          "packageType",
                          index
                        )}
                        onChange={(e) =>
                          handleRSelect(
                            e,
                            "packageType",
                            setCargo,
                            cargo,
                            index
                          )
                        }
                        options={optionsPackageType}
                        isSearchable={true}
                      />
                      <IconContext.Provider
                        value={{ className: "icon-10 mx-3" }}
                      >
                        <VscChromeClose />
                      </IconContext.Provider>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        name="packageCount"
                        value={getValArr(cargo, index, "packageCount")}
                        onChange={(e) => fillDataArr(e, setCargo, cargo, index)}
                        className="packageCount pcs w-100px"
                      />
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="notes"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ???????????? ??????????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <Select
                        className="w-100 fs-12"
                        classNamePrefix="react-select"
                        name="notes"
                        placeholder={"????????????????..."}
                        value={getObj(optionsNotes, cargo, "notes", index)}
                        onChange={(e) =>
                          handleRSelect(e, "notes", setCargo, cargo, index)
                        }
                        options={optionsNotes}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3 mb-3 mb-md-0">
                      <div
                        data-label="permissions"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ????????????????????
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="mb-2">?????????????? ??????????, ADR:</div>
                      <div className="row row-cols-3 g-3 mb-4">
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR1"
                              value={getValArr(cargo, index, "ADR1")}
                              checked={getValArr(cargo, index, "ADR1")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR1
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR2"
                              value={getValArr(cargo, index, "ADR2")}
                              checked={getValArr(cargo, index, "ADR2")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR2
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR3"
                              value={getValArr(cargo, index, "ADR3")}
                              checked={getValArr(cargo, index, "ADR3")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR3
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR4"
                              value={getValArr(cargo, index, "ADR4")}
                              checked={getValArr(cargo, index, "ADR4")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR4
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR5"
                              value={getValArr(cargo, index, "ADR5")}
                              checked={getValArr(cargo, index, "ADR5")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR5
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR6"
                              value={getValArr(cargo, index, "ADR6")}
                              checked={getValArr(cargo, index, "ADR6")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR6
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR7"
                              value={getValArr(cargo, index, "ADR7")}
                              checked={getValArr(cargo, index, "ADR7")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR7
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR8"
                              value={getValArr(cargo, index, "ADR8")}
                              checked={getValArr(cargo, index, "ADR8")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR8
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="ADR9"
                              value={getValArr(cargo, index, "ADR9")}
                              checked={getValArr(cargo, index, "ADR9")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              ADR9
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="row row-cols-2 g-3">
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="TIR"
                              value={getValArr(cargo, index, "TIR")}
                              checked={getValArr(cargo, index, "TIR")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              TIR
                            </span>
                          </label>
                        </div>
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              name="EKMT"
                              value={getValArr(cargo, index, "EKMT")}
                              checked={getValArr(cargo, index, "EKMT")}
                              onChange={(e) =>
                                fillDataArr(e, setCargo, cargo, index)
                              }
                            />
                            <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                              EKMT
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addState(cargo, setCargo)}
                className="green fs-11 fw-5 mx-auto d-flex align-items-center"
              >
                <IconContext.Provider value={{ className: "green icon-15" }}>
                  <IoAddCircle />
                </IconContext.Provider>
                <span className="ms-2">???????????????? ????????</span>
              </button>

              <div className="mobile-btns d-block d-lg-none">
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#usePatternCargo"
                    >
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <IoNewspaperOutline />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????????????? ????????????</span>
                    </button>
                    <button type="reset">
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <VscChromeClose />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????? ??????????</span>
                    </button>
                  </div>
                  <div className="row row-cols-2 gx-2 gx-sm-4 title-font">
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveField(2)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronBackOutline />
                        </IconContext.Provider>
                        <span className="ms-1 ms-sm-3 text-uppercase">
                          ??????????
                        </span>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        disabled={checkFieldset(cargo) ? false : true}
                        onClick={() => setActiveField(4)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <span className="me-1 me-sm-3 text-uppercase">
                          ??????????
                        </span>
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronForwardOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset
              name="requirements"
              data-show={activeField === 4 ? "true" : "false"}
            >
              <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">
                ???????????????????? ?? ????????????
              </h4>
              <div className="box">
                <div className="row align-items-center mb-4">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div
                      data-label="carType"
                      data-warning="false"
                      className="title-font fs-12 fw-5"
                    >
                      ?????? ????????????*
                    </div>
                  </div>
                  <div className="col-md-9">
                    <Select
                      className="fs-12 w-100"
                      classNamePrefix="react-select"
                      placeholder={"????????????????..."}
                      name="carType"
                      value={getObj(optionsCarType, requirements, "carType")}
                      onChange={(e) =>
                        handleRSelect(
                          e,
                          "carType",
                          setRequirements,
                          requirements
                        )
                      }
                      options={optionsCarType}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-3 mb-3 mb-md-0">
                    <div className="title-font fs-12 fw-5">??????????????????????</div>
                  </div>
                  <div className="col-md-9 fs-12 d-flex align-items-center">
                    <label data-label="tempFrom" data-warning="false">
                      <input
                        type="number"
                        name="tempFrom"
                        placeholder="0"
                        className="temp"
                        value={getVal(requirements, "tempFrom")}
                        onChange={(e) =>
                          fillData(e, setRequirements, requirements)
                        }
                      />
                    </label>
                    <span className="mx-3">???</span>
                    <label data-label="tempTo" data-warning="false">
                      <input
                        type="number"
                        name="tempTo"
                        placeholder="0"
                        className="temp"
                        value={getVal(requirements, "tempTo")}
                        onChange={(e) =>
                          fillData(e, setRequirements, requirements)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mobile-btns d-block d-lg-none">
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#usePatternCargo"
                    >
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <IoNewspaperOutline />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????????????? ????????????</span>
                    </button>
                    <button type="reset">
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <VscChromeClose />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????? ??????????</span>
                    </button>
                  </div>
                  <div className="row row-cols-2 gx-2 gx-sm-4 title-font">
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveField(3)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronBackOutline />
                        </IconContext.Provider>
                        <span className="ms-1 ms-sm-3 text-uppercase">
                          ??????????
                        </span>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        disabled={checkFieldset(requirements) ? false : true}
                        onClick={() => setActiveField(5)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <span className="me-1 me-sm-3 text-uppercase">
                          ??????????
                        </span>
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronForwardOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset
              name="payment"
              data-show={activeField === 5 ? "true" : "false"}
            >
              <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">
                ????????????
              </h4>
              <div className="box">
                <div
                  data-label="bargain"
                  data-warning="false"
                  className="row row-cols-sm-2 row-cols-xxl-3 mb-3"
                >
                  <div className="mb-2 mb-sm-0">
                    <label>
                      <input
                        type="radio"
                        name="bargain"
                        value={0}
                        checked={getVal(payment, "bargain") === "0"}
                        onChange={(e) => fillData(e, setPayment, payment)}
                      />
                      <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                        ???????????????? ????????
                      </span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="bargain"
                        value={1}
                        checked={getVal(payment, "bargain") === "1"}
                        onChange={(e) => fillData(e, setPayment, payment)}
                      />
                      <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                        ?????? ??????????
                      </span>
                    </label>
                  </div>
                </div>
                <div
                  data-label="paymentType"
                  data-warning="false"
                  className="row row-cols-sm-2 row-cols-xxl-3 mb-4"
                >
                  <div className="mb-2 mb-sm-0">
                    <label>
                      <input
                        type="radio"
                        name="paymentType"
                        value={0}
                        checked={getVal(payment, "paymentType") === "0"}
                        onChange={(e) => fillData(e, setPayment, payment)}
                      />
                      <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                        ??????????????????/????????????
                      </span>
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="paymentType"
                        value={1}
                        checked={getVal(payment, "paymentType") === "1"}
                        onChange={(e) => fillData(e, setPayment, payment)}
                      />
                      <span className="title-font fs-12 fw-5 ms-2 ms-xl-3">
                        ???????????????????? ??????????????
                      </span>
                    </label>
                  </div>
                </div>
                {/* {getVal(payment, "paymentType") === "0" && (
                  <div className="row align-items-center mb-4">
                    <div className="col-sm-3 mb-2 mb-sm-0">
                      <div
                        data-label="cash"
                        data-warning="false"
                        className="title-font fs-12 fw-5"
                      >
                        ??????????????????
                      </div>
                    </div>
                    <div className="col-sm-9">
                      <div className="row gx-2 gx-sm-4">
                        <div className="col-8 col-sm-5 col-xl-4">
                          <input
                            type="number"
                            min="1"
                            name="cash"
                            placeholder="0"
                            value={getVal(payment, "cash")}
                            onChange={(e) => fillData(e, setPayment, payment)}
                            className="price-per-km w-100 fs-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}
                <div className="row align-items-center mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div
                      data-label="priceVat"
                      data-warning="false"
                      className="title-font fs-12 fw-5"
                    >
                      ?? ??????
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row gx-2 gx-sm-4">
                      <div className="col-8 col-sm-5 col-xl-4">
                        <input
                          type="number"
                          min="1"
                          name="priceVat"
                          placeholder="0"
                          value={getVal(payment, "priceVat")}
                          onChange={(e) => fillData(e, setPayment, payment)}
                          className="price-per-km w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center mb-4">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div
                      data-label="priceNovat"
                      data-warning="false"
                      className="title-font fs-12 fw-5"
                    >
                      ?????? ??????
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-8 col-sm-5 col-xl-4">
                        <input
                          type="number"
                          min="1"
                          name="priceNovat"
                          placeholder="0"
                          value={getVal(payment, "priceNovat")}
                          onChange={(e) => fillData(e, setPayment, payment)}
                          className="price-per-km w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-sm-3 mb-2 mb-sm-0">
                    <div
                      data-label="prepay"
                      data-warning="false"
                      className="title-font fs-12 fw-5"
                    >
                      ????????????????????*
                    </div>
                  </div>
                  <div className="col-sm-9">
                    <div className="row">
                      <div className="col-8 col-sm-5 col-xl-4">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          name="prepay"
                          placeholder="0"
                          value={getVal(payment, "prepay")}
                          onChange={(e) => fillData(e, setPayment, payment)}
                          className="percent w-100 fs-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mobile-btns d-block d-lg-none">
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#usePatternCargo"
                    >
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <IoNewspaperOutline />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????????????? ????????????</span>
                    </button>
                    <button type="reset">
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <VscChromeClose />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????? ??????????</span>
                    </button>
                  </div>
                  <div className="row row-cols-2 gx-2 gx-sm-4 title-font">
                    <div>
                      <button
                        type="button"
                        onClick={() => setActiveField(4)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronBackOutline />
                        </IconContext.Provider>
                        <span className="ms-1 ms-sm-3 text-uppercase">
                          ??????????
                        </span>
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        disabled={checkFieldset(payment) ? false : true}
                        onClick={() => setActiveField(6)}
                        className="btn btn-1 w-100 fs-11"
                      >
                        <span className="me-1 me-sm-3 text-uppercase">
                          ??????????
                        </span>
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronForwardOutline />
                        </IconContext.Provider>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset
              name="contactsField"
              data-show={activeField === 6 ? "true" : "false"}
            >
              <h4 className="text-center text-lg-start mt-lg-5 mb-4 mb-lg-3">
                ????????????????
              </h4>
              <div className="box">
                {contacts.map((obj, idx) => (
                  <div key={idx} className="row gx-2 gx-sm-4 mb-3">
                    <div className="col-md-9">
                      <div className="row align-items-center gy-2 gy-md-3">
                        <div className="col-md-4">
                          <div
                            data-label="phone"
                            data-warning="false"
                            className="title-font fs-12 fw-5"
                          >
                            ??????????????*
                          </div>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+ 7 (962) 458 65 79"
                            value={getContact("phone", idx)}
                            onChange={(e) => fillContacts(e, idx)}
                            className="w-100 fs-12"
                          />
                        </div>
                        <div className="col-md-4">
                          <div
                            data-label="name"
                            data-warning="false"
                            className="title-font fs-12 fw-5"
                          >
                            ??????*
                          </div>
                        </div>
                        <div className="col-md-8">
                          <input
                            type="text"
                            name="name"
                            placeholder="??????"
                            value={getContact("name", obj.index)}
                            onChange={(e) => fillContacts(e, obj.index)}
                            className="w-100 fs-12"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mt-2 mt-md-0">
                      {obj.index === 0 ? (
                        <button
                          type="button"
                          onClick={() => addContacts()}
                          className="green fs-11 fw-5 text-start"
                        >
                          <IconContext.Provider
                            value={{ className: "green icon-15" }}
                          >
                            <IoAddCircle />
                          </IconContext.Provider>
                          <span className="ms-2">???????????????? ??????????????</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => deleteContacts(obj.index)}
                          className="red fs-11 fw-5"
                        >
                          <IconContext.Provider
                            value={{ className: "red icon-15" }}
                          >
                            <IoCloseCircle />
                          </IconContext.Provider>
                          <span className="ms-2">??????????????</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="col-md-3 mb-2 mb-md-0">
                    <div className="title-font fs-12 fw-5">????????????????????</div>
                  </div>
                  <div className="col-md-9">
                    <textarea
                      rows={3}
                      name="remark"
                      placeholder="?????????????? ?????????? ???????????????????????????? ????????????????????"
                      value={getVal(contactsField, "remark")}
                      onChange={(e) =>
                        fillData(e, setContactsField, contactsField)
                      }
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="mobile-btns d-block d-lg-none">
                <div className="container">
                  <div className="d-flex align-items-center justify-content-between blue title-font fw-5 fs-11">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#usePatternCargo"
                    >
                      <IconContext.Provider value={{ className: "icon-15" }}>
                        <IoNewspaperOutline />
                      </IconContext.Provider>
                      <span className="ms-1">???????????????????????? ????????????</span>
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#savePatternCargo"
                      onClick={handleSaveTemplate}
                    >
                      ?????????????????? ????????????
                    </button>
                  </div>
                  <div className="row gx-2 gx-sm-4 title-font">
                    <div className="col-5 col-sm-6">
                      <button
                        type="button"
                        onClick={() => setActiveField(5)}
                        className="btn btn-1 px-3 w-100 fs-11"
                      >
                        <IconContext.Provider value={{ className: "icon-15" }}>
                          <IoChevronBackOutline />
                        </IconContext.Provider>
                        <span className="ms-1 ms-sm-3 text-uppercase">
                          ??????????
                        </span>
                      </button>
                    </div>
                    <div className="col-7 col-sm-6">
                      <button
                        type="submit"
                        className="btn btn-2 w-100 h-100 fs-11 text-uppercase px-3"
                      >
                        ???????????????????? ????????
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="d-none d-lg-block title-font fs-09 fw-5 mt-3">
              * ???????? ???????????????????????? ?? ????????????????????
            </div>
          </div>
          <div className="col-lg-4 pt-lg-5 position-relative d-none d-lg-block">
            <aside className="box">
              <nav className="contents">
                <ol>
                  <li>
                    <Link
                      activeClass="active"
                      to="loading"
                      spy={true}
                      smooth={true}
                      hashSpy={true}
                      offset={-80}
                      duration={300}
                      isDynamic={true}
                      className={checkFieldsetArr(loading) ? "filled" : ""}
                    >
                      ????????????????
                    </Link>
                    {loading.map((arr, index) => (
                      <div key={index} className="fs-09">
                        <span>?????????? {index + 1} - </span>
                        {getValArr(loading, index, "frequency") && (
                          <span className="me-1">
                            {getValArr(loading, index, "frequency") === "0"
                              ? "???????? ??????????"
                              : "??????????????????"}
                            :
                          </span>
                        )}
                        {getValArr(loading, index, "loadingDate") && (
                          <span className="me-1">
                            {getValArr(loading, index, "loadingDate")}
                          </span>
                        )}
                        {getValArr(loading, index, "loadingDays") && (
                          <span className="me-1">
                            + {getValArr(loading, index, "loadingDays")} ??????
                          </span>
                        )}
                        {getValArr(loading, index, "loadingPeriodType") && (
                          <span className="me-1">
                            {getObjLabel(
                              optionsLoadingPeriodType,
                              arr,
                              "loadingPeriodType"
                            )}
                          </span>
                        )}
                        {getValArr(loading, index, "loadingTimeFrom") && (
                          <span className="me-1">
                            , {getValArr(loading, index, "loadingTimeFrom")}
                          </span>
                        )}
                        {getValArr(loading, index, "loadingTimeTo") && (
                          <span className="me-1">
                            ??? {getValArr(loading, index, "loadingTimeTo")}
                          </span>
                        )}
                        {getValArr(loading, index, "isLoadingAllDay") && (
                          <span className="me-1">, ??????????????????????????</span>
                        )}
                        {getValArr(loading, index, "loadingTown") && (
                          <span className="me-1">
                            , {getObjLabel(optionsTowns, arr, "loadingTown")}
                          </span>
                        )}
                        {getValArr(loading, index, "loadingAddress") && (
                          <span className="me-1">
                            , {getValArr(loading, index, "loadingAddress")}
                          </span>
                        )}
                        {getValArr(loading, index, "transportationType") && (
                          <span className="me-1">
                            , {getValArr(loading, index, "transportationType")}
                          </span>
                        )}
                        {getValArr(loading, index, "loadingType") && (
                          <span className="me-1">
                            , {getObjLabel(optionsLoading, arr, "loadingType")}
                          </span>
                        )}
                      </div>
                    ))}
                  </li>
                  <li>
                    <Link
                      activeClass="active"
                      to="unloading"
                      spy={true}
                      smooth={true}
                      hashSpy={true}
                      offset={-80}
                      duration={300}
                      isDynamic={true}
                      className={checkFieldsetArr(unloading) ? "filled" : ""}
                    >
                      ??????????????????
                    </Link>
                    {unloading.map((arr, index) => (
                      <div key={index} className="fs-09">
                        <span>?????????? {index + 1} - </span>
                        {getValArr(unloading, index, "unloadingDateFrom") && (
                          <span className="me-1">
                            {getValArr(unloading, index, "unloadingDateFrom")}
                          </span>
                        )}
                        {getValArr(unloading, index, "unloadingDateTo") && (
                          <span className="me-1">
                            ??? {getValArr(unloading, index, "unloadingDateTo")}
                          </span>
                        )}
                        {getValArr(unloading, index, "unloadingTimeFrom") && (
                          <span className="me-1">
                            , {getValArr(unloading, index, "unloadingTimeFrom")}
                          </span>
                        )}
                        {getValArr(unloading, index, "unloadingTimeTo") && (
                          <span className="me-1">
                            ??? {getValArr(unloading, index, "unloadingTimeTo")}
                          </span>
                        )}
                        {getValArr(unloading, index, "isUnloadingAllDay") && (
                          <span className="me-1">, ??????????????????????????</span>
                        )}
                        {getValArr(unloading, index, "unloadingTown") && (
                          <span className="me-1">
                            {getObjLabel(optionsTowns, arr, "unloadingTown")}
                          </span>
                        )}
                        {getValArr(unloading, index, "unloadingAddress") && (
                          <span className="me-1">
                            , {getValArr(unloading, index, "unloadingAddress")}
                          </span>
                        )}
                        {getValArr(unloading, index, "unloadingType") && (
                          <span className="me-1">
                            ,{" "}
                            {getObjLabel(optionsLoading, arr, "unloadingType")}
                          </span>
                        )}
                      </div>
                    ))}
                  </li>
                  <li>
                    <Link
                      activeClass="active"
                      to="cargo"
                      spy={true}
                      smooth={true}
                      hashSpy={true}
                      offset={-80}
                      duration={300}
                      isDynamic={true}
                      className={checkFieldsetArr(cargo) ? "filled" : ""}
                    >
                      ????????
                    </Link>
                    {cargo.map((arr, index) => (
                      <div key={index} className="fs-09">
                        <span>???????? ???{index + 1} - </span>
                        {getValArr(cargo, index, "cargoType") && (
                          <span className="me-1">
                            {getObjLabel(optionsCargoType, arr, "cargoType")}
                          </span>
                        )}
                        {getValArr(cargo, index, "packageType") && (
                          <span className="me-1">
                            ,{" "}
                            {getObjLabel(
                              optionsPackageType,
                              arr,
                              "packageType"
                            )}
                          </span>
                        )}
                        {getValArr(cargo, index, "packageCount") && (
                          <span className="me-1">
                            {getValArr(cargo, index, "packageCount")} ????
                          </span>
                        )}
                        {getValArr(cargo, index, "weight") && (
                          <span className="me-1">
                            , {getValArr(cargo, index, "weight")} ??
                          </span>
                        )}
                        {getValArr(cargo, index, "capacity") && (
                          <span className="me-1">
                            , {getValArr(cargo, index, "capacity")} ??
                            <sup>3</sup>
                          </span>
                        )}
                        {getValArr(cargo, index, "length") && (
                          <span className="me-1">
                            {getValArr(cargo, index, "length")}
                          </span>
                        )}
                        {getValArr(cargo, index, "width") && (
                          <span className="me-1">
                            / {getValArr(cargo, index, "width")}
                          </span>
                        )}
                        {getValArr(cargo, index, "height") && (
                          <span className="me-1">
                            / {getValArr(cargo, index, "height")}
                          </span>
                        )}
                        {getValArr(cargo, index, "notes") && (
                          <span className="me-1">
                            , {getObjLabel(optionsNotes, arr, "notes")}
                          </span>
                        )}
                        {getValArr(cargo, index, "ADR1") && (
                          <span className="me-1">, ADR1</span>
                        )}
                        {getValArr(cargo, index, "ADR2") && (
                          <span className="me-1">, ADR2</span>
                        )}
                        {getValArr(cargo, index, "ADR3") && (
                          <span className="me-1">, ADR3</span>
                        )}
                        {getValArr(cargo, index, "ADR4") && (
                          <span className="me-1">, ADR4</span>
                        )}
                        {getValArr(cargo, index, "ADR5") && (
                          <span className="me-1">, ADR5</span>
                        )}
                        {getValArr(cargo, index, "ADR6") && (
                          <span className="me-1">, ADR6</span>
                        )}
                        {getValArr(cargo, index, "ADR7") && (
                          <span className="me-1">, ADR7</span>
                        )}
                        {getValArr(cargo, index, "ADR8") && (
                          <span className="me-1">, ADR8</span>
                        )}
                        {getValArr(cargo, index, "ADR9") && (
                          <span className="me-1">, ADR9</span>
                        )}
                        {getValArr(cargo, index, "TIR") && (
                          <span className="me-1">, TIR</span>
                        )}
                        {getValArr(cargo, index, "EKMT") && (
                          <span className="me-1">, EKMT</span>
                        )}
                      </div>
                    ))}
                  </li>
                  <li>
                    <Link
                      activeClass="active"
                      to="requirements"
                      spy={true}
                      smooth={true}
                      hashSpy={true}
                      offset={-80}
                      duration={300}
                      isDynamic={true}
                      className={checkFieldset(requirements) ? "filled" : ""}
                    >
                      ???????????????????? ?? ????????????
                    </Link>
                    <div className="fs-09">
                      {getVal(requirements, "carType") && (
                        <span className="me-1">
                          {getObjLabel(optionsCarType, requirements, "carType")}
                        </span>
                      )}
                      {getVal(requirements, "tempFrom") && (
                        <span className="me-1">
                          , {getVal(requirements, "tempFrom")}
                        </span>
                      )}
                      {getVal(requirements, "tempTo") && (
                        <span className="me-1">
                          - {getVal(requirements, "tempTo")}??C
                        </span>
                      )}
                    </div>
                  </li>
                  <li>
                    <Link
                      activeClass="active"
                      to="payment"
                      spy={true}
                      smooth={true}
                      hashSpy={true}
                      offset={-80}
                      duration={300}
                      isDynamic={true}
                      className={checkFieldset(payment) ? "filled" : ""}
                    >
                      ????????????
                    </Link>
                    <div className="fs-09">
                      {getVal(payment, "bargain") && (
                        <span className="me-1">
                          {getVal(payment, "bargain") === 0
                            ? "???????????????? ????????"
                            : "?????? ??????????"}
                        </span>
                      )}
                      {getVal(payment, "paymentType") && (
                        <span className="me-1">
                          ,{" "}
                          {getVal(payment, "paymentType") === 0
                            ? "???????????????? ????????????"
                            : "?????????????? ???? ??????????"}
                        </span>
                      )}
                      {getVal(payment, "cash") && (
                        <span className="me-1">
                          , ??????????????????&nbsp;{getVal(payment, "cash")}&nbsp;??/????
                        </span>
                      )}
                      {getVal(payment, "priceVat") && (
                        <span className="me-1">
                          , ??&nbsp;?????? {getVal(payment, "priceVat")}&nbsp;??/????
                        </span>
                      )}
                      {getVal(payment, "priceNovat") && (
                        <span className="me-1">
                          , ??????&nbsp;?????? {getVal(payment, "priceNovat")}
                          &nbsp;??/????
                        </span>
                      )}
                      {getVal(payment, "prepay") && (
                        <span className="me-1">
                          , ????????????????????&nbsp;{getVal(payment, "prepay")}%
                        </span>
                      )}
                    </div>
                  </li>
                  <li>
                    <Link
                      activeClass="active"
                      to="contactsField"
                      spy={true}
                      smooth={true}
                      hashSpy={true}
                      offset={-80}
                      duration={300}
                      isDynamic={true}
                      className={checkAllProps(contacts) ? "filled" : ""}
                    >
                      ????????????????
                    </Link>
                    {contacts.map((obj) => (
                      <div key={obj.index} className="fs-09">
                        {obj.name && <span>{obj.name}: </span>}
                        {obj.phone && <span>{obj.phone}</span>}
                      </div>
                    ))}
                  </li>
                </ol>
              </nav>
              <button
                type="submit"
                className="btn btn-1 text-uppercase fs-15 mx-auto mt-4 mt-xl-5"
              >
                ???????????????????? ????????
              </button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#savePatternCargo"
                className="fs-11 mx-auto mt-2 mt-xl-3 blue"
                onClick={handleSaveTemplate}
              >
                ?????????????????? ????????????
              </button>
            </aside>
          </div>
        </form>
      </section>
    </main>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { IoCaretDown } from "react-icons/io5";

// required props / обязательные свойства:
// multy = true / false
// options = array
// checkedOpt = num / array {[]} (if multy)

export default function CustomSelect(props) {
  const [visible, setVisibility] = useState(false);
  const [checkedVal, setCheckedVal] = useState(props.checkedOpt);
  
  console.log(checkedVal);
  
  useEffect(() => {
    props.onSelectChange(checkedVal);
  }, [checkedVal]);

  const options = props.options;
  let checkedValText = options[checkedVal - 1];

  const multy = props.multy; // true or false

  const ref = useRef(null);

  let func = props.onChange;

  const handleChange = (e) => {
    let val = e.target.value;
    if (multy) {
      if (e.target.checked === true) {
        setCheckedVal([...checkedVal, options.indexOf(val) + 1]);
      } else {
        setCheckedVal(
          checkedVal.filter((obj) => obj !== options.indexOf(val) + 1)
        );
      }
    } else {
      setCheckedVal(options.indexOf(val) + 1);
    }
    setVisibility(false);
  };

  //collapse on click outside of select (сворачивание при клике вне селекта)
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setVisibility(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const onReset = () => {
    setCheckedVal(props.checkedOpt);
  };
  useEffect(() => {
    document.addEventListener("reset", onReset, true);
    return () => {
      document.removeEventListener("reset", onReset, true);
    };
  });

  //This part is technically not necessary
  useEffect(() => {
    if(!props.reset) onReset()
  }, [props.reset])

  return multy ? (
    <div ref={ref} className={"custom-select " + props.className}>
      <button
        type="button"
        className={props.btnClass}
        onClick={() => setVisibility(visible === false ? true : false)}
      >
        {checkedVal ? (
          <div>
            {checkedVal.length === 1
              ? checkedValText
              : "Выбрано: " + checkedVal.length}
          </div>
        ) : (
          <div className="gray-4">Не выбранно</div>
        )}
        <IconContext.Provider value={{ color: "#575E62" }}>
          <IoCaretDown />
        </IconContext.Provider>
      </button>
      <ul
        className={visible ? "options py-2" : "options d-none py-2"}
        data-alignment={props.alignment}
      >
        {options.map(function (item, index) {
          return checkedVal ? (
            <li key={index}>
              <label className="line">
                <input
                  type="checkbox"
                  name={props.name}
                  value={item}
                  checked={checkedVal.includes(index + 1) ? true : false}
                  onChange={(e) => handleChange(e)}
                />
                <div>{item}</div>
              </label>
            </li>
          ) : (
            <li key={index}>
              <label className="line">
                <input
                  type="checkbox"
                  name={props.name}
                  value={item}
                  checked={false}
                  onChange={(e) => handleChange(e)}
                />
                <div>{item}</div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <div ref={ref} className={"custom-select " + props.className}>
      <button
        type="button"
        className={props.btnClass}
        onClick={() => setVisibility(visible === false ? true : false)}
      >
        {checkedVal ? (
          <div>{checkedValText}</div>
        ) : (
          <div className="gray-4">Не выбранно</div>
        )}
        <IconContext.Provider value={{ color: "#575E62" }}>
          <IoCaretDown />
        </IconContext.Provider>
      </button>
      <ul
        className={visible ? "options py-2" : "options d-none py-2"}
        data-alignment={props.alignment}
      >
        {options.map(function (item, index) {
          return (
            <li key={index}>
              <label className="line">
                <input
                  type="radio"
                  name={props.name}
                  value={item}
                  checked={index === checkedVal - 1 ? true : false}
                  onChange={(e) => handleChange(e)}
                  onInput={func}
                />
                <div>{item}</div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

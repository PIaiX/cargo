import React, {useState, useEffect, useRef} from 'react';
import { IconContext  } from "react-icons";
import { IoCaretDown } from 'react-icons/io5';

export default function CustomSelect(props) {
    const [visible, setVisibility] = useState(false);
    const [checkedVal, setCheckedVal] = useState(props.checkedOpt);
    
    const options = props.options;
    let checkedValText = options[checkedVal-1];

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisibility(false);
        }
    };

    const handleChange = e => {
        let val = e.target.value;
        setCheckedVal(options.indexOf(val)+1);
        setVisibility(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });
    
    return (
        <div ref={ref} className={"custom-select " + props.className}>
            <button type="button" className={props.btnClass} onClick={() => setVisibility((visible === false) ? true : false)}> 
                {
                    (checkedVal)?
                    <div>{checkedValText}</div>
                    : <div className="gray-4">Не выбранно</div>
                }
                <IconContext.Provider value={{color: "#575E62" }}>
                    <IoCaretDown />
                </IconContext.Provider>
            </button>
            <div className={visible ? 'options py-2' : 'options d-none py-2'} data-alignment={props.alignment}>
                {options.map(function(item, index) {
                    return (
                        <label className="radio-line" key={index}>
                            <input type="radio" name={props.name} value={item} checked={(index === checkedVal-1) ? true : false} onChange={handleChange}/>
                            <div>{item}</div>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
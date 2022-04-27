import React, {useState} from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IconContext  } from "react-icons";

export default function InputPassword(props) {
    const [visible, setVisibility] = useState(props.visible);
    const handleClick = () => {
        (visible)?
        setVisibility(false)
        :setVisibility(true)
    };

    return (
        <div className={"password " + props.className}>
            <input type={(visible) ? "text" : "password"} name={props.name} autoComplete="current-password" minLength="4" maxLength="8" size="8" required/>
            <button type="button" onClick={() => handleClick()}>
                {
                    (visible) ?
                    <IconContext.Provider value={{className: "icon-15 gray-4", title: "скрыть" }}>
                        <BsEye />
                    </IconContext.Provider>
                    : <IconContext.Provider value={{className: "icon-15 gray-4", title: "показать" }}>
                        <BsEyeSlash />
                    </IconContext.Provider>
                }
            </button>
        </div>
    )
}
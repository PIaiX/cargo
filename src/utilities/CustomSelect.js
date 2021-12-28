import React, {useState, useEffect, useRef} from 'react';

export default function CustomSelect(props) {
    const [visible, setVisibility] = useState(false);
    const [checkedVal, setCheckedVal] = useState(props.checkedOpt);
    
    const options = props.options;

    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setVisibility(false);
        }
    };

    const handleChange = e => {
        setCheckedVal(e.target.value);
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
                <div>{checkedVal}</div>
                <svg className="ms-2" viewBox="0 0 23 14" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.1352 13.1912L1.44243 3.25513C0.416552 2.08606 1.2503 0.250001 2.80724 0.250001H20.1927C20.5412 0.249702 20.8823 0.349847 21.1753 0.538443C21.4683 0.727039 21.7007 0.996092 21.8447 1.31338C21.9888 1.63067 22.0383 1.98275 21.9873 2.32745C21.9364 2.67215 21.7872 2.99486 21.5576 3.25694L12.8648 13.1894C12.6947 13.3841 12.4849 13.5401 12.2495 13.6471C12.0141 13.754 11.7585 13.8093 11.5 13.8093C11.2414 13.8093 10.9859 13.754 10.7505 13.6471C10.5151 13.5401 10.3053 13.3841 10.1352 13.1894V13.1912Z"/>
                </svg>
            </button>
            <div className={visible ? 'options py-2' : 'options d-none py-2'} data-alignment={props.alignment}>
                {options.map(function(item) {
                    return (
                        <label className="radio-line" key={item}>
                            <input type="radio" name="type" value={item} checked={(item === checkedVal) ? true : false} onChange={handleChange}/>
                            <div>{item}</div>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}
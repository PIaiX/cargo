import React, {memo, useEffect, useRef, useState} from 'react';

const SearchInput = memo(({data, placeHolder, callback}) => {

        const [inputValue, setInputValue] = useState('')
        const [inputValueShow, setInputValueShow] = useState(false)
        const ref = useRef(null)

        const closeFindDiv = () => setInputValueShow(false)

        const handlerClickOutDiv = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                closeFindDiv()
            }
        }

        useEffect(() => {
            document.addEventListener('click', handlerClickOutDiv, true);
            return () => {
                document.removeEventListener('click', handlerClickOutDiv, true);
            }
        })

        const findValue = (value) => {
            const filteredValue = value.toLowerCase().trim()
            if (data) {
                return data.filter(x => x.toLowerCase().startsWith(filteredValue)).slice(0, 5)
            }
        }

        const onChange = (inputValue) => {
            callback && callback(inputValue)
        }

        return (
            <>
                <div className="inputCity" ref={ref}>
                    <input
                        type="text"
                        placeholder={placeHolder}
                        className="fs-15"
                        value={inputValue}
                        onClick={() => setInputValueShow(true)}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            findValue(e.target.value)
                            onChange(e.target.value)
                        }}
                    />
                    <div className={`mainCity ${inputValueShow ? '' : 'd-none'}`}>
                        {data && findValue(inputValue).map((i, index) => (
                            <div
                                key={index}
                                className="personalCity"
                                onClick={() => {
                                    setInputValue(i)
                                    setInputValueShow(false)
                                    onChange(i)
                                }}
                            >
                                <p>{i}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
);

export default SearchInput;
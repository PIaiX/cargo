import React, {memo, useState} from 'react';

const SearchInput = memo(({data, placeHolder, callback}) => {

        const [inputValue, setInputValue] = useState('')
        const [inputValueShow, setInputValueShow] = useState(false)

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
                <div className="inputCity">
                    <input
                        type="text"
                        placeholder={placeHolder}
                        className="fs-15"
                        value={inputValue}
                        onFocus={() => setInputValueShow(true)}
                        onBlur={() => setTimeout(() => setInputValueShow(false), 200)}
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
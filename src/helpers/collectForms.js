export const onInputHandler = (e, setFunction, isDigit = false) => {

    const text = e.target.value
    const name = e.target.name

    setFunction(prevValues => ({...prevValues, [name]: isDigit ? +text : text}))
}

export const onCheckboxHandler = (e, setFunction) => {

    const name = e.target.name

    setFunction(prevValues => ({...prevValues, [name]: !prevValues[name]}));
}

export const onRadioHandler = (e, setFunction, isDigit = false) => {

    const value = e.target.value
    const name = e.target.name

    setFunction(prevValues => ({...prevValues,[name]: isDigit ? +value : value}))

}

export const onSelectHandler = (e, setFunction, isDigit = false) => {

    const select = e.target.value
    const name = e.target.name

    setFunction(prevValues => ({...prevValues, [name]: isDigit ? +select : select}))
}
const getDateUI = (initialDate) => {
    const date = new Date(initialDate)

    return date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : null
}

const getTimeUI = (initialTime) => {
    // initialTime = hour:minutes:seconds (string)
    const temp = initialTime ? initialTime.split(':') : null
    const date = new Date(Date.now())

    if (temp?.length === 3) {
        date.setHours(temp[0])
        date.setMinutes(temp[1])
        date.setSeconds(temp[2])

        return `${date.getHours()}:${date.getMinutes()}`
    }
}

export {getDateUI, getTimeUI}
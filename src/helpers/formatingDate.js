const getDateUI = (initialDate, periodType = false) => {
  if (periodType) return periodType;

  const date = new Date(initialDate);
  const day = formatHelper(date.getDate())
  const month = formatHelper(date.getMonth() + 1)
  const year = formatHelper(date.getFullYear())

  return date
    ? `${day}.${month}.${year}`
    : null;
};

const getTimeUI = (initialTime, serverFormat = false) => {
  if (serverFormat) {
    const date = initialTime ? new Date(initialTime) : null;
    const formattedTime = formatHelper(date.getMinutes())
    return date ? `${date.getHours()}:${formattedTime}` : null;
  } else {
    // initialTime = hour:minutes:seconds (string)
    const temp = initialTime ? initialTime.split(":") : null;
    const date = new Date(Date.now());
    const formattedTime = formatHelper(date.getMinutes())

    if (temp?.length === 3) {
      date.setHours(temp[0]);
      date.setMinutes(temp[1]);
      date.setSeconds(temp[2]);

      return `${date.getHours()}:${formattedTime}`;
    }
  }
};

const formatHelper = (numValue) => {
  const valueAsString = numValue.toString()
  const formattedValue = valueAsString.length === 1 ? `0${valueAsString}` : valueAsString
  return formattedValue
}

export { getDateUI, getTimeUI };

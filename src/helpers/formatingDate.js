const getDateUI = (initialDate, periodType = false) => {
  if (periodType) return periodType;

  const date = new Date(initialDate);

  return date
    ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    : null;
};

const getTimeUI = (initialTime, serverFormat = false) => {
  if (serverFormat) {
    const date = initialTime ? new Date(initialTime) : null;

    return date ? `${date.getHours()}:${date.getMinutes()}` : null;
  } else {
    // initialTime = hour:minutes:seconds (string)
    const temp = initialTime ? initialTime.split(":") : null;
    const date = new Date(Date.now());

    if (temp?.length === 3) {
      date.setHours(temp[0]);
      date.setMinutes(temp[1]);
      date.setSeconds(temp[2]);

      return `${date.getHours()}:${date.getMinutes()}`;
    }
  }
};

export { getDateUI, getTimeUI };

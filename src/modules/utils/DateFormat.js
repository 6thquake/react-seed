const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const formatTime = time => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return {
    year,
    month: formatNumber(month),
    day: formatNumber(day),
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  };
};

const dayUp = time => {
  let date = formatTime(time);
  let { year, month, day } = date;
  return [year, month, day].join('.');
};

const dayDown = time => {
  let date = formatTime(time);
  let { hours, minutes, seconds } = date;
  return [hours, minutes, seconds].join(' : ');
};

export { formatTime, dayUp, dayDown };

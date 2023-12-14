export const getFormattedTime = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const meridiemIndicator = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;

  return `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${meridiemIndicator}`;
}

export const getWeekDay = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export const getCurrentDate = (currentDate: number): string => {
  const date = new Date(currentDate * 1000);

  const year = date.getFullYear();
  const month = date.toLocaleDateString('en-US', { month: 'short' });;
  const day = date.getDate();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

  return `${dayOfWeek}, ${month} ${day} ${year}`;
}

export const getCurrentTimeInMin = (timeStamp?: number) => {
  let time;
  
  if (timeStamp) {
    time = new Date(timeStamp * 1000);
  } else {
    time = new Date();
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  
  return hours * 60 + minutes;
}
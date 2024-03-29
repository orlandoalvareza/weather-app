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

export const getCurrentTimeInSeconds = (timeStamp?: number) => {
  let time;
  
  if (timeStamp) {
    time = new Date(timeStamp * 1000);
  } else {
    time = new Date();
  }

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds()
  
  return (hours * 60 + minutes) * 60 + seconds;
}

export const getExpectedTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - (hours * 3600)) / 60);

  return `${hours < 10 ? '0' : ''}${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`;
}
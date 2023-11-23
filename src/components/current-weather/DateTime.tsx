import { CurrentDateProps } from "../../interfaces/current-date";

const DateTime: React.FC<CurrentDateProps> = ({ currentDate }) => {
  const date = new Date(currentDate * 1000);

  const year = date.getFullYear();
  const month = date.toLocaleDateString('en-US', { month: 'short' });;
  const day = date.getDate();
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

  const dateTime = `${dayOfWeek}, ${month} ${day} ${year}`;

  return <h2>{dateTime}</h2>
}

export default DateTime;
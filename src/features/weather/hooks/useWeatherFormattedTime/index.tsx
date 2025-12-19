import dayjs from '@/lib/date';
const useWeatherFormattedTime = (time: string, date: string) => {
  const formattedTime = time.slice(8).replace(/^(\d{2})(\d{2})$/, '$1:$2');
  const formattedDate = dayjs(date).format('dddd, D MMMM');
  return {
    formattedDate,
    formattedTime,
  };
};

export default useWeatherFormattedTime;

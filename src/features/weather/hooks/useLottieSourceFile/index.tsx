import dayjs from '@/lib/date';

import { weatherCodeFile, weatherCodeNightFile } from '@/constant/bmkg';

const useLottieSourceFile = (
  time: string,
  unit: keyof typeof weatherCodeFile,
) => {
  const hour = dayjs(time).get('hour');
  const getFileType = () => {
    if (hour >= 7 && hour <= 18) {
      return weatherCodeFile;
    } else {
      return weatherCodeNightFile;
    }
  };

  return getFileType()[unit];
};

export default useLottieSourceFile;


import { isEvening, isNight } from '@/lib/date';

import { weatherCodeFile, weatherCodeNightFile } from '@/constant/bmkg';

const useLottieSourceFile = (time: string, unit: keyof typeof weatherCodeFile) => {
  const isNightTime = isNight(time);
  const isEveningTime = isEvening(time);

  return (isNightTime || isEveningTime ? weatherCodeNightFile : weatherCodeFile)[unit]
}

export default useLottieSourceFile

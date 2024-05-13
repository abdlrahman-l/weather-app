import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

dayjs.locale('id');

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(updateLocale);
dayjs.extend(utc);

dayjs.tz.setDefault('Asia/Jakarta');

dayjs.updateLocale('en', {
	weekdaysMin: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
	weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
	months: [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	],
});

export const FORMAT_DATE = 'DD MMMM YYYY, HH:mm';
export const FORMAT_DATE_DOCTOR = 'dddd, DD-MMM';
export const FORMAT_DATE_DOCTOR_DAY_MONTH = 'DD-MMM';

const IndonesiaTimezones: Record<number, string> = {
	7: 'Asia/Jakarta',
	8: 'Asia/Makassar',
	9: 'Asia/Manokwari',
};

export const getCurrentTimeZone = () => {
	const offset = dayjs().utcOffset() / 60;
	return IndonesiaTimezones[offset] || dayjs.tz.guess();
};

export const isNight = (time: string) => {
    const hour = dayjs(time).get('hour');
    return hour > 18 || hour < 6
}

export const isEvening = (time: string) => {
    const hour = dayjs(time).get('hour');
    return hour > 17 && hour < 22
}

export default dayjs;

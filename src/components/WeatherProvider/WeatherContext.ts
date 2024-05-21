'use client';
import { createContext } from 'react';

import { FormattedArea, Province } from '@/lib/types';

type WeatherContextType = {
	province: Province | null;
	setProvince: (v: Province | null) => void;
	area: FormattedArea | null;
	setArea: (v: FormattedArea | null) => void;
	isCelcius: boolean;
	setIsCelcius: (v: boolean) => void;
};

export default createContext<WeatherContextType>({
	province: null,
	setProvince: () => {
		return;
	},
	area: null,
	setArea: () => {
		return;
	},
	isCelcius: true,
	setIsCelcius: () => {
		return;
	}
});

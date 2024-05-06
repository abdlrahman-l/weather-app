'use client';
import { createContext } from 'react';

import { Province } from '@/lib/types';

type WeatherContextType = {
	province: Province | null;
	setProvince: (v: Province | null) => void;
};

export default createContext<WeatherContextType>({
	province: null,
	setProvince: () => {
		return;
	},
});

import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const separateWithSpaces = (string: string): string => {
  return string
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space between lowercase and uppercase letters
      .toLowerCase(); // Convert the entire string to lowercase
};

export const slugify = (string: string) => {
	return string
		.normalize('NFD') // split an accented letter in the base letter and the acent
		.replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
		.replace(/\s+/g, '-')
		.replace(/^-?(.*?)-?$/, '$1'); // remove hyphen at first or last strings
};

export const startCase = (string: string) => {
	return string
		? string
				.replace(/-/g, ' ')
				.toLowerCase()
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')
		: '';
};


export const ucwords = (value: string) => startCase(value ? value.toString().toLowerCase() : '');
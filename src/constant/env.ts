export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : (process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false);

export const weatherBaseUrl = process.env.NEXT_PUBLIC_WEATHER_URL as string;
export const repoApiUrl = process.env.NEXT_PUBLIC_REPO_API_URL as string;

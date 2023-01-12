import { version } from '../package.json';

export const isDevelopment = import.meta.env.NODE_ENV === 'development';
export const versionLabel = `${isDevelopment ? 'dev' : 'v'}${version}`;

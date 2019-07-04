import devConfig from './development';
import productionConfig from './production';

const config = {
  development: {
    ...devConfig
  },
  production: {
    ...productionConfig
  }
};

const env = process.env.NODE_ENV || 'development';

export default config[env];

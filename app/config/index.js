import devConfig from './development';
import productionConfig from './production';
import defaultConfig from './default';

const config = {
  development: {
    ...devConfig
  },
  production: {
    ...productionConfig
  }
};

const env = process.env.NODE_ENV || 'development';
const configs = Object.assign(config[env], { ...defaultConfig });

export default configs;

const path = require('path');

const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  // другие настройки вашего проекта
  webpack: {
    alias: {
      '@components': resolvePath('./src/components'),
      '@assets': resolvePath('./src/assets'),
      '@styles': resolvePath('./src/styles'),
      '@utils': resolvePath('./src/utils'),
      '@slices': resolvePath('./src/slices'),
      // другие алиасы, если необходимо
    },
  },
  // другие настройки
};

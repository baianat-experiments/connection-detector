const path = require('path');
const { version } = require('../package.json');

module.exports = {
  banner:
  `/**
  * down.js v${version}
  * (c) ${new Date().getFullYear()} Baianat
  * @license MIT
  */`,
  outputFolder: path.join(__dirname, '..', 'dist'),
  uglifyOptions: {
    compress: true,
    mangle: true,
  },
};

const rollup = require('rollup');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const buble = require('rollup-plugin-buble');
const uglify = require('uglify-js');
const { version } = require('../package.json');
const config = require('./config');

const inputOptions = {
  input: 'src/index.js',
  plugins: [buble()]
};

const outputOptions = {
  format: 'umd',
  name: 'Down',
  banner: config.banner,
};

async function build () {
  console.log(chalk.cyan('Generating dist files...'));

  const bundle = await rollup.rollup(inputOptions);
  const { code } = await bundle.generate(outputOptions);

  fs.writeFileSync(path.join(config.outputFolder, 'down.js'), code);
  console.log(chalk.green('Output File:') + ' down.js');

  fs.writeFileSync(path.join(config.outputFolder, 'down.min.js'), uglify.minify(code, config.uglifyOptions).code);
  console.log(chalk.green('Output File:') + ' down.min.js');
}

build();

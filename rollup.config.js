import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  entry: 'src/commandline.js',
  dest: 'dist/commandline.js',
  format: 'cjs',
  plugins: [
    json(),
    babel()
  ]
};

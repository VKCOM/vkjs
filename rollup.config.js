import typescript from '@rollup/plugin-typescript';
import multiInput from 'rollup-plugin-multi-input';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/**/*.ts',
  output: {
    dir: 'lib',
    format: 'cjs'
  },
  plugins: [typescript(), multiInput(), terser()],
};

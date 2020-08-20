import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import multiInput from 'rollup-plugin-multi-input';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/**/*.ts',
  output: {
    dir: 'lib',
    format: 'cjs'
  },
  plugins: [nodeResolve(), typescript(), multiInput(), terser()],
};

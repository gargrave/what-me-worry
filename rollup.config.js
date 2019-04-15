import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.ts'],
    }),
    babel(),
  ],
}

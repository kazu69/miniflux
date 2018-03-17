import typescript from 'rollup-plugin-typescript2'

export default {
  entry: './src/index.ts',
  output: {
    file: './dist/bundle.js',
    format: 'iife',
    name: 'miniflux',
    sourcemap: true
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.bundle.json",
      tsconfigDefaults: {
        module: "ES2015"
      }
    })
  ]
}

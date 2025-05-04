import autoprefixer from 'autoprefixer'

export default {
  syntax: 'postcss-scss',
  plugins: [
    autoprefixer({
      overrideBrowserslist: ['>1%', 'last 4 versions']
    })
  ]
}

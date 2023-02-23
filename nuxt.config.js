// publicPath
const { DEPLOY_CONFIG, DEV_ENV } = require('./config/app.config')
const publicPath = `${DEPLOY_CONFIG.STATIC_CDN}static-cdn`

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Wallet',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
      },
    ],
    link: [{
      hid: 'icon',
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    __dangerouslyDisableSanitizers: ['script']
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#c00' },

  /*
   ** Global CSS
   */
  env: {
    DEV_MODE: process.env.DEV_MODE || "DEV",
    NODE_ENV: process.env.NODE_ENV || 'production'
  },

  router: {
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/clipboard',
    '~/plugins/filters',
    {
      src: '~/plugins/elementui',
      ssr: true,
    }
  ],
  /*
   ** Build configuration
   */
  build: {
    publicPath,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : `sbs-${DEV_ENV}-[chunkhash].js`,
      chunk: ({ isDev }) => isDev ? '[name].js' : `sbs-${DEV_ENV}-[chunkhash].js`,
      css: ({ isDev }) => isDev ? '[name].css' : `sbs-${DEV_ENV}-[contenthash].css`,
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : `img/sbs-${DEV_ENV}-[hash:7].[ext]`,
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : `fonts/sbs-${DEV_ENV}-[hash:7].[ext]`,
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : `videos/sbs-${DEV_ENV}-[hash:7].[ext]`,
    },
    maxChunkSize: 30000,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: process.env.NODE_ENV === 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          }
        }
      }
    },
    babel: {
      presets({isServer}) {
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [
          [ require.resolve("@babel/preset-env"), { targets }  ]
        ]
      },
      plugins: [
        "@babel/syntax-dynamic-import",
        "@babel/transform-runtime",
        "@babel/transform-async-to-generator"
      ]
    },
  },
  css: [
    '@/assets/styles/site.less',
  ],

  modules: [
    'cookie-universal-nuxt',
    // '@nuxtjs/proxy',
  ],

  proxy: {
   
  }

}

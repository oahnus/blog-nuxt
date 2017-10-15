let apiConfig = require('./api.config')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Oahnus Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Blog Project Via Nuxt.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    'element-ui/lib/theme-default/index.css',
    'static/css/github-markdown.min.css',
    'static/css/main.css'
  ],
  // env: {
  //   baseUrl: 'http://localhost:10706/blog'
  // },
  plugins: [
    { src: '~plugins/ElementUI.js'}, // ssr 默认true, 值为false,文件只会在客户端被打包引入
    { src: '~plugins/moment.js', ssr: false}
    // { src: '~plugins/Http.js', ssr: false},
  ],
  // axios: {
  //   baseURL: 'http://localhost:10706/blog',
  //   credentials: false,
  //   proxyHeaders: false
  // },
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: apiConfig.baseUrl
  },
  router: {
    middleware: ['log']
  },
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'axios',
      'element-ui'
    ],
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        'transform-async-to-generator',
        'transform-runtime'
      ],
      comments: true
    },
  }
}

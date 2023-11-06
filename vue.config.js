const path = require('path')
const name = '后台管理系统'
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  // TODO: Remember to change publicPath to fit your need
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',
  publicPath: './',

  // lintOnSave: process.env.NODE_ENV === 'development',

  // 关闭格式检查
  lintOnSave: false,
  pwa: {
    name: name
  },

  transpileDependencies: ['vuex-module-decorators'],

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },

  // chainWebpack(config) {
  //   // provide the app's title in html-webpack-plugin's options list so that
  //   // it can be accessed in index.html to inject the correct title.
  //   // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
  //   config.plugin('html').tap(args => {
  //     args[0].title = name
  //     return args
  //   })

  //   // config.plugin('monaco-editor').use(MonacoWebpackPlugin).tap(o => o)
  // },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ttf$/,
          use: ['file-loader']
        }
      ]
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['ini']
      })
    ]
  }
}

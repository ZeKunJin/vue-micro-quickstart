const assetsCDN = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  js: []
}

const vueConfig = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].cdn = assetsCDN
      return args
    })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // custom theme
        }
      }
    }
  }
}

module.exports = vueConfig

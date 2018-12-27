module.exports = {
  pwa: {
      name: 'PWA Serverless Push',
      appleMobileWebAppCapable: 'yes',
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
          // swSrc: 'public/service-worker.js'
            swSrc: 'public/OneSignalSDKWorker.js'
      },
      themeColor: '#4A90E2',
      msTileColor: '#4A90E2',
      iconPaths: {
          favicon32: 'img/icons/icon-32x32.png',
          favicon16: 'img/icons/icon-16x16.png',
          appleTouchIcon: 'img/icons/icon-152x152.png',
          msTileImage: 'img/icons/icon-144x144.png'
      }
  },
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: '@import "./src/styles/theme/resources.scss";',
      },
    },
  },

  configureWebpack: {},

  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: true,
    },
  },
};

const path = require('path')
function resolve(dir){
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'dist',
  devServer: {
    open: true,
    port: 8080,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://59.110.22.161:8081',
        ws: true,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^api": ""
        }
      }
    }
  },

  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 37.5, // vant官方使用的是37.5
            selectorBlackList: ['vant', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // less 文件覆盖（文件路径为绝对路径）
          // 这里千万要写对，不然就会报错，或者直接没有效果，也找不到原因
          hack: `true; @import "${path.resolve(__dirname, 'src/assets/scss/style.less')}";`
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    // 一个规则里的 基础Loader
    // svg是个基础loader
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  }
}


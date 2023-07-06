const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false, //关闭eslint校验
  transpileDependencies: true,
	
	devServer: {
    client: {
      overlay: false
    }
  }
})







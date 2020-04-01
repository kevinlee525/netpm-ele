module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                'components':'@/components',
                'views':'@/views',
                'network':'@/network',
                'assets':'@/assets',
                'common':'@/common',
                'store':'@/store',
            }
        }
    },
    // outputDir: 'static',
    assetsDir: "static",
    devServer : {
        // "port": 8888,
        "open": true,
    }
}

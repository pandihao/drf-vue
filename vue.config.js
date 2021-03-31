module.exports = {
    devServer: {
        host:"0.0.0.0",
        port: 8080,
        proxy: {
            '/apis':{
                target:'http://localhost:8010',
                changeOrigin:true,
                pathRewrite:{
                    '/apis':''
                }
            }
        }
    }
}
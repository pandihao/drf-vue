module.exports = {
    devServer: {
        host:"localhost",
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
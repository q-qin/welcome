var path = require('path')
var config = require('../config')
var utils = require('./utils')
var _projectRoot = path.resolve(__dirname, '../')

if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var env = process.env.NODE_ENV
console.log('current env:',env)

// for development 
if(env === 'development'){
    var _cssSourceMap = config.dev.cssSourceMap
    var _assetsRoot = config.dev.assetsRoot
    var _assetsPublicPath = config.dev.assetsPublicPath
}
// for testing
if(env === 'test'){
    var _cssSourceMap = config.test.cssSourceMap
    var _assetsRoot = config.test.assetsRoot
    var _assetsPublicPath = config.test.assetsPublicPath
}
// for production
if(env === 'production'){
    var _cssSourceMap = config.build.cssSourceMap
    var _assetsRoot = config.build.assetsRoot
    var _assetsPublicPath = config.build.assetsPublicPath
}


module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: _assetsRoot,
        publicPath: _assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            '@': path.resolve(__dirname, '../src'),
            'conf': env === 'production'?'@/config/conf.js':'@/config/conf-test.js',
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: _projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: _cssSourceMap
        }),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 10 versions']
            })
        ]
    }
}
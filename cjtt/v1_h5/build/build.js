// https://github.com/shelljs/shelljs
require('shelljs/global')

var env = process.env.NODE_ENV

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')

var webpackConfig = require('./webpack.prod.conf')
var _assetsRoot = (env === 'production'?config.build.assetsRoot:config.test.assetsRoot)
var _assetsSubDirectory = (env === 'production'?config.build.assetsSubDirectory:config.test.assetsSubDirectory)

var spinner = ora('building for ' + env + '... ')
spinner.start()

var assetsPath = path.join(_assetsRoot, _assetsSubDirectory)
rm('-rf', _assetsRoot+'/static')
mkdir('-p', assetsPath)
// cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
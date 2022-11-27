const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './../frontend')
        },
        open: true,
        port: 8080,
        open: true,
        hot: true
    },
    mode: 'development'
}
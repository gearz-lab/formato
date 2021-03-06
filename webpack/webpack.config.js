var webpack = require('webpack');

module.exports = {
    entry: [
        './src/formato.js'
    ],

    output: {
        filename: 'formato.js',
        path: './dist/'
    },

    resolve: {
        extensions: ['', '.js']
    },

    module: {
        loaders: [
            {test: /\.js/, loaders: ['babel'], exclude: /node_modules/ }
        ]
    }
};

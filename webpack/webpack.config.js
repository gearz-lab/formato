import webpack from 'webpack';

export default {
    entry: [
        './src/formato.js'
    ],

    output: {
        filename: 'formato.min.js',
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

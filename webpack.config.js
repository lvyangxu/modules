var autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader?modules!postcss-loader"},
            {test: /\.scss$/, loader: "style-loader!css-loader?modules!postcss-loader!sass-loader"},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
            {test: /\.jpg$/, loader: "file-loader"},
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react'],
                    "plugins": ["syntax-async-functions", "transform-regenerator"]
                }
            }
        ]
    },
    postcss: [autoprefixer()],
    output: {
        filename: "bundle.js"
    }
};
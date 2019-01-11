const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line

module.exports = function (env = {}) {
  const outputPath = path.resolve(__dirname, env.outputPath || 'dist');

  const output = {
    path: outputPath,
    filename: '[name]/app.js',
    publicPath: '/',
  };

  const plugins = [];

  const entry = {
    gasket: './chapter2/gasket/app',
    gasket2: './chapter2/gasket2/app',
    gasket3: './chapter2/gasket3/app',
    gasket4: './chapter2/gasket4/app',
  };

  if(env.production) {
    Object.keys(entry).forEach((key) => {
      plugins.push(
        new HtmlWebpackPlugin({
          template: './src/assets/template.html',
          title: key,
          chunks: [key],
          filename: `${key}.html`,
        })
      );
    });
  }

  return {
    mode: env.production ? 'production' : 'none',
    entry,
    output,
    resolve: {
      alias: {
        GLHelper: path.resolve(__dirname, 'src/index'),
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/.*/,
          use: {
            loader: 'babel-loader',
            options: {babelrc: true},
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(frag|vert|glsl)$/,
          use: {
            loader: 'glsl-shader-loader',
            options: {},
          },
        },
      ],

      /* Advanced module configuration (click to show) */
    },
    // Don't follow/bundle these modules, but request them at runtime from the environment

    stats: 'errors-only',
    // lets you precisely control what bundle information gets displayed

    devServer: {
      contentBase: path.join(__dirname, env.server || '.'),
      compress: true,
      port: 3000,
      // ...
    },

    plugins,
    // list of additional plugins


    /* Advanced configuration (click to show) */
  };
};

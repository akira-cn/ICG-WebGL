const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpack = require('webpack');

module.exports = function (env = {}) {
  const outputPath = path.resolve(__dirname, env.outputPath || 'docs');

  const output = {
    path: outputPath,
    filename: '[name]/app.js',
    publicPath: '/',
  };

  const plugins = [];

  const entry = {};

  function makeEntry(chapter) {
    const root = path.resolve(__dirname, chapter);
    const pa = fs.readdirSync(root);
    pa.forEach((el) => {
      const info = fs.statSync(path.resolve(root, el));
      if(info.isDirectory()) {
        const entryPath = path.resolve(root, el, 'app.js');
        const isEntry = fs.existsSync(entryPath);
        if(isEntry) {
          entry[el] = entryPath;
        }
      }
    });
  }

  for(let i = 1; i < 12; i++) {
    makeEntry(`chapter${`0${i}`.slice(-2)}`);
  }

  makeEntry('glsl');
  makeEntry('misc');

  if(env.production) {
    Object.keys(entry).forEach((key) => {
      plugins.push(
        new HtmlWebpackPlugin({
          template: entry[key].replace(/app\.js$/, 'index.html'),
          title: key,
          chunks: [],
          filename: `${key}.html`,
        })
      );
    });
  } else {
    plugins.push(
      new OpenBrowserPlugin({url: 'http://localhost:3000'}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.SourceMapDevToolPlugin({}),
    );
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
      hot: true,
      // ...
    },

    plugins,
    // list of additional plugins

    /* Advanced configuration (click to show) */
  };
};

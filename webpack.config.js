const path = require('path');
module.exports = function (env = {}) {
  const outputPath = path.resolve(__dirname, env.outputPath || 'dist');

  const output = {
    path: outputPath,
    filename: 'gl-helper.js',
    publicPath: '/js/',
    library: 'GLHelper',
    libraryTarget: 'umd',
  };

  if(env.production) {
    output.filename += '.min.js';
  } else {
    output.filename += '.js';
  }

  return {
    mode: env.production ? 'production' : 'none',
    entry: './src/index',
    output,

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(sprite-[\w-]+)\/|svg-path-to-canvas).*/,
          use: {
            loader: 'babel-loader',
            options: {babelrc: true},
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

    plugins: [
      // ...
    ],
    // list of additional plugins


    /* Advanced configuration (click to show) */
  };
};

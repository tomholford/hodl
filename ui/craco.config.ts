import nodePolyfillWebpackPlugin from "node-polyfill-webpack-plugin";

const path = require("path");
const enableImportsFromExternalPaths = require("./src/helpers/craco/enableImportsFromExternalPaths");

// Paths to the code you want to use
const consoleBrowserify = path.resolve(__dirname, "./node_modules/console-browserify");

module.exports = {
  webpack: {
    plugins: {
      add: [
        new nodePolyfillWebpackPlugin()
      ]
    }
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }: { webpackConfig: any }) => {
          enableImportsFromExternalPaths(webpackConfig, [
            // Add the paths here
            consoleBrowserify,
          ]);
          return webpackConfig;
        },
      },
    },
  ],
}


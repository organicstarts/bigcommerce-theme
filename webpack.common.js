const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
      CleanPlugin = require('clean-webpack-plugin'),
      LodashPlugin = require('lodash-webpack-plugin'),
      path = require('path'),
      webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'), // Extracts CSS into separate files
      TerserPlugin = require('terser-webpack-plugin'), // Uses terser to minify JavaScript
      OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // Optimize \ minimize CSS assets

// Common configuration, with extensions in webpack.dev.js and webpack.prod.js.
module.exports = {
    bail: true,
    context: __dirname,
    entry: {
        main: './assets/js/app.js',
        style: './assets/scss/os/index.scss',
        home: './assets/scss/os/pages/home/index.scss',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        // new TerserJSPlugin({ // Uses terser to minify JavaScript
        //   terserOptions: {
        //     output: {
        //       comments: false,
        //     },
        //   },
        // }), 
        new OptimizeCSSAssetsPlugin({ // Optimize \ minimize CSS assets
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          }
        })
      ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /(assets\/js|assets\\js|stencil-utils)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import', // add support for dynamic imports (used in app.js)
                            'lodash', // Tree-shake lodash
                        ],
                        presets: [
                            ['@babel/preset-env', {
                                loose: true, // Enable "loose" transformations for any plugins in this preset that allow them
                                modules: false, // Don't transform modules; needed for tree-shaking
                                useBuiltIns: 'usage', // Tree-shake babel-polyfill
                                targets: '> 1%, last 2 versions, Firefox ESR',
                            }],
                        ],
                    },
                },
            },
            // {
            //   test: /\.css$/,
            //   use: [
            //     //"style-loader",  // Adds CSS to the DOM by injecting a <style> tag
            //     {
            //       loader: MiniCssExtractPlugin.loader, // Extracts CSS into separate files
            //       options: {
            //         hmr: true,
            //         //reloadAll: true, // Forceful method for Hot Module Reloading (HMR)
            //       },
            //     },
            //     "css-loader", // Interprets @import and url() like import/require() and will resolve them
            //     {
            //       loader: "postcss-loader", // Process CSS
            //       options: {
            //         plugins: [
            //           require("precss"), // Use Sass-like markup and staged CSS features in CSS
            //           require("autoprefixer") // Parse CSS and add vendor prefixes to CSS rules
            //         ]
            //       }
            //     }
            //   ]
            // },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                    options: {
                      hmr: true,
                      reloadAll: true,
                    }
                  },
                  {
                    loader: "css-loader" // Interprets @import and url() like import/require() and will resolve them
                  },
                  {
                    loader: "postcss-loader", // Process CSS
                    options: {
                      plugins: [
                        //require('postcss-advanced-variables'), // Use Sass-like variables, conditionals, and iterators in CSS.
                        require('postcss-import'),
                        require("precss"), // Use Sass-like markup and staged CSS features in CSS
                        require("autoprefixer") // Parse CSS and add vendor prefixes to CSS rules
                      ]
                    }
                  },
                  {
                    loader: "sass-loader" // Loads a Sass/SCSS file and compiles it to CSS
                  }
                ]
              },
              // {
              //   test: /\.less$/,
              //   use: [
              //     //"style-loader", // Adds CSS to the DOM by injecting a <style> tag
              //     {
              //       loader: MiniCssExtractPlugin.loader, // Extracts CSS into separate files
              //       options: {
              //         hmr: true,
              //         //reloadAll: true, // Forceful method for Hot Module Reloading (HMR)
              //       },
              //     },
              //     "css-loader", // Interprets @import and url() like import/require() and will resolve them
              //     {
              //       loader: "postcss-loader", // Process CSS
              //       options: {
              //         plugins: [
              //           require("autoprefixer") // Parse CSS and add vendor prefixes to CSS rules
              //         ]
              //       }
              //     },
              //     "less-loader" // Compiles Less to CSS
              //   ]
              // },
              {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: "file-loader",
                    options: {
                      name: "images/[name].[ext]"
                    }
                  }
                ]
              },
              {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
                options: {
                  name: "fonts/[name].[ext]",
                  limit: 8192,
                  mimetype: "application/font-woff"
                }
              },
              {
                test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: { name: "images/[name].[ext]" }
              },
              {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: { name: "fonts/[name].[ext]" }
              }
        ],
    },
    output: {
        chunkFilename: 'theme-bundle.chunk.[name].js',
        filename: 'theme-bundle.[name].js',
        path: path.resolve(__dirname, 'assets/dist'),
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 1024 * 300,
        maxEntrypointSize: 1024 * 300,
    },
    plugins: [
        new MiniCssExtractPlugin({ // Extracts CSS into separate files
          filename: '[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false, 
        }),
        new CleanPlugin(['assets/dist'], {
            verbose: false,
            watch: false,
        }),
        new LodashPlugin, // Complements babel-plugin-lodash by shrinking its cherry-picked builds further.
        new webpack.ProvidePlugin({ // Provide jquery automatically without explicit import
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        }),
    ],
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            jstree: path.resolve(__dirname, 'node_modules/jstree/dist/jstree.min.js'),
            lazysizes: path.resolve(__dirname, 'node_modules/lazysizes/lazysizes.min.js'),
            nanobar: path.resolve(__dirname, 'node_modules/nanobar/nanobar.min.js'),
            'slick-carousel': path.resolve(__dirname, 'node_modules/slick-carousel/slick/slick.min.js'),
            'svg-injector': path.resolve(__dirname, 'node_modules/svg-injector/dist/svg-injector.min.js'),
            sweetalert2: path.resolve(__dirname, 'node_modules/sweetalert2/dist/sweetalert2.min.js'),
        },
    },
};

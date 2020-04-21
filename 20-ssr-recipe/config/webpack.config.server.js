const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const webpack = require('webpack');
const getClientEnvironment = require('./env');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// const publicUrl = paths.servedPath.slice(0, -1);
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  // 프로덕션 모드에서는 최적화 옵션들이 활성화된다. development는 빠르게.
  mode: 'production',
  entry: paths.ssrIndexJs,
  // node 환경에서 실행될 것이라는 점 명시
  target: 'node',
  output: {
    path: paths.ssrBuild,
    filename: 'server.js',
    // 코드 스플리팅 시 청크 파일에 부여되는 파일 이름 설정
    chunkFilename: 'js/[name].chunk.js',
    publicPath: paths.publicUrlOrPath
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              // true로 설정 시 실제 CSS 파일은 생성하지 않는다
              onlyLocals: true
            }
          },
          {
            test: cssModuleRegex,
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              onlyLocals: true,
              getLocalIdent: getCSSModuleLocalIdent
            }
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  onlyLocals: true
                }
              },
              require.resolve('sass-loader')
            ]
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: true,
                  onlyLocals: true,
                  getLocalIdent: getCSSModuleLocalIdent
                }
              },
              require.resolve('sass-loader')
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              emitFile: false,
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  // import 구문으로 불러오는 라이브러리를 node_modules에서 찾아서 사용할 수 있도록 설정
  resolve: {
    modules: ['node_modules']
  },
  externals: [nodeExternals()],
  plugins: [
    // 환경변수 - process.env.NODE_ENV 값을 참조하여 현재 개발환경을 감지
    new webpack.DefinePlugin(env.stringified)
  ]
}
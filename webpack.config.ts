import * as Webpack from 'webpack';
import {resolve} from 'path';
import {sync} from 'glob';

/** ビルド対象ルートディレクトリ */
const SRC_PATH = resolve(__dirname, './src/functions/');
/** entryとなるファイル名 */
const ENTRY_NAME = 'index.ts';
/** ビルド結果出力先 */
const BUILT_PATH = resolve(__dirname, './built');
/** ビルド種別 */
const BUILD_VARIANT = process.env.NODE_ENV;

/**
 * ビルド対象のentryを解決する
 * @returns {Webpack.Entry} entry
 */
const resolveEntry = (): Webpack.Entry => {
  const entries: {[key: string]: string} = {};
  const targets: string[] = sync(`${SRC_PATH}/**/${ENTRY_NAME}`);
  const pathRegex = new RegExp(`${SRC_PATH}/(.+?)/${ENTRY_NAME}`);
  targets.forEach((value: string) => {
    let key: string = value.replace(pathRegex, '$1/index');
    entries[key] = value;
  });

  return entries;
};

const config: Webpack.Configuration = {
  target: 'node',
  mode: BUILD_VARIANT === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: resolveEntry(),
  output: {
    filename: '[name].js',
    path: BUILT_PATH,
    library: '[name]',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        exclude: /(client)/,
        test: /\.ts?$/,
        loader: 'ts-loader'
      }
    ]
  }
};

export default config;

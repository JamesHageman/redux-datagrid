
module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    library: 'redux-datagrid',
    libraryTarget: 'umd',
    umdNamedDefine: 'ReduxDatagrid',
    path: __dirname + '/lib',
    filename: 'index.js',
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      reselect: true,
      'react-redux': true,
    },
  ],

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
    ],
  },
};

module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        'babel-plugin-root-import',
        {
          paths: [
            {
              rootPathSuffix: './src',
              rootPathPrefix: '@/',
            },
            {
              rootPathSuffix: './assets',
              rootPathPrefix: '@assets/',
            },
          ],
        },
      ],
      ['import', { libraryName: '@ant-design/react-native' }],
    ],
    presets: ['babel-preset-expo'],
  };
};

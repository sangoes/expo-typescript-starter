module.exports = function(api) {
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
    ],
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    assets: ['fonts'],
  };
};

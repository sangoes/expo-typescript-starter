// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };


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
    ],
    presets: ['babel-preset-expo'],
  };
};

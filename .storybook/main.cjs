const { mergeConfig } = require('vite');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
  ],
  framework: '@storybook/web-components',
  base: './',
  core: {
    builder: "@storybook/builder-vite"
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: (await import('../vite.config.js')).default.resolve,
      optimizeDeps: {},
      base: './',
    });
  },
};
